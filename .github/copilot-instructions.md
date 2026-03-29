# Project Guidelines

## Code Style

Python with Black formatting, Flake8 linting, MyPy type checking. Reference [example_test.py](example_test.py) for Page Object Model pattern and [conftest.py](conftest.py) for fixture examples.

## Architecture

Educational automation test framework combining web learning materials and Python Playwright tests. Components: HTML roadmap pages, pytest suite with POM, Allure reporting. See [README.md](README.md) for overall structure.

## Build and Test

Install dependencies: `pip install -r requirements.txt`

Install browsers: `playwright install`

Run tests: `pytest -v --html=reports/test_report.html --self-contained-html`

Run smoke tests: `pytest -m smoke -v`

Run with coverage: `pytest --cov=. --cov-report=html`

## Conventions

Use Page Object Model for UI tests with session-scoped browser and function-scoped pages/contexts.

Use Playwright's auto-waiting `expect()` assertions, avoid `sleep()`.

Apply markers like `@pytest.mark.smoke`, `@pytest.mark.regression` for test categorization.

Use Allure for detailed reporting with `@allure.feature()` and `@allure.story()`.

For debugging, enable `--headed` and `--slowmo 1000` flags.

Check `screenshots/` and `traces/` on test failures.
