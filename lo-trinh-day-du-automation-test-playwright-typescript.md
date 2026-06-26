# Lộ trình học Automation Test với Playwright + TypeScript

> Mục tiêu: học từ nền tảng TypeScript đến Playwright nâng cao để có thể đi làm QA Automation, tự dựng framework, viết test UI/API, debug, chạy CI/CD, xuất report và maintain test suite trong dự án thật.

---

## Mục lục

1. [Tư duy học Automation Test để đi làm](#1-tư-duy-học-automation-test-để-đi-làm)
2. [TypeScript nền tảng cần học trước Playwright](#2-typescript-nền-tảng-cần-học-trước-playwright)
3. [Bài tập TypeScript trước khi học Playwright](#3-bài-tập-typescript-trước-khi-học-playwright)
4. [Cài đặt môi trường](#4-cài-đặt-môi-trường)
5. [Playwright cơ bản](#5-playwright-cơ-bản)
6. [Locator trong Playwright](#6-locator-trong-playwright)
7. [Assertion trong Playwright](#7-assertion-trong-playwright)
8. [Làm việc với form, table, modal, toast](#8-làm-việc-với-form-table-modal-toast)
9. [Test structure](#9-test-structure)
10. [Page Object Model](#10-page-object-model)
11. [Authentication và login state](#11-authentication-và-login-state)
12. [Test data management](#12-test-data-management)
13. [API testing bằng Playwright](#13-api-testing-bằng-playwright)
14. [Kết hợp UI + API](#14-kết-hợp-ui--api)
15. [Network, mock API, intercept request](#15-network-mock-api-intercept-request)
16. [Debug Playwright](#16-debug-playwright)
17. [Config Playwright](#17-config-playwright)
18. [Fixture trong Playwright](#18-fixture-trong-playwright)
19. [Chạy test theo môi trường](#19-chạy-test-theo-môi-trường)
20. [CI/CD](#20-cicd)
21. [Report](#21-report)
22. [Parallel, retry, flaky test](#22-parallel-retry-flaky-test)
23. [Visual testing](#23-visual-testing)
24. [Mobile và responsive testing](#24-mobile-và-responsive-testing)
25. [Advanced Playwright](#25-advanced-playwright)
26. [Test design cho Automation Tester](#26-test-design-cho-automation-tester)
27. [Lộ trình học theo giai đoạn](#27-lộ-trình-học-theo-giai-đoạn)
28. [Checklist kỹ năng đi làm](#28-checklist-kỹ-năng-đi-làm)
29. [Mini project đưa vào CV](#29-mini-project-đưa-vào-cv)
30. [Kế hoạch học 4 tuần và 8 tuần](#30-kế-hoạch-học-4-tuần-và-8-tuần)
31. [Tài liệu nên đọc](#31-tài-liệu-nên-đọc)
32. [Coding convention cho automation project](#32-coding-convention-cho-automation-project)
33. [Workflow viết một automation test case](#33-workflow-viết-một-automation-test-case)
34. [Tag test và chia test suite](#34-tag-test-và-chia-test-suite)
35. [Bài tập thực chiến theo cấp độ](#35-bài-tập-thực-chiến-theo-cấp-độ)
36. [Lỗi người mới hay gặp và cách sửa](#36-lỗi-người-mới-hay-gặp-và-cách-sửa)
37. [Checklist chuẩn bị phỏng vấn](#37-checklist-chuẩn-bị-phỏng-vấn)

---

# 1. Tư duy học Automation Test để đi làm

Automation Test không chỉ là biết viết code click button. Để đi làm được, cần kết hợp 4 nhóm kỹ năng:

| Nhóm kỹ năng    | Nội dung                                                                                  |
| --------------- | ----------------------------------------------------------------------------------------- |
| Testing mindset | Biết chọn case nào nên auto, biết thiết kế test case, biết phân loại smoke/regression/e2e |
| TypeScript      | Biết đọc/viết code, hiểu object, array, function, async/await, class                      |
| Playwright      | Biết viết UI test, API test, debug, mock, fixture, report                                 |
| Framework/CI    | Biết tổ chức project, chạy theo môi trường, chạy trên CI/CD, xuất report                  |

Mục tiêu cuối cùng:

```txt
Biết tự dựng framework Playwright + TypeScript từ đầu,
viết test UI/API,
quản lý test data,
debug lỗi,
chạy CI/CD,
xuất report,
và maintain test suite trong dự án thật.
```

---

# 2. TypeScript nền tảng cần học trước Playwright

Trước khi học Playwright, nên học TypeScript ở mức đủ dùng cho Automation Test. Không cần học sâu như backend developer, nhưng phải chắc các phần bên dưới.

---

## 2.1 Biến: `let`, `const`

### Cần hiểu

- `const`: dùng khi giá trị không gán lại.
- `let`: dùng khi biến có thể thay đổi.
- Hạn chế dùng `var`.

### Ví dụ

```ts
const username = "admin";
let retryCount = 0;

retryCount = retryCount + 1;
```

### Ứng dụng trong Automation

```ts
const orderCode = `AUTO_${Date.now()}`;
let currentStatus = "New";
```

---

## 2.2 Kiểu dữ liệu cơ bản

### Cần học

| Kiểu        | Ví dụ                                |
| ----------- | ------------------------------------ |
| `string`    | `'admin'`                            |
| `number`    | `100`                                |
| `boolean`   | `true`, `false`                      |
| `null`      | không có giá trị                     |
| `undefined` | chưa được gán                        |
| `any`       | kiểu nào cũng được, nên hạn chế dùng |
| `unknown`   | an toàn hơn `any` khi chưa biết kiểu |

### Ví dụ

```ts
const username: string = "admin";
const quantity: number = 10;
const isActive: boolean = true;
```

### Ứng dụng trong Automation

```ts
const warehouseCode: string = "W103";
const totalItem: number = 5;
const isApproved: boolean = false;
```

---

## 2.3 Array

### Cần học

- Khai báo array.
- Lặp qua array.
- Dùng `map`, `filter`, `find`, `some`, `every`.
- Array object.

### Ví dụ cơ bản

```ts
const skus: string[] = ["SKU001", "SKU002", "SKU003"];

for (const sku of skus) {
  console.log(sku);
}
```

### Array object

```ts
type Product = {
  sku: string;
  name: string;
  price: number;
};

const products: Product[] = [
  { sku: "SKU001", name: "iPhone 15", price: 20000000 },
  { sku: "SKU002", name: "Samsung S24", price: 18000000 },
];
```

### Các hàm hay dùng

```ts
const product = products.find((item) => item.sku === "SKU001");

const expensiveProducts = products.filter((item) => item.price > 19000000);

const productNames = products.map((item) => item.name);
```

### Ứng dụng trong Automation

- Danh sách item trong order.
- Danh sách shipment item.
- Danh sách serial.
- Danh sách test data.
- Danh sách response từ API.

---

## 2.4 Object

### Cần học

- Object literal.
- Nested object.
- Lấy field từ object.
- Optional field.
- Destructuring.

### Ví dụ

```ts
const order = {
  orderCode: "ORDER001",
  customerCode: "C001",
  warehouseCode: "W103",
};

console.log(order.orderCode);
```

### Nested object

```ts
const shipment = {
  shipmentCode: "S001",
  address: {
    province: "Hồ Chí Minh",
    district: "Quận 1",
  },
};

console.log(shipment.address.province);
```

### Destructuring

```ts
const { orderCode, warehouseCode } = order;

console.log(orderCode);
console.log(warehouseCode);
```

### Ứng dụng trong Automation

Hầu hết request body API, response API, test data đều là object.

---

## 2.5 Type và Interface

### Cần học

- `type`
- `interface`
- Khi nào dùng type/interface
- Tạo kiểu cho test data
- Tạo kiểu cho API body

### Ví dụ dùng `type`

```ts
type LoginUser = {
  username: string;
  password: string;
};
```

### Ví dụ dùng `interface`

```ts
interface Product {
  sku: string;
  name: string;
  price: number;
}
```

### Ứng dụng trong Automation

```ts
type CreateOrderPayload = {
  customerCode: string;
  warehouseCode: string;
  items: {
    sku: string;
    quantity: number;
  }[];
};
```

Khi viết test API, type giúp tránh truyền sai field.

---

## 2.6 Optional field

### Cần hiểu

Dấu `?` nghĩa là field đó có thể có hoặc không.

### Ví dụ

```ts
type Customer = {
  name: string;
  phone: string;
  email?: string;
};
```

Dùng được:

```ts
const customer1: Customer = {
  name: "Nguyen Van A",
  phone: "0909000000",
};

const customer2: Customer = {
  name: "Nguyen Van B",
  phone: "0909000001",
  email: "b@example.com",
};
```

### Ứng dụng trong Automation

Nhiều payload có field optional như:

```ts
type Address = {
  address1: string;
  address2?: string;
  postCode?: string;
};
```

---

## 2.7 Union type

### Cần hiểu

Union type cho phép một biến nhận một trong nhiều kiểu hoặc nhiều giá trị cố định.

### Ví dụ

```ts
type OrderStatus = "New" | "Approved" | "Cancelled";

const status: OrderStatus = "Approved";
```

### Ứng dụng trong Automation

```ts
type ActualResult = "PASS" | "FAILED" | "UPDATE";

type WarehouseCode = "W103" | "W104" | "W105";
```

Dùng union type giúp code chặt hơn, hạn chế nhập sai status.

---

## 2.8 Function

### Cần học

- Function thường.
- Arrow function.
- Parameter type.
- Return type.
- Function async.
- Helper function.

### Ví dụ

```ts
function sum(a: number, b: number): number {
  return a + b;
}
```

Arrow function:

```ts
const generateOrderCode = (): string => {
  return `AUTO_${Date.now()}`;
};
```

### Ứng dụng trong Automation

```ts
function generateSku(prefix: string): string {
  return `${prefix}_${Date.now()}`;
}

const sku = generateSku("SKU");
```

---

## 2.9 Async/Await và Promise

Đây là phần bắt buộc phải chắc vì Playwright dùng async/await gần như mọi chỗ.

### Cần hiểu

- `async` function luôn trả về Promise.
- `await` dùng để đợi một thao tác bất đồng bộ hoàn tất.
- Không quên `await` khi dùng Playwright action.

### Ví dụ

```ts
async function openPage() {
  await page.goto("https://example.com");
}
```

### Ví dụ sai thường gặp

```ts
page.getByRole("button", { name: "Save" }).click();
```

Thiếu `await`.

### Nên viết

```ts
await page.getByRole("button", { name: "Save" }).click();
```

---

## 2.10 Try/Catch

### Cần học

- Bắt lỗi khi gọi API.
- Bắt lỗi khi đọc file.
- Log lỗi rõ ràng.

### Ví dụ

```ts
try {
  const response = await request.get("/api/orders");
  expect(response.status()).toBe(200);
} catch (error) {
  console.error("Call API failed:", error);
  throw error;
}
```

---

## 2.11 Import / Export

Khi làm framework, bắt buộc phải chia file.

### Export

```ts
export const adminUser = {
  username: "admin",
  password: "123456",
};
```

### Import

```ts
import { adminUser } from "../data/users";
```

### Ứng dụng trong project

```txt
pages/LoginPage.ts
data/users.ts
utils/random.ts
tests/login.spec.ts
```

---

## 2.12 Class trong TypeScript

Class rất quan trọng vì Page Object Model thường dùng class.

### Cần học

- `class`
- `constructor`
- property
- method
- access modifier: `private`, `public`

### Ví dụ cơ bản

```ts
class User {
  constructor(
    public username: string,
    public password: string,
  ) {}

  printUsername() {
    console.log(this.username);
  }
}
```

### Ứng dụng trong Playwright

```ts
import { Page } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("/login");
  }
}
```

---

## 2.13 Generic cơ bản

Generic không cần học quá sâu lúc đầu, nhưng nên biết để đọc code framework.

### Ví dụ

```ts
function getFirstItem<T>(items: T[]): T {
  return items[0];
}

const firstSku = getFirstItem<string>(["SKU001", "SKU002"]);
```

### Ứng dụng

- Custom fixture.
- Helper dùng lại.
- API response type.

---

## 2.14 Type narrowing

### Cần hiểu

Type narrowing là kiểm tra kiểu trước khi xử lý.

### Ví dụ

```ts
function printValue(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else {
    console.log(value.toFixed(2));
  }
}
```

### Ứng dụng

Khi API trả dữ liệu có thể khác kiểu hoặc field optional.

---

## 2.15 Những phần TypeScript chưa cần học sâu lúc đầu

Có thể để sau:

- Decorator.
- Advanced generic.
- Utility type nâng cao.
- Type guard phức tạp.
- Namespace.
- Module resolution nâng cao.

---

# 3. Bài tập TypeScript trước khi học Playwright

Trước khi qua Playwright, nên làm được các bài tập này.

---

## Bài 1: Tạo type cho Product

```ts
type Product = {
  sku: string;
  name: string;
  price: number;
  status: "ACTIVE" | "INACTIVE";
};

const products: Product[] = [
  {
    sku: "SKU001",
    name: "iPhone 15",
    price: 20000000,
    status: "ACTIVE",
  },
  {
    sku: "SKU002",
    name: "Samsung S24",
    price: 18000000,
    status: "INACTIVE",
  },
];

function findProductBySku(sku: string): Product | undefined {
  return products.find((product) => product.sku === sku);
}
```

Mục tiêu:

- Biết dùng type.
- Biết dùng array object.
- Biết dùng `find`.
- Biết return `Product | undefined`.

---

## Bài 2: Tạo order payload

```ts
type OrderItem = {
  sku: string;
  quantity: number;
  price: number;
};

type CreateOrderPayload = {
  customerCode: string;
  warehouseCode: "W103" | "W104" | "W105";
  items: OrderItem[];
};

const orderPayload: CreateOrderPayload = {
  customerCode: "C001",
  warehouseCode: "W103",
  items: [
    {
      sku: "SKU001",
      quantity: 2,
      price: 100000,
    },
  ],
};
```

Mục tiêu:

- Biết nested object.
- Biết array trong object.
- Biết union type cho warehouse.

---

## Bài 3: Tính tổng tiền order

```ts
function calculateTotal(items: OrderItem[]): number {
  return items.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);
}

const total = calculateTotal(orderPayload.items);
console.log(total);
```

Mục tiêu:

- Biết function.
- Biết array reduce.
- Biết tính toán từ test data.

---

## Bài 4: Generate mã tự động

```ts
function generateCode(prefix: string): string {
  return `${prefix}_${Date.now()}`;
}

const orderCode = generateCode("ORDER");
const skuCode = generateCode("SKU");

console.log(orderCode);
console.log(skuCode);
```

Mục tiêu:

- Biết viết helper.
- Biết tạo test data động.
- Tránh trùng data khi chạy test.

---

## Bài 5: Async function giả lập gọi API

```ts
type ApiResponse = {
  status: number;
  message: string;
};

async function fakeCreateOrder(): Promise<ApiResponse> {
  return {
    status: 200,
    message: "success",
  };
}

async function main() {
  const response = await fakeCreateOrder();

  if (response.status === 200) {
    console.log("Create order success");
  }
}

main();
```

Mục tiêu:

- Biết async/await.
- Biết Promise.
- Biết xử lý response.

---

# 4. Cài đặt môi trường

## 4.1 Công cụ cần cài

| Công cụ       | Mục đích              |
| ------------- | --------------------- |
| Node.js       | Chạy Playwright, npm  |
| VS Code       | Code editor           |
| Git           | Quản lý source code   |
| Playwright    | Automation framework  |
| Chrome/Edge   | Browser test          |
| GitHub/GitLab | Lưu source và chạy CI |

---

## 4.2 Khởi tạo project Playwright

```bash
npm init playwright@latest
```

Gợi ý chọn:

```txt
Language: TypeScript
Test folder: tests
Add GitHub Actions: có thể chọn Yes nếu muốn
Install browsers: Yes
```

---

## 4.3 Các lệnh cơ bản

```bash
npx playwright test
npx playwright test --headed
npx playwright test --ui
npx playwright test tests/login.spec.ts
npx playwright show-report
```

---

## 4.4 Cấu trúc project ban đầu

```txt
playwright-project/
  tests/
    example.spec.ts
  playwright.config.ts
  package.json
  package-lock.json
```

---

# 5. Playwright cơ bản

## 5.1 Những thành phần chính

| Thành phần | Ý nghĩa                  |
| ---------- | ------------------------ |
| `test`     | Khai báo test case       |
| `expect`   | Assertion                |
| `page`     | Đại diện cho tab browser |
| `locator`  | Tìm element              |
| `browser`  | Browser instance         |
| `context`  | Browser context/session  |
| `request`  | API request context      |

---

## 5.2 Test đầu tiên

```ts
import { test, expect } from "@playwright/test";

test("open home page", async ({ page }) => {
  await page.goto("https://example.com");

  await expect(page).toHaveTitle(/Example/);
});
```

---

## 5.3 Test login cơ bản

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

## 5.4 Những action thường dùng

| Action         | Ví dụ                                      |
| -------------- | ------------------------------------------ |
| Mở trang       | `await page.goto('/login')`                |
| Click          | `await locator.click()`                    |
| Nhập text      | `await locator.fill('text')`               |
| Chọn dropdown  | `await locator.selectOption('value')`      |
| Check checkbox | `await locator.check()`                    |
| Upload file    | `await locator.setInputFiles('file.xlsx')` |
| Hover          | `await locator.hover()`                    |
| Press keyboard | `await locator.press('Enter')`             |

---

# 6. Locator trong Playwright

Locator là phần cực kỳ quan trọng. Locator tốt giúp test ổn định. Locator tệ làm test flaky.

---

## 6.1 Thứ tự ưu tiên locator

Nên ưu tiên:

1. `getByRole`
2. `getByLabel`
3. `getByPlaceholder`
4. `getByText`
5. `getByTestId`
6. CSS locator
7. XPath, chỉ dùng khi không còn cách nào khác

---

## 6.2 Ví dụ locator

```ts
await page.getByRole("button", { name: "Save" }).click();

await page.getByLabel("Username").fill("admin");

await page.getByPlaceholder("Search order").fill("ORDER001");

await page.getByText("Create successfully").click();

await page.getByTestId("submit-button").click();
```

---

## 6.3 Locator theo table row

```ts
const row = page.locator("tr").filter({ hasText: "ORDER001" });

await expect(row).toContainText("Approved");
await row.getByRole("button", { name: "Detail" }).click();
```

---

## 6.4 Chaining locator

```ts
await page
  .locator(".product-row")
  .filter({ hasText: "SKU001" })
  .getByRole("button", { name: "Edit" })
  .click();
```

---

## 6.5 Tránh dùng wait cứng

Không nên:

```ts
await page.waitForTimeout(3000);
```

Nên dùng:

```ts
await expect(page.getByText("Success")).toBeVisible();
```

Hoặc:

```ts
await page.waitForResponse(
  (response) =>
    response.url().includes("/api/orders") && response.status() === 200,
);
```

---

# 7. Assertion trong Playwright

Assertion giúp xác nhận kết quả thực tế đúng với kết quả mong đợi.

---

## 7.1 Assertion thường dùng

| Assertion           | Dùng khi              |
| ------------------- | --------------------- |
| `toBeVisible()`     | Element xuất hiện     |
| `toBeHidden()`      | Element biến mất      |
| `toHaveText()`      | Text đúng tuyệt đối   |
| `toContainText()`   | Text có chứa nội dung |
| `toHaveValue()`     | Input có value        |
| `toHaveURL()`       | URL đúng              |
| `toHaveCount()`     | Số lượng element đúng |
| `toBeEnabled()`     | Button enable         |
| `toBeDisabled()`    | Button disable        |
| `toBeChecked()`     | Checkbox được check   |
| `toHaveAttribute()` | Attribute đúng        |

---

## 7.2 Ví dụ

```ts
await expect(page.getByText("Order created successfully")).toBeVisible();

await expect(page.locator(".order-row")).toHaveCount(10);

await expect(page.getByLabel("Customer name")).toHaveValue("Nguyen Van A");

await expect(page.getByRole("button", { name: "Submit" })).toBeEnabled();
```

---

# 8. Làm việc với form, table, modal, toast

Đây là nhóm case đi làm gặp liên tục.

---

## 8.1 Form

```ts
await page.getByLabel("Customer name").fill("Nguyen Van A");
await page.getByLabel("Phone").fill("0909000000");
await page.getByRole("button", { name: "Submit" }).click();
```

---

## 8.2 Dropdown

```ts
await page.getByLabel("Warehouse").selectOption("W103");
```

Nếu là custom dropdown:

```ts
await page.getByRole("combobox", { name: "Warehouse" }).click();
await page.getByRole("option", { name: "W103" }).click();
```

---

## 8.3 Checkbox

```ts
await page.getByLabel("Agree terms").check();

await expect(page.getByLabel("Agree terms")).toBeChecked();
```

---

## 8.4 Table

```ts
const row = page.locator("tr").filter({ hasText: "ORDER001" });

await expect(row).toContainText("Approved");
await row.getByRole("button", { name: "Detail" }).click();
```

---

## 8.5 Modal

```ts
const modal = page.getByRole("dialog");

await expect(modal).toBeVisible();
await modal.getByRole("button", { name: "Confirm" }).click();
```

---

## 8.6 Toast message

```ts
await expect(page.getByText("Saved successfully")).toBeVisible();
```

---

# 9. Test structure

## 9.1 Cần học

| Chủ đề              | Ý nghĩa                         |
| ------------------- | ------------------------------- |
| `test.describe()`   | Gom nhóm test                   |
| `test.beforeEach()` | Chạy trước mỗi test             |
| `test.afterEach()`  | Chạy sau mỗi test               |
| `test.only()`       | Chỉ chạy test đang debug        |
| `test.skip()`       | Bỏ qua test                     |
| Tag test            | Phân loại test smoke/regression |
| Test data           | Tách data ra file riêng         |

---

## 9.2 Ví dụ structure trong file test

```ts
import { test, expect } from "@playwright/test";

test.describe("Order Management", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });

  test("create order successfully", async ({ page }) => {
    // test steps
  });

  test("search order successfully", async ({ page }) => {
    // test steps
  });
});
```

---

## 9.3 Đặt tên test case

Nên đặt tên rõ nghiệp vụ:

```ts
test("should create order successfully when data is valid", async ({
  page,
}) => {
  // steps
});
```

Không nên đặt quá chung:

```ts
test("test 1", async ({ page }) => {
  // steps
});
```

---

# 10. Page Object Model

Page Object Model giúp gom selector và action của một page vào một class riêng, giúp test dễ đọc và dễ maintain.

---

## 10.1 Cấu trúc cơ bản

```txt
pages/
  LoginPage.ts
  OrderPage.ts
tests/
  login.spec.ts
  order.spec.ts
```

---

## 10.2 Ví dụ LoginPage

```ts
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

---

## 10.3 Dùng Page Object trong test

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

## 10.4 Quy tắc viết Page Object

Nên:

- Mỗi page một class.
- Tên method theo nghiệp vụ: `login`, `createOrder`, `searchOrder`.
- Không để test data cố định trong Page Object.
- Không assert quá nhiều trong Page Object nếu muốn giữ layer rõ ràng.
- Có thể có method `expect...` nếu team thống nhất.

---

# 11. Authentication và login state

Đi làm không nên login lại ở từng test nếu không cần. Nên học cách lưu session.

---

## 11.1 Cần học

| Chủ đề          | Mục tiêu                   |
| --------------- | -------------------------- |
| `storageState`  | Lưu session login          |
| global setup    | Login một lần trước test   |
| multi-user auth | Admin, seller, staff       |
| token/cookie    | Hiểu cơ bản auth hoạt động |

---

## 11.2 Ý tưởng

```ts
// global setup login xong lưu auth.json
storageState: "auth/admin.json";
```

Sau đó test dùng lại session.

---

## 11.3 Khi nào không nên reuse login state?

Không nên reuse nếu test cần kiểm tra:

- Login fail.
- Logout.
- Session expired.
- Permission thay đổi theo user.
- Role-specific access.

---

# 12. Test data management

Test data rất quan trọng với các hệ thống như OMS, WMS, ecommerce.

---

## 12.1 Các loại test data

| Loại              | Ví dụ                    |
| ----------------- | ------------------------ |
| Static data       | user test cố định        |
| Dynamic data      | order code random        |
| JSON/TS data file | đọc data từ file         |
| Faker data        | tạo tên, email, phone    |
| Seed data         | chuẩn bị data trước test |
| Cleanup data      | xóa data sau test        |

---

## 12.2 Tạo data động

```ts
const orderCode = `AUTO_${Date.now()}`;
```

```ts
function generateCode(prefix: string): string {
  return `${prefix}_${Date.now()}`;
}
```

---

## 12.3 Tách test data ra file riêng

```ts
// data/users.ts
export const adminUser = {
  username: "admin",
  password: "123456",
};
```

```ts
// tests/login.spec.ts
import { adminUser } from "../data/users";
```

---

## 12.4 Lưu ý khi chạy parallel

Không nên dùng data cố định cho test tạo mới:

```ts
const orderCode = "ORDER_TEST";
```

Nên dùng data unique:

```ts
const orderCode = `ORDER_${Date.now()}`;
```

---

# 13. API testing bằng Playwright

Playwright không chỉ test UI, nó còn test API được.

---

## 13.1 Cần học

| Chủ đề               | Mục tiêu                |
| -------------------- | ----------------------- |
| `request.get()`      | Gọi GET API             |
| `request.post()`     | Gọi POST API            |
| Header auth          | Bearer token            |
| Validate response    | status, body            |
| Create data bằng API | setup trước khi test UI |
| Check API sau UI     | verify kết quả          |

---

## 13.2 Ví dụ GET API

```ts
import { test, expect } from "@playwright/test";

test("get orders", async ({ request }) => {
  const response = await request.get("/api/orders");

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.message).toBe("success");
});
```

---

## 13.3 Ví dụ POST API

```ts
import { test, expect } from "@playwright/test";

test("create order by API", async ({ request }) => {
  const response = await request.post("/api/orders", {
    data: {
      customerCode: "C001",
      warehouseCode: "W103",
      items: [
        {
          sku: "SKU001",
          quantity: 1,
        },
      ],
    },
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.message).toBe("success");
});
```

---

# 14. Kết hợp UI + API

Đây là level rất cần khi đi làm, vì giúp test nhanh hơn và ổn định hơn.

---

## 14.1 Ví dụ flow thực tế

| Step                     | Làm bằng    |
| ------------------------ | ----------- |
| Tạo đơn hàng             | API         |
| Mở OMS UI                | UI          |
| Search đơn hàng          | UI          |
| Approve đơn              | UI          |
| Check status sau approve | API hoặc DB |
| Verify shipment sinh ra  | API hoặc DB |

---

## 14.2 Ví dụ flow

```ts
test("approve order successfully", async ({ page, request }) => {
  const createResponse = await request.post("/api/orders", {
    data: {
      customerCode: "C001",
      warehouseCode: "W103",
    },
  });

  const createBody = await createResponse.json();
  const orderCode = createBody.data.orderCode;

  await page.goto("/orders");
  await page.getByPlaceholder("Search order").fill(orderCode);
  await page.getByRole("button", { name: "Search" }).click();

  const row = page.locator("tr").filter({ hasText: orderCode });
  await row.getByRole("button", { name: "Approve" }).click();

  const detailResponse = await request.get(`/api/orders/${orderCode}`);
  const detailBody = await detailResponse.json();

  expect(detailBody.data.status).toBe("Approved");
});
```

---

# 15. Network, mock API, intercept request

Cần học khi muốn kiểm soát API response hoặc verify FE gửi request đúng.

---

## 15.1 Cần học

| Chủ đề                   | Dùng để                 |
| ------------------------ | ----------------------- |
| `page.route()`           | Mock response           |
| `page.waitForResponse()` | Đợi API trả về          |
| Check request payload    | Verify FE gửi đúng data |
| Mock error               | Test case API lỗi       |
| Block image/css          | Tối ưu test             |

---

## 15.2 Mock API response

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

## 15.3 Wait for response

```ts
const responsePromise = page.waitForResponse(
  (response) =>
    response.url().includes("/api/orders") && response.status() === 200,
);

await page.getByRole("button", { name: "Search" }).click();

const response = await responsePromise;
const body = await response.json();

expect(body.message).toBe("success");
```

---

# 16. Debug Playwright

Test fail là chuyện rất bình thường. Kỹ năng debug quyết định năng suất đi làm.

---

## 16.1 Công cụ debug

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

---

## 16.2 Lệnh hay dùng

```bash
npx playwright test --headed
npx playwright test --debug
npx playwright test --ui
npx playwright show-trace trace.zip
npx playwright show-report
```

---

## 16.3 Debug bằng pause

```ts
await page.pause();
```

---

## 16.4 Lỗi thường gặp

| Lỗi                   | Nguyên nhân thường gặp                        |
| --------------------- | --------------------------------------------- |
| Timeout               | Locator sai, element chưa xuất hiện, API chậm |
| Strict mode violation | Locator match nhiều element                   |
| Element not visible   | Element bị ẩn hoặc chưa render                |
| Test flaky            | Wait sai, data trùng, phụ thuộc test khác     |
| Auth fail             | Session hết hạn, token sai, env sai           |

---

# 17. Config Playwright

File quan trọng:

```txt
playwright.config.ts
```

---

## 17.1 Các config cần biết

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

---

## 17.2 Ví dụ config

```ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  retries: 1,
  workers: 2,
  reporter: [["list"], ["html"]],
  use: {
    baseURL: "https://staging.example.com",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
});
```

---

# 18. Fixture trong Playwright

Fixture giúp tái sử dụng setup, page object, API client, test data.

---

## 18.1 Khi nào cần custom fixture?

Khi project bắt đầu có nhiều test và lặp lại:

```ts
const loginPage = new LoginPage(page);
const orderPage = new OrderPage(page);
```

Có thể đưa vào fixture.

---

## 18.2 Ví dụ custom fixture

```ts
import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

type MyFixtures = {
  loginPage: LoginPage;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

export { expect } from "@playwright/test";
```

Dùng trong test:

```ts
import { test, expect } from "../fixtures/test";

test("login success", async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login("admin", "123456");
});
```

---

# 19. Chạy test theo môi trường

Dự án thật thường có nhiều môi trường.

---

## 19.1 Các môi trường thường gặp

| Env        | Ví dụ              |
| ---------- | ------------------ |
| local      | dev máy cá nhân    |
| dev        | môi trường dev     |
| staging    | test trước release |
| production | smoke test nhẹ     |

---

## 19.2 Dùng `.env`

```txt
BASE_URL=https://staging.example.com
ADMIN_USERNAME=admin
ADMIN_PASSWORD=123456
```

---

## 19.3 Đọc env trong code

```ts
const username = process.env.ADMIN_USERNAME;
const password = process.env.ADMIN_PASSWORD;
```

---

## 19.4 Lưu ý bảo mật

Không nên commit:

```txt
.env
auth/*.json
password thật
token thật
```

Nên thêm vào `.gitignore`:

```txt
.env
auth/
test-results/
playwright-report/
```

---

# 20. CI/CD

CI/CD giúp test tự chạy khi push code, tạo pull request hoặc deploy.

---

## 20.1 Công cụ nên biết

| Công cụ               | Nên biết         |
| --------------------- | ---------------- |
| GitHub Actions        | Phổ biến         |
| GitLab CI             | Công ty hay dùng |
| Jenkins               | Enterprise       |
| Docker                | Chạy ổn định     |
| JUnit report          | Tích hợp report  |
| Slack/Telegram notify | Báo kết quả      |

---

## 20.2 Ví dụ trigger

| Trigger        | Test            |
| -------------- | --------------- |
| Pull request   | Chạy smoke test |
| Merge main     | Chạy regression |
| Deploy staging | Chạy E2E        |
| Hằng ngày      | Chạy full suite |

---

## 20.3 Ví dụ GitHub Actions đơn giản

```yaml
name: Playwright Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Run Playwright tests
        run: npx playwright test

      - name: Upload Playwright report
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

---

# 21. Report

Report rất quan trọng vì lead/dev/PM cần xem test fail ở đâu.

---

## 21.1 Các loại report

| Report           | Dùng để      |
| ---------------- | ------------ |
| HTML report      | Xem local    |
| JUnit XML        | CI đọc       |
| Allure report    | Report đẹp   |
| Trace report     | Debug fail   |
| Screenshot/video | Evidence bug |

---

## 21.2 HTML report

```bash
npx playwright show-report
```

---

## 21.3 Reporter config

```ts
reporter: [
  ['list'],
  ['html'],
  ['junit', { outputFile: 'results.xml' }],
],
```

---

# 22. Parallel, retry, flaky test

Từ trung cấp trở lên phải học phần này.

---

## 22.1 Cần hiểu

| Chủ đề              | Ý nghĩa                       |
| ------------------- | ----------------------------- |
| Parallel test       | Chạy nhiều test cùng lúc      |
| Worker              | Số luồng chạy                 |
| Retry               | Chạy lại khi fail             |
| Flaky test          | Test lúc pass lúc fail        |
| Isolation           | Test không phụ thuộc nhau     |
| Test data collision | Trùng data khi chạy song song |

---

## 22.2 Tránh data collision

Không nên:

```ts
const orderCode = "ORDER_TEST";
```

Nên:

```ts
const orderCode = `ORDER_${Date.now()}`;
```

Hoặc:

```ts
const orderCode = `ORDER_${test.info().workerIndex}_${Date.now()}`;
```

---

## 22.3 Nguyên tắc chống flaky

- Không dùng `waitForTimeout` nếu không cần.
- Locator phải unique.
- Test không phụ thuộc thứ tự chạy.
- Data tạo mới nên unique.
- Cleanup data sau test nếu cần.
- Chờ theo trạng thái thật của UI/API.

---

# 23. Visual testing

Nên học sau khi đã vững UI test.

---

## 23.1 Cần học

| Chủ đề                | Dùng để                    |
| --------------------- | -------------------------- |
| Screenshot comparison | So sánh giao diện          |
| Visual regression     | Phát hiện lệch UI          |
| Mask dynamic element  | Che ngày giờ, số tiền động |
| Threshold             | Cho phép sai lệch nhỏ      |

---

## 23.2 Ví dụ

```ts
await expect(page).toHaveScreenshot("dashboard.png");
```

---

# 24. Mobile và responsive testing

---

## 24.1 Cần học

| Chủ đề                          |
| ------------------------------- |
| viewport                        |
| device emulation                |
| mobile browser                  |
| responsive layout               |
| touch action                    |
| test trên Chrome mobile giả lập |

---

## 24.2 Ví dụ viewport

```ts
test.use({
  viewport: { width: 390, height: 844 },
});
```

---

## 24.3 Ví dụ device

```ts
import { devices } from "@playwright/test";

const iPhone = devices["iPhone 13"];
```

---

# 25. Advanced Playwright

Khi đã ổn, học tiếp các phần nâng cao.

---

## 25.1 Các chủ đề nâng cao

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

---

## 25.2 Download file

```ts
const downloadPromise = page.waitForEvent("download");

await page.getByRole("button", { name: "Export" }).click();

const download = await downloadPromise;
await download.saveAs("downloads/export.xlsx");
```

---

## 25.3 Upload file

```ts
await page.getByLabel("Upload file").setInputFiles("fixtures/import.xlsx");
```

---

## 25.4 Multi-tab

```ts
const pagePromise = context.waitForEvent("page");

await page.getByRole("link", { name: "Open detail" }).click();

const newPage = await pagePromise;
await newPage.waitForLoadState();
```

---

## 25.5 iFrame

```ts
const frame = page.frameLocator('iframe[name="payment"]');

await frame.getByLabel("Card number").fill("4111111111111111");
```

---

# 26. Test design cho Automation Tester

Automation không phải chỉ biết code. Cần biết chọn case nào nên auto.

---

## 26.1 Các loại test cần biết

| Loại test          | Ý nghĩa                   |
| ------------------ | ------------------------- |
| Smoke test         | Case sống còn, chạy nhanh |
| Regression test    | Test lại tính năng cũ     |
| E2E test           | Flow từ đầu tới cuối      |
| Negative test      | Test lỗi                  |
| Boundary test      | Test biên                 |
| Data-driven test   | Test nhiều bộ data        |
| Risk-based testing | Ưu tiên case rủi ro cao   |

---

## 26.2 Case nào nên automation?

Nên auto:

- Case chạy lặp lại nhiều lần.
- Case quan trọng, rủi ro cao.
- Case ổn định về UI/data.
- Case regression.
- Case smoke sau deploy.
- Case verify API/data rõ ràng.

Không nên auto ngay:

- UI thay đổi liên tục.
- Case chỉ chạy một lần.
- Case quá phụ thuộc captcha/OTP/manual.
- Case chưa rõ expected result.
- Case data quá khó chuẩn bị.

---

## 26.3 Ví dụ với OMS/WMS/Ecommerce

| Loại test   | Case                                          |
| ----------- | --------------------------------------------- |
| Smoke       | Login, tạo đơn, approve đơn                   |
| Regression  | Tạo đơn SPE/LAZ/TTS                           |
| Negative    | Thiếu warehouse, thiếu SKU                    |
| E2E         | Tạo order -> shipment -> cancel               |
| API verify  | Check status order/shipment sau thao tác      |
| Permission  | User không có quyền thì không thấy button     |
| Data-driven | Tạo order theo nhiều warehouse W103/W104/W105 |

---

# 27. Lộ trình học theo giai đoạn

---

## Giai đoạn 1: TypeScript nền tảng

Mục tiêu: đọc hiểu code Playwright và viết được helper/test data.

### Học

1. `let`, `const`
2. string, number, boolean
3. array, object
4. function
5. type/interface
6. optional field
7. union type
8. async/await
9. import/export
10. class cơ bản

### Bài tập

1. Tạo type Product.
2. Tạo type Order.
3. Viết function generate order code.
4. Viết function tính tổng tiền order.
5. Viết async function giả lập gọi API.

---

## Giai đoạn 2: Playwright basic

Mục tiêu: viết được test UI đơn giản.

### Học

1. Cài Playwright.
2. `test`, `expect`, `page`.
3. `goto`, `click`, `fill`.
4. Locator cơ bản.
5. Assertion cơ bản.
6. Chạy test bằng terminal.

### Bài tập

1. Mở trang login.
2. Nhập username/password.
3. Click login.
4. Check vào dashboard.
5. Check message lỗi khi login sai.

---

## Giai đoạn 3: UI automation thực tế

Mục tiêu: auto được các flow nghiệp vụ cơ bản.

### Học

1. Form.
2. Table.
3. Modal.
4. Toast.
5. Search/filter.
6. Pagination.
7. Upload/download.
8. Screenshot khi fail.
9. Debug bằng UI mode.

### Bài tập

1. Tạo customer.
2. Search customer vừa tạo.
3. Edit customer.
4. Delete customer.
5. Check toast success.

---

## Giai đoạn 4: Framework structure

Mục tiêu: code sạch, maintain được.

### Học

1. Page Object Model.
2. Helper function.
3. Test data file.
4. `.env`.
5. Config theo môi trường.
6. Custom fixture.
7. Global setup login.
8. Reuse auth state.

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

## Giai đoạn 5: API + UI

Mục tiêu: test nhanh và ổn định hơn.

### Học

1. API request trong Playwright.
2. Tạo data bằng API.
3. Verify data bằng API.
4. Mock API.
5. Wait response.
6. Check request payload.
7. Auth token.

### Bài tập

1. Gọi API tạo order.
2. Mở UI search order.
3. Approve order trên UI.
4. Gọi API verify status `Approved`.

---

## Giai đoạn 6: CI/CD và report

Mục tiêu: đưa test vào pipeline.

### Học

1. GitHub Actions/GitLab CI.
2. Headless browser.
3. Retry trong CI.
4. HTML report.
5. JUnit report.
6. Allure report.
7. Upload artifact.
8. Notify Slack/Telegram.

### Bài tập

1. Push code lên Git.
2. Tự chạy test khi pull request.
3. Lưu report khi fail.
4. Gửi thông báo kết quả.

---

## Giai đoạn 7: Nâng cao

Mục tiêu: xử lý case khó trong dự án thật.

### Học

1. Parallel test.
2. Flaky test handling.
3. Multi-user scenario.
4. Multi-tab.
5. iFrame.
6. WebSocket.
7. Visual regression.
8. Performance check cơ bản.
9. Test data cleanup.
10. Docker hóa test.
11. Chạy test theo tag.
12. Sharding test trên CI.

---

# 28. Checklist kỹ năng đi làm

Khi apply job Automation Test Playwright + TypeScript, nên làm được các phần này.

| Kỹ năng                | Mức cần đạt |
| ---------------------- | ----------- |
| TypeScript cơ bản      | Bắt buộc    |
| Async/Await            | Bắt buộc    |
| Class và import/export | Bắt buộc    |
| Viết test UI           | Bắt buộc    |
| Locator tốt            | Bắt buộc    |
| Assertion tốt          | Bắt buộc    |
| Debug test fail        | Bắt buộc    |
| Page Object Model      | Bắt buộc    |
| Test data management   | Bắt buộc    |
| API testing            | Nên có      |
| UI + API flow          | Nên có      |
| CI/CD                  | Nên có      |
| Report                 | Nên có      |
| Fixture                | Nên có      |
| Mock API               | Trung cấp   |
| Visual testing         | Nâng cao    |
| Docker                 | Nâng cao    |
| Parallel/sharding      | Nâng cao    |

---

# 29. Mini project đưa vào CV

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
  auth/
    admin.json
  playwright.config.ts
  README.md
  .github/
    workflows/
      playwright.yml
```

---

## 29.1 Nội dung test nên có

| Module   | Test case                   |
| -------- | --------------------------- |
| Login    | login success, login fail   |
| Product  | create/search/edit product  |
| Order    | create/search/approve order |
| API      | create order by API         |
| UI + API | verify order status         |
| Upload   | import file                 |
| Download | export file                 |
| Report   | HTML hoặc Allure            |
| CI       | GitHub Actions              |

---

## 29.2 README nên ghi

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

## 29.3 Điểm cộng khi đưa vào CV

Nên có:

- Screenshot report.
- CI badge nếu có.
- README hướng dẫn chạy test.
- Có `.env.example`.
- Có Page Object Model.
- Có API setup data.
- Có test chạy theo tag smoke/regression.

---

# 30. Kế hoạch học 4 tuần và 8 tuần

---

## 30.1 Nếu học nhanh trong 4 tuần

### Tuần 1: TypeScript + Playwright basic

- TypeScript cơ bản.
- async/await.
- Cài Playwright.
- Viết test login đơn giản.
- Locator cơ bản.
- Assertion cơ bản.

### Tuần 2: UI automation thực tế

- Form.
- Table.
- Modal.
- Toast.
- Search/filter.
- Upload/download.
- Debug bằng UI mode.
- Trace viewer.

### Tuần 3: Framework structure + API

- Page Object Model.
- Test data.
- Auth state.
- API testing.
- UI + API flow.
- Mock API cơ bản.

### Tuần 4: CI/CD + mini project

- GitHub Actions.
- Report.
- Retry.
- Screenshot/video.
- Hoàn thiện mini project.
- Viết README.

---

## 30.2 Nếu học chắc trong 8 tuần

| Tuần   | Nội dung                                                     |
| ------ | ------------------------------------------------------------ |
| Tuần 1 | TypeScript cơ bản                                            |
| Tuần 2 | TypeScript cho Automation: object, array, type, async, class |
| Tuần 3 | Playwright basic                                             |
| Tuần 4 | Locator, assertion, form, table, modal                       |
| Tuần 5 | Page Object Model, test data, auth state                     |
| Tuần 6 | API testing, UI + API, mock API                              |
| Tuần 7 | CI/CD, report, debug, flaky test                             |
| Tuần 8 | Mini project hoàn chỉnh                                      |

---

# 31. Tài liệu nên đọc

## TypeScript

- TypeScript Handbook.
- TypeScript for JavaScript Programmers.
- Everyday Types.
- Object Types.
- Classes.
- Generics cơ bản.

## Playwright

- Playwright Getting Started.
- Playwright Locators.
- Playwright Assertions.
- Playwright Best Practices.
- Page Object Models.
- Authentication.
- API Testing.
- Test Fixtures.
- Trace Viewer.
- CI/CD.

---

# 32. Coding convention cho automation project

Khi đi làm, code automation không chỉ cần chạy được mà còn phải dễ đọc, dễ sửa và dễ review.

---

## 32.1 Nguyên tắc đặt tên

| Thành phần     | Quy ước                          | Ví dụ                                 |
| -------------- | -------------------------------- | ------------------------------------- |
| File test      | `*.spec.ts`                      | `order-creation.spec.ts`              |
| Page object    | PascalCase                       | `OrderPage.ts`, `LoginPage.ts`        |
| Helper         | camelCase                        | `generateOrderCode`, `formatCurrency` |
| Test data file | camelCase hoặc kebab-case        | `orderData.ts`, `test-users.ts`       |
| Constant       | UPPER_SNAKE_CASE nếu dùng global | `DEFAULT_TIMEOUT`, `ADMIN_USER`       |
| Test title     | Nêu rõ hành vi mong đợi          | `should create order successfully`    |

---

## 32.2 Quy tắc viết test title

Nên viết test title theo công thức:

```txt
should + expected behavior + when + condition
```

Ví dụ:

```ts
test("should show validation message when customer name is empty", async ({
  page,
}) => {
  // test steps
});
```

Không nên viết quá chung:

```ts
test("test order", async ({ page }) => {
  // khó biết đang test gì
});
```

---

## 32.3 Quy tắc trong file test

Một test nên đọc được theo luồng:

```txt
Arrange -> Act -> Assert
```

Ví dụ:

```ts
test("should approve order successfully", async ({ page, request }) => {
  const orderCode = await createOrderByApi(request);

  await orderPage.goto();
  await orderPage.search(orderCode);
  await orderPage.approve(orderCode);

  await expect(orderPage.getStatus(orderCode)).toHaveText("Approved");
});
```

Nên giữ file test tập trung vào nghiệp vụ, không nhồi quá nhiều selector hoặc logic xử lý UI phức tạp trong file test.

---

## 32.4 Quy tắc trong Page Object

Page Object nên chứa:

- Locator của page.
- Action trên page.
- Helper nhỏ để lấy trạng thái UI.

Page Object không nên chứa:

- Assertion quá nghiệp vụ nếu assertion đó chỉ dùng riêng cho một test.
- Test data cố định.
- Logic gọi API phức tạp.
- Flow liên quan nhiều page nếu có thể tách thành service/helper.

Ví dụ tốt:

```ts
export class OrderPage {
  constructor(private page: Page) {}

  readonly searchInput = this.page.getByPlaceholder("Search order");

  async search(orderCode: string) {
    await this.searchInput.fill(orderCode);
    await this.page.getByRole("button", { name: "Search" }).click();
  }

  getOrderRow(orderCode: string) {
    return this.page.locator("tr").filter({ hasText: orderCode });
  }
}
```

---

## 32.5 Format code nên có

Nên dùng:

- ESLint để bắt lỗi code.
- Prettier để format code.
- TypeScript strict nếu team đủ vững.
- `.env.example` để người khác biết cần env nào.
- `README.md` hướng dẫn setup và chạy test.

---

# 33. Workflow viết một automation test case

Một automation test case tốt thường không bắt đầu bằng code ngay. Nên đi theo workflow này.

---

## 33.1 Bước 1: Hiểu nghiệp vụ

Trước khi viết test, cần trả lời:

- User đang làm hành động gì?
- Điều kiện đầu vào là gì?
- Expected result là gì?
- Case này là smoke, regression, negative hay E2E?
- Data có thể tạo tự động không?
- Có thể verify bằng API hoặc database không?

---

## 33.2 Bước 2: Chọn strategy

| Câu hỏi                         | Gợi ý                                |
| ------------------------------- | ------------------------------------ |
| Data tạo qua UI quá lâu?        | Tạo bằng API                         |
| UI chỉ cần verify kết quả cuối? | Setup bằng API, assert bằng UI/API   |
| Case dễ flaky?                  | Chờ theo response/trạng thái thật    |
| Case cần chạy smoke hằng ngày?  | Giữ ngắn, ít phụ thuộc, data độc lập |
| Case cần test validation?       | Có thể dùng data-driven test         |

---

## 33.3 Bước 3: Viết test skeleton

Trước khi code chi tiết, nên viết khung:

```ts
test("should create order successfully", async ({ page, request }) => {
  // Arrange: prepare customer, product, warehouse
  // Act: create order on UI
  // Assert: verify order status and order detail
});
```

Khung này giúp không bị lạc khi flow dài.

---

## 33.4 Bước 4: Chạy local và debug

Nên chạy theo thứ tự:

```bash
npx playwright test tests/order.spec.ts --headed
npx playwright test tests/order.spec.ts --debug
npx playwright test tests/order.spec.ts
```

Sau khi pass local, kiểm tra thêm:

- Chạy lại ít nhất 3 lần.
- Chạy headless.
- Chạy cùng file khác nếu có data chung.
- Xem trace nếu test fail.

---

## 33.5 Bước 5: Review trước khi commit

Checklist nhanh:

- Test title rõ ràng.
- Locator ổn định.
- Không dùng `waitForTimeout` tùy tiện.
- Data không bị trùng khi chạy parallel.
- Assertion kiểm tra đúng expected result.
- Không commit `.env`, token, auth state thật.
- Test fail thì message dễ hiểu.

---

# 34. Tag test và chia test suite

Khi test suite lớn dần, cần tag để chạy đúng nhóm test.

---

## 34.1 Tag thường dùng

| Tag           | Ý nghĩa                                |
| ------------- | -------------------------------------- |
| `@smoke`      | Case quan trọng, chạy nhanh sau deploy |
| `@regression` | Case kiểm tra lại chức năng cũ         |
| `@e2e`        | Flow dài từ đầu tới cuối               |
| `@api`        | Test API                               |
| `@ui`         | Test UI                                |
| `@negative`   | Case lỗi/validation                    |
| `@slow`       | Case chạy lâu                          |

---

## 34.2 Ví dụ đặt tag

```ts
test("should login successfully @smoke @ui", async ({ page }) => {
  await loginPage.goto();
  await loginPage.login("admin", "123456");

  await expect(page).toHaveURL(/dashboard/);
});
```

---

## 34.3 Chạy test theo tag

```bash
npx playwright test --grep @smoke
npx playwright test --grep @regression
npx playwright test --grep-invert @slow
```

---

## 34.4 Gợi ý chia suite trong dự án thật

| Suite             | Khi chạy                  | Nội dung                         |
| ----------------- | ------------------------- | -------------------------------- |
| Smoke             | Sau deploy, trước release | Login, tạo đơn, approve, search  |
| Regression        | Trước release lớn         | Các flow chính và negative cases |
| Nightly           | Hằng đêm                  | Full suite                       |
| API               | Khi backend thay đổi      | Contract/status/payload          |
| Production smoke  | Sau deploy production     | Case nhẹ, không tạo data nguy cơ |
| Pull request test | Khi dev mở pull request   | Smoke hoặc impacted tests        |

---

# 35. Bài tập thực chiến theo cấp độ

Phần này dùng để tự luyện như một project thật.

---

## 35.1 Level 1: Basic UI

Mục tiêu: biết thao tác UI và assertion cơ bản.

1. Login thành công.
2. Login sai password.
3. Search một item có sẵn.
4. Check validation khi bỏ trống required field.
5. Check button disabled khi form chưa hợp lệ.

---

## 35.2 Level 2: CRUD flow

Mục tiêu: biết test flow nghiệp vụ cơ bản.

1. Tạo customer mới.
2. Search customer vừa tạo.
3. Edit thông tin customer.
4. Delete hoặc deactivate customer.
5. Verify customer không còn active.

Yêu cầu:

- Data phải unique.
- Có Page Object.
- Có assertion cho toast và data trong table.

---

## 35.3 Level 3: API setup + UI verify

Mục tiêu: biết kết hợp API và UI.

1. Tạo product bằng API.
2. Tạo order bằng UI với product đó.
3. Verify order detail bằng UI.
4. Gọi API verify status/order items.
5. Cleanup data nếu hệ thống hỗ trợ.

---

## 35.4 Level 4: Framework mini project

Mục tiêu: dựng project giống môi trường đi làm.

Project cần có:

- `pages/`
- `fixtures/`
- `data/`
- `utils/`
- `.env.example`
- `README.md`
- GitHub Actions hoặc GitLab CI.
- HTML report.
- Tag `@smoke`, `@regression`.

---

## 35.5 Level 5: Case khó

Mục tiêu: xử lý vấn đề thường gặp trong dự án thật.

1. Test upload file.
2. Test download file và verify tên file.
3. Test multi-tab.
4. Test iframe.
5. Mock API response lỗi.
6. Chạy parallel không bị trùng data.
7. Debug một flaky test và ghi lại nguyên nhân.

---

# 36. Lỗi người mới hay gặp và cách sửa

---

## 36.1 Quên `await`

Sai:

```ts
page.getByRole("button", { name: "Save" }).click();
```

Đúng:

```ts
await page.getByRole("button", { name: "Save" }).click();
```

Nếu quên `await`, test có thể chạy tiếp khi action chưa hoàn tất.

---

## 36.2 Locator match nhiều element

Lỗi thường gặp:

```txt
strict mode violation
```

Cách xử lý:

```ts
const row = page.locator("tr").filter({ hasText: "ORDER001" });
await row.getByRole("button", { name: "Detail" }).click();
```

Không nên sửa bằng `.first()` nếu chưa hiểu vì sao match nhiều element.

---

## 36.3 Assertion quá yếu

Yếu:

```ts
await expect(page.getByText("Success")).toBeVisible();
```

Tốt hơn:

```ts
await expect(page.getByText("Order created successfully")).toBeVisible();
await expect(orderPage.getOrderRow(orderCode)).toContainText(orderCode);
```

Toast success chỉ nói thao tác có vẻ thành công, chưa chắc data đã đúng.

---

## 36.4 Test phụ thuộc thứ tự chạy

Không nên:

```txt
Test 1 tạo order
Test 2 approve order từ Test 1
Test 3 cancel order từ Test 2
```

Nên:

- Mỗi test tự chuẩn bị data cần thiết.
- Nếu cần flow dài, gom vào một test E2E có mục tiêu rõ ràng.
- Dùng API setup data để test độc lập hơn.

---

## 36.5 Data bị trùng khi chạy parallel

Sai:

```ts
const customerCode = "CUSTOMER_AUTO";
```

Đúng:

```ts
const customerCode = `CUSTOMER_${test.info().workerIndex}_${Date.now()}`;
```

---

## 36.6 Lạm dụng `waitForTimeout`

Không nên:

```ts
await page.waitForTimeout(5000);
```

Nên:

```ts
await expect(page.getByText("Created successfully")).toBeVisible();
```

Hoặc:

```ts
await page.waitForResponse(
  (response) =>
    response.url().includes("/api/orders") && response.status() === 200,
);
```

---

# 37. Checklist chuẩn bị phỏng vấn

Trước khi apply Automation Tester dùng Playwright + TypeScript, nên tự trả lời được các câu này.

---

## 37.1 TypeScript

- Khác nhau giữa `let`, `const`, `var`.
- `type` và `interface` dùng thế nào.
- Vì sao hạn chế dùng `any`.
- `async/await` hoạt động ra sao.
- Promise là gì.
- Optional field và union type dùng khi nào.
- Class/constructor dùng thế nào trong Page Object.

---

## 37.2 Playwright

- Locator nào nên ưu tiên.
- Vì sao không nên dùng XPath quá nhiều.
- Auto-waiting trong Playwright là gì.
- Khác nhau giữa `page`, `context`, `browser`.
- Khi nào dùng `storageState`.
- Khi nào dùng fixture.
- Cách debug test fail bằng trace.
- Cách viết API test bằng Playwright.

---

## 37.3 Framework

- Vì sao dùng Page Object Model.
- Cách tổ chức folder automation project.
- Cách quản lý test data.
- Cách chạy test theo môi trường.
- Cách tránh flaky test.
- Cách chạy parallel mà không collision data.
- Cách setup CI/CD.
- Cách xuất report cho team xem.

---

## 37.4 Câu hỏi tình huống

| Câu hỏi phỏng vấn                         | Ý nên trả lời                                      |
| ----------------------------------------- | -------------------------------------------------- |
| Test lúc pass lúc fail thì xử lý sao?     | Xem trace, locator, wait, data, network, isolation |
| Case nào không nên automation?            | Case ít chạy, UI đổi liên tục, chưa rõ expected    |
| Làm sao giảm thời gian chạy regression?   | Parallel, tag, API setup, chia suite, sharding     |
| Làm sao test ổn định hơn?                 | Locator tốt, data độc lập, wait theo trạng thái    |
| Vì sao kết hợp UI và API?                 | Setup nhanh, verify sâu hơn, giảm thao tác UI      |
| Làm gì khi môi trường test không ổn định? | Retry hợp lý, log rõ, tách lỗi env và lỗi product  |

---

# Tổng kết

Thứ tự học nên là:

```txt
TypeScript basic
-> async/await
-> class/import/export
-> Playwright basic
-> locator/assertion
-> UI flow thực tế
-> Page Object Model
-> test data
-> auth state
-> API testing
-> UI + API
-> fixture
-> config môi trường
-> CI/CD
-> report
-> mock API
-> parallel/flaky
-> Docker/visual testing
```

Với hướng đi làm, phần quan trọng nhất là:

- TypeScript đủ chắc để đọc và viết framework.
- Locator tốt.
- Assertion đúng.
- Test data sạch.
- Debug nhanh.
- Code dễ maintain.
- Biết kết hợp API + UI để test ổn định.
- Biết chạy test trên CI/CD và xuất report.
