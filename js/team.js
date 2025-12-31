// Team Members Carousel for Mobile
(function() {
    'use strict';

    const carousel = document.getElementById('teamCarousel');
    const prevBtn = document.getElementById('teamPrev');
    const nextBtn = document.getElementById('teamNext');

    if (!carousel || !prevBtn || !nextBtn) return;

    let currentIndex = 0;
    const members = carousel.querySelectorAll('.team-member');
    const totalMembers = members.length;

    // Drag to scroll variables
    let isDown = false;
    let startX;
    let scrollLeft;
    let velX = 0;
    let momentumID;

    // Update button states
    function updateButtons() {
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === totalMembers - 1;
    }

    // Scroll to specific member
    function scrollToMember(index) {
        if (index < 0 || index >= totalMembers) return;

        currentIndex = index;
        const member = members[index];

        if (member) {
            const scrollLeftPos = member.offsetLeft - (carousel.offsetWidth - member.offsetWidth) / 2;
            carousel.scrollTo({
                left: scrollLeftPos,
                behavior: 'smooth'
            });
        }

        updateButtons();
    }

    // Previous button click
    prevBtn.addEventListener('click', function() {
        scrollToMember(currentIndex - 1);
    });

    // Next button click
    nextBtn.addEventListener('click', function() {
        scrollToMember(currentIndex + 1);
    });

    // Update current index on scroll
    carousel.addEventListener('scroll', function() {
        const currentScrollLeft = carousel.scrollLeft;
        const memberWidth = members[0].offsetWidth;
        const gap = 24;

        const newIndex = Math.round(currentScrollLeft / (memberWidth + gap));

        if (newIndex !== currentIndex && newIndex >= 0 && newIndex < totalMembers) {
            currentIndex = newIndex;
            updateButtons();
        }
    });

    // ===== DRAG TO SCROLL (Mouse) =====
    carousel.addEventListener('mousedown', function(e) {
        isDown = true;
        carousel.classList.add('dragging');
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
        cancelMomentum();
    });

    carousel.addEventListener('mouseleave', function() {
        if (isDown) {
            isDown = false;
            carousel.classList.remove('dragging');
        }
    });

    carousel.addEventListener('mouseup', function() {
        isDown = false;
        carousel.classList.remove('dragging');
        beginMomentum();
    });

    carousel.addEventListener('mousemove', function(e) {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 1.5;
        velX = carousel.scrollLeft - scrollLeft + walk;
        carousel.scrollLeft = scrollLeft - walk;
    });

    // ===== TOUCH DRAG (Mobile) =====
    carousel.addEventListener('touchstart', function(e) {
        isDown = true;
        carousel.classList.add('dragging');
        startX = e.touches[0].pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
        cancelMomentum();
    }, { passive: true });

    carousel.addEventListener('touchend', function() {
        isDown = false;
        carousel.classList.remove('dragging');
        beginMomentum();
    });

    carousel.addEventListener('touchmove', function(e) {
        if (!isDown) return;
        const x = e.touches[0].pageX - carousel.offsetLeft;
        const walk = (x - startX) * 1.2;
        velX = carousel.scrollLeft - scrollLeft + walk;
        carousel.scrollLeft = scrollLeft - walk;
    }, { passive: true });

    // ===== MOMENTUM SCROLLING =====
    function beginMomentum() {
        cancelMomentum();
        momentumID = requestAnimationFrame(momentumLoop);
    }

    function cancelMomentum() {
        cancelAnimationFrame(momentumID);
    }

    function momentumLoop() {
        carousel.scrollLeft += velX * 0.05;
        velX *= 0.95;
        if (Math.abs(velX) > 0.5) {
            momentumID = requestAnimationFrame(momentumLoop);
        }
    }

    // Initialize button states
    updateButtons();

    // Re-initialize on window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 768) {
                currentIndex = 0;
                carousel.scrollTo({ left: 0, behavior: 'auto' });
            }
            updateButtons();
        }, 250);
    });
})();
