/**
 * Registration Modal Handler
 * Handles opening/closing of the registration modal
 */

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
            { value: 'professional-3', label: 'Thanh Lọc & Giảm Đau' }
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

    // Get modal elements
    const modal = document.getElementById('registrationModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const modalForm = document.getElementById('modalForm');

    // Get all registration buttons
    const consultBtn = document.getElementById('consultBtn');
    const bannerCta = document.querySelector('.banner-cta .btn-cta');
    const courseButtons = document.querySelectorAll('.card-btn');
    const ctaBannerBtn = document.querySelector('.cta-banner-btn');

    // Modal Countdown Elements
    const modalDaysEl = document.getElementById('modalCountdownDays');
    const modalHoursEl = document.getElementById('modalCountdownHours');
    const modalMinutesEl = document.getElementById('modalCountdownMinutes');
    const modalSecondsEl = document.getElementById('modalCountdownSeconds');

    // Modal Form Elements
    const modalCourseSelect = document.getElementById('modalCourseSelect');
    const modalClassSelect = document.getElementById('modalClassSelect');

    /**
     * Open Modal
     * @param {string} preSelectedCourse - Optional pre-selected course
     * @param {string} preSelectedClass - Optional pre-selected class
     */
    function openModal(preSelectedCourse = null, preSelectedClass = null) {
        modal.classList.add('active');
        document.body.classList.add('modal-open');

        // Pre-select course and class if provided
        if (preSelectedCourse && modalCourseSelect) {
            modalCourseSelect.value = preSelectedCourse;

            // Trigger change event to populate class dropdown
            const changeEvent = new Event('change');
            modalCourseSelect.dispatchEvent(changeEvent);

            // Pre-select class after dropdown is populated
            if (preSelectedClass && modalClassSelect) {
                setTimeout(() => {
                    modalClassSelect.value = preSelectedClass;
                }, 50);
            }
        }

        // Set focus to first input
        setTimeout(() => {
            const firstInput = modalForm.querySelector('input[type="text"]');
            if (firstInput) {
                firstInput.focus();
            }
        }, 100);
    }

    /**
     * Close Modal
     */
    function closeModal() {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');

        // Reset form
        modalForm.reset();

        // Reset class select
        if (modalClassSelect) {
            modalClassSelect.disabled = true;
            modalClassSelect.innerHTML = '<option value="">Chọn lớp học quan tâm</option>';
        }
    }

    /**
     * Handle Form Submission
     */
    function handleFormSubmit(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(modalForm);
        const fullname = formData.get('fullname');
        const phone = formData.get('phone');
        const course = formData.get('course');
        const classSelected = formData.get('class');

        // Simple validation
        if (!fullname || !phone || !course || !classSelected) {
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
        const courseText = modalCourseSelect.options[modalCourseSelect.selectedIndex].text;
        const classText = modalClassSelect.options[modalClassSelect.selectedIndex].text;

        // Disable submit button to prevent double submission
        const submitBtn = modalForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Đang gửi...';

        // Send data to Google Sheets
        sendToGoogleSheets({
            fullname: fullname,
            phone: phone,
            course: courseText,
            class: classText,
            source: 'Modal'
        })
        .then(response => {
            // Show success message
            alert('Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.');
            // Close modal
            closeModal();
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

    /**
     * Initialize Modal Countdown Timer
     */
    function initModalCountdown() {
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
            if (modalDaysEl) modalDaysEl.textContent = '00';
            if (modalHoursEl) modalHoursEl.textContent = String(hours).padStart(2, '0');
            if (modalMinutesEl) modalMinutesEl.textContent = String(minutes).padStart(2, '0');
            if (modalSecondsEl) modalSecondsEl.textContent = String(seconds).padStart(2, '0');
        }

        // Initial update
        updateCountdown();

        // Update every second
        setInterval(updateCountdown, 1000);
    }

    /**
     * Course/Class Dropdown Logic
     */
    if (modalCourseSelect && modalClassSelect) {
        modalCourseSelect.addEventListener('change', function() {
            const selectedCourse = this.value;

            // Reset class select
            modalClassSelect.innerHTML = '<option value="">Chọn lớp học quan tâm</option>';

            if (selectedCourse && courseClasses[selectedCourse]) {
                // Enable class select
                modalClassSelect.disabled = false;

                // Populate classes
                courseClasses[selectedCourse].forEach(function(classItem) {
                    const option = document.createElement('option');
                    option.value = classItem.value;
                    option.textContent = classItem.label;
                    modalClassSelect.appendChild(option);
                });
            } else {
                // Disable class select if no course selected
                modalClassSelect.disabled = true;
            }
        });
    }

    /**
     * Event Listeners
     */

    // Open modal when clicking registration buttons
    if (consultBtn) {
        consultBtn.addEventListener('click', () => openModal());
    }

    if (bannerCta) {
        bannerCta.addEventListener('click', () => openModal());
    }

    // Handle course card buttons with pre-selection
    if (courseButtons.length > 0) {
        courseButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();

                // Get pre-selected course and class from data attributes
                const course = btn.getAttribute('data-course');
                const classValue = btn.getAttribute('data-class');

                // Open modal with pre-selected values
                openModal(course, classValue);
            });
        });
    }

    if (ctaBannerBtn) {
        ctaBannerBtn.addEventListener('click', () => openModal());
    }

    // Close modal when clicking close button
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Close modal when clicking overlay
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    // Close modal when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Handle form submission
    if (modalForm) {
        modalForm.addEventListener('submit', handleFormSubmit);
    }

    // Prevent modal container clicks from closing modal
    const modalContainer = document.querySelector('.modal-container');
    if (modalContainer) {
        modalContainer.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // Initialize countdown timer for modal
    if (modalDaysEl && modalHoursEl && modalMinutesEl && modalSecondsEl) {
        initModalCountdown();
    }

})();
