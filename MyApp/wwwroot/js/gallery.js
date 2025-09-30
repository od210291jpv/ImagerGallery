'use strict';

document.addEventListener('DOMContentLoaded', () => {
    // --- Элементы DOM ---
    const galleryContainer = document.getElementById('gallery');
    const paginationContainer = document.getElementById('pagination');
    const searchInput = document.getElementById('search-input');
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const modalCaption = document.getElementById('modal-caption');
    const closeModalBtn = document.querySelector('.close-modal');

    // --- Состояние приложения ---
    const state = {
        currentPage: 1,
        imagesPerPage: 12,
        totalPages: 0,
        currentQuery: '',
    };

    // --- Функции ---

    /**
     * Основная функция для получения и отображения изображений
     * @param {number} page - Номер страницы для запроса
     * @param {string} query - Поисковый запрос
     */
    async function fetchAndDisplayImages(page = 1, query = '') {
        state.currentPage = page;
        state.currentQuery = query;
        galleryContainer.innerHTML = '<p>Загрузка...</p>'; // Показываем индикатор загрузки

        try {
            const params = new URLSearchParams({
                page: state.currentPage,
                pageSize: state.imagesPerPage,
                query: state.currentQuery,
            });

            const response = await axios.get(`/Home/images?${params}`);
            const { items, totalCount } = response.data;

            state.totalPages = Math.ceil(totalCount / state.imagesPerPage);

            renderImages(items);
            updatePagination();
        } catch (error) {
            console.error('Ошибка при загрузке изображений:', error);
            galleryContainer.innerHTML = '<p>Не удалось загрузить изображения. Попробуйте снова.</p>';
        }
    }

    /**
     * Отрисовывает изображения в галерее
     * @param {Array} images - Массив объектов изображений
     */
    function renderImages(images) {
        galleryContainer.innerHTML = '';
        if (images.length === 0) {
            galleryContainer.innerHTML = '<p>Ничего не найдено.</p>';
            return;
        }

        const fragment = document.createDocumentFragment();
        images.forEach(image => {
            const figure = document.createElement('figure');
            figure.className = 'gallery-item';
            // Сохраняем данные для модального окна
            figure.dataset.imageUrl = image.source;
            figure.dataset.description = image.description;

            const img = document.createElement('img');
            img.src = image.source;
            img.alt = image.alt || image.description;
            img.loading = 'lazy'; // Отложенная загрузка изображений

            const figcaption = document.createElement('figcaption');
            figcaption.className = 'image-description';
            figcaption.textContent = image.description;

            figure.append(img, figcaption);
            fragment.appendChild(figure);
        });
        galleryContainer.appendChild(fragment);
    }

    /**
     * Обновляет кнопки пагинации, делая их "умными"
     */
    function updatePagination() {
        paginationContainer.innerHTML = '';
        if (state.totalPages <= 1) return;

        // Логика для создания кнопок: << < 1 ... 5 6 7 ... 12 > >>
        const createButton = (text, page, isDisabled = false, isActive = false) => {
            const btn = document.createElement('button');
            btn.className = 'page-btn';
            btn.textContent = text;
            btn.disabled = isDisabled;
            if (isActive) btn.classList.add('active');
            btn.addEventListener('click', () => fetchAndDisplayImages(page, state.currentQuery));
            return btn;
        };

        // Кнопки "назад"
        paginationContainer.append(createButton('<', state.currentPage - 1, state.currentPage === 1));

        // Основные кнопки страниц (сокращенная логика для примера)
        // В реальном проекте здесь будет более сложная логика с "..."
        for (let i = 1; i <= state.totalPages; i++) {
            paginationContainer.append(createButton(i, i, false, i === state.currentPage));
        }

        // Кнопки "вперед"
        paginationContainer.append(createButton('>', state.currentPage + 1, state.currentPage === state.totalPages));
    }

    /**
     * Функция для задержки выполнения (для "умного" поиска)
     * @param {Function} func - Функция для вызова
     * @param {number} delay - Задержка в мс
     */
    function debounce(func, delay = 500) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    }

    // --- Обработчики событий ---

    const debouncedSearch = debounce((event) => {
        fetchAndDisplayImages(1, event.target.value.trim());
    });
    searchInput.addEventListener('input', debouncedSearch);

    // Делегирование событий для открытия модального окна
    galleryContainer.addEventListener('click', (event) => {
        const item = event.target.closest('.gallery-item');
        if (item) {
            modalImage.src = item.dataset.imageUrl;
            modalCaption.textContent = item.dataset.description;
            modal.classList.add('visible');
        }
    });

    // Закрытие модального окна
    closeModalBtn.addEventListener('click', () => modal.classList.remove('visible'));
    modal.addEventListener('click', (event) => {
        event.preventDefault();
        if (event.target != modal) { // Закрытие по клику на фон
            modal.classList.remove('visible');
        }
    });

    // --- Инициализация ---
    fetchAndDisplayImages(state.currentPage, state.currentQuery);
});