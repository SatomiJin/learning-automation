# 🚀 Lộ Trình Automation Test — Playwright + Python

> **Dành cho QC chưa biết Python** — Từ cú pháp cơ bản đến framework hoàn chỉnh sẵn sàng apply vị trí Automation Tester.

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://python.org)
[![Playwright](https://img.shields.io/badge/Playwright-1.40+-green.svg)](https://playwright.dev)
[![pytest](https://img.shields.io/badge/pytest-7.0+-red.svg)](https://pytest.org)

## 📋 Tổng Quan

Lộ trình học tập **3 tháng** với **12 tuần** chi tiết, bao gồm:

- **Phase 1**: Python Cơ Bản (Tuần 1-4)
- **Phase 2**: Playwright Cơ Bản (Tuần 5-8)
- **Phase 3**: Nâng Cao & Production-Ready (Tuần 9-12)

### 🎯 Mục Tiêu

- Nắm vững Python programming fundamentals
- Thành thạo Playwright automation framework
- Xây dựng framework testing production-ready
- Portfolio project để apply vị trí Automation Tester

## 📚 Cấu Trúc Lộ Trình

### Phase 1: Python Cơ Bản (4 tuần)

| Tuần | Chủ Đề                   | Nội Dung Chính                                 |
| ---- | ------------------------ | ---------------------------------------------- |
| 1    | Variables, Types & Loops | Data types, operators, if/elif/else, for/while |
| 2    | Collections & Functions  | List/Dict/Tuple/Set, functions, scope          |
| 3    | File I/O & Exceptions    | CSV/JSON, try/except, file operations          |
| 4    | OOP                      | Classes, inheritance, methods, properties      |

**Milestone**: Mini Test Manager CLI tool

### Phase 2: Playwright Cơ Bản (4 tuần)

| Tuần | Chủ Đề               | Nội Dung Chính                          |
| ---- | -------------------- | --------------------------------------- |
| 5    | Setup & Locators     | Installation, first script, locators    |
| 6    | Actions & Assertions | Click, fill, select, expect()           |
| 7    | Waits & Network      | Auto-waiting, mocking, network handling |
| 8    | pytest Framework     | Fixtures, parametrize, reporting        |

**Milestone**: E-commerce Test Suite

### Phase 3: Nâng Cao & Production-Ready (4 tuần)

| Tuần | Chủ Đề                | Nội Dung Chính                               |
| ---- | --------------------- | -------------------------------------------- |
| 9    | Page Object Model     | BasePage, POM pattern, locators tập trung    |
| 10   | Reporting & Debugging | Allure reports, trace viewer, screenshots    |
| 11   | API Testing & CI/CD   | Requests, GitHub Actions, parallel execution |
| 12   | Best Practices        | Code quality, maintenance, scalability       |

**Milestone**: Full Automation Framework Portfolio Project

## 🚀 Bắt Đầu Học

### 1. Mở Lộ Trình

```bash
# Mở file index.html trong browser
start index.html
# hoặc double-click index.html
```

### 2. Theo Dõi Tiến Độ

- ✅ Check vào từng bài tập khi hoàn thành
- 📝 Ghi chú cá nhân cho mỗi topic
- 📊 Theo dõi progress tự động
- 🎯 Hoàn thành milestone projects

### 3. Thực Hành Code

Mỗi tuần có:

- 📖 Lý thuyết với code examples
- 💻 Bài tập thực hành
- 🎯 Mini-projects
- 📋 Checklists

## ⚡ Quick Start

### 1. Clone & Setup

```bash
# Clone repository (if applicable)
git clone <repository-url>
cd automation-roadmap

# Install dependencies
pip install -r requirements.txt

# Install Playwright browsers
playwright install
```

### 2. Run Demo

```bash
# Run the demo script to see everything in action
python demo.py
```

### 3. Open Roadmap

```bash
# Open the interactive roadmap
start index.html
```

### 4. Run Example Tests

```bash
# Run the example test file
pytest example_test.py -v --headed
```

## 🛠️ Setup Development Environment

### Yêu Cầu Hệ Thống

- **Python**: 3.8+
- **OS**: Windows 10+, macOS 10.15+, Ubuntu 18.04+
- **RAM**: 4GB+
- **Disk**: 2GB free space

### Cài Đặt Python

```bash
# Windows - Download từ python.org
# macOS - dùng Homebrew
brew install python

# Ubuntu/Debian
sudo apt update
sudo apt install python3 python3-pip
```

### Cài Đặt Playwright

```bash
# Cài Playwright
pip install playwright
playwright install

# Cài pytest và plugins
pip install pytest-playwright pytest-html allure-pytest

# Cài Allure (optional - for advanced reporting)
# Download từ https://github.com/allure-framework/allure2/releases
```

### Verify Installation

```bash
# Check Python
python --version
# Python 3.8.0+

# Check Playwright
playwright --version
# Version 1.40.0

# Check pytest
pytest --version
# pytest 7.0.0

# Test example file
pytest example_test.py --collect-only
# Should show available tests

# Run demo script
python demo.py
# Should execute full testing workflow
```

## 📁 Cấu Trúc Project

```
automation-roadmap/
├── index.html              # Main roadmap interface
├── styles.css              # Styling
├── script.js               # JavaScript functionality
├── phase1.html             # Python basics content
├── phase2.html             # Playwright basics content
├── phase3.html             # Advanced topics content
├── example_test.py         # Example test file with best practices
├── demo.py                 # Demo script to showcase testing workflow
├── requirements.txt        # Python dependencies
├── pytest.ini             # pytest configuration
├── conftest.py            # pytest fixtures and setup
├── .gitignore             # Git ignore rules
├── README.md              # This file
└── .vscode/               # VS Code configuration
    ├── settings.json      # Editor and Python settings
    ├── extensions.json    # Recommended extensions
    ├── launch.json        # Debug configurations
    └── tasks.json         # Build and test tasks
```

## 📄 Chi Tiết Project Files

### Core Files

- **`index.html`**: Giao diện chính với navigation và progress tracking
- **`phase[1-3].html`**: Nội dung học tập cho từng phase
- **`styles.css`**: Styling responsive với theme support
- **`script.js`**: Dynamic loading, progress tracking, search

### Development Files

- **`example_test.py`**: File test mẫu với best practices (POM, fixtures, reporting)
- **`demo.py`**: Script demo toàn bộ workflow testing
- **`requirements.txt`**: Dependencies Python (Playwright, pytest, etc.)
- **`pytest.ini`**: Cấu hình pytest (markers, reporting, browser settings)
- **`conftest.py`**: Fixtures và setup chung cho pytest

### Configuration Files

- **`.vscode/settings.json`**: Cấu hình Python, testing, formatting
- **`.vscode/extensions.json`**: Extensions VS Code khuyến nghị
- **`.vscode/launch.json`**: Debug configurations cho Python và Playwright
- **`.vscode/tasks.json`**: Tasks cho build, test, format code
- **`.gitignore`**: Loại trừ files không cần thiết khỏi git

## 🎯 Cách Sử Dung

### Học Theo Tuần

1. **Đọc lý thuyết** trong từng topic
2. **Chạy code examples** để hiểu
3. **Làm bài tập** để thực hành
4. **Check vào checkbox** khi hoàn thành
5. **Ghi chú** những gì cần nhớ

### Milestone Projects

- **Phase 1**: Xây dựng CLI tool quản lý test cases
- **Phase 2**: Test suite cho e-commerce website
- **Phase 3**: Full framework với POM, reporting, CI/CD

### Tips Học Tập

- ⏰ **Thời gian**: 10-15h/tuần
- 🎯 **Tập trung**: Làm tuần tự, không skip
- 💻 **Thực hành**: Code nhiều hơn đọc
- 📝 **Ghi chú**: Note lại concepts quan trọng
- 🔄 **Review**: Xem lại code cũ thường xuyên

## 🏆 Kết Quả Đầu Ra

Sau 3 tháng, bạn sẽ:

- ✅ Nắm vững Python programming
- ✅ Thành thạo Playwright automation
- ✅ Xây dựng được test framework production-ready
- ✅ Có portfolio project để apply job
- ✅ Kiến thức nền tảng để học Selenium/Cypress

## 💼 Career Path

### Junior Automation Tester

- ✅ Python basics
- ✅ Playwright fundamentals
- ✅ Basic framework structure
- ✅ Simple test suites

### Mid-level Automation Engineer

- ✅ Advanced Python (OOP, design patterns)
- ✅ POM, Page Factory patterns
- ✅ CI/CD integration
- ✅ API + UI testing
- ✅ Performance testing basics

### Senior Automation Architect

- ✅ Framework design & architecture
- ✅ Multi-browser, cross-platform testing
- ✅ Test data management
- ✅ Reporting & analytics
- ✅ Team leadership & mentoring

## 📞 Hỗ Trợ

### Issues & Questions

- 📧 Email: [your-email@example.com]
- 💬 Discord: [discord-invite-link]
- 📱 Telegram: [telegram-group]

### Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Playwright Team** for the amazing automation framework
- **Python Community** for excellent documentation
- **Open Source Contributors** for libraries and tools

---

**🎯 Chúc bạn thành công trên con đường trở thành Automation Tester chuyên nghiệp!**

_Built with ❤️ for Vietnamese QA community_</content>
<parameter name="filePath">d:\Workspace\WorkSpace\auto\README.md
