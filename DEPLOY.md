# HƯỚNG DẪN DEPLOY WEBSITE QACADEMY

## 📦 Chuẩn bị trước khi deploy

1. **Kiểm tra tất cả files:**
   - ✅ index.html
   - ✅ css/ (tất cả files CSS)
   - ✅ js/ (tất cả files JavaScript)
   - ✅ assets/images/ (logo.png, banner-bg.jpg)

2. **Test local:**
   ```bash
   # Cài đặt serve (chỉ cần 1 lần)
   npm install -g serve
   
   # Chạy local server
   serve .
   
   # Hoặc sử dụng npm script
   npm start
   ```

3. **Mở trình duyệt:** http://localhost:3000

---

## 🚀 PHƯƠNG PHÁP 1: NETLIFY (Khuyến nghị - Dễ nhất)

### Cách A: Drag & Drop (Không cần Git)

1. Truy cập: https://app.netlify.com/drop
2. Kéo thả toàn bộ thư mục `QAAAAAAAAAAAAAAAAA` vào
3. Đợi 30 giây - Website sẽ online!
4. Netlify sẽ cung cấp URL dạng: `https://random-name.netlify.app`

### Cách B: Deploy qua Git (Tự động update)

1. **Tạo Git repository:**
   ```bash
   cd e:\QAAAAAAAAAAAAAAAAA
   git init
   git add .
   git commit -m "Initial commit - QAcademy website"
   ```

2. **Push lên GitHub:**
   ```bash
   # Tạo repo mới trên github.com
   git remote add origin https://github.com/YOUR_USERNAME/qacademy.git
   git branch -M main
   git push -u origin main
   ```

3. **Connect với Netlify:**
   - Đăng nhập Netlify
   - Click "New site from Git"
   - Chọn GitHub repository
   - Deploy settings để mặc định
   - Click "Deploy site"

4. **Custom domain (Optional):**
   - Site settings > Domain management
   - Add custom domain
   - Cập nhật DNS records

---

## 🌐 PHƯƠNG PHÁP 2: VERCEL

### Deploy qua CLI:

1. **Cài đặt Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   cd e:\QAAAAAAAAAAAAAAAAA
   vercel
   ```

4. **Làm theo prompts:**
   - Set up and deploy? Y
   - Which scope? (chọn account của bạn)
   - Link to existing project? N
   - Project name? qacademy
   - Directory? ./
   - Override settings? N

5. **Production deploy:**
   ```bash
   vercel --prod
   ```

### Deploy qua Git:

1. Push code lên GitHub (như hướng dẫn Netlify)
2. Truy cập: https://vercel.com/new
3. Import GitHub repository
4. Click "Deploy"

---

## 🖥️ PHƯƠNG PHÁP 3: GITHUB PAGES (Miễn phí)

1. **Push code lên GitHub** (xem hướng dẫn trên)

2. **Enable GitHub Pages:**
   - Vào repository settings
   - Scroll xuống "Pages"
   - Source: Deploy from a branch
   - Branch: main / (root)
   - Save

3. **Truy cập website:**
   - URL: `https://YOUR_USERNAME.github.io/qacademy/`
   - Đợi 2-3 phút để deploy

4. **Custom domain (Optional):**
   - Add file `CNAME` với nội dung: `yourdomain.com`
   - Cập nhật DNS: CNAME record trỏ đến `YOUR_USERNAME.github.io`

---

## 📤 PHƯƠNG PHÁP 4: HOSTING TRUYỀN THỐNG (cPanel/FTP)

### Qua cPanel File Manager:

1. **Nén thư mục:**
   ```bash
   # Tạo file zip
   Compress-Archive -Path e:\QAAAAAAAAAAAAAAAAA\* -DestinationPath e:\qacademy.zip
   ```

2. **Upload:**
   - Đăng nhập cPanel
   - File Manager
   - Vào thư mục `public_html`
   - Upload `qacademy.zip`
   - Extract (giải nén)

3. **Kiểm tra:**
   - Đảm bảo `index.html` ở thư mục gốc `public_html`
   - Truy cập: `http://yourdomain.com`

### Qua FTP (FileZilla):

1. **Kết nối FTP:**
   - Host: ftp.yourdomain.com
   - Username: (từ hosting)
   - Password: (từ hosting)
   - Port: 21

2. **Upload files:**
   - Local site: `e:\QAAAAAAAAAAAAAAAAA`
   - Remote site: `/public_html`
   - Kéo thả tất cả files

3. **Set permissions:**
   - Folders: 755
   - Files: 644

---

## 🔧 PHƯƠNG PHÁP 5: FIREBASE HOSTING

1. **Cài đặt Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login:**
   ```bash
   firebase login
   ```

3. **Init project:**
   ```bash
   cd e:\QAAAAAAAAAAAAAAAAA
   firebase init hosting
   ```

4. **Config:**
   - Use existing project hoặc create new
   - Public directory: `.` (current directory)
   - Single-page app: No
   - GitHub deploys: No

5. **Deploy:**
   ```bash
   firebase deploy
   ```

6. **URL:** `https://PROJECT_ID.web.app`

---

## ✅ CHECKLIST SAU KHI DEPLOY

- [ ] Website hiển thị đúng
- [ ] Header cố định hoạt động
- [ ] Menu mobile hoạt động
- [ ] Hình ảnh load đầy đủ
- [ ] Responsive trên mobile
- [ ] Buttons hoạt động
- [ ] Smooth scroll hoạt động
- [ ] Console không có lỗi (F12)

---

## 🐛 XỬ LÝ LỖI THƯỜNG GẶP

### Lỗi: Hình ảnh không hiển thị
```
Nguyên nhân: Đường dẫn sai
Giải pháp: Kiểm tra đường dẫn trong index.html
- Đúng: assets/images/logo.png
- Sai: /assets/images/logo.png (với hosting con)
```

### Lỗi: CSS không load
```
Nguyên nhân: MIME type sai
Giải pháp: Thêm .htaccess (Apache):
AddType text/css .css
AddType application/javascript .js
```

### Lỗi: 404 Not Found
```
Nguyên nhân: File không đúng vị trí
Giải pháp: Đảm bảo index.html ở thư mục gốc
```

---

## 📊 SO SÁNH CÁC PHƯƠNG PHÁP

| Phương pháp | Độ khó | Tốc độ | Miễn phí | SSL | Custom Domain |
|-------------|--------|--------|----------|-----|---------------|
| Netlify     | ⭐     | ⚡⚡⚡  | ✅       | ✅  | ✅            |
| Vercel      | ⭐⭐   | ⚡⚡⚡  | ✅       | ✅  | ✅            |
| GitHub Pages| ⭐⭐   | ⚡⚡    | ✅       | ✅  | ✅            |
| cPanel/FTP  | ⭐⭐⭐ | ⚡     | ❌       | Tùy | ✅            |
| Firebase    | ⭐⭐⭐ | ⚡⚡⚡  | ✅*      | ✅  | ✅            |

*Firebase: Miễn phí với giới hạn bandwidth

---

## 🎯 KHUYẾN NGHỊ

**Cho người mới:**
- ✅ Netlify Drag & Drop (Dễ nhất)

**Cho developer:**
- ✅ Vercel hoặc Netlify với Git (Tự động deploy)

**Cho doanh nghiệp:**
- ✅ Hosting truyền thống với custom domain

---

## 📞 HỖ TRỢ

Nếu gặp vấn đề, kiểm tra:
1. Browser Console (F12) - xem lỗi JavaScript
2. Network tab - xem files nào không load
3. Responsive mode - test mobile view

**Chúc bạn deploy thành công! 🚀**
