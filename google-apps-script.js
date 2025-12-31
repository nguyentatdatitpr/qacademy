/**
 * Google Apps Script for Q Academy Registration Form
 *
 * HƯỚNG DẪN CÀI ĐẶT:
 * 1. Mở Google Sheets của bạn
 * 2. Vào Extensions > Apps Script
 * 3. Xóa code mặc định và paste code này vào
 * 4. Đổi tên Sheet trong biến SHEET_NAME nếu cần (mặc định là "Registrations")
 * 5. Click Deploy > New deployment
 * 6. Chọn type: Web app
 * 7. Execute as: Me
 * 8. Who has access: Anyone
 * 9. Click Deploy và copy Web app URL
 * 10. Paste URL đó vào file config.js (sẽ tạo ở bước sau)
 */

// Tên sheet để lưu dữ liệu (đổi tên nếu cần)
const SHEET_NAME = 'Registrations';

/**
 * Xử lý POST request từ form
 */
function doPost(e) {
  try {
    // Parse JSON data
    const data = JSON.parse(e.postData.contents);

    // Lấy spreadsheet hiện tại
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    // Nếu sheet chưa tồn tại, tạo mới và thêm header
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        'Timestamp',
        'Họ và tên',
        'Số điện thoại',
        'Khóa học',
        'Lớp học',
        'Nguồn'
      ]);

      // Format header row
      const headerRange = sheet.getRange(1, 1, 1, 6);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#8B9A5B');
      headerRange.setFontColor('#FFFFFF');
    }

    // Thêm dữ liệu mới
    sheet.appendRow([
      new Date(), // Timestamp
      data.fullname || '',
      data.phone || '',
      data.course || '',
      data.class || '',
      data.source || 'Website' // Nguồn: Modal hoặc Footer Form
    ]);

    // Trả về response thành công
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Đăng ký thành công!'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Trả về response lỗi
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Test function để kiểm tra
 */
function testDoPost() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        fullname: 'Nguyễn Văn A',
        phone: '0987654321',
        course: 'q-therapist',
        class: 'therapist-1',
        source: 'Modal'
      })
    }
  };

  const result = doPost(testData);
  Logger.log(result.getContent());
}
