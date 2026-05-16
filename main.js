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
    applyParagraphFontSize();
});

// ============================================================
// Функції
// ============================================================

/**
 * Ефект паралаксу для hero-зображення на головній сторінці.
 * При русі миші по контейнеру зображення плавно зміщується,
 * створюючи ефект глибини. При виході курсору — повертається у вихідну позицію.
 *
 * Використовується на: index.html
 * Залежності: елементи з класами .manga-image-container та .manga-image
 */
function initHeroParallax() {
    const container = document.querySelector('.manga-image-container');
    const image = document.querySelector('.manga-image');

    if (!container || !image) return;

    /** Зміщує зображення слідом за позицією курсору */
    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Розрахунок зміщення: від -10px до +10px відносно центру
        const xMove = ((x / rect.width) - 0.5) * 20;
        const yMove = ((y / rect.height) - 0.5) * 20;

        image.style.transform = `scale(1.1) translate(${xMove}px, ${yMove}px)`;
    });

    /** Повертає зображення у вихідну позицію при виході курсору */
    container.addEventListener('mouseleave', () => {
        image.style.transform = 'scale(1) translate(0px, 0px)';
    });
}

/**
 * Ефект масштабування заголовка при наведенні курсору.
 * Заголовок плавно збільшується (scale 1.1) при hover
 * і повертається до звичайного розміру при mouseleave.
 *
 * Використовується на: registration.html
 * Залежності: елемент з id="main-title"
 */
function initTitleHoverEffect() {
    const title = document.getElementById('main-title');

    if (!title) return;

    /** Збільшує заголовок при наведенні */
    title.addEventListener('mouseenter', () => {
        title.style.transform = 'scale(1.1)';
    });

    /** Повертає заголовок до звичайного розміру */
    title.addEventListener('mouseleave', () => {
        title.style.transform = 'scale(1)';
    });
}

/**
 * Встановлює розмір шрифту 80px для всіх параграфів на сторінці.
 *
 * Використовується на: index.html
 * Примітка: Ця функція зберігає оригінальну поведінку inline-скрипту.
 */
function applyParagraphFontSize() {
    const paragraphs = document.getElementsByTagName('p');

    for (let i = 0; i < paragraphs.length; i++) {
        paragraphs[i].style.fontSize = '80px';
    }
}
