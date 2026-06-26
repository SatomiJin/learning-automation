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

> Mục tiêu phần này: không học TypeScript kiểu “lý thuyết suông”, mà học đủ để **đọc hiểu code Playwright**, **viết test data**, **viết helper**, **viết Page Object Model**, **gọi API**, và **debug lỗi type** trong dự án thật.

## Cách học phần TypeScript cho Automation

Nên học theo công thức này cho mỗi chủ đề:

```txt
1. Hiểu khái niệm
2. Viết ví dụ nhỏ
3. Áp dụng vào case automation
4. Tự làm bài tập
5. Biết lỗi thường gặp
```

Không cần học TypeScript quá sâu như backend developer ngay từ đầu. Nhưng các phần dưới đây phải chắc, vì khi vào Playwright sẽ dùng liên tục.

---

## 2.1 Biến: `let`, `const`

### Lý thuyết cần hiểu

Trong TypeScript/JavaScript, biến dùng để lưu dữ liệu tạm thời trong lúc chạy code.

Có 2 cách khai báo chính nên dùng:

| Từ khóa | Khi nào dùng                                              |
| ------- | --------------------------------------------------------- |
| `const` | Dùng khi biến không cần gán lại giá trị                   |
| `let`   | Dùng khi biến có thể thay đổi trong quá trình chạy        |
| `var`   | Hạn chế dùng, gần như không cần trong automation hiện đại |

### Ví dụ cơ bản

```ts
const username = "admin";
const password = "123456";

let retryCount = 0;
retryCount = retryCount + 1;
```

`username` và `password` không đổi nên dùng `const`.

`retryCount` có thể tăng lên nên dùng `let`.

### Ứng dụng trong Automation Test

```ts
const orderCode = `AUTO_ORDER_${Date.now()}`;
let orderStatus = "New";

orderStatus = "Approved";
```

Trong test thực tế:

- `const` dùng cho data cố định trong test: username, password, base URL, warehouse code.
- `let` dùng cho trạng thái thay đổi: status, counter, temporary result.

### Lỗi thường gặp

Sai:

```ts
const status = "New";
status = "Approved";
```

Vì `const` không cho gán lại.

Đúng:

```ts
let status = "New";
status = "Approved";
```

### Hướng dẫn tự luyện

Tạo file:

```txt
practice/variables.ts
```

Viết:

```ts
const warehouseCode = "W103";
let quantity = 1;

quantity = quantity + 2;

console.log(warehouseCode);
console.log(quantity);
```

Chạy bằng:

```bash
npx ts-node practice/variables.ts
```

Nếu chưa có `ts-node`:

```bash
npm install -D ts-node typescript
```

---

## 2.2 Kiểu dữ liệu cơ bản

### Lý thuyết cần hiểu

TypeScript giúp mình khai báo kiểu dữ liệu cho biến. Khi type rõ ràng, code ít sai hơn và editor gợi ý tốt hơn.

| Kiểu        | Ý nghĩa                           | Ví dụ                      |
| ----------- | --------------------------------- | -------------------------- |
| `string`    | Chuỗi chữ                         | `'admin'`, `'W103'`        |
| `number`    | Số                                | `1`, `100000`              |
| `boolean`   | Đúng/sai                          | `true`, `false`            |
| `null`      | Cố ý không có giá trị             | `null`                     |
| `undefined` | Chưa có giá trị                   | `undefined`                |
| `any`       | Kiểu nào cũng được                | Hạn chế dùng               |
| `unknown`   | Chưa biết kiểu, an toàn hơn `any` | Dùng khi nhận data chưa rõ |

### Ví dụ cơ bản

```ts
const username: string = "admin";
const quantity: number = 10;
const isActive: boolean = true;
```

TypeScript sẽ báo lỗi nếu gán sai kiểu:

```ts
const quantity: number = "10";
```

Sai vì `'10'` là string, không phải number.

### Ứng dụng trong Automation Test

```ts
const warehouseCode: string = "W103";
const totalItem: number = 5;
const isApproved: boolean = false;
```

Trong automation, các kiểu này xuất hiện ở:

- Request body API.
- Response API.
- Test data.
- Assertion.
- Config môi trường.

### `any` là gì và vì sao nên hạn chế?

`any` nghĩa là TypeScript bỏ kiểm tra kiểu.

```ts
let responseBody: any = {};

responseBody.abc.xyz.test;
```

Code trên TypeScript có thể không báo lỗi, nhưng lúc chạy thật dễ crash.

Nên dùng type rõ ràng hơn:

```ts
type OrderResponse = {
  message: string;
  data: {
    orderCode: string;
    status: string;
  };
};

const responseBody: OrderResponse = {
  message: "success",
  data: {
    orderCode: "O001",
    status: "Approved",
  },
};
```

### Hướng dẫn tự luyện

Tạo file:

```txt
practice/basic-types.ts
```

Viết:

```ts
const sku: string = "SKU001";
const price: number = 150000;
const isSellable: boolean = true;

console.log(`SKU: ${sku}`);
console.log(`Price: ${price}`);
console.log(`Sellable: ${isSellable}`);
```

Sau đó cố tình đổi:

```ts
const price: number = "150000";
```

Quan sát TypeScript báo lỗi gì.

---

## 2.3 String và template string

### Lý thuyết cần hiểu

`string` dùng rất nhiều trong automation: URL, locator text, order code, SKU, token, message.

Template string dùng dấu backtick:

```ts
const name = "Jin";
const message = `Hello ${name}`;
```

Nó giúp nối chuỗi dễ đọc hơn.

### Ví dụ automation

```ts
const prefix = "ORDER";
const orderCode = `${prefix}_${Date.now()}`;

console.log(orderCode);
```

Dùng để tạo data không trùng:

```ts
const customerName = `Auto Customer ${Date.now()}`;
const email = `auto_${Date.now()}@example.com`;
```

### Các hàm string hay dùng

```ts
const text = " Order created successfully ";

console.log(text.trim());
console.log(text.includes("created"));
console.log(text.toLowerCase());
console.log(text.toUpperCase());
console.log(text.replace("Order", "Shipment"));
```

### Ứng dụng trong Playwright

```ts
await expect(
  page.getByText(`Order ${orderCode} created successfully`),
).toBeVisible();
```

Hoặc search theo mã:

```ts
await page.getByPlaceholder("Search order").fill(orderCode);
```

### Hướng dẫn tự luyện

Viết function tạo mã đơn:

```ts
function generateOrderCode(): string {
  return `ORDER_${Date.now()}`;
}

console.log(generateOrderCode());
```

Nâng cấp:

```ts
function generateCode(prefix: string): string {
  return `${prefix}_${Date.now()}`;
}

console.log(generateCode("ORDER"));
console.log(generateCode("SKU"));
console.log(generateCode("CUSTOMER"));
```

---

## 2.4 Number và xử lý tính toán

### Lý thuyết cần hiểu

`number` dùng cho số lượng, giá, tổng tiền, phần trăm, status code API.

Ví dụ:

```ts
const quantity: number = 2;
const unitPrice: number = 100000;
const total: number = quantity * unitPrice;
```

### Ứng dụng trong Automation Test

Dùng để verify tổng tiền order:

```ts
const quantity = 2;
const price = 100000;
const expectedTotal = quantity * price;

expect(expectedTotal).toBe(200000);
```

Dùng để check status API:

```ts
expect(response.status()).toBe(200);
```

### Lỗi thường gặp

Dữ liệu từ UI thường là string:

```ts
const totalText = "200000";
```

Muốn so với number thì cần convert:

```ts
const totalNumber = Number(totalText);
expect(totalNumber).toBe(200000);
```

Nếu text có dấu phẩy:

```ts
const priceText = "200,000";
const priceNumber = Number(priceText.replace(",", ""));

expect(priceNumber).toBe(200000);
```

### Hướng dẫn tự luyện

Viết function tính tổng tiền:

```ts
function calculateLineTotal(quantity: number, price: number): number {
  return quantity * price;
}

console.log(calculateLineTotal(2, 100000));
```

Nâng cấp:

```ts
function parseMoney(text: string): number {
  return Number(text.replaceAll(",", "").trim());
}

console.log(parseMoney("1,250,000"));
```

---

## 2.5 Boolean và điều kiện đúng/sai

### Lý thuyết cần hiểu

`boolean` chỉ có 2 giá trị:

```ts
true;
false;
```

Dùng khi cần kiểm tra một điều kiện.

### Ví dụ

```ts
const isLoginSuccess = true;

if (isLoginSuccess) {
  console.log("Go to dashboard");
} else {
  console.log("Show error message");
}
```

### Ứng dụng trong Automation

```ts
const isVisible = await page.getByText("Success").isVisible();

if (isVisible) {
  console.log("Toast appeared");
}
```

Tuy nhiên trong test, nên dùng `expect` thay vì tự if quá nhiều:

```ts
await expect(page.getByText("Success")).toBeVisible();
```

### Hướng dẫn tự luyện

```ts
const orderStatus = "Approved";
const canCancel = orderStatus === "New";

console.log(canCancel);
```

Nâng cấp:

```ts
function canApproveOrder(status: string): boolean {
  return status === "New";
}

console.log(canApproveOrder("New"));
console.log(canApproveOrder("Approved"));
```

---

## 2.6 Array

### Lý thuyết cần hiểu

Array là danh sách nhiều phần tử.

Ví dụ danh sách SKU:

```ts
const skus: string[] = ["SKU001", "SKU002", "SKU003"];
```

Array rất quan trọng vì API response thường trả về danh sách.

### Duyệt array bằng `for...of`

```ts
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

### Các hàm array phải biết

#### `find`

Tìm 1 item đầu tiên đúng điều kiện.

```ts
const product = products.find((item) => item.sku === "SKU001");
```

Kết quả có thể là `Product` hoặc `undefined`.

#### `filter`

Lọc ra nhiều item đúng điều kiện.

```ts
const expensiveProducts = products.filter((item) => item.price > 19000000);
```

#### `map`

Biến đổi array này thành array khác.

```ts
const productNames = products.map((item) => item.name);
```

#### `some`

Kiểm tra có ít nhất 1 item đúng điều kiện không.

```ts
const hasSku001 = products.some((item) => item.sku === "SKU001");
```

#### `every`

Kiểm tra tất cả item có đúng điều kiện không.

```ts
const allHavePrice = products.every((item) => item.price > 0);
```

#### `reduce`

Tính tổng hoặc gom dữ liệu.

```ts
const totalPrice = products.reduce((total, item) => {
  return total + item.price;
}, 0);
```

### Ứng dụng trong Automation Test

Array dùng để xử lý:

- Danh sách item trong order.
- Danh sách serial.
- Danh sách shipment item.
- Danh sách row trong table.
- Danh sách response API.
- Data-driven test.

Ví dụ verify API có SKU cần tìm:

```ts
const body = await response.json();

const hasExpectedSku = body.data.items.some((item: { sku: string }) => {
  return item.sku === "SKU001";
});

expect(hasExpectedSku).toBe(true);
```

### Lỗi thường gặp

Sai:

```ts
const product = products.find((item) => item.sku === "SKU999");
console.log(product.name);
```

Nếu không tìm thấy, `product` là `undefined`, gọi `product.name` sẽ lỗi.

Đúng:

```ts
const product = products.find((item) => item.sku === "SKU999");

if (!product) {
  throw new Error("Product not found");
}

console.log(product.name);
```

### Hướng dẫn tự luyện

Tạo file:

```txt
practice/array-products.ts
```

Làm các yêu cầu:

```ts
type Product = {
  sku: string;
  name: string;
  price: number;
  status: "ACTIVE" | "INACTIVE";
};

const products: Product[] = [
  { sku: "SKU001", name: "Mouse", price: 100000, status: "ACTIVE" },
  { sku: "SKU002", name: "Keyboard", price: 250000, status: "ACTIVE" },
  { sku: "SKU003", name: "Monitor", price: 2500000, status: "INACTIVE" },
];

// 1. Tìm product có sku SKU002
// 2. Lọc product ACTIVE
// 3. Lấy danh sách sku
// 4. Tính tổng giá
// 5. Check có product nào price > 1000000 không
```

---

## 2.7 Object

### Lý thuyết cần hiểu

Object là kiểu dữ liệu gồm nhiều cặp key-value.

```ts
const order = {
  orderCode: "ORDER001",
  customerCode: "C001",
  warehouseCode: "W103",
};
```

Lấy field:

```ts
console.log(order.orderCode);
```

### Nested object

Object có thể lồng object khác.

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

Lấy nhanh field trong object:

```ts
const { orderCode, warehouseCode } = order;

console.log(orderCode);
console.log(warehouseCode);
```

### Spread object

Copy object và thay đổi một vài field:

```ts
const baseOrder = {
  customerCode: "C001",
  warehouseCode: "W103",
  status: "New",
};

const approvedOrder = {
  ...baseOrder,
  status: "Approved",
};
```

### Ứng dụng trong Automation Test

Hầu hết request body API là object:

```ts
const createOrderPayload = {
  customerCode: "C001",
  warehouseCode: "W103",
  items: [
    {
      sku: "SKU001",
      quantity: 1,
    },
  ],
};
```

Gọi API:

```ts
const response = await request.post("/api/orders", {
  data: createOrderPayload,
});
```

### Lỗi thường gặp

Sai tên field:

```ts
const order = {
  warehouse_code: "W103",
};

console.log(order.warehouseCode);
```

`warehouseCode` không tồn tại vì object đang có `warehouse_code`.

Khi test API, sai tên field có thể làm API báo lỗi hoặc tạo sai dữ liệu.

### Hướng dẫn tự luyện

Tạo object order:

```ts
const order = {
  customerCode: "C001",
  warehouseCode: "W103",
  address: {
    province: "Hồ Chí Minh",
    ward: "Phường 1",
  },
  items: [
    { sku: "SKU001", quantity: 1 },
    { sku: "SKU002", quantity: 2 },
  ],
};
```

Yêu cầu:

```txt
1. In ra warehouseCode
2. In ra province
3. In ra sku của item đầu tiên
4. Dùng spread để tạo order mới với warehouseCode = W104
```

---

## 2.8 Type và Interface

### Lý thuyết cần hiểu

`type` và `interface` dùng để mô tả hình dạng dữ liệu.

Không có type/interface thì object dễ bị sai field.

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

### Nên dùng `type` hay `interface`?

Với automation test, dùng cái nào cũng được. Gợi ý đơn giản:

| Nhu cầu               | Nên dùng                |
| --------------------- | ----------------------- |
| Mô tả object đơn giản | `type` hoặc `interface` |
| Union type            | `type`                  |
| Data API/test data    | `type` dễ dùng          |
| Class implements      | `interface`             |

Trong roadmap này, có thể ưu tiên `type` cho dễ học.

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

Dùng type:

```ts
const payload: CreateOrderPayload = {
  customerCode: "C001",
  warehouseCode: "W103",
  items: [
    {
      sku: "SKU001",
      quantity: 1,
    },
  ],
};
```

Nếu thiếu field `items`, TypeScript báo lỗi.

### Type cho API response

```ts
type CreateOrderResponse = {
  message: string;
  data: {
    orderCode: string;
    status: "New" | "Approved" | "Cancelled";
  };
};
```

Dùng:

```ts
const body = (await response.json()) as CreateOrderResponse;

expect(body.message).toBe("success");
expect(body.data.status).toBe("New");
```

### Lỗi thường gặp

Sai:

```ts
type Product = {
  sku: string;
  price: number;
};

const product: Product = {
  sku: "SKU001",
  price: "100000",
};
```

`price` phải là number, không phải string.

### Hướng dẫn tự luyện

Tự tạo các type:

```ts
type Customer = {
  code: string;
  name: string;
  phone: string;
};

type OrderItem = {
  sku: string;
  quantity: number;
  price: number;
};

type Order = {
  orderCode: string;
  customer: Customer;
  items: OrderItem[];
};
```

Sau đó tạo một object `order` đúng theo type trên.

---

## 2.9 Optional field

### Lý thuyết cần hiểu

Dấu `?` nghĩa là field đó **có thể có hoặc không**.

```ts
type Customer = {
  name: string;
  phone: string;
  email?: string;
};
```

`email` không bắt buộc.

### Ví dụ đúng

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

Nhiều payload có field optional:

```ts
type Address = {
  address1: string;
  address2?: string;
  postCode?: string;
};
```

Hoặc API response có field có thể null/không có:

```ts
type Shipment = {
  shipmentCode: string;
  trackingNumber?: string;
};
```

### Cách xử lý optional field an toàn

```ts
if (customer.email) {
  console.log(customer.email.toLowerCase());
}
```

Hoặc dùng optional chaining:

```ts
console.log(customer.email?.toLowerCase());
```

### Lỗi thường gặp

Sai:

```ts
console.log(customer.email.toLowerCase());
```

Nếu `email` không có, code sẽ lỗi.

Đúng:

```ts
console.log(customer.email?.toLowerCase());
```

### Hướng dẫn tự luyện

Tạo type:

```ts
type Shipment = {
  shipmentCode: string;
  trackingNumber?: string;
};
```

Tạo 2 shipment:

```ts
const shipment1: Shipment = {
  shipmentCode: "S001",
};

const shipment2: Shipment = {
  shipmentCode: "S002",
  trackingNumber: "TRACK001",
};
```

Viết function:

```ts
function printTracking(shipment: Shipment): void {
  if (shipment.trackingNumber) {
    console.log(shipment.trackingNumber);
  } else {
    console.log("No tracking number");
  }
}
```

---

## 2.10 Union type

### Lý thuyết cần hiểu

Union type cho phép biến chỉ nhận một số kiểu hoặc một số giá trị nhất định.

```ts
type OrderStatus = "New" | "Approved" | "Cancelled";
```

Biến `OrderStatus` chỉ được là 1 trong 3 giá trị trên.

### Ví dụ

```ts
const status: OrderStatus = "Approved";
```

Sai:

```ts
const status: OrderStatus = "Done";
```

Vì `Done` không nằm trong union type.

### Ứng dụng trong Automation

```ts
type ActualResult = "PASS" | "FAILED" | "UPDATE";

type WarehouseCode = "W103" | "W104" | "W105";

type OrderStatus = "New" | "Approved" | "Cancelled" | "Shipped";
```

Union type rất hợp với:

- Status đơn hàng.
- Warehouse code.
- Role user.
- Test tag.
- Actual result.
- Environment.

### Ví dụ dùng env

```ts
type EnvName = "dev" | "staging" | "production";

function getBaseUrl(env: EnvName): string {
  if (env === "dev") return "https://dev.example.com";
  if (env === "staging") return "https://staging.example.com";
  return "https://example.com";
}
```

### Hướng dẫn tự luyện

Tạo:

```ts
type PaymentMethod = "COD" | "BANK_TRANSFER" | "MOMO";

function printPaymentMethod(method: PaymentMethod): void {
  console.log(`Payment method: ${method}`);
}

printPaymentMethod("COD");
```

Thử truyền sai:

```ts
printPaymentMethod("CASH");
```

Xem TypeScript báo lỗi.

---

## 2.11 Function

### Lý thuyết cần hiểu

Function giúp gom logic dùng lại nhiều lần.

Cú pháp:

```ts
function functionName(parameter: Type): ReturnType {
  return value;
}
```

### Ví dụ cơ bản

```ts
function sum(a: number, b: number): number {
  return a + b;
}
```

Arrow function:

```ts
const sum = (a: number, b: number): number => {
  return a + b;
};
```

### Function không return

```ts
function printMessage(message: string): void {
  console.log(message);
}
```

`void` nghĩa là không trả về giá trị.

### Ứng dụng trong Automation

Tạo helper generate data:

```ts
function generateSku(prefix: string): string {
  return `${prefix}_${Date.now()}`;
}

const sku = generateSku("SKU");
```

Tạo helper tính tiền:

```ts
function calculateTotal(quantity: number, price: number): number {
  return quantity * price;
}
```

Tạo helper build payload:

```ts
type OrderItem = {
  sku: string;
  quantity: number;
};

type CreateOrderPayload = {
  customerCode: string;
  warehouseCode: string;
  items: OrderItem[];
};

function buildCreateOrderPayload(
  customerCode: string,
  warehouseCode: string,
  items: OrderItem[],
): CreateOrderPayload {
  return {
    customerCode,
    warehouseCode,
    items,
  };
}
```

### Lỗi thường gặp

Sai return type:

```ts
function getQuantity(): number {
  return "10";
}
```

Đúng:

```ts
function getQuantity(): number {
  return 10;
}
```

### Hướng dẫn tự luyện

Viết các function:

```txt
1. generateCode(prefix): trả về prefix_Date.now()
2. calculateTotal(items): tính tổng quantity * price
3. findItemBySku(items, sku): tìm item theo sku
4. isApproved(status): trả về true nếu status = Approved
```

---

## 2.12 Async/Await và Promise

### Lý thuyết cần hiểu

Đây là phần **bắt buộc phải chắc** vì Playwright dùng async/await gần như mọi chỗ.

Các thao tác như mở page, click, fill, gọi API đều không xảy ra ngay lập tức. Chúng cần thời gian để hoàn tất. Vì vậy Playwright trả về `Promise`.

`await` dùng để đợi Promise chạy xong.

### Ví dụ cơ bản

```ts
async function openPage() {
  await page.goto("https://example.com");
}
```

### Quy tắc quan trọng

Function có dùng `await` thì function đó phải có `async`.

```ts
async function login() {
  await page.getByLabel("Username").fill("admin");
}
```

### Ví dụ Playwright chuẩn

```ts
test("login success", async ({ page }) => {
  await page.goto("/login");

  await page.getByLabel("Username").fill("admin");
  await page.getByLabel("Password").fill("123456");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL(/dashboard/);
});
```

### Lỗi rất thường gặp: thiếu `await`

Sai:

```ts
page.getByRole("button", { name: "Save" }).click();
await expect(page.getByText("Success")).toBeVisible();
```

Có thể assertion chạy trước khi click xong.

Đúng:

```ts
await page.getByRole("button", { name: "Save" }).click();
await expect(page.getByText("Success")).toBeVisible();
```

### Promise là gì?

Promise là lời hứa rằng một tác vụ sẽ có kết quả trong tương lai.

Ví dụ giả lập API:

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
```

Dùng:

```ts
const response = await fakeCreateOrder();
console.log(response.message);
```

### Ứng dụng trong API testing

```ts
const response = await request.post("/api/orders", {
  data: {
    customerCode: "C001",
    warehouseCode: "W103",
  },
});

const body = await response.json();

expect(response.status()).toBe(200);
expect(body.message).toBe("success");
```

### Hướng dẫn tự luyện

Tạo file:

```txt
practice/async-await.ts
```

Viết:

```ts
type ApiResponse = {
  status: number;
  message: string;
};

async function fakeLogin(
  username: string,
  password: string,
): Promise<ApiResponse> {
  if (username === "admin" && password === "123456") {
    return {
      status: 200,
      message: "login success",
    };
  }

  return {
    status: 401,
    message: "invalid username or password",
  };
}

async function main() {
  const response = await fakeLogin("admin", "123456");
  console.log(response);
}

main();
```

Sau đó thử case password sai.

---

## 2.13 Try/Catch

### Lý thuyết cần hiểu

`try/catch` dùng để bắt lỗi khi code có khả năng fail.

Dùng nhiều khi:

- Gọi API.
- Đọc file test data.
- Setup data trước test.
- Cleanup data sau test.
- Debug lỗi khó.

### Ví dụ cơ bản

```ts
try {
  console.log("Start");
  throw new Error("Something went wrong");
} catch (error) {
  console.error("Error:", error);
}
```

### Ứng dụng trong Automation

```ts
try {
  const response = await request.get("/api/orders");

  expect(response.status()).toBe(200);
} catch (error) {
  console.error("Call get orders API failed:", error);
  throw error;
}
```

Vì sao cần `throw error` lại?

Nếu chỉ log mà không throw, test có thể vẫn pass giả.

Sai:

```ts
try {
  await request.get("/api/orders");
} catch (error) {
  console.error(error);
}
```

Đúng:

```ts
try {
  await request.get("/api/orders");
} catch (error) {
  console.error(error);
  throw error;
}
```

### Hướng dẫn tự luyện

Viết function:

```ts
async function fakeCallApi(status: number): Promise<string> {
  if (status !== 200) {
    throw new Error(`API failed with status ${status}`);
  }

  return "success";
}
```

Gọi trong `try/catch` với status `200` và `500`.

---

## 2.14 Import / Export

### Lý thuyết cần hiểu

Khi project lớn, không thể viết tất cả code vào một file. Cần tách thành nhiều file rồi import lại.

Ví dụ structure:

```txt
data/users.ts
utils/random.ts
pages/LoginPage.ts
tests/login.spec.ts
```

### Named export

```ts
// data/users.ts
export const adminUser = {
  username: "admin",
  password: "123456",
};
```

Import:

```ts
// tests/login.spec.ts
import { adminUser } from "../data/users";
```

### Export function

```ts
// utils/random.ts
export function generateCode(prefix: string): string {
  return `${prefix}_${Date.now()}`;
}
```

Import:

```ts
import { generateCode } from "../utils/random";

const orderCode = generateCode("ORDER");
```

### Default export

```ts
export default class LoginPage {}
```

Import:

```ts
import LoginPage from "../pages/LoginPage";
```

Với automation, nên ưu tiên named export để dễ refactor:

```ts
export class LoginPage {}
```

```ts
import { LoginPage } from "../pages/LoginPage";
```

### Lỗi thường gặp

Sai đường dẫn:

```ts
import { adminUser } from "./data/users";
```

Nếu file test nằm trong `tests/`, đường dẫn đúng có thể là:

```ts
import { adminUser } from "../data/users";
```

### Hướng dẫn tự luyện

Tạo structure:

```txt
practice-import-export/
  data/
    users.ts
  utils/
    random.ts
  main.ts
```

`data/users.ts`:

```ts
export const adminUser = {
  username: "admin",
  password: "123456",
};
```

`utils/random.ts`:

```ts
export function generateCode(prefix: string): string {
  return `${prefix}_${Date.now()}`;
}
```

`main.ts`:

```ts
import { adminUser } from "./data/users";
import { generateCode } from "./utils/random";

console.log(adminUser.username);
console.log(generateCode("ORDER"));
```

---

## 2.15 Class trong TypeScript

### Lý thuyết cần hiểu

Class là bản thiết kế để tạo object có data và method.

Trong Playwright, Page Object Model thường dùng class.

### Ví dụ class cơ bản

```ts
class User {
  constructor(
    public username: string,
    public password: string,
  ) {}

  printUsername(): void {
    console.log(this.username);
  }
}

const user = new User("admin", "123456");
user.printUsername();
```

### Constructor là gì?

`constructor` chạy khi tạo object bằng `new`.

```ts
const user = new User("admin", "123456");
```

Lúc này constructor nhận username/password và gán vào class.

### `public` và `private`

```ts
class LoginPage {
  constructor(private page: Page) {}
}
```

`private page` nghĩa là chỉ dùng được bên trong class `LoginPage`.

### Ứng dụng trong Page Object Model

```ts
import { Page, expect } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto("/login");
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.getByLabel("Username").fill(username);
    await this.page.getByLabel("Password").fill(password);
    await this.page.getByRole("button", { name: "Login" }).click();
  }

  async expectLoginSuccess(): Promise<void> {
    await expect(this.page).toHaveURL(/dashboard/);
  }
}
```

Dùng trong test:

```ts
const loginPage = new LoginPage(page);

await loginPage.goto();
await loginPage.login("admin", "123456");
await loginPage.expectLoginSuccess();
```

### Vì sao class quan trọng trong automation?

Vì nó giúp:

- Gom action của một page vào một nơi.
- Tránh lặp selector.
- Test case dễ đọc hơn.
- Dễ maintain khi UI thay đổi.

### Lỗi thường gặp

Quên truyền `page` khi tạo class:

```ts
const loginPage = new LoginPage();
```

Sai vì constructor cần `page`.

Đúng:

```ts
const loginPage = new LoginPage(page);
```

### Hướng dẫn tự luyện

Tạo class đơn giản trước:

```ts
class OrderHelper {
  generateOrderCode(): string {
    return `ORDER_${Date.now()}`;
  }

  calculateTotal(quantity: number, price: number): number {
    return quantity * price;
  }
}

const orderHelper = new OrderHelper();

console.log(orderHelper.generateOrderCode());
console.log(orderHelper.calculateTotal(2, 100000));
```

Sau đó mới học `LoginPage`, `OrderPage`.

---

## 2.16 Generic cơ bản

### Lý thuyết cần hiểu

Generic giúp function/class dùng được với nhiều kiểu dữ liệu nhưng vẫn giữ type an toàn.

Không cần học quá sâu lúc đầu, nhưng nên biết để đọc code fixture/helper.

### Ví dụ đơn giản

```ts
function getFirstItem<T>(items: T[]): T {
  return items[0];
}

const firstSku = getFirstItem<string>(["SKU001", "SKU002"]);
const firstNumber = getFirstItem<number>([1, 2, 3]);
```

`T` là kiểu linh hoạt. Khi truyền `string[]`, T là `string`. Khi truyền `number[]`, T là `number`.

### Ứng dụng trong Automation

Generic hay gặp ở:

- Custom fixture.
- API response helper.
- Utility function dùng chung.

Ví dụ API helper:

```ts
async function parseJsonResponse<T>(response: APIResponse): Promise<T> {
  return (await response.json()) as T;
}
```

Dùng:

```ts
type OrderResponse = {
  message: string;
  data: {
    orderCode: string;
  };
};

const body = await parseJsonResponse<OrderResponse>(response);

expect(body.data.orderCode).toBeTruthy();
```

### Hướng dẫn tự luyện

Viết function:

```ts
function getLastItem<T>(items: T[]): T {
  return items[items.length - 1];
}

console.log(getLastItem<string>(["A", "B", "C"]));
console.log(getLastItem<number>([10, 20, 30]));
```

---

## 2.17 Type narrowing

### Lý thuyết cần hiểu

Type narrowing là thu hẹp kiểu trước khi xử lý.

Ví dụ biến có thể là `string` hoặc `number`:

```ts
function printValue(value: string | number): void {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else {
    console.log(value.toFixed(2));
  }
}
```

Trong nhánh `if`, TypeScript biết `value` là string.

Trong nhánh `else`, TypeScript biết `value` là number.

### Ứng dụng trong Automation

API response đôi khi có field không ổn định:

```ts
type ErrorResponse = {
  message: string | string[];
};

function printError(message: string | string[]): void {
  if (Array.isArray(message)) {
    console.log(message.join(", "));
  } else {
    console.log(message);
  }
}
```

### Optional narrowing

```ts
type Customer = {
  email?: string;
};

function printEmail(customer: Customer): void {
  if (customer.email) {
    console.log(customer.email.toLowerCase());
  }
}
```

### Hướng dẫn tự luyện

Viết function:

```ts
function normalizeMessage(message: string | string[]): string {
  if (Array.isArray(message)) {
    return message.join(", ");
  }

  return message;
}

console.log(normalizeMessage("success"));
console.log(normalizeMessage(["error 1", "error 2"]));
```

---

## 2.18 Enum có cần học không?

### Lý thuyết cần hiểu

Enum dùng để đặt tên cho một nhóm giá trị cố định.

```ts
enum OrderStatus {
  New = "New",
  Approved = "Approved",
  Cancelled = "Cancelled",
}
```

Dùng:

```ts
const status = OrderStatus.Approved;
```

### Có nên dùng enum trong automation không?

Có thể dùng, nhưng với TypeScript hiện đại, nhiều team thích union type hơn vì gọn:

```ts
type OrderStatus = "New" | "Approved" | "Cancelled";
```

Gợi ý cho người mới:

- Biết enum để đọc code.
- Khi tự viết test data, có thể dùng union type trước cho đơn giản.

---

## 2.19 JSON trong TypeScript

### Lý thuyết cần hiểu

API request/response thường là JSON. Trong TypeScript, JSON thường được biểu diễn bằng object/array.

Ví dụ JSON:

```json
{
  "customerCode": "C001",
  "warehouseCode": "W103",
  "items": [
    {
      "sku": "SKU001",
      "quantity": 1
    }
  ]
}
```

Trong TypeScript:

```ts
const payload = {
  customerCode: "C001",
  warehouseCode: "W103",
  items: [
    {
      sku: "SKU001",
      quantity: 1,
    },
  ],
};
```

### Chuyển object thành JSON string

```ts
const jsonString = JSON.stringify(payload);
```

### Chuyển JSON string thành object

```ts
const object = JSON.parse(jsonString);
```

### Ứng dụng trong Automation

Đọc file test data JSON:

```ts
import orderData from "../data/order.json";

console.log(orderData.customerCode);
```

Hoặc gửi API:

```ts
await request.post("/api/orders", {
  data: payload,
});
```

Playwright tự convert object sang JSON khi dùng `data`.

### Lỗi thường gặp

JSON chuẩn phải dùng dấu nháy kép cho key:

Sai JSON:

```json
{
  "customerCode": "C001"
}
```

Đúng JSON:

```json
{
  "customerCode": "C001"
}
```

Nhưng trong file `.ts`, object có thể viết không cần nháy key:

```ts
const payload = {
  customerCode: "C001",
};
```

---

## 2.20 Null, undefined và optional chaining

### Lý thuyết cần hiểu

| Giá trị     | Ý nghĩa                                        |
| ----------- | ---------------------------------------------- |
| `undefined` | Chưa được gán hoặc field không tồn tại         |
| `null`      | Có field nhưng giá trị đang rỗng/cố ý không có |

Ví dụ:

```ts
const customer = {
  name: "A",
  email: null,
};
```

### Optional chaining

Dùng `?.` để tránh lỗi khi field không tồn tại.

```ts
const province = order.address?.province;
```

Nếu `address` không có, code không crash mà trả về `undefined`.

### Nullish coalescing

Dùng `??` để đặt giá trị mặc định khi data là `null` hoặc `undefined`.

```ts
const address2 = order.address2 ?? "";
```

### Ứng dụng trong Automation

API có thể trả:

```ts
type CustomerAddress = {
  address1: string;
  address2?: string | null;
};

const displayAddress2 = customerAddress.address2 ?? "No address2";
```

### Hướng dẫn tự luyện

```ts
type ApiOrder = {
  orderCode: string;
  shipment?: {
    shipmentCode: string;
  } | null;
};

const order: ApiOrder = {
  orderCode: "O001",
  shipment: null,
};

console.log(order.shipment?.shipmentCode ?? "No shipment yet");
```

---

## 2.21 Destructuring và spread/rest

### Lý thuyết cần hiểu

Destructuring giúp lấy field nhanh từ object/array.

```ts
const order = {
  orderCode: "O001",
  status: "New",
};

const { orderCode, status } = order;
```

Spread giúp copy object/array.

```ts
const newOrder = {
  ...order,
  status: "Approved",
};
```

### Ứng dụng trong Automation

Tạo payload từ base payload:

```ts
const basePayload = {
  customerCode: "C001",
  warehouseCode: "W103",
};

const payloadForW104 = {
  ...basePayload,
  warehouseCode: "W104",
};
```

Tạo nhiều test data khác nhau mà không copy-paste nhiều.

### Rest parameter

```ts
function sum(...numbers: number[]): number {
  return numbers.reduce((total, item) => total + item, 0);
}
```

### Hướng dẫn tự luyện

```ts
const baseUser = {
  username: "admin",
  password: "123456",
  role: "admin",
};

const staffUser = {
  ...baseUser,
  username: "staff",
  role: "staff",
};

console.log(staffUser);
```

---

## 2.22 Module project TypeScript nên tổ chức thế nào?

Khi học automation, nên tập tổ chức code ngay từ đầu.

Cấu trúc gợi ý:

```txt
playwright-project/
  tests/
    login.spec.ts
    order.spec.ts
  pages/
    LoginPage.ts
    OrderPage.ts
  data/
    users.ts
    orderData.ts
  types/
    order.ts
    user.ts
  utils/
    random.ts
    money.ts
  fixtures/
    test.ts
```

Ý nghĩa:

| Folder     | Dùng để              |
| ---------- | -------------------- |
| `tests`    | Chứa test case       |
| `pages`    | Chứa Page Object     |
| `data`     | Chứa test data       |
| `types`    | Chứa type/interface  |
| `utils`    | Chứa helper function |
| `fixtures` | Chứa custom fixture  |

### Ví dụ tách type

```ts
// types/order.ts
export type OrderItem = {
  sku: string;
  quantity: number;
  price: number;
};

export type CreateOrderPayload = {
  customerCode: string;
  warehouseCode: string;
  items: OrderItem[];
};
```

Dùng trong data:

```ts
// data/orderData.ts
import { CreateOrderPayload } from "../types/order";

export const validOrderPayload: CreateOrderPayload = {
  customerCode: "C001",
  warehouseCode: "W103",
  items: [
    {
      sku: "SKU001",
      quantity: 1,
      price: 100000,
    },
  ],
};
```

---

## 2.23 Những phần TypeScript chưa cần học sâu lúc đầu

Có thể để sau:

- Decorator.
- Advanced generic.
- Utility type nâng cao như `Pick`, `Omit`, `Partial`, `Record`.
- Type guard phức tạp.
- Namespace.
- Module resolution nâng cao.
- Build library bằng TypeScript.
- Compiler config nâng cao.

Nhưng sau khi đã viết được Playwright cơ bản, nên quay lại học thêm:

```txt
Partial
Pick
Omit
Record
Readonly
as const
```

Vì các phần này khá hữu ích khi framework lớn dần.

---

# 3. Bài tập TypeScript trước khi học Playwright

> Làm hết phần này trước khi qua Playwright sẽ dễ hơn rất nhiều. Mỗi bài nên tự gõ lại, không copy-paste một lần rồi bỏ qua.

---

## 3.1 Cách chạy bài tập TypeScript

### Bước 1: Tạo folder practice

```bash
mkdir ts-practice
cd ts-practice
```

### Bước 2: Khởi tạo Node project

```bash
npm init -y
```

### Bước 3: Cài TypeScript và ts-node

```bash
npm install -D typescript ts-node @types/node
```

### Bước 4: Tạo file cấu hình TypeScript

```bash
npx tsc --init
```

### Bước 5: Tạo file bài tập

```bash
mkdir practice
```

Ví dụ:

```txt
practice/product.ts
```

### Bước 6: Chạy file

```bash
npx ts-node practice/product.ts
```

---

## 3.2 Bài 1: Tạo type cho Product

### Yêu cầu

Tạo type `Product` gồm:

| Field    | Type      | Ghi chú      |
| -------- | --------- | ------------ | ---------- |
| `sku`    | string    | Mã sản phẩm  |
| `name`   | string    | Tên sản phẩm |
| `price`  | number    | Giá          |
| `status` | `'ACTIVE' | 'INACTIVE'`  | Trạng thái |

### Code mẫu

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

const product = findProductBySku("SKU001");

if (!product) {
  throw new Error("Product not found");
}

console.log(product.name);
```

### Cần hiểu sau bài này

- `Product[]` nghĩa là array gồm nhiều `Product`.
- `find` có thể trả về `undefined`.
- Phải check `if (!product)` trước khi dùng `product.name`.

### Tự luyện thêm

```txt
1. Viết function filterActiveProducts
2. Viết function getProductNames
3. Viết function hasProductBySku
4. Viết function calculateTotalProductPrice
```

---

## 3.3 Bài 2: Tạo order payload

### Yêu cầu

Tạo type cho order payload dùng để gọi API tạo đơn.

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
```

### Code mẫu

```ts
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

### Nâng cấp thành function build payload

```ts
function buildCreateOrderPayload(
  customerCode: string,
  warehouseCode: CreateOrderPayload["warehouseCode"],
  items: OrderItem[],
): CreateOrderPayload {
  return {
    customerCode,
    warehouseCode,
    items,
  };
}

const payload = buildCreateOrderPayload("C001", "W103", [
  {
    sku: "SKU001",
    quantity: 1,
    price: 100000,
  },
]);

console.log(payload);
```

### Cần hiểu sau bài này

- Nested object.
- Array trong object.
- Union type cho warehouse.
- Dùng lại type field bằng `CreateOrderPayload['warehouseCode']`.

---

## 3.4 Bài 3: Tính tổng tiền order

### Yêu cầu

Viết function nhận vào danh sách item và trả về tổng tiền.

```ts
function calculateTotal(items: OrderItem[]): number {
  return items.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);
}

const total = calculateTotal(orderPayload.items);

console.log(total);
```

### Cần hiểu

`reduce` chạy qua từng item và cộng dồn kết quả.

Với data:

```ts
[
  { sku: "SKU001", quantity: 2, price: 100000 },
  { sku: "SKU002", quantity: 1, price: 50000 },
];
```

Tổng là:

```txt
2 * 100000 + 1 * 50000 = 250000
```

### Tự luyện thêm

Viết thêm:

```ts
function calculateTotalQuantity(items: OrderItem[]): number {
  return items.reduce((total, item) => total + item.quantity, 0);
}
```

---

## 3.5 Bài 4: Generate mã tự động

### Yêu cầu

Viết helper tạo mã tự động để tránh trùng test data.

```ts
function generateCode(prefix: string): string {
  return `${prefix}_${Date.now()}`;
}

const orderCode = generateCode("ORDER");
const skuCode = generateCode("SKU");

console.log(orderCode);
console.log(skuCode);
```

### Nâng cấp

Nếu chạy parallel, `Date.now()` đôi khi vẫn có thể trùng trong một số tình huống rất nhanh. Có thể thêm random:

```ts
function generateUniqueCode(prefix: string): string {
  const randomNumber = Math.floor(Math.random() * 100000);

  return `${prefix}_${Date.now()}_${randomNumber}`;
}
```

### Ứng dụng trong Playwright

```ts
const orderCode = generateUniqueCode("AUTO_ORDER");

await page.getByLabel("Order code").fill(orderCode);
```

---

## 3.6 Bài 5: Async function giả lập gọi API

### Yêu cầu

Viết async function giả lập login API.

```ts
type ApiResponse = {
  status: number;
  message: string;
};

async function fakeLogin(
  username: string,
  password: string,
): Promise<ApiResponse> {
  if (username === "admin" && password === "123456") {
    return {
      status: 200,
      message: "login success",
    };
  }

  return {
    status: 401,
    message: "invalid username or password",
  };
}

async function main(): Promise<void> {
  const response = await fakeLogin("admin", "123456");

  if (response.status === 200) {
    console.log("Create order success");
  } else {
    console.log(response.message);
  }
}

main();
```

### Cần hiểu

- Function có `async` sẽ trả về Promise.
- Muốn lấy kết quả phải dùng `await`.
- Response API thường có `status`, `message`, `data`.

### Tự luyện thêm

Viết thêm function:

```txt
1. fakeCreateOrder
2. fakeApproveOrder
3. fakeGetOrderDetail
```

---

## 3.7 Bài 6: Tách file data, type, utils

### Mục tiêu

Tập tổ chức project giống automation framework thật.

### Structure

```txt
ts-practice/
  data/
    orderData.ts
  types/
    order.ts
  utils/
    random.ts
  main.ts
```

### `types/order.ts`

```ts
export type OrderItem = {
  sku: string;
  quantity: number;
  price: number;
};

export type CreateOrderPayload = {
  customerCode: string;
  warehouseCode: "W103" | "W104" | "W105";
  items: OrderItem[];
};
```

### `utils/random.ts`

```ts
export function generateUniqueCode(prefix: string): string {
  const randomNumber = Math.floor(Math.random() * 100000);

  return `${prefix}_${Date.now()}_${randomNumber}`;
}
```

### `data/orderData.ts`

```ts
import { CreateOrderPayload } from "../types/order";

export const validOrderPayload: CreateOrderPayload = {
  customerCode: "C001",
  warehouseCode: "W103",
  items: [
    {
      sku: "SKU001",
      quantity: 1,
      price: 100000,
    },
  ],
};
```

### `main.ts`

```ts
import { validOrderPayload } from "./data/orderData";
import { generateUniqueCode } from "./utils/random";

const orderCode = generateUniqueCode("ORDER");

console.log(orderCode);
console.log(validOrderPayload);
```

### Chạy

```bash
npx ts-node main.ts
```

### Cần hiểu sau bài này

- Biết tách file.
- Biết export/import.
- Biết type dùng chung.
- Biết data file dùng chung.

---

## 3.8 Bài 7: Mini project TypeScript cho nghiệp vụ order

### Mục tiêu

Trước khi qua Playwright, làm một mini project thuần TypeScript để quen tư duy automation data.

### Yêu cầu

Tạo các file:

```txt
types/order.ts
utils/random.ts
services/orderService.ts
main.ts
```

### `types/order.ts`

```ts
export type OrderStatus = "New" | "Approved" | "Cancelled";

export type OrderItem = {
  sku: string;
  quantity: number;
  price: number;
};

export type Order = {
  orderCode: string;
  customerCode: string;
  warehouseCode: "W103" | "W104" | "W105";
  status: OrderStatus;
  items: OrderItem[];
};
```

### `services/orderService.ts`

```ts
import { Order, OrderItem } from "../types/order";
import { generateUniqueCode } from "../utils/random";

export function createOrder(
  customerCode: string,
  warehouseCode: Order["warehouseCode"],
  items: OrderItem[],
): Order {
  return {
    orderCode: generateUniqueCode("ORDER"),
    customerCode,
    warehouseCode,
    status: "New",
    items,
  };
}

export function approveOrder(order: Order): Order {
  return {
    ...order,
    status: "Approved",
  };
}

export function calculateOrderTotal(order: Order): number {
  return order.items.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);
}
```

### `main.ts`

```ts
import {
  createOrder,
  approveOrder,
  calculateOrderTotal,
} from "./services/orderService";

const order = createOrder("C001", "W103", [
  {
    sku: "SKU001",
    quantity: 2,
    price: 100000,
  },
]);

console.log(order);

const approvedOrder = approveOrder(order);
console.log(approvedOrder);

const total = calculateOrderTotal(order);
console.log(total);
```

### Cần đạt sau mini project

Làm được bài này nghĩa là đã đủ nền TypeScript để bắt đầu Playwright basic.

---

## 3.9 Checklist tự đánh giá TypeScript trước khi qua Playwright

Trước khi học Playwright, tự check:

| Câu hỏi                                                         | Đạt chưa |
| --------------------------------------------------------------- | -------- |
| Biết dùng `const`, `let` đúng chỗ chưa?                         | ☐        |
| Biết khai báo `string`, `number`, `boolean` chưa?               | ☐        |
| Biết tạo object và lấy field chưa?                              | ☐        |
| Biết xử lý nested object chưa?                                  | ☐        |
| Biết dùng array `find`, `filter`, `map`, `some`, `reduce` chưa? | ☐        |
| Biết tạo `type` cho payload chưa?                               | ☐        |
| Biết optional field `?` chưa?                                   | ☐        |
| Biết union type cho status chưa?                                | ☐        |
| Biết viết function có parameter/return type chưa?               | ☐        |
| Biết dùng async/await chưa?                                     | ☐        |
| Biết try/catch cơ bản chưa?                                     | ☐        |
| Biết import/export giữa nhiều file chưa?                        | ☐        |
| Biết class cơ bản chưa?                                         | ☐        |
| Biết vì sao class dùng cho Page Object chưa?                    | ☐        |
| Biết tạo data unique chưa?                                      | ☐        |

Nếu còn vướng hơn 5 dòng, nên luyện thêm TypeScript trước khi đi sâu Playwright.

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
