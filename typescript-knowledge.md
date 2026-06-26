# TypeScript & Playwright Automation — Tổng Hợp Kiến Thức

> Lộ trình 4 tháng (16 tuần) dành cho QA Engineer học automation với TypeScript + Playwright

---

## Mục Lục

- [Phase 1 — TypeScript Cơ Bản (Tuần 1–4)](#phase-1--typescript-cơ-bản-tuần-14)
- [Phase 2 — Playwright + TypeScript (Tuần 5–8)](#phase-2--playwright--typescript-tuần-58)
- [Phase 3 — Nâng Cao & Production-Ready (Tuần 9–12)](#phase-3--nâng-cao--production-ready-tuần-912)
- [Phase 4 — Enterprise UI (Tuần 13–16)](#phase-4--enterprise-ui-tuần-1316)
- [Cheatsheet Nhanh](#cheatsheet-nhanh)

---

## Phase 1 — TypeScript Cơ Bản (Tuần 1–4)

**Mục tiêu:** Từ JavaScript foundation đến type-safe automation mindset

---

### Tuần 1 · Setup & Types

#### Khởi tạo dự án

```bash
npm init -y
npm install -D typescript ts-node @types/node
npx tsc --init
```

#### Primitive Types & Union Types

```typescript
// types.ts
type TestStatus = "passed" | "failed" | "blocked";

const tcId: string = "TC-001";
const retryCount: number = 2;
const isCritical: boolean = true;

function printSummary(id: string, status: TestStatus) {
  console.log(`${id} => ${status}`);
}
```

> **Tip:** Union type rất hợp cho `status`, `environment`, `browser name` hay `severity` — chặn ngay các giá trị sai từ compile time.

#### tsconfig Strict Mode

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "strict": true,
    "noImplicitAny": true,
    "noUncheckedIndexedAccess": true
  }
}
```

```json
// package.json scripts
{
  "scripts": {
    "typecheck": "tsc --noEmit",
    "test": "playwright test",
    "test:headed": "playwright test --headed"
  }
}
```

> **Cảnh báo:** Tắt `strict` = mất nửa giá trị TypeScript. Bug về API response, test data, helper function sẽ không được phát hiện đến runtime.

**Bài tập:**
- [ ] Setup dự án TypeScript đầu tiên, chạy file `.ts` bằng `ts-node`
- [ ] Mô hình hoá trạng thái test bằng union type
- [ ] Bật strict mode và sửa compile errors

---

### Tuần 2 · Functions & Objects

#### Interface & Object Types

```typescript
// models.ts
interface LoginUser {
  username: string;
  password: string;
  role?: "admin" | "standard"; // optional field
}

const users: LoginUser[] = [
  { username: "standard_user", password: "secret_sauce" },
  { username: "admin_user", password: "secret_sauce", role: "admin" },
];

function getAdminUsers(items: LoginUser[]) {
  return items.filter((user) => user.role === "admin");
}
```

**Các khái niệm:**
- `interface` — định nghĩa shape của object
- `?` — optional field (không bắt buộc)
- `readonly` — ngăn ghi đè sau khi khởi tạo
- `Array<T>` hoặc `T[]` — mảng có kiểu rõ ràng
- `map()`, `filter()` — thao tác array type-safe

**Bài tập:**
- [ ] Tạo interface cho test user, viết hàm lọc admin
- [ ] Dùng `map()` tạo summary list dạng `TC-001 - passed`

---

### Tuần 3 · Async & Modules

#### Async/Await & Promise

```typescript
// api.ts
export async function loadUsers() {
  const response = await fetch("https://reqres.in/api/users?page=1");
  const body = await response.json();
  return body.data;
}

export async function printFirstUser() {
  const users = await loadUsers();
  console.log(users[0]);
}
```

**Tại sao quan trọng:** Playwright dùng bất đồng bộ xuyên suốt. Hiểu `async/await` từ đầu giúp debug timing issue dễ hơn hẳn.

**Import/Export (ES Modules)**

```typescript
// utils/users.ts
export function filterActive(users: LoginUser[]) { ... }

// main.ts
import { filterActive } from "./utils/users";
```

**Bài tập:**
- [ ] Tách code sang utility module riêng, import vào file main
- [ ] Viết hàm async gọi public API và parse JSON

---

### Tuần 4 · Classes & DOM Thinking

#### Class Syntax & Encapsulation

```typescript
// page-object.ts
class LoginWidget {
  constructor(private rootSelector: string) {}

  getSubmitSelector() {
    return `${this.rootSelector} button[type="submit"]`;
  }
}

const loginWidget = new LoginWidget("#login-form");
console.log(loginWidget.getSubmitSelector());
// Output: #login-form button[type="submit"]
```

**Khái niệm cần nắm:**
- `constructor` — khởi tạo object
- `private` — ẩn property khỏi bên ngoài class
- `this` — tham chiếu đến instance hiện tại
- Method return type — khai báo rõ kiểu trả về

> **Mục đích:** Chuẩn bị tư duy cho Page Object Model ở Phase 3.

**Bài tập:**
- [ ] Viết class `LoginWidget` với method trả về selector
- [ ] Phân tích DOM của trang login, liệt kê 5 selector cần thiết

---

### Milestone Phase 1 — Mini Test Data Toolkit

> CLI nhỏ đọc test data JSON, validate kiểu dữ liệu, lọc status và in summary.

**Checklist:**
- [ ] Định nghĩa type cho test case và test suite
- [ ] Đọc JSON data và validate field bắt buộc
- [ ] Filter theo status, severity hoặc module
- [ ] In báo cáo summary ra terminal

---

## Phase 2 — Playwright + TypeScript (Tuần 5–8)

**Mục tiêu:** Từ cài đặt framework đến test flow typed, readable và dễ maintain

---

### Tuần 5 · Setup & Locators

#### Khởi tạo Playwright Project

```bash
npm init playwright@latest
npx playwright install
npx playwright test
```

#### Test đầu tiên

```typescript
// tests/login.spec.ts
import { test, expect } from "@playwright/test";

test("login page shows username field", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await expect(page.getByPlaceholder("Username")).toBeVisible();
});
```

#### Locator Priority (Thứ tự ưu tiên)

```typescript
// locator-priority.ts

// Ưu tiên 1: accessible role/name
page.getByRole("button", { name: "Login" });

// Ưu tiên 2: label / placeholder cho form field
page.getByLabel("Username");

// Ưu tiên 3: data-testid khi UI text hay thay đổi
page.getByTestId("checkout-submit");

// Chỉ fallback về CSS khi không còn lựa chọn tốt hơn
page.locator(".login-form button.submit");
```

> **Quy tắc:** Tránh XPath dài, selector theo vị trí `div:nth-child(3)`, hoặc text quá chung `"Save"` khi có nhiều nút cùng tên.

**Bài tập:**
- [ ] Scaffold Playwright project, đọc config và chạy sample test
- [ ] So sánh `getByRole`, `getByLabel`, CSS selector trên cùng một element
- [ ] Refactor 3 CSS selector sang locator tốt hơn
- [ ] Lập selector contract cho một form

---

### Tuần 6 · Actions & Assertions

#### Actions & Auto-waiting

```typescript
// tests/cart.spec.ts
test("add one item to cart", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await page.locator("#user-name").fill("standard_user");
  await page.locator("#password").fill("secret_sauce");
  await page.locator("#login-button").click();
  await page.getByRole("button", { name: "Add to cart" }).first().click();
  await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
});
```

**Các action phổ biến:**
| Action | Mô tả |
|--------|-------|
| `fill(text)` | Điền text vào input |
| `click()` | Click element |
| `selectOption(value)` | Chọn option trong select |
| `check()` / `uncheck()` | Checkbox |
| `hover()` | Hover chuột |
| `press("Enter")` | Nhấn phím |

**Assertions phổ biến:**
| Assertion | Mô tả |
|-----------|-------|
| `toBeVisible()` | Element hiện |
| `toHaveText(text)` | Có text đúng |
| `toHaveValue(val)` | Input có value |
| `toBeEnabled()` | Không bị disabled |
| `toHaveURL(url)` | URL đúng |
| `toContainText(text)` | Chứa text |

**Bài tập:**
- [ ] Viết test login success — assert URL và item count
- [ ] Viết test login fail — assert error banner đúng text

---

### Tuần 7 · Network & Route Mocking

#### Mock API Response

```typescript
// tests/network.spec.ts
test("mock products api", async ({ page }) => {
  await page.route("**/api/products", async (route) => {
    await route.fulfill({
      status: 200,
      body: JSON.stringify([{ id: 1, name: "Mock Product" }]),
    });
  });

  await page.goto("https://example.com/products");
  await expect(page.locator(".product-name")).toHaveText("Mock Product");
});
```

#### waitForResponse

```typescript
const responsePromise = page.waitForResponse("**/api/orders*");
await page.getByRole("button", { name: "Search" }).click();
const response = await responsePromise;
expect(response.status()).toBe(200);
```

**Bài tập:**
- [ ] Mock một API, assert UI hiển thị đúng trạng thái
- [ ] Bật trace để debug một test fail có chủ đích

---

### Tuần 8 · Playwright Test Runner Config

#### playwright.config.ts

```typescript
// playwright.config.ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    baseURL: "https://www.saucedemo.com",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  retries: 2,
  reporter: "html",
  projects: [
    { name: "chromium" },
    { name: "firefox" },
    { name: "webkit" },
  ],
});
```

**Các option quan trọng:**
| Option | Giá trị |
|--------|---------|
| `trace` | `"on"` / `"retain-on-failure"` / `"off"` |
| `screenshot` | `"on"` / `"only-on-failure"` / `"off"` |
| `retries` | Số lần retry khi fail |
| `timeout` | Timeout mặc định (ms) |
| `baseURL` | Base URL cho `page.goto("/path")` |

**Bài tập:**
- [ ] Bật HTML report và trace, mở report sau khi chạy
- [ ] Cấu hình Chromium và Firefox, chạy cùng spec trên cả hai

---

### Milestone Phase 2 — E-commerce Test Suite

**Checklist:**
- [ ] Scaffold project chuẩn với config, tests và test data
- [ ] Ít nhất 10 test chia thành smoke và regression
- [ ] Có trace, screenshot và HTML report
- [ ] Có ít nhất 1 test dùng route mocking hoặc network assertion

---

## Phase 3 — Nâng Cao & Production-Ready (Tuần 9–12)

**Mục tiêu:** POM typed, test data management, API-first setup và CI/CD

---

### Tuần 9 · Page Object Model

#### Typed Page Object

```typescript
// pages/LoginPage.ts
import { Page } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("/");
  }

  async login(username: string, password: string) {
    await this.page.locator("#user-name").fill(username);
    await this.page.locator("#password").fill(password);
    await this.page.locator("#login-button").click();
  }
}
```

#### Dùng trong test

```typescript
// tests/login.spec.ts
import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test("login success", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login("standard_user", "secret_sauce");
  await expect(page).toHaveURL(/inventory/);
});
```

#### Component Object (shared UI)

```typescript
// components/Header.ts
export class Header {
  constructor(private page: Page) {}

  get cartBadge() {
    return this.page.locator(".shopping_cart_badge");
  }

  async getCartCount() {
    return this.cartBadge.textContent();
  }
}
```

**Nguyên tắc POM:**
- Locators là `private` — chỉ method public ra ngoài
- Method tên theo business action, không phải technical action
- Shared component (header, nav, modal) tách ra riêng
- Method có thể return page object tiếp theo để chain

**Bài tập:**
- [ ] Refactor test sang class `LoginPage` và `InventoryPage`
- [ ] Tạo component object cho header/cart badge

---

### Tuần 10 · Reporting & Debugging

#### test.step — Structured Logging

```typescript
test("checkout flow", async ({ page }) => {
  await test.step("Login as standard user", async () => {
    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
  });

  await test.step("Add item to cart", async () => {
    await page.getByRole("button", { name: "Add to cart" }).first().click();
  });

  await test.step("Complete checkout", async () => {
    // ...checkout steps
  });
});
```

**Công cụ debug:**
- **HTML Report** — `npx playwright show-report`
- **Trace Viewer** — `npx playwright show-trace trace.zip`
- **UI Mode** — `npx playwright test --ui`
- **Headed Mode** — `npx playwright test --headed`

**Bài tập:**
- [ ] Bọc flow lớn bằng `test.step` có tên business-friendly
- [ ] Chạy trace viewer cho test fail, đọc timeline từng step

---

### Tuần 11 · API & CI/CD

#### API-first Auth Setup

```typescript
// auth.setup.ts
import { test as setup } from "@playwright/test";

setup("create auth state", async ({ request, page }) => {
  await request.post("/api/login", {
    data: { username: "standard_user", password: "secret_sauce" },
  });
  await page.context().storageState({ path: ".auth/user.json" });
});
```

#### Tái dùng auth state trong test

```typescript
// playwright.config.ts
{
  use: {
    storageState: ".auth/user.json",
  }
}
```

#### GitHub Actions Workflow

```yaml
# .github/workflows/playwright.yml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

**Bài tập:**
- [ ] Dùng API setup session, verify bằng UI
- [ ] Tạo GitHub Actions workflow với upload report artifact

---

### Tuần 12 · Best Practices

#### Cấu trúc project chuẩn

```
project/
├── tests/          ← spec files
├── pages/          ← page objects
├── components/     ← shared components
├── fixtures/       ← typed fixtures
├── test-data/      ← JSON / factory functions
├── utils/          ← helpers
└── playwright.config.ts
```

#### Typed Fixtures

```typescript
// fixtures/index.ts
import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

type Fixtures = {
  loginPage: LoginPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});
```

**Anti-patterns cần tránh:**

| Xấu | Tốt |
|-----|-----|
| `waitForTimeout(3000)` | `waitForResponse()` hoặc assertion |
| Hardcode selector dễ vỡ | `getByRole` hoặc `data-testid` |
| Test phụ thuộc nhau | Mỗi test tự setup data |
| Business logic trong spec | Đẩy vào page object / helper |

**Bài tập:**
- [ ] Audit 1 test flaky, liệt kê 3 cách làm deterministic hơn
- [ ] Tổ chức lại cấu trúc `pages/`, `fixtures/`, `test-data/`, `utils/`, `tests/`

---

### Milestone Phase 3 — Full TypeScript Automation Portfolio

**Checklist:**
- [ ] Page Objects và shared components rõ ownership
- [ ] Auth setup hoặc seeded data qua API
- [ ] Report, trace và artifact trên CI
- [ ] README giải thích setup, run và debug suite

---

## Phase 4 — Enterprise UI (Tuần 13–16)

**Mục tiêu:** Thực chiến với Angular, Ant Design, Material và DOM động trong app doanh nghiệp

---

### Tuần 13 · Angular DOM Reality

#### Generated DOM — Nhận diện và tránh

```typescript
// angular-locator.ts

// Selector bám generated DOM — KHÔNG nên dùng
page.locator(".ng-star-inserted .mat-mdc-select-trigger");
page.locator("#mat-input-4");
page.locator(".cdk-overlay-pane .mat-option");

// Bám vào semantic container ổn định — NÊN dùng
const panel = page.locator("[data-testid='user-search-panel']");
await panel.getByLabel("Department").click();
await page.getByRole("option", { name: "Finance" }).click();
```

**Dấu hiệu selector không ổn:**
- IDs dạng `mat-input-N` (số tăng tự động)
- Classes `ng-star-inserted`, `ng-tns-c123-4`
- `cdk-overlay-*` không có accessible name

**Bài tập:**
- [ ] Liệt kê 5 selector không nên dùng trên Angular app thật
- [ ] Tìm semantic container ổn định cho một business section

---

### Tuần 14 · AntD & Material Controls

#### Search Select (AntD)

```typescript
// enterprise-select.spec.ts

// AntD SearchSelect
await page.getByLabel("Assignee").click();
await page.locator(".ant-select-selection-search input").fill("linh");
await page.getByRole("option", { name: "Linh Nguyen" }).click();

// Simple Select
await page.getByLabel("Status").click();
await page.getByRole("option", { name: "Approved" }).click();
```

#### Angular Material Select

```typescript
// Material Select với overlay
await page.getByLabel("Department").click();
// Chờ overlay render ra DOM
await page.waitForSelector(".cdk-overlay-container .mat-option");
await page.getByRole("option", { name: "Finance" }).click();
```

**Hiểu lifecycle của AntD/Material control:**
1. Click trigger → overlay xuất hiện (portal render)
2. Search/scroll trong overlay list
3. Click option → overlay đóng
4. Assert value trên trigger element

**Bài tập:**
- [ ] Viết test mở search select, nhập keyword, chọn option, verify value
- [ ] Handle date picker hoặc confirm dialog

---

### Tuần 15 · Enterprise Tables, Overlay, Virtual Scroll

#### Business Key Assertion (không theo vị trí)

```typescript
// table-search.spec.ts

// Chờ network response trước khi assert
const responsePromise = page.waitForResponse("**/api/orders*");
await page.getByRole("button", { name: "Search" }).click();
await responsePromise;

// Assert theo business key — không theo row index
const table = page.locator("[data-testid='orders-table']");
await expect(table).toContainText("ORD-10025");
```

#### Patterns cho enterprise table:

```typescript
// Filter + sort
await page.getByRole("columnheader", { name: "Date" }).click();
const responsePromise = page.waitForResponse("**/api/orders*");
await responsePromise; // chờ server-side sort xong

// Tìm row theo business key
const row = page.locator("tr", { hasText: "ORD-10025" });
await expect(row.locator("td.status")).toHaveText("Completed");
```

**Bài tập:**
- [ ] Assert table theo mã record thay vì row index
- [ ] Handle virtual scroll — scroll container để row mục tiêu render ra DOM

---

### Tuần 16 · Debugging & Dev Contract

#### Khi nào cần push back cho dev

```typescript
// Ví dụ testability request

// Vấn đề: không có accessible name, selector không bền
page.locator(".mat-mdc-select-trigger").nth(2); // fragile

// Yêu cầu dev: thêm data-testid hoặc aria-label
page.locator("[data-testid='department-select']"); // stable
```

**4 góc phân tích test flaky:**
1. **Selector** — bám generated id/class, thay đổi sau build
2. **Timing** — overlay chưa render, API chưa xong, animation chưa hết
3. **Data** — test data chia sẻ, state còn từ test trước
4. **Source contract** — loading state không rõ, accessible name thiếu

**Khi nào nên yêu cầu dev:**
- Selector bắt buộc bám vào generated id/class
- Overlay không có accessible name
- Loading state biến mất quá sớm so với data thật
- Control không testable theo locator tốt nào

**Bài tập:**
- [ ] Viết testability request cho 1 control khó: cần hook gì, label gì, loading state gì
- [ ] Mổ xẻ 1 test flaky theo 4 góc: selector, timing, data, source contract

---

### Milestone Phase 4 — Enterprise UI Challenge

**Checklist:**
- [ ] Viết selector contract cho màn enterprise đã chọn
- [ ] Automate ít nhất 1 AntD/Material control phức tạp
- [ ] Assert table/filter bằng business key và network-aware waits
- [ ] Đề xuất ít nhất 3 test hooks hoặc source improvements cho dev

---

## Cheatsheet Nhanh

### TypeScript Fundamentals

```typescript
// Types
type Status = "passed" | "failed" | "blocked"; // union
interface User { name: string; role?: "admin" | "user" } // interface
const users: User[] = []; // typed array

// Async
async function fetchData(): Promise<User[]> {
  const res = await fetch("/api/users");
  return res.json();
}

// Class
class LoginPage {
  constructor(private page: Page) {}
  async login(user: string, pass: string) { ... }
}
```

### Playwright Quick Reference

```typescript
// Locators (theo thứ tự ưu tiên)
page.getByRole("button", { name: "Submit" })
page.getByLabel("Email")
page.getByPlaceholder("Enter email")
page.getByTestId("submit-btn")
page.locator(".css-class")          // fallback

// Actions
await locator.click()
await locator.fill("text")
await locator.selectOption("value")
await locator.check()

// Assertions
await expect(locator).toBeVisible()
await expect(locator).toHaveText("text")
await expect(locator).toHaveValue("value")
await expect(page).toHaveURL(/pattern/)

// Network
await page.route("**/api/**", route => route.fulfill({ body: "{}" }))
const res = page.waitForResponse("**/api/users")

// Debug
await page.pause()                  // interactive debugger
test.step("step name", async () => { ... })
```

### Project Structure

```
project/
├── playwright.config.ts
├── tests/
│   ├── login.spec.ts
│   └── checkout.spec.ts
├── pages/
│   ├── LoginPage.ts
│   └── InventoryPage.ts
├── components/
│   └── Header.ts
├── fixtures/
│   └── index.ts
├── test-data/
│   └── users.json
└── utils/
    └── helpers.ts
```

### Anti-pattern vs Best Practice

| Anti-pattern | Best Practice |
|---|---|
| `waitForTimeout(3000)` | `waitForResponse()` / assertion wait |
| `page.locator(".ng-star-inserted")` | `getByRole()` / `data-testid` |
| Test phụ thuộc thứ tự | Mỗi test tự setup / teardown |
| Raw selector trong spec | Page Object với typed method |
| Assert theo row index | Assert theo business key |
| Skip strict mode | Bật `strict: true` trong tsconfig |

---

*Nguồn: Curriculum học TypeScript Automation — 16 tuần*
