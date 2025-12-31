# Hướng Dẫn Tích Hợp Google Sheets

## Tổng Quan
Hệ thống đã được tích hợp để tự động gửi dữ liệu đăng ký từ website vào Google Sheets. Khi user điền form và bấm đăng ký, dữ liệu sẽ tự động được lưu vào Google Sheets.

## Các Bước Cài Đặt

### Bước 1: Tạo Google Sheets

1. Truy cập [Google Sheets](https://sheets.google.com)
2. Tạo một Spreadsheet mới
3. Đặt tên cho Sheet (ví dụ: "Q Academy - Đăng Ký Khóa Học")
4. **Quan trọng**: Để tên sheet trong file là `Registrations` (hoặc đổi tên biến `SHEET_NAME` trong Apps Script)

### Bước 2: Tạo Google Apps Script

1. Trong Google Sheets vừa tạo, click menu **Extensions** > **Apps Script**
2. Xóa code mặc định trong editor
3. Mở file `google-apps-script.js` trong thư mục dự án
4. Copy toàn bộ code trong file `google-apps-script.js`
5. Paste vào Apps Script editor
6. Click **Save** (biểu tượng đĩa hoặc Ctrl+S)
7. Đặt tên cho project (ví dụ: "Q Academy Form Submission")

### Bước 3: Deploy Apps Script

1. Trong Apps Script editor, click nút **Deploy** > **New deployment**
2. Click biểu tượng **⚙️ (Settings)** bên cạnh "Select type"
3. Chọn **Web app**
4. Điền thông tin:
   - **Description**: "Q Academy Registration Form" (tùy chọn)
   - **Execute as**: Chọn **Me** (email của bạn)
   - **Who has access**: Chọn **Anyone**
5. Click **Deploy**
6. Nếu có popup xác nhận quyền:
   - Click **Authorize access**
   - Chọn tài khoản Google của bạn
   - Click **Advanced** > **Go to [Project name] (unsafe)**
   - Click **Allow**
7. Copy **Web app URL** (dạng: `https://script.google.com/macros/s/AKfycby.../exec`)

### Bước 4: Cấu Hình Website

1. Mở file `js/config.js`
2. Tìm dòng:
   ```javascript
   GOOGLE_SCRIPT_URL: 'PASTE_YOUR_GOOGLE_SCRIPT_URL_HERE',
   ```
3. Thay `PASTE_YOUR_GOOGLE_SCRIPT_URL_HERE` bằng Web app URL vừa copy
4. Ví dụ:
   ```javascript
   GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbyXXXXXXXXXXX/exec',
   ```
5. **Lưu file**

### Bước 5: Test Hệ Thống

1. Mở website trên trình duyệt
2. Click nút "ĐĂNG KÝ TƯ VẤN" (modal) hoặc điền form ở footer
3. Điền thông tin và submit
4. Kiểm tra Google Sheets:
   - Dữ liệu sẽ xuất hiện trong sheet `Registrations`
   - Các cột: Timestamp, Họ và tên, Số điện thoại, Khóa học, Lớp học, Nguồn

## Cấu Trúc Dữ Liệu Trong Google Sheets

| Timestamp | Họ và tên | Số điện thoại | Khóa học | Lớp học | Nguồn |
|-----------|-----------|---------------|----------|---------|--------|
| 31/12/2024 14:30:00 | Nguyễn Văn A | 0987654321 | q-therapist | therapist-1 | Modal |
| 31/12/2024 15:45:00 | Trần Thị B | 0912345678 | q-professional | professional-1 | Footer Form |

### Ý Nghĩa Các Cột:

- **Timestamp**: Thời gian đăng ký (tự động)
- **Họ và tên**: Tên đầy đủ của người đăng ký
- **Số điện thoại**: Số điện thoại liên hệ
- **Khóa học**: ID khóa học (q-therapist, q-professional, q-skill)
- **Lớp học**: ID lớp học cụ thể (therapist-1, skill-5, v.v.)
- **Nguồn**: Từ đâu user đăng ký (Modal hoặc Footer Form)

## Files Liên Quan

1. **google-apps-script.js**: Code Apps Script để xử lý dữ liệu
2. **js/config.js**: Lưu URL của Apps Script
3. **js/modal.js**: Xử lý form trong modal popup
4. **js/registration.js**: Xử lý form ở footer

## Tính Năng

✅ Tự động lưu dữ liệu vào Google Sheets
✅ Validation số điện thoại (format Việt Nam)
✅ Validation các trường bắt buộc
✅ Phân biệt nguồn đăng ký (Modal vs Footer)
✅ Disable nút submit khi đang gửi (tránh duplicate)
✅ Hiển thị "Đang gửi..." khi processing
✅ Thông báo lỗi nếu không gửi được

## Xử Lý Lỗi

### Nếu dữ liệu không xuất hiện trong Google Sheets:

1. **Kiểm tra Console**:
   - Mở DevTools (F12) > Console
   - Xem có lỗi không

2. **Kiểm tra URL trong config.js**:
   - Đảm bảo URL đúng format
   - Phải kết thúc bằng `/exec`

3. **Kiểm tra quyền Apps Script**:
   - Vào Apps Script editor
   - Click **Deploy** > **Manage deployments**
   - Kiểm tra "Who has access" phải là **Anyone**

4. **Test Apps Script trực tiếp**:
   - Trong Apps Script editor
   - Chọn function `testDoPost` từ dropdown
   - Click **Run**
   - Xem kết quả trong **Execution log**

### Nếu báo lỗi CORS:

- Đây là bình thường với Google Apps Script
- Code đã xử lý với `mode: 'no-cors'`
- Miễn là không có lỗi khác, dữ liệu vẫn được lưu

## Cập Nhật Apps Script (Nếu Cần)

Nếu cần sửa code Apps Script sau khi đã deploy:

1. Sửa code trong Apps Script editor
2. Click **Save**
3. Click **Deploy** > **Manage deployments**
4. Click **✏️ Edit** ở deployment hiện tại
5. Trong **Version**, chọn **New version**
6. Click **Deploy**
7. **Không cần** thay đổi URL trong config.js

## Bảo Mật

⚠️ **Lưu ý bảo mật**:
- Web app URL là public, ai cũng có thể gửi dữ liệu
- Cân nhắc thêm validation trong Apps Script nếu cần
- Có thể thêm Google reCAPTCHA để chống spam

## Hỗ Trợ

Nếu gặp vấn đề:
1. Kiểm tra Console log (F12)
2. Kiểm tra Execution log trong Apps Script
3. Đảm bảo format dữ liệu đúng
4. Kiểm tra quyền truy cập của Apps Script

---

**Chúc bạn thành công!** 🎉
