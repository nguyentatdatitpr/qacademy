# ⚡ QUICK START - QACADEMY WEBSITE

## 🎯 Mục tiêu đã hoàn thành
✅ Header với logo và navigation menu
✅ Banner hero section với gradient overlay  
✅ Responsive design (Desktop, Tablet, Mobile)
✅ Mobile menu với hamburger icon
✅ Smooth animations và transitions
✅ Sẵn sàng deploy lên hosting

---

## 🚀 DEPLOY NHANH NHẤT (3 BƯỚC)

### Phương pháp 1: NETLIFY DROP (30 giây)
1. Mở: https://app.netlify.com/drop
2. Kéo thả thư mục `QAAAAAAAAAAAAAAAAA` vào
3. ✅ XONG! Website đã online

### Phương pháp 2: VERCEL (1 phút)
```bash
npm i -g vercel
cd e:\QAAAAAAAAAAAAAAAAA
vercel
```

### Phương pháp 3: GITHUB PAGES (2 phút)
```bash
cd e:\QAAAAAAAAAAAAAAAAA
git init
git add .
git commit -m "QAcademy website"
# Tạo repo trên github.com, sau đó:
git remote add origin https://github.com/USERNAME/qacademy.git
git push -u origin main
# Enable Pages trong Settings
```

---

## 🖥️ TEST LOCAL

### Cách 1: Mở trực tiếp
- Double click file `index.html`
- Hoặc: Chuột phải > Open with > Chrome/Firefox

### Cách 2: Local server (Khuyến nghị)
```bash
# Cài serve (chỉ 1 lần)
npm install -g serve

# Chạy server
cd e:\QAAAAAAAAAAAAAAAAA
serve .

# Mở: http://localhost:3000
```

---

## 📁 CẤU TRÚC PROJECT

```
QAAAAAAAAAAAAAAAAA/
│
├── index.html              ← Trang chủ
│
├── css/                    ← Tất cả styles
│   ├── reset.css          ← CSS reset
│   ├── variables.css      ← Design tokens (màu, font, spacing)
│   ├── header.css         ← Header styles
│   ├── banner.css         ← Banner styles
│   └── main.css           ← Main content styles
│
├── js/                     ← JavaScript
│   ├── header.js          ← Header functionality
│   └── main.js            ← Main app logic
│
├── assets/
│   └── images/
│       ├── logo.png       ← Logo QAcademy
│       └── banner-bg.jpg  ← Banner background
│
├── README.md              ← Tài liệu chi tiết
├── DEPLOY.md              ← Hướng dẫn deploy đầy đủ
└── package.json           ← NPM config
```

---

## ✏️ CHỈNH SỬA NHANH

### Thay đổi màu sắc
📝 File: `css/variables.css`
```css
:root {
    --color-primary: #4f5664;  ← Đổi màu chính
    --color-white: #ffffff;
    --color-black: #111111;
}
```

### Thay đổi text
📝 File: `index.html`
- Tìm text cần đổi
- Sửa trực tiếp trong HTML
- Lưu và refresh browser

### Thay đổi hình ảnh
📁 Thư mục: `assets/images/`
- Thay file `logo.png` (Logo)
- Thay file `banner-bg.jpg` (Banner background)
- Giữ nguyên tên file hoặc update trong `index.html`

### Thay đổi font chữ
📝 File: `index.html` (dòng 11-13)
```html
<!-- Đổi font từ Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=YOUR_FONT:wght@400;500;600;700&display=swap" rel="stylesheet">
```

📝 File: `css/variables.css`
```css
--font-family: 'YOUR_FONT', sans-serif;
```

---

## 📱 RESPONSIVE BREAKPOINTS

- **Desktop:** > 1200px
- **Tablet:** 768px - 1200px  
- **Mobile:** < 768px
- **Small Mobile:** < 480px

Test responsive:
1. Mở website
2. Nhấn F12 (Developer Tools)
3. Click icon mobile/tablet
4. Chọn device hoặc resize

---

## 🎨 DESIGN SYSTEM

### Colors
```
Primary:  #4f5664
White:    #ffffff
Black:    #111111
Overlay:  rgba(17, 17, 17, 0.8)
```

### Typography
```
Font: Be Vietnam Pro
Sizes: 16px (base), 18px (nav), 48px (title)
Weights: 400, 500, 600, 700
```

### Spacing
```
XS:  4px    SM:  8px
MD:  16px   LG:  32px
XL:  64px   2XL: 120px
```

---

## ✅ CHECKLIST TRƯỚC KHI DEPLOY

- [ ] Test trên Chrome
- [ ] Test trên Firefox
- [ ] Test trên Safari (nếu có Mac)
- [ ] Test responsive mobile
- [ ] Test menu mobile
- [ ] Kiểm tra tất cả links
- [ ] Kiểm tra tất cả images load
- [ ] Kiểm tra Console không có lỗi (F12)
- [ ] Thay đổi placeholder text (nếu cần)
- [ ] Thay đổi logo/images (nếu cần)

---

## 🆘 LỖI THƯỜNG GẶP

### ❌ Hình ảnh không hiển thị
**Nguyên nhân:** Đường dẫn sai
**Giải pháp:** Kiểm tra `assets/images/` có đủ files

### ❌ CSS không áp dụng
**Nguyên nhân:** Browser cache
**Giải pháp:** Nhấn Ctrl + F5 (hard refresh)

### ❌ Menu mobile không hoạt động
**Nguyên nhân:** JavaScript chưa load
**Giải pháp:** Kiểm tra Console (F12) xem có lỗi

### ❌ Font không đúng
**Nguyên nhân:** Google Fonts bị chặn
**Giải pháp:** Kiểm tra internet connection

---

## 📞 TÀI LIỆU THAM KHẢO

- **README.md** - Tài liệu đầy đủ
- **DEPLOY.md** - Hướng dẫn deploy chi tiết
- **css/variables.css** - Tất cả design tokens
- **index.html** - Cấu trúc HTML

---

## 🎯 TIẾP THEO

Sau khi deploy thành công, bạn có thể:

1. **Thêm sections mới:**
   - Courses section
   - About section
   - Team section
   - Footer

2. **Tích hợp form:**
   - Contact form
   - Registration form
   - Newsletter signup

3. **Thêm tính năng:**
   - Blog
   - Course catalog
   - User authentication
   - Payment integration

4. **Tối ưu SEO:**
   - Meta tags
   - Open Graph
   - Schema markup
   - Sitemap

---

**🎉 Chúc bạn thành công với QAcademy!**

Nếu cần hỗ trợ, xem file `DEPLOY.md` hoặc `README.md`
