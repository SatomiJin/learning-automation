"""
Example test file demonstrating Playwright + pytest best practices.

This file shows:
- Page Object Model usage
- Fixtures and parametrization
- Assertions with expect()
- Allure reporting
- Error handling
"""

import pytest
import allure
from playwright.sync_api import Page, expect


class LoginPage:
    """Page Object for Login page."""

    def __init__(self, page: Page):
        self.page = page
        self.username_input = page.locator("#user-name")
        self.password_input = page.locator("#password")
        self.login_button = page.locator("#login-button")
        self.error_message = page.locator(".error-message")

    def goto(self):
        self.page.goto("https://www.saucedemo.com")

    def login(self, username: str, password: str):
        self.username_input.fill(username)
        self.password_input.fill(password)
        self.login_button.click()

    def get_error_message(self) -> str:
        return self.error_message.text_content() if self.error_message.is_visible() else ""


class InventoryPage:
    """Page Object for Inventory page."""

    def __init__(self, page: Page):
        self.page = page
        self.inventory_items = page.locator(".inventory_item")
        self.shopping_cart_badge = page.locator(".shopping_cart_badge")

    def is_loaded(self) -> bool:
        return self.page.url.endswith("/inventory.html")

    def get_item_count(self) -> int:
        return self.inventory_items.count()

    def add_item_to_cart(self, item_name: str):
        item = self.inventory_items.filter(has_text=item_name)
        item.locator("button").click()

    def get_cart_badge_count(self) -> int:
        if self.shopping_cart_badge.is_visible():
            return int(self.shopping_cart_badge.text_content())
        return 0


@allure.feature("Authentication")
@allure.story("Login")
@pytest.mark.smoke
@pytest.mark.critical
def test_login_success(page: Page, login_credentials, base_url):
    """Test successful login with valid credentials."""
    login_page = LoginPage(page)
    inventory_page = InventoryPage(page)

    with allure.step("Navigate to login page"):
        login_page.goto()

    with allure.step("Login with valid credentials"):
        creds = login_credentials["valid_user"]
        login_page.login(creds["username"], creds["password"])

        # Attach screenshot for reporting
        screenshot = page.screenshot()
        allure.attach(screenshot, name="Login Success",
                     attachment_type=allure.attachment_type.PNG)

    with allure.step("Verify successful login"):
        expect(inventory_page.page).to_have_url(f"{base_url}/inventory.html")
        expect(inventory_page.inventory_items).to_have_count(6)


@allure.feature("Authentication")
@allure.story("Login")
@pytest.mark.regression
@pytest.mark.parametrize("user_type,expected_error", [
    ("locked_user", "Sorry, this user has been locked out"),
    ("invalid_user", "Username and password do not match"),
])
def test_login_failures(page: Page, login_credentials, user_type, expected_error):
    """Test login failures with different scenarios."""
    login_page = LoginPage(page)

    with allure.step(f"Login with {user_type}"):
        login_page.goto()
        creds = login_credentials[user_type]
        login_page.login(creds["username"], creds["password"])

    with allure.step("Verify error message"):
        expect(login_page.error_message).to_be_visible()
        expect(login_page.error_message).to_contain_text(expected_error)


@allure.feature("Shopping Cart")
@allure.story("Add to Cart")
@pytest.mark.smoke
def test_add_item_to_cart(page: Page, login_credentials):
    """Test adding items to shopping cart."""
    login_page = LoginPage(page)
    inventory_page = InventoryPage(page)

    with allure.step("Login and navigate to inventory"):
        login_page.goto()
        creds = login_credentials["valid_user"]
        login_page.login(creds["username"], creds["password"])

    with allure.step("Add first item to cart"):
        # Get first item name
        first_item = inventory_page.inventory_items.first
        item_name = first_item.locator(".inventory_item_name").text_content()
        inventory_page.add_item_to_cart(item_name)

    with allure.step("Verify cart badge shows 1"):
        expect(inventory_page.shopping_cart_badge).to_have_text("1")


@allure.feature("UI Components")
@allure.story("Form Validation")
@pytest.mark.regression
def test_form_validation(page: Page):
    """Test form validation and error handling."""
    login_page = LoginPage(page)

    with allure.step("Navigate to login page"):
        login_page.goto()

    with allure.step("Try to login with empty fields"):
        login_page.login_button.click()

    with allure.step("Verify error message for empty username"):
        expect(login_page.error_message).to_contain_text("Username is required")


@allure.feature("Performance")
@allure.story("Page Load")
@pytest.mark.slow
def test_page_load_performance(page: Page, login_credentials):
    """Test page load performance."""
    import time

    login_page = LoginPage(page)

    with allure.step("Measure login page load time"):
        start_time = time.time()
        login_page.goto()
        load_time = time.time() - start_time

        # Attach performance metric
        allure.attach(
            str(load_time),
            name="Page Load Time",
            attachment_type=allure.attachment_type.TEXT
        )

        # Assert reasonable load time
        assert load_time < 5.0, f"Page took too long to load: {load_time}s"


# Example of API testing (Phase 3 preview)
@allure.feature("API Testing")
@allure.story("REST API")
@pytest.mark.api
def test_api_endpoint():
    """Example API test (requires requests library)."""
    # This would be covered in Phase 3
    # import requests
    # response = requests.get("https://api.example.com/users")
    # assert response.status_code == 200
    pass


if __name__ == "__main__":
    # Allow running this file directly for debugging
    pytest.main([__file__, "-v", "--headed"])