# Lộ trình học Automation Test với Playwright + TypeScript

> Mục tiêu: học từ cơ bản tới nâng cao để có thể đi làm QA Automation, tự dựng framework, viết test UI/API, debug, chạy CI/CD và maintain test suite trong dự án thật.

---

## Mục lục

1. [Nền tảng cần có](#1-nền-tảng-cần-có)
2. [Cài đặt môi trường](#2-cài-đặt-môi-trường)
3. [Playwright cơ bản](#3-playwright-cơ-bản)
4. [Locator](#4-locator)
5. [Assertion](#5-assertion)
6. [Form, table, modal, toast](#6-form-table-modal-toast)
7. [Test structure](#7-test-structure)
8. [Page Object Model](#8-page-object-model)
9. [Authentication / login state](#9-authentication--login-state)
10. [Test data management](#10-test-data-management)
11. [API testing bằng Playwright](#11-api-testing-bằng-playwright)
12. [Kết hợp UI + API](#12-kết-hợp-ui--api)
13. [Network, mock API, intercept request](#13-network-mock-api-intercept-request)
14. [Debug Playwright](#14-debug-playwright)
15. [Config Playwright](#15-config-playwright)
16. [Fixture](#16-fixture)
17. [Chạy test theo môi trường](#17-chạy-test-theo-môi-trường)
18. [CI/CD](#18-cicd)
19. [Report](#19-report)
20. [Parallel, retry, flaky test](#20-parallel-retry-flaky-test)
21. [Visual testing](#21-visual-testing)
22. [Mobile / responsive testing](#22-mobile--responsive-testing)
23. [Advanced Playwright](#23-advanced-playwright)
24. [Test design](#24-test-design)
25. [Lộ trình theo giai đoạn](#25-lộ-trình-theo-giai-đoạn)
26. [Checklist kỹ năng đi làm](#26-checklist-kỹ-năng-đi-làm)
27. [Mini project đưa vào CV](#27-mini-project-đưa-vào-cv)
28. [Gợi ý học theo thời gian](#28-gợi-ý-học-theo-thời-gian)

---

# 1. Nền tảng cần có

Trước khi học Playwright, nên có nền tảng JavaScript / TypeScript ở mức cơ bản.

## JavaScript / TypeScript cần nắm

| Chủ đề          | Cần học                                         |
| --------------- | ----------------------------------------------- |
| Biến            | `let`, `const`                                  |
| Kiểu dữ liệu    | string, number, boolean, object, array          |
| Function        | normal function, arrow function                 |
| Điều kiện       | `if`, `switch`                                  |
| Vòng lặp        | `for`, `for...of`, `map`, `filter`, `find`      |
| Object / Array  | destructuring, spread operator                  |
| Promise         | `async/await`, `try/catch`                      |
| Module          | `import`, `export`                              |
| TypeScript type | `type`, `interface`, optional field, union type |

Ví dụ cần hiểu được:

```ts
type LoginUser = {
  username: string;
  password: string;
};

async function login(user: LoginUser) {
  console.log(user.username);
}
```

---

# 2. Cài đặt môi trường

## Cần học

| Chủ đề             | Mục tiêu                   |
| ------------------ | -------------------------- |
| Node.js            | Biết cài Node, npm         |
| VS Code            | Cài extension hỗ trợ       |
| Git                | Clone repo, commit, branch |
| Playwright install | Tạo project test mới       |
| Folder structure   | Hiểu cấu trúc project      |

## Lệnh khởi tạo Playwright

```bash
npm init playwright@latest
```

## Một số lệnh thường dùng

```bash
npx playwright test
npx playwright test --headed
npx playwright test --ui
npx playwright show-report
```

---

# 3. Playwright cơ bản

## Cần học trước tiên

| Chủ đề                  | Cần nắm            |
| ----------------------- | ------------------ |
| `test()`                | Viết một test case |
| `expect()`              | Assertion          |
| `page.goto()`           | Mở trang           |
| `locator()`             | Tìm element        |
| `click()`               | Click              |
| `fill()`                | Nhập text          |
| `selectOption()`        | Chọn dropdown      |
| `check()` / `uncheck()` | Checkbox           |
| `toBeVisible()`         | Check hiển thị     |
| `toHaveText()`          | Check text         |
| `toHaveURL()`           | Check URL          |

## Ví dụ test login

```ts
import { test, expect } from "@playwright/test";

test("login success", async ({ page }) => {
  await page.goto("https://example.com/login");

  await page.getByLabel("Username").fill("admin");
  await page.getByLabel("Password").fill("123456");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL(/dashboard/);
});
```

---

# 4. Locator

Locator là phần cực kỳ quan trọng khi đi làm Automation Test.

## Các loại locator cần học

| Loại locator       | Ví dụ                      |
| ------------------ | -------------------------- |
| `getByRole`        | button, textbox, link      |
| `getByText`        | text trên UI               |
| `getByLabel`       | input có label             |
| `getByPlaceholder` | input placeholder          |
| `getByTestId`      | data-testid                |
| `locator()`        | CSS selector               |
| Filter locator     | `.filter({ hasText: '' })` |
| Chaining locator   | tìm element con            |

## Ví dụ

```ts
await page.getByRole("button", { name: "Save" }).click();

await page
  .locator(".product-row")
  .filter({ hasText: "iPhone 15" })
  .getByRole("button", { name: "Edit" })
  .click();
```

## Cần tránh

Không nên dùng:

```ts
await page.waitForTimeout(3000);
```

Nên thay bằng:

```ts
await expect(page.getByText("Success")).toBeVisible();
```

---

# 5. Assertion

## Các assertion cần học

| Assertion         | Dùng khi            |
| ----------------- | ------------------- |
| `toBeVisible()`   | Element xuất hiện   |
| `toBeHidden()`    | Element biến mất    |
| `toHaveText()`    | Check text          |
| `toContainText()` | Check chứa text     |
| `toHaveValue()`   | Check input value   |
| `toHaveURL()`     | Check URL           |
| `toHaveCount()`   | Check số lượng item |
| `toBeEnabled()`   | Button enable       |
| `toBeDisabled()`  | Button disable      |

## Ví dụ

```ts
await expect(page.getByText("Order created successfully")).toBeVisible();

await expect(page.locator(".order-row")).toHaveCount(10);
```

---

# 6. Form, table, modal, toast

Đây là nhóm case đi làm gặp liên tục.

## Form

```ts
await page.getByLabel("Customer name").fill("Nguyen Van A");
await page.getByLabel("Phone").fill("0909000000");
await page.getByRole("button", { name: "Submit" }).click();
```

## Table

Tìm row theo text:

```ts
const row = page.locator("tr").filter({ hasText: "ORDER001" });

await expect(row).toContainText("Approved");
await row.getByRole("button", { name: "Detail" }).click();
```

## Modal

```ts
const modal = page.getByRole("dialog");

await expect(modal).toBeVisible();
await modal.getByRole("button", { name: "Confirm" }).click();
```

## Toast message

```ts
await expect(page.getByText("Saved successfully")).toBeVisible();
```

---

# 7. Test structure

## Cần học

| Chủ đề              | Ý nghĩa                 |
| ------------------- | ----------------------- |
| `test.describe()`   | Gom nhóm test           |
| `test.beforeEach()` | Chạy trước mỗi test     |
| `test.afterEach()`  | Chạy sau mỗi test       |
| Tag test            | Phân loại test          |
| Skip / only         | Debug test              |
| Test data           | Tách data ra file riêng |

## Ví dụ

```ts
test.describe("Order Management", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });

  test("create order successfully", async ({ page }) => {
    // test steps
  });
});
```

---

# 8. Page Object Model

Khi đi làm, không nên viết hết logic vào file test. Nên tách thành Page Object để code dễ bảo trì.

## Ví dụ Page Object

```ts
// pages/LoginPage.ts
import { Page, expect } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("/login");
  }

  async login(username: string, password: string) {
    await this.page.getByLabel("Username").fill(username);
    await this.page.getByLabel("Password").fill(password);
    await this.page.getByRole("button", { name: "Login" }).click();
  }

  async expectLoginSuccess() {
    await expect(this.page).toHaveURL(/dashboard/);
  }
}
```

## Test file

```ts
import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test("login success", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login("admin", "123456");
  await loginPage.expectLoginSuccess();
});
```

---

# 9. Authentication / login state

Đi làm không nên login lại ở từng test nếu không cần.

## Cần học

| Chủ đề          | Mục tiêu                   |
| --------------- | -------------------------- |
| `storageState`  | Lưu session login          |
| global setup    | Login một lần trước test   |
| multi-user auth | Admin, seller, staff       |
| token / cookie  | Hiểu cơ bản auth hoạt động |

## Ý tưởng

```ts
// global setup login xong lưu auth.json
storageState: "auth/admin.json";
```

Sau đó test dùng lại session.

---

# 10. Test data management

Test data rất quan trọng với các hệ thống như OMS, WMS, ecommerce.

## Cần học

| Chủ đề         | Ví dụ                    |
| -------------- | ------------------------ |
| Static data    | user test cố định        |
| Dynamic data   | order code random        |
| JSON test data | đọc data từ file         |
| Faker          | tạo tên, email, phone    |
| Cleanup data   | xóa data sau test        |
| Seed data      | chuẩn bị data trước test |

## Ví dụ tạo dữ liệu động

```ts
const orderCode = `AUTO_${Date.now()}`;
```

```ts
const customer = {
  name: "Automation Test",
  phone: "0909000000",
};
```

---

# 11. API testing bằng Playwright

Playwright không chỉ test UI, nó còn test API được.

## Cần học

| Chủ đề               | Mục tiêu                |
| -------------------- | ----------------------- |
| `request.get()`      | Gọi GET API             |
| `request.post()`     | Gọi POST API            |
| Header auth          | Bearer token            |
| Validate response    | status, body            |
| Create data bằng API | setup trước khi test UI |
| Check DB/API sau UI  | verify kết quả          |

## Ví dụ

```ts
test("create order by API", async ({ request }) => {
  const response = await request.post("/api/orders", {
    data: {
      customerCode: "C001",
      warehouseCode: "W103",
    },
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.message).toBe("success");
});
```

---

# 12. Kết hợp UI + API

Đây là level đi làm rất cần.

## Ví dụ flow thực tế

| Step                     | Làm bằng    |
| ------------------------ | ----------- |
| Tạo đơn hàng             | API         |
| Mở OMS UI                | UI          |
| Search đơn hàng          | UI          |
| Approve đơn              | UI          |
| Check status sau approve | API hoặc DB |
| Verify shipment sinh ra  | API hoặc DB |

Mục tiêu là test nhanh hơn, ổn định hơn, không phải thao tác UI quá nhiều.

---

# 13. Network, mock API, intercept request

Cần học khi test case phụ thuộc API khó tạo data.

## Cần học

| Chủ đề                   | Dùng để                 |
| ------------------------ | ----------------------- |
| `page.route()`           | Mock response           |
| `page.waitForResponse()` | Đợi API trả về          |
| Check request payload    | Verify FE gửi đúng data |
| Mock error               | Test case API lỗi       |
| Block image/css          | Tối ưu test             |

## Ví dụ mock API

```ts
await page.route("**/api/products", async (route) => {
  await route.fulfill({
    status: 200,
    body: JSON.stringify({
      items: [],
    }),
  });
});
```

---

# 14. Debug Playwright

Đi làm test fail là chuyện mỗi ngày, nên cần debug thật chắc.

## Công cụ debug

| Công cụ            | Dùng để            |
| ------------------ | ------------------ |
| `--headed`         | Chạy có browser    |
| `--debug`          | Debug từng step    |
| Playwright UI mode | Xem test trực quan |
| Trace Viewer       | Xem lại test fail  |
| Screenshot         | Chụp khi lỗi       |
| Video              | Record test        |
| Console log        | Debug FE           |
| Network log        | Debug API          |

## Lệnh hay dùng

```bash
npx playwright test --debug
npx playwright test --ui
npx playwright show-trace trace.zip
```

---

# 15. Config Playwright

Cần học file:

```ts
playwright.config.ts;
```

## Các mục cần biết

| Config           | Ý nghĩa                 |
| ---------------- | ----------------------- |
| `baseURL`        | URL môi trường          |
| `timeout`        | timeout test            |
| `expect.timeout` | timeout assertion       |
| `retries`        | retry khi fail          |
| `workers`        | số luồng chạy           |
| `projects`       | Chrome, Firefox, WebKit |
| `reporter`       | html, list, junit       |
| `use.trace`      | bật trace               |
| `use.screenshot` | chụp hình khi fail      |
| `use.video`      | quay video              |

## Ví dụ

```ts
export default defineConfig({
  use: {
    baseURL: "https://staging.example.com",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  retries: 1,
});
```

---

# 16. Fixture

Fixture là phần từ trung cấp lên nâng cao.

## Ví dụ custom fixture

```ts
type MyFixtures = {
  loginPage: LoginPage;
};

const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});
```

Khi dùng fixture tốt, test sẽ gọn hơn:

```ts
test("login success", async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login("admin", "123456");
});
```

---

# 17. Chạy test theo môi trường

Đi làm thường có nhiều môi trường.

## Các môi trường thường gặp

| Env        | Ví dụ              |
| ---------- | ------------------ |
| local      | dev máy cá nhân    |
| dev        | môi trường dev     |
| staging    | test trước release |
| production | smoke test nhẹ     |

## Cần học

| Chủ đề                         |
| ------------------------------ |
| `.env`                         |
| `process.env`                  |
| config theo môi trường         |
| không hardcode password        |
| dùng GitHub Secret / CI Secret |

## Ví dụ

```ts
const username = process.env.ADMIN_USERNAME;
const password = process.env.ADMIN_PASSWORD;
```

---

# 18. CI/CD

Cần học để test tự chạy khi push code hoặc deploy.

## Công cụ nên biết

| Công cụ               | Nên biết         |
| --------------------- | ---------------- |
| GitHub Actions        | Phổ biến         |
| GitLab CI             | Công ty hay dùng |
| Jenkins               | Enterprise       |
| Docker                | Chạy ổn định     |
| JUnit report          | Tích hợp report  |
| Slack/Telegram notify | Báo kết quả      |

## Ví dụ trigger

| Trigger        | Test            |
| -------------- | --------------- |
| Pull request   | Chạy smoke test |
| Merge main     | Chạy regression |
| Deploy staging | Chạy E2E        |
| Hằng ngày      | Chạy full suite |

---

# 19. Report

Report rất quan trọng vì lead/dev/PM cần xem test fail ở đâu.

## Các loại report

| Report           | Dùng để      |
| ---------------- | ------------ |
| HTML report      | Xem local    |
| JUnit XML        | CI đọc       |
| Allure report    | Report đẹp   |
| Trace report     | Debug fail   |
| Screenshot/video | Evidence bug |

---

# 20. Parallel, retry, flaky test

Từ trung cấp trở lên phải học phần này.

## Cần hiểu

| Chủ đề              | Ý nghĩa                       |
| ------------------- | ----------------------------- |
| Parallel test       | Chạy nhiều test cùng lúc      |
| Worker              | Số luồng chạy                 |
| Retry               | Chạy lại khi fail             |
| Flaky test          | Test lúc pass lúc fail        |
| Isolation           | Test không phụ thuộc nhau     |
| Test data collision | Trùng data khi chạy song song |

## Ví dụ lỗi thường gặp

Không nên hardcode data:

```ts
const orderCode = "ORDER_TEST";
```

Nếu chạy song song nhiều test sẽ đụng data.

Nên dùng:

```ts
const orderCode = `ORDER_${Date.now()}`;
```

---

# 21. Visual testing

Cần học sau khi đã vững UI test.

## Cần học

| Chủ đề                | Dùng để                    |
| --------------------- | -------------------------- |
| Screenshot comparison | So sánh giao diện          |
| Visual regression     | Phát hiện lệch UI          |
| Mask dynamic element  | Che ngày giờ, số tiền động |
| Threshold             | Cho phép sai lệch nhỏ      |

## Ví dụ

```ts
await expect(page).toHaveScreenshot("dashboard.png");
```

---

# 22. Mobile / responsive testing

## Cần học

| Chủ đề                          |
| ------------------------------- |
| viewport                        |
| device emulation                |
| mobile browser                  |
| responsive layout               |
| touch action                    |
| test trên Chrome mobile giả lập |

## Ví dụ

```ts
test.use({
  viewport: { width: 390, height: 844 },
});
```

---

# 23. Advanced Playwright

Khi đã ổn, học tiếp các phần nâng cao.

## Cần học

| Chủ đề              | Dùng khi              |
| ------------------- | --------------------- |
| Multi-tab           | Test mở tab mới       |
| Download file       | Test export Excel/PDF |
| Upload file         | Test import           |
| Browser context     | Nhiều user            |
| Permission          | Camera, location      |
| Cookie/localStorage | Auth/session          |
| WebSocket           | App realtime          |
| iFrame              | App có iframe         |
| Drag and drop       | UI phức tạp           |
| Keyboard shortcut   | Thao tác nhanh        |
| Clipboard           | Copy/paste            |

## Ví dụ download

```ts
const downloadPromise = page.waitForEvent("download");
await page.getByRole("button", { name: "Export" }).click();
const download = await downloadPromise;
```

---

# 24. Test design

Automation không phải chỉ biết code. Cần biết chọn case nào nên auto.

## Cần học

| Chủ đề             | Ý nghĩa                 |
| ------------------ | ----------------------- |
| Smoke test         | Case sống còn           |
| Regression test    | Test lại tính năng cũ   |
| E2E test           | Flow từ đầu tới cuối    |
| Negative test      | Test lỗi                |
| Boundary test      | Test biên               |
| Data-driven test   | Test nhiều bộ data      |
| Risk-based testing | Ưu tiên case rủi ro cao |

## Ví dụ với OMS

| Loại test  | Case                                     |
| ---------- | ---------------------------------------- |
| Smoke      | Login, tạo đơn, approve đơn              |
| Regression | Tạo đơn SPE/LAZ/TTS                      |
| Negative   | Thiếu warehouse, thiếu SKU               |
| E2E        | Tạo order -> shipment -> cancel          |
| API verify | Check status order/shipment sau thao tác |

---

# 25. Lộ trình theo giai đoạn

## Giai đoạn 1: Nền tảng

Mục tiêu: viết được test đơn giản.

### Học

1. TypeScript cơ bản
2. async/await
3. npm, Node.js
4. Playwright install
5. `test`, `expect`, `page`
6. locator cơ bản
7. assertion cơ bản
8. chạy test bằng terminal

### Bài tập

1. Mở trang login
2. Nhập username/password
3. Click login
4. Check vào dashboard
5. Check message lỗi khi login sai

---

## Giai đoạn 2: Viết test UI thực tế

Mục tiêu: auto được flow nghiệp vụ.

### Học

1. Form
2. Table
3. Modal
4. Toast
5. Search/filter
6. Pagination
7. Upload/download
8. Screenshot khi fail
9. Debug bằng UI mode

### Bài tập

1. Tạo customer
2. Search customer vừa tạo
3. Edit customer
4. Delete customer
5. Check toast success

---

## Giai đoạn 3: Framework structure

Mục tiêu: code sạch, maintain được.

### Học

1. Page Object Model
2. Helper function
3. Test data file
4. `.env`
5. Config theo môi trường
6. Custom fixture
7. Global setup login
8. Reuse auth state

### Structure tham khảo

```txt
tests/
  order.spec.ts
pages/
  LoginPage.ts
  OrderPage.ts
fixtures/
  test.ts
data/
  orderData.ts
utils/
  random.ts
playwright.config.ts
```

---

## Giai đoạn 4: API + UI

Mục tiêu: test nhanh và ổn định hơn.

### Học

1. API request trong Playwright
2. Tạo data bằng API
3. Verify data bằng API
4. Mock API
5. Wait response
6. Check request payload
7. Auth token

### Bài tập

1. Gọi API tạo order
2. Mở UI search order
3. Approve order trên UI
4. Gọi API verify status `Approved`

---

## Giai đoạn 5: CI/CD và report

Mục tiêu: đưa test vào pipeline.

### Học

1. GitHub Actions/GitLab CI
2. Headless browser
3. Retry trong CI
4. HTML report
5. JUnit report
6. Allure report
7. Upload artifact
8. Notify Slack/Telegram

### Bài tập

1. Push code lên Git
2. Tự chạy test khi pull request
3. Lưu report khi fail
4. Gửi thông báo kết quả

---

## Giai đoạn 6: Nâng cao

Mục tiêu: xử lý case khó trong dự án thật.

### Học

1. Parallel test
2. Flaky test handling
3. Multi-user scenario
4. Multi-tab
5. iFrame
6. WebSocket
7. Visual regression
8. Performance check cơ bản
9. Test data cleanup
10. Docker hóa test
11. Chạy test theo tag
12. Sharding test trên CI

---

# 26. Checklist kỹ năng đi làm

Khi apply job Automation Test Playwright + TypeScript, nên làm được các phần này:

| Kỹ năng           | Mức cần đạt |
| ----------------- | ----------- |
| Viết test UI      | Bắt buộc    |
| Locator tốt       | Bắt buộc    |
| Assertion tốt     | Bắt buộc    |
| Debug test fail   | Bắt buộc    |
| Page Object Model | Bắt buộc    |
| API testing       | Nên có      |
| CI/CD             | Nên có      |
| Report            | Nên có      |
| Fixture           | Nên có      |
| Mock API          | Trung cấp   |
| Visual testing    | Nâng cao    |
| Docker            | Nâng cao    |
| Parallel/sharding | Nâng cao    |

---

# 27. Mini project đưa vào CV

Nên làm một project automation nhỏ có đủ:

```txt
playwright-typescript-e2e/
  tests/
    login.spec.ts
    product.spec.ts
    order.spec.ts
  pages/
    LoginPage.ts
    ProductPage.ts
    OrderPage.ts
  data/
    users.ts
    orderData.ts
  utils/
    random.ts
  fixtures/
    test.ts
  playwright.config.ts
  README.md
```

## Nội dung test nên có

| Module   | Test case                   |
| -------- | --------------------------- |
| Login    | login success, login fail   |
| Product  | create/search/edit product  |
| Order    | create/search/approve order |
| API      | create order by API         |
| UI + API | verify order status         |
| Report   | HTML hoặc Allure            |
| CI       | GitHub Actions              |

## README nên ghi

```txt
Tech stack:
- Playwright
- TypeScript
- Page Object Model
- API Testing
- GitHub Actions
- HTML Report
```

---

# 28. Gợi ý học theo thời gian

## Nếu học nhanh trong 4 tuần

### Tuần 1

- TypeScript
- Playwright basic
- Cài môi trường
- Viết test login đơn giản

### Tuần 2

- Locator
- Assertion
- Form
- Table
- Modal
- Debug

### Tuần 3

- Page Object Model
- Test data
- Auth state
- API testing

### Tuần 4

- CI/CD
- Report
- Mock API
- Làm mini project

---

## Nếu học chắc trong 8 tuần

| Tuần   | Nội dung                |
| ------ | ----------------------- |
| Tuần 1 | TypeScript              |
| Tuần 2 | Playwright basic        |
| Tuần 3 | Locator/assertion       |
| Tuần 4 | UI flow thực tế         |
| Tuần 5 | Page Object Model       |
| Tuần 6 | API testing             |
| Tuần 7 | CI/CD + report          |
| Tuần 8 | Mini project hoàn chỉnh |

---

# Mục tiêu cuối cùng

Sau lộ trình này, cần đạt được level:

> Biết tự dựng framework Playwright + TypeScript từ đầu, viết test UI/API, quản lý test data, debug lỗi, chạy CI/CD, xuất report, và maintain test suite trong dự án thật.

Với hướng đi làm, phần quan trọng nhất không phải học quá nhiều syntax, mà là:

- Locator chắc
- Assertion đúng
- Test data sạch
- Debug nhanh
- Code dễ maintain
- Biết kết hợp API + UI để test ổn định
