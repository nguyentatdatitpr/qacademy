# QAcademy Website

Website chuyên nghiệp cho nền tảng đào tạo QAcademy, được thiết kế theo Figma design với header và banner đẹp mắt.

## 🚀 Tính năng

- ✅ Header cố định với hiệu ứng scroll
- ✅ Banner hero section với gradient overlay
- ✅ Responsive design (Desktop, Tablet, Mobile)
- ✅ Menu mobile với animation mượt mà
- ✅ Smooth scroll navigation
- ✅ Parallax effect cho banner
- ✅ SEO-friendly structure
- ✅ Modular CSS architecture
- ✅ Vanilla JavaScript (không cần framework)

## 📁 Cấu trúc thư mục

```
QAAAAAAAAAAAAAAAAA/
├── index.html              # Trang chủ
├── css/
│   ├── reset.css          # CSS reset
│   ├── variables.css      # Design tokens
│   ├── header.css         # Header styles
│   ├── banner.css         # Banner styles
│   └── main.css           # Main content styles
├── js/
│   ├── header.js          # Header functionality
│   └── main.js            # Main app logic
├── assets/
│   └── images/
│       ├── logo.png       # Logo QAcademy
│       └── banner-bg.jpg  # Banner background
└── README.md              # File này
```

## 🎨 Design System

### Colors
- Primary: `#4f5664`
- White: `#ffffff`
- Black: `#111111`
- Overlay: `rgba(17, 17, 17, 0.8)`

### Typography
- Font Family: Be Vietnam Pro
- Weights: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)

### Spacing
- XS: 4px
- SM: 8px
- MD: 16px
- LG: 32px
- XL: 64px
- 2XL: 120px

## 🌐 Deploy lên Hosting

### Cách 1: Upload trực tiếp qua FTP/cPanel
1. Nén toàn bộ thư mục thành file .zip
2. Đăng nhập vào cPanel của hosting
3. Vào File Manager
4. Upload và giải nén vào thư mục `public_html`
5. Đảm bảo file `index.html` nằm ở thư mục gốc

### Cách 2: Deploy lên Netlify (Miễn phí)
1. Tạo tài khoản tại [netlify.com](https://netlify.com)
2. Kéo thả thư mục vào Netlify Drop
3. Website sẽ được deploy tự động

### Cách 3: Deploy lên Vercel (Miễn phí)
1. Tạo tài khoản tại [vercel.com](https://vercel.com)
2. Cài đặt Vercel CLI: `npm i -g vercel`
3. Chạy lệnh: `vercel` trong thư mục project
4. Làm theo hướng dẫn

### Cách 4: Deploy lên GitHub Pages (Miễn phí)
1. Tạo repository mới trên GitHub
2. Push code lên repository
3. Vào Settings > Pages
4. Chọn branch và thư mục
5. Save và đợi deploy

## 📝 Cách sử dụng

### 1. Thay đổi hình ảnh
- Logo: Thay file `assets/images/logo.png`
- Banner: Thay file `assets/images/banner-bg.jpg`

### 2. Chỉnh sửa nội dung
- Mở file `index.html`
- Tìm và thay đổi text trong các thẻ HTML
- Lưu và refresh trình duyệt

### 3. Thay đổi màu sắc
- Mở file `css/variables.css`
- Chỉnh sửa các biến CSS trong `:root`
- Màu sắc sẽ tự động cập nhật toàn bộ website

### 4. Thêm sections mới
- Thêm HTML vào phần `<main class="main-content">`
- Tạo file CSS mới trong thư mục `css/`
- Link file CSS trong `index.html`

## 🔧 Tùy chỉnh

### Thay đổi font chữ
1. Vào [Google Fonts](https://fonts.google.com)
2. Chọn font mới
3. Copy link và thay thế trong `index.html`
4. Cập nhật `--font-family` trong `css/variables.css`

### Điều chỉnh responsive breakpoints
- Mở `css/variables.css`
- Chỉnh sửa các `@media` queries
- Breakpoints mặc định: 1200px, 768px, 480px

### Thêm animations
- Sử dụng class `.animate-on-scroll` cho elements
- Animations sẽ trigger khi scroll đến element
- Tùy chỉnh trong `js/main.js`

## 🐛 Troubleshooting

### Hình ảnh không hiển thị
- Kiểm tra đường dẫn file trong `index.html`
- Đảm bảo file tồn tại trong thư mục `assets/images/`
- Kiểm tra tên file (case-sensitive)

### Menu mobile không hoạt động
- Kiểm tra file `js/header.js` đã được load
- Mở Console (F12) để xem lỗi JavaScript
- Đảm bảo ID elements đúng

### CSS không áp dụng
- Kiểm tra thứ tự load CSS files trong `index.html`
- Clear browser cache (Ctrl + F5)
- Kiểm tra syntax CSS

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📞 Support

Nếu cần hỗ trợ, vui lòng liên hệ:
- Email: support@qacademy.vn
- Website: https://qacademy.vn

## 📄 License

© 2025 QAcademy. All rights reserved.

---

**Lưu ý:** Đây là phiên bản modular sẵn sàng để deploy. Bạn có thể dễ dàng mở rộng thêm các sections như: Courses, About, Team, Footer, etc.
