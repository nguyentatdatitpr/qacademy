// Courses Section - Horizontal Scroll Navigation
document.addEventListener('DOMContentLoaded', function() {
    initCourseScrollNavigation();
});

function initCourseScrollNavigation() {
    const categories = document.querySelectorAll('.course-category');

    categories.forEach(category => {
        const scrollContainer = category.querySelector('.category-courses');
        const prevBtn = category.querySelector('.scroll-prev');
        const nextBtn = category.querySelector('.scroll-next');

        if (!scrollContainer || !prevBtn || !nextBtn) return;

        // Card width + gap
        const cardWidth = 320;
        const gap = 24;
        const scrollAmount = cardWidth + gap;

        // Update button states
        function updateButtonStates() {
            const scrollLeft = scrollContainer.scrollLeft;
            const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;

            prevBtn.disabled = scrollLeft <= 0;
            nextBtn.disabled = scrollLeft >= maxScroll - 1;
        }

        // Scroll to previous
        prevBtn.addEventListener('click', function() {
            scrollContainer.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        // Scroll to next
        nextBtn.addEventListener('click', function() {
            scrollContainer.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        // Update button states on scroll
        scrollContainer.addEventListener('scroll', updateButtonStates);

        // Initial button state
        updateButtonStates();

        // Update on window resize
        window.addEventListener('resize', updateButtonStates);

        // Drag to scroll functionality
        let isDown = false;
        let startX;
        let scrollLeft;

        scrollContainer.addEventListener('mousedown', (e) => {
            // Ignore if clicking on a link or button
            if (e.target.closest('a, button')) return;

            isDown = true;
            scrollContainer.classList.add('dragging');
            startX = e.pageX - scrollContainer.offsetLeft;
            scrollLeft = scrollContainer.scrollLeft;
        });

        scrollContainer.addEventListener('mouseleave', () => {
            isDown = false;
            scrollContainer.classList.remove('dragging');
        });

        scrollContainer.addEventListener('mouseup', () => {
            isDown = false;
            scrollContainer.classList.remove('dragging');
        });

        scrollContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - scrollContainer.offsetLeft;
            const walk = (x - startX) * 1.5; // Scroll speed multiplier
            scrollContainer.scrollLeft = scrollLeft - walk;
        });
    });
}
