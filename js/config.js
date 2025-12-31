/**
 * Configuration file for Q Academy
 *
 * HƯỚNG DẪN:
 * 1. Deploy Google Apps Script (xem file google-apps-script.js)
 * 2. Copy Web App URL từ Google Apps Script
 * 3. Paste URL vào biến GOOGLE_SCRIPT_URL bên dưới
 *
 * VÍ DỤ URL:
 * https://script.google.com/macros/s/AKfycby.../exec
 */

const CONFIG = {
    // Google Apps Script Web App URL
    GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbzKfp2ThxID0AXKsbfe-OgZZu9Ed1mH62B6763682Y9-HdWYb7-xladAuaWOpSVLP68/exec',

    // Timeout cho request (milliseconds)
    REQUEST_TIMEOUT: 10000
};

// Export config (nếu sử dụng modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
