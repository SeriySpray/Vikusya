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
    initGarage(); // New function for the Garage page
});

// ... (existing functions)

/**
 * Ініціалізація сторінки Гараж: завантаження даних з локальної БД.
 */
async function initGarage() {
    const container = document.getElementById('garage-container');
    if (!container) return;

    try {
        // Замініть localhost на вашу URL, якщо хостите сервер в іншому місці
        const response = await fetch('http://localhost:3000/api/garage');
        
        if (!response.ok) throw new Error('Помилка завантаження даних');
        
        const drifters = await response.json();
        renderGarage(drifters);
    } catch (error) {
        console.error('Garage loading error:', error);
        container.innerHTML = `
            <div class="col-span-full py-20 text-center border-4 border-dashed border-error bg-error/5 p-10">
                <span class="material-symbols-outlined text-error text-6xl mb-4">database_off</span>
                <h3 class="text-2xl font-black uppercase mb-2">База даних недоступна</h3>
                <p class="text-surface-tint">Переконайтеся, що локальний сервер запущено (node backend/server.js) та CORS налаштовано.</p>
            </div>
        `;
    }
}

/**
 * Рендеринг карток гонщиків.
 */
function renderGarage(drifters) {
    const container = document.getElementById('garage-container');
    if (!container) return;

    container.innerHTML = ''; // Очищуємо лоадер

    drifters.forEach(d => {
        const card = document.createElement('div');
        card.className = "group relative bg-white border-4 border-black p-6 transition-all hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(255,0,0,1)]";
        
        card.innerHTML = `
            <!-- Drifter Header -->
            <div class="flex justify-between items-start mb-6">
                <div>
                    <h3 class="text-3xl font-black italic uppercase leading-tight">${d.name}</h3>
                    <div class="bg-black text-white px-3 py-1 text-sm font-label-bold inline-block mt-1 uppercase tracking-tighter">
                        ${d.nickname || 'PILOT'}
                    </div>
                </div>
                <div class="text-right">
                    <span class="text-xs font-label-bold uppercase text-surface-tint block">Країна</span>
                    <span class="text-lg font-black">${d.nationality}</span>
                </div>
            </div>

            <!-- Image Section -->
            <div class="relative aspect-video mb-6 overflow-hidden border-2 border-black bg-gray-100">
                <img src="${d.photo_url}" alt="${d.name}" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500">
                <div class="absolute bottom-0 left-0 bg-error text-white px-4 py-2 text-sm font-black italic uppercase translate-y-full group-hover:translate-y-0 transition-transform">
                    View Profile
                </div>
            </div>

            <!-- Car Specs (The "Garage" part) -->
            <div class="border-t-2 border-black pt-4">
                <div class="flex items-center gap-2 mb-3">
                    <span class="material-symbols-outlined text-error">settings</span>
                    <h4 class="font-label-bold uppercase tracking-widest text-sm">Технічні характеристики</h4>
                </div>
                
                <div class="grid grid-cols-2 gap-y-3 text-sm">
                    <div>
                        <span class="text-surface-tint block text-[10px] uppercase font-bold">Автомобіль</span>
                        <span class="font-black">${d.brand} ${d.model}</span>
                    </div>
                    <div>
                        <span class="text-surface-tint block text-[10px] uppercase font-bold">Двигун</span>
                        <span class="font-black">${d.engine}</span>
                    </div>
                    <div>
                        <span class="text-surface-tint block text-[10px] uppercase font-bold">Потужність</span>
                        <span class="font-black text-error">${d.hp} HP</span>
                    </div>
                    <div>
                        <span class="text-surface-tint block text-[10px] uppercase font-bold">Статус</span>
                        <span class="font-black">READY</span>
                    </div>
                </div>
                
                <!-- Secondary image (Car) if needed -->
                <!-- <img src="${d.car_photo}" class="hidden"> -->
            </div>

            <!-- Bio -->
            <p class="mt-6 text-sm text-surface-tint line-clamp-2 italic">
                "${d.bio}"
            </p>

            <!-- Decorative Elements -->
            <div class="absolute top-2 right-2 flex gap-1">
                <div class="w-2 h-2 bg-black rounded-full"></div>
                <div class="w-2 h-2 bg-black/20 rounded-full"></div>
            </div>
        `;
        
        container.appendChild(card);
    });
}

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
        document.documentElement.style.overflow = 'hidden';
    };

    const closeMenu = () => {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
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
