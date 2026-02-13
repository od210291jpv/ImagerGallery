'use strict';
// Убираем импорт Apis, так как логика будет встроена здесь
// import { Apis } from "./Modules/apiRequests";

document.addEventListener('DOMContentLoaded', () => {
    // --- Элементы DOM ---
    const feedWrapper = document.getElementById("feed-wrapper");
    const jumpToStartBtn = document.getElementById('jumpToStartBtn');
    const searchInput = document.getElementById("search-input");

    let userNamelabel = document.getElementById("profile-username");
    userNamelabel.textContent = sessionStorage.getItem("userLogin") || "Guest";

    // --- Состояние приложения ---
    const state = {
        initialized: false,
        currentPage: 1,
        pageSize: 10, // Сколько постов загружать за раз
        totalPages: 1,
        isLoading: false, // Флаг для предотвращения двойных запросов
        currentQuery: ''
    };

    // --- Функции ---

    /**
     * Основная функция для получения постов с сервера.
     * @param {boolean} isNewSearch - Если true, очищает ленту перед загрузкой (для нового поиска).
     */
    async function fetchPosts(isNewSearch = false) {
        if (state.isLoading || state.currentPage > state.totalPages) {
            return; // Не загружаем, если уже идет загрузка или страницы закончились
        }
        state.isLoading = true;

        if (isNewSearch) {
            feedWrapper.innerHTML = ''; // Очищаем ленту для нового поиска
            state.currentPage = 1;
        }

        try {
            const params = new URLSearchParams({
                page: state.currentPage,
                pageSize: state.pageSize,
                query: state.currentQuery,
                doNotShowHidden: false
            });

            const response = await fetch(`/Home/images?${params}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const { items, totalCount } = await response.json();

            if (!state.initialized)
            {
                state.totalPages = Math.ceil(totalCount / state.pageSize);
                state.currentPage = state.totalPages;
                state.initialized = true;
            }


            if (state.initialized)
            {
                renderPosts(items);
                state.currentPage--;
            }

        } catch (error) {
            console.error("Ошибка при загрузке постов:", error);
            feedWrapper.innerHTML += '<p class="error-message">Не удалось загрузить посты.</p>';
        } finally {
            state.isLoading = false;
        }
    }

    /**
     * Отрисовывает посты в ленте.
     * @param {Array} posts - Массив объектов постов.
     */
    function renderPosts(posts) {
        if (posts.length === 0 && state.currentPage === 1) {
            feedWrapper.innerHTML = '<p>Ничего не найдено.</p>';
            return;
        }

        const fragment = document.createDocumentFragment();
        posts.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.className = 'post';
            // Используем data-id на основном элементе поста
            postDiv.dataset.id = post.id;

            // ВАЖНО: Ваш API должен возвращать `username` вместе с данными поста
            postDiv.innerHTML = `
                <div class="post-image-container">
                    <img src="${post.source}" alt="${post.alt}" class="post-image">
                    <div class="username-overlay">${post.username || 'Автор'}</div>
                    <div class="like-overlay">
                        <button class="like-icon"></button>
                        <span>${post.likes}</span>
                    </div>
                </div>
                <div class="post-description">${post.description}</div>`;
            fragment.appendChild(postDiv);
        });
        feedWrapper.appendChild(fragment);
    }

    /**
     * Обрабатывает клик по иконке "лайк".
     * @param {HTMLElement} likeButton - Кнопка, по которой кликнули.
     */
    async function handleLikeClick(likeButton) {
        const postElement = likeButton.closest('.post');
        const postId = postElement.dataset.id;

        try {
            const response = await fetch(`/Content/like?postId=${postId}`);
            if (response.ok) {
                const data = await response.json();
                // Обновляем счетчик лайков
                likeButton.nextElementSibling.textContent = data.likes;
            } else {
                console.error("Ошибка при попытке поставить лайк");
            }
        } catch (error) {
            console.error("Сетевая ошибка при лайке:", error);
        }
    }

    /**
     * Функция для задержки выполнения (для "умного" поиска).
     */
    function debounce(func, delay = 500) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => { func.apply(this, args); }, delay);
        };
    }

    // --- Обработчики событий ---

    // Бесконечная прокрутка
    window.addEventListener('scroll', () => {
        // Показываем/скрываем кнопку "Наверх"
        jumpToStartBtn.classList.toggle('visible', window.scrollY > 300);

        // Логика подгрузки контента
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (clientHeight + scrollTop >= scrollHeight - 200) { // 200px - буфер
            fetchPosts();
        }
    });

    // Кнопка "Наверх"
    jumpToStartBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Делегирование событий для лайков
    feedWrapper.addEventListener('click', (event) => {
        const likeButton = event.target.closest('.like-icon');
        if (likeButton) {
            handleLikeClick(likeButton);
        }
    });

    // Поиск с задержкой
    const debouncedSearch = debounce((event) => {
        state.currentQuery = event.target.value.trim();
        fetchPosts(true); // true - означает, что это новый поиск
    });
    searchInput.addEventListener('input', debouncedSearch);

    // --- Инициализация ---
    fetchPosts(); // Загружаем первую партию постов при загрузке страницы
});