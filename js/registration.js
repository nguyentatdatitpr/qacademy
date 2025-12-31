// Registration Form - Dropdown Logic & Countdown Timer
(function() {
    'use strict';

    // Course Classes Data
    const courseClasses = {
        'q-therapist': [
            { value: 'therapist-1', label: 'Q-Therapist Gói 1' },
            { value: 'therapist-2', label: 'Q-Therapist Gói 2' },
            { value: 'therapist-3', label: 'Q-Therapist Gói 3' },
            { value: 'therapist-4', label: 'Q-Therapist Gói 4' },
            { value: 'therapist-5', label: 'Q-Therapist Gói 5' }
        ],
        'q-professional': [
            { value: 'professional-1', label: 'Phục hồi và thư giãn' },
            { value: 'professional-2', label: 'Năng Lượng & Cơ Xương Khớp' },
            { value: 'professional-3', label: 'Thanh Lọc & Giảm Đau' },
            { value: 'professional-4', label: 'Phục Hồi Thể Lực & Tái Tạo' },
            { value: 'professional-5', label: 'Sạch Mụn Sáng Da' },
            { value: 'professional-6', label: 'Trẻ Hóa Chuyên Sâu' },
            { value: 'professional-7', label: 'Xóa Nhăn & Phục Hồi' },
            { value: 'professional-8', label: 'Phục hồi năng lượng' },
            { value: 'professional-9', label: 'Cân Bằng Thân Tâm' },
            { value: 'professional-10', label: 'Đặc Trị Cơ Xương Khớp' }
        ],
        'q-skill': [
            { value: 'skill-1', label: 'Massage Phục Hồi-Cạo Gió' },
            { value: 'skill-2', label: 'Massage Thái' },
            { value: 'skill-3', label: 'Massage dành riêng cho mẹ Bầu' },
            { value: 'skill-4', label: 'Massage Thụy Điển' },
            { value: 'skill-5', label: 'Massage Foot' },
            { value: 'skill-6', label: 'Massage Thảo Dược' },
            { value: 'skill-7', label: 'Massage Shiatsu' },
            { value: 'skill-8', label: 'Massage Bali' },
            { value: 'skill-9', label: 'Massage Đá Nóng' },
            { value: 'skill-10', label: 'Massage cho người đánh Golf' },
            { value: 'skill-11', label: 'Chăm sóc da mặt căn bản' }
        ]
    };

    // Elements
    const courseSelect = document.getElementById('courseSelect');
    const classSelect = document.getElementById('classSelect');
    const registrationForm = document.getElementById('registrationForm');

    // Countdown Elements
    const daysEl = document.getElementById('countdownDays');
    const hoursEl = document.getElementById('countdownHours');
    const minutesEl = document.getElementById('countdownMinutes');
    const secondsEl = document.getElementById('countdownSeconds');

    // ===== DROPDOWN LOGIC =====
    if (courseSelect && classSelect) {
        courseSelect.addEventListener('change', function() {
            const selectedCourse = this.value;

            // Reset class select
            classSelect.innerHTML = '<option value="">Chọn lớp học quan tâm</option>';

            if (selectedCourse && courseClasses[selectedCourse]) {
                // Enable class select
                classSelect.disabled = false;

                // Populate classes
                courseClasses[selectedCourse].forEach(function(classItem) {
                    const option = document.createElement('option');
                    option.value = classItem.value;
                    option.textContent = classItem.label;
                    classSelect.appendChild(option);
                });
            } else {
                // Disable class select if no course selected
                classSelect.disabled = true;
            }
        });
    }

    // ===== FORM SUBMISSION =====
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const course = courseSelect ? courseSelect.value : '';
            const classSelected = classSelect ? classSelect.value : '';

            // Simple validation
            if (!name || !phone || !course || !classSelected) {
                alert('Vui lòng điền đầy đủ thông tin!');
                return;
            }

            // Phone validation (Vietnam)
            const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
            if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
                alert('Số điện thoại không hợp lệ!');
                return;
            }

            // Get full names from selected options
            const courseText = courseSelect.options[courseSelect.selectedIndex].text;
            const classText = classSelect.options[classSelect.selectedIndex].text;

            // Disable submit button to prevent double submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Đang gửi...';

            // Send data to Google Sheets
            sendToGoogleSheets({
                fullname: name,
                phone: phone,
                course: courseText,
                class: classText,
                source: 'Footer Form'
            })
            .then(response => {
                // Success message
                alert('Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.');

                // Reset form
                registrationForm.reset();
                classSelect.disabled = true;
                classSelect.innerHTML = '<option value="">Chọn lớp học quan tâm</option>';
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Có lỗi xảy ra khi gửi đăng ký. Vui lòng thử lại sau hoặc liên hệ hotline: 0987 654 321');
            })
            .finally(() => {
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            });
        });
    }

    /**
     * Send data to Google Sheets
     */
    function sendToGoogleSheets(data) {
        // Check if Google Script URL is configured
        if (!CONFIG || !CONFIG.GOOGLE_SCRIPT_URL || CONFIG.GOOGLE_SCRIPT_URL === 'PASTE_YOUR_GOOGLE_SCRIPT_URL_HERE') {
            console.warn('Google Script URL not configured. Skipping submission to Google Sheets.');
            // Return a resolved promise to allow form to continue
            return Promise.resolve({ status: 'success' });
        }

        console.log('📤 Sending data to Google Sheets:', data);
        console.log('🔗 URL:', CONFIG.GOOGLE_SCRIPT_URL);

        return fetch(CONFIG.GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Required for Google Apps Script
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            console.log('✅ Request sent successfully (no-cors mode, cannot read response)');
            // Note: With no-cors mode, we can't read the response
            // We assume success if no error is thrown
            return { status: 'success' };
        })
        .catch(error => {
            console.error('❌ Error sending to Google Sheets:', error);
            throw error;
        });
    }

    // ===== COUNTDOWN TIMER =====
    function initCountdown() {
        function getEndOfDay() {
            const now = new Date();
            const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
            return endOfDay;
        }

        let endDate = getEndOfDay();

        function updateCountdown() {
            const now = new Date();
            let distance = endDate - now;

            // If countdown reached 0, reset to end of new day (24h)
            if (distance < 0) {
                endDate = getEndOfDay();
                distance = endDate - now;
            }

            const hours = Math.floor(distance / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Days always 00 since we countdown to end of day
            if (daysEl) daysEl.textContent = '00';
            if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
            if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
            if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
        }

        // Initial update
        updateCountdown();

        // Update every second
        setInterval(updateCountdown, 1000);
    }

    // Initialize countdown
    if (daysEl && hoursEl && minutesEl && secondsEl) {
        initCountdown();
    }
})();
