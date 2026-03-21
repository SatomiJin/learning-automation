"""
Pytest configuration and fixtures for Playwright automation tests.

This file contains:
- Browser fixtures (session-scoped)
- Page fixtures (function-scoped)
- Screenshot on failure
- Trace collection on failure
- Custom markers
"""

import pytest
from playwright.sync_api import Playwright, Browser, BrowserContext, Page
import os
from pathlib import Path

# Create directories for artifacts
SCREENSHOTS_DIR = Path("screenshots")
TRACES_DIR = Path("traces")
VIDEOS_DIR = Path("videos")

SCREENSHOTS_DIR.mkdir(exist_ok=True)
TRACES_DIR.mkdir(exist_ok=True)
VIDEOS_DIR.mkdir(exist_ok=True)


@pytest.fixture(scope="session")
def browser_config():
    """Configuration for browser launch."""
    return {
        "headless": False,  # Set to True for CI
        "slow_mo": 500,     # Slow down actions for debugging
        "args": [
            "--disable-web-security",
            "--disable-features=VizDisplayCompositor"
        ]
    }


@pytest.fixture(scope="session")
def browser(playwright: Playwright, browser_config) -> Browser:
    """Session-scoped browser fixture."""
    browser = playwright.chromium.launch(**browser_config)
    yield browser
    browser.close()


@pytest.fixture
def context(browser: Browser) -> BrowserContext:
    """Function-scoped context fixture."""
    context = browser.new_context(
        viewport={"width": 1280, "height": 720},
        record_video_dir=str(VIDEOS_DIR) if os.getenv("RECORD_VIDEO") else None
    )
    yield context
    context.close()


@pytest.fixture
def page(context: BrowserContext) -> Page:
    """Function-scoped page fixture."""
    page = context.new_page()
    yield page


@pytest.fixture(autouse=True)
def trace_on_failure(page: Page, request):
    """Automatically collect traces and screenshots on test failure."""
    # Start tracing
    page.context.tracing.start(
        name=request.node.name,
        screenshots=True,
        snapshots=True,
        sources=True
    )

    yield

    # Stop tracing and save on failure
    if request.node.rep_call.failed:
        # Save trace
        trace_path = TRACES_DIR / f"{request.node.name}.zip"
        page.context.tracing.stop(path=str(trace_path))

        # Save screenshot
        screenshot_path = SCREENSHOTS_DIR / f"{request.node.name}_failed.png"
        page.screenshot(path=str(screenshot_path))

        print(f"\n📸 Screenshot saved: {screenshot_path}")
        print(f"🎬 Trace saved: {trace_path}")
    else:
        # Clean stop for passing tests
        page.context.tracing.stop()


@pytest.fixture
def login_credentials():
    """Test credentials fixture."""
    return {
        "valid_user": {
            "username": "standard_user",
            "password": "secret_sauce"
        },
        "locked_user": {
            "username": "locked_out_user",
            "password": "secret_sauce"
        },
        "invalid_user": {
            "username": "invalid_user",
            "password": "wrong_password"
        }
    }


@pytest.fixture
def base_url():
    """Base URL for the application under test."""
    return "https://www.saucedemo.com"


# Custom hooks for enhanced reporting
def pytest_html_report_title(report):
    """Set custom title for HTML report."""
    report.title = "Playwright Automation Test Report"


@pytest.hookimpl(hookwrapper=True)
def pytest_runtest_makereport(item, call):
    """Add custom information to test reports."""
    outcome = yield
    report = outcome.get_result()

    # Add browser info to report
    if hasattr(item, 'funcargs'):
        if 'page' in item.funcargs:
            page = item.funcargs['page']
            report.browser = page.context.browser.browser_type.name
            report.user_agent = page.evaluate("navigator.userAgent")


# Environment-specific configurations
def pytest_configure(config):
    """Configure pytest based on environment."""
    # Set marker descriptions
    config.addinivalue_line(
        "markers", "smoke: Quick smoke tests to verify basic functionality"
    )
    config.addinivalue_line(
        "markers", "regression: Comprehensive regression test suite"
    )
    config.addinivalue_line(
        "markers", "slow: Tests that take longer than 30 seconds"
    )
    config.addinivalue_line(
        "markers", "critical: Critical path business functionality"
    )

    # Environment variables
    if config.getoption("--headed"):
        os.environ["PWDEBUG"] = "1"