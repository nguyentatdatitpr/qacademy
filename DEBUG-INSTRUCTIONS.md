# Hướng Dẫn Debug Google Sheets Integration

## Bước 1: Kiểm tra Console trong Browser

1. Mở website
2. Nhấn F12 để mở DevTools
3. Vào tab "Console"
4. Thử điền form và submit
5. Xem có lỗi màu đỏ không? Chụp màn hình và gửi cho tôi

## Bước 2: Kiểm tra Network Tab

1. Trong DevTools, vào tab "Network"
2. Tick chọn "Preserve log"
3. Điền form và submit
4. Tìm request đến URL: `script.google.com/macros/s/AKfycbz...`
5. Click vào request đó và xem:
   - Status code (nên là 200 hoặc 302)
   - Headers
   - Payload

## Bước 3: Test Apps Script Trực Tiếp

1. Mở Google Sheets
2. Vào Extensions > Apps Script
3. Trong editor, chọn function `testDoPost` từ dropdown ở trên
4. Click nút "Run" (▶️)
5. Xem kết quả trong "Execution log" ở dưới
6. Kiểm tra Google Sheets xem có dữ liệu test không

## Bước 4: Kiểm tra Deployment Settings

1. Trong Apps Script editor
2. Click "Deploy" > "Manage deployments"
3. Kiểm tra:
   - Execute as: **Me (email của bạn)**
   - Who has access: **Anyone**
4. Nếu không đúng, click "Edit" (✏️) và sửa lại

## Bước 5: Kiểm tra Sheet Name

1. Mở Google Sheets
2. Kiểm tra tên sheet ở dưới (tab ở dưới cùng)
3. Phải là "Registrations" (đúng chính tả, in hoa R)
4. Nếu không đúng, đổi tên sheet hoặc sửa biến SHEET_NAME trong Apps Script

## Các Lỗi Thường Gặp

### Lỗi: "Script function not found: doPost"
- Apps Script chưa được save
- Giải pháp: Save lại và deploy lại

### Lỗi: "Authorization required"
- Chưa authorize Apps Script
- Giải pháp: Run function testDoPost và authorize

### Lỗi: "Cannot read property 'contents' of undefined"
- Request không gửi đúng format
- Giải pháp: Kiểm tra code trong modal.js và registration.js

### Không có lỗi nhưng không có data
- Sheet name không khớp
- Deploy settings không đúng
- URL trong config.js sai
