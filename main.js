/**
 * main.js — Головний JavaScript-файл сайту DRIFT
 * Містить усю інтерактивну логіку, винесену з HTML-сторінок.
 */

// ============================================================
// Ініціалізація після завантаження DOM
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    initHeroParallax();
    initTitleHoverEffect();
    initMobileMenu();
});

// ============================================================
// Функції
// ============================================================

/**
 * Керування мобільним меню.
 */
function initMobileMenu() {
    const openBtn = document.getElementById('mobile-menu-open');
    const overlay = document.getElementById('mobile-menu-overlay');
    const closeBtn = document.getElementById('mobile-menu-close');
    const links = document.querySelectorAll('.mobile-nav-link');

    if (!openBtn || !overlay) {
        console.warn('Mobile menu elements not found:', { openBtn, overlay });
        return;
    }

    const openMenu = () => {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    openBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openMenu();
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeMenu);
    }

    links.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeMenu();
    });
}

/**
 * Ефект паралаксу для Hero-зображення на головній сторінці.
 * При русі миші зображення злегка зміщується, створюючи глибину.
 * 
 * Використовується на: index.html
 * Залежності: елемент з класом .manga-image-container та .manga-image
 */
function initHeroParallax() {
    const container = document.querySelector('.manga-image-container');
    const image = document.querySelector('.manga-image');

    if (!container || !image) return;

    container.addEventListener('mousemove', (e) => {
        const { width, height } = container.getBoundingClientRect();
        const mouseX = e.clientX - container.offsetLeft;
        const mouseY = e.clientY - container.offsetTop;

        // Обчислюємо відхилення (-10px до 10px)
        const moveX = (mouseX / width - 0.5) * 20;
        const moveY = (mouseY / height - 0.5) * 20;

        image.style.transform = `scale(1.1) translate(${moveX}px, ${moveY}px)`;
    });

    /** Повертає зображення в центр, коли миша виходить за межі */
    container.addEventListener('mouseleave', () => {
        image.style.transform = 'scale(1) translate(0, 0)';
    });
}

/**
 * Інтерактивний ефект для заголовка "Отримати ліцензію пілота".
 * При наведенні заголовок злегка збільшується.
 * 
 * Використовується на: registration.html
 * Залежності: елемент з id="main-title"
 */
function initTitleHoverEffect() {
    const title = document.getElementById('main-title');

    if (!title) return;

    /** Збільшує заголовок при mouseenter */
    title.addEventListener('mouseenter', () => {
        title.style.transform = 'scale(1.1)';
    });

    /** Повертає заголовок до звичайного розміру */
    title.addEventListener('mouseleave', () => {
        title.style.transform = 'scale(1)';
    });
}
