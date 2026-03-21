#!/usr/bin/env python3
"""
Demo script to showcase the automation testing roadmap.

This script demonstrates:
1. Environment setup
2. Running different types of tests
3. Generating reports
4. Best practices for test execution
"""

import subprocess
import sys
import os
from pathlib import Path


def run_command(command: str, description: str) -> bool:
    """Run a command and return success status."""
    print(f"\n{'='*60}")
    print(f"🚀 {description}")
    print(f"{'='*60}")
    print(f"Command: {command}")

    try:
        result = subprocess.run(
            command,
            shell=True,
            capture_output=True,
            text=True,
            cwd=Path(__file__).parent
        )

        if result.stdout:
            print("Output:")
            print(result.stdout)

        if result.stderr:
            print("Errors:")
            print(result.stderr)

        success = result.returncode == 0
        status = "✅ SUCCESS" if success else "❌ FAILED"
        print(f"\n{status} (Exit code: {result.returncode})")

        return success

    except Exception as e:
        print(f"❌ ERROR: {e}")
        return False


def main():
    """Main demo function."""
    print("🎯 Automation Testing Roadmap - Demo Script")
    print("This script will demonstrate the complete testing workflow")

    # Check if we're in the right directory
    if not Path("requirements.txt").exists():
        print("❌ Please run this script from the automation-roadmap directory")
        sys.exit(1)

    # Step 1: Install dependencies
    if not run_command(
        "pip install -r requirements.txt",
        "Installing Python dependencies"
    ):
        print("❌ Failed to install dependencies. Please check your Python environment.")
        sys.exit(1)

    # Step 2: Install Playwright browsers
    if not run_command(
        "playwright install",
        "Installing Playwright browsers"
    ):
        print("❌ Failed to install Playwright browsers.")
        sys.exit(1)

    # Step 3: Run basic pytest discovery
    run_command(
        "pytest --collect-only",
        "Discovering available tests"
    )

    # Step 4: Run smoke tests
    run_command(
        "pytest -m smoke -v",
        "Running smoke tests (critical functionality)"
    )

    # Step 5: Run all tests with HTML report
    run_command(
        "pytest --html=reports/test_report.html --self-contained-html -v",
        "Running all tests with HTML report"
    )

    # Step 6: Run tests with Allure reporting
    run_command(
        "pytest --alluredir=allure-results -v",
        "Running tests with Allure reporting"
    )

    # Step 7: Generate Allure report
    if Path("allure-results").exists():
        run_command(
            "allure generate allure-results --clean -o allure-report",
            "Generating Allure HTML report"
        )

        print("\n📊 Reports generated:")
        print(f"   HTML Report: file://{Path('reports/test_report.html').absolute()}")
        print(f"   Allure Report: file://{Path('allure-report/index.html').absolute()}")

    # Step 8: Run specific test file
    if Path("example_test.py").exists():
        run_command(
            "pytest example_test.py::test_login_success -v -s",
            "Running specific test with verbose output"
        )

    # Step 9: Show test markers
    run_command(
        "pytest --markers",
        "Showing available test markers"
    )

    # Step 10: Run tests in parallel (if pytest-xdist is available)
    try:
        import xdist
        run_command(
            "pytest -n 2 -v",
            "Running tests in parallel (2 workers)"
        )
    except ImportError:
        print("\n💡 Tip: Install pytest-xdist for parallel test execution")
        print("   pip install pytest-xdist")
        print("   Then run: pytest -n auto")

    print("\n🎉 Demo completed!")
    print("\n📚 Next steps:")
    print("   1. Open the HTML reports in your browser")
    print("   2. Review the example_test.py file for best practices")
    print("   3. Try modifying tests and running them again")
    print("   4. Explore the roadmap phases for more advanced topics")

    print("\n🔗 Useful commands:")
    print("   pytest -v                    # Run all tests verbosely")
    print("   pytest -m smoke             # Run only smoke tests")
    print("   pytest --html=report.html   # Generate HTML report")
    print("   pytest -k 'login'           # Run tests containing 'login'")
    print("   pytest --headed            # Run tests with browser visible")


if __name__ == "__main__":
    main()