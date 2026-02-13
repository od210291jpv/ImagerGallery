document.addEventListener('DOMContentLoaded', () => {

    const totalUsersEl = document.getElementById('total-users-count');
    const totalPostsEl = document.getElementById('total-posts-count');
    const postsTodayEl = document.getElementById('posts-today-count');

    setTimeout(() => {


        if (totalUsersEl) totalUsersEl.textContent = '145'; // Заменить на реальные данные
        if (totalPostsEl) totalPostsEl.textContent = '892'; // Заменить на реальные данные
        if (postsTodayEl) postsTodayEl.textContent = '12'; // Заменить на реальные данные
    }, 500); // Небольшая задержка для имитации загрузки

    const regForm = document.getElementById('add-user-form');
    const login = document.getElementById("newUserLogin");
    const password = document.getElementById("newUserPassword");
    const role = document.getElementById("newUserRole");

    const usersLink = document.getElementById("users-list-link");
    const userListBody = document.getElementById('user-list-body');
    const userListBlock = document.getElementById('users-list-content-area');

    const addUserBlock = document.getElementById("add-user-contentarea");
    const addUserLink = document.getElementById("createUser-link");

    const postsLink = document.getElementById("posts-list-link");
    const postsBlock = document.getElementById("posts-list-content-area");

    const addPostLink = document.getElementById("create-post-link");
    const addPostBlock = document.getElementById("add-post-content-area");

    const addContentForm = document.getElementById("add-post-form");
    const addContentSource = document.getElementById("source");
    const addContentDescription = document.getElementById("description");
    const addContentAlt = document.getElementById("alt");// to rename the id
    const addContentHidden = document.getElementById("hidden");

    const editPopup = document.getElementById("editPostPopup");
    const editPostUrl = document.getElementById("editUrl");
    const editPostDescription = document.getElementById("editDescription");
    const editPostAlt = document.getElementById("editAlt");
    const editPostHidden = document.getElementById("editHidden");
    const editPostForm = document.querySelector(".edit-post-form");
    const editPostId = document.getElementById("fpostId");

    const popupOverlay = document.getElementById("popupOverlay");

    function inactiveAllSideLinks() {
        let allLinks = document.querySelectorAll(".sidelink");
        allLinks.forEach((item) => {
            item.classList.remove("active");
        });
    }

    function inactiveAllBlocks()
    {
        const allBLocks = document.querySelectorAll('.contentarea');
        if (allBLocks)
        {
            allBLocks.forEach((block) => {
                block.classList.add("hideContentArea");
                block.classList.remove("showContentArea");
            });
        }
    }

    async function signupAdminUser()
    {
        try {
            const response = await fetch(regForm.action, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ Login: login.value, Password: password.value, Role: role.value })
            })

            if (response.ok) {
                alert("User was susscessfully registered");
            }
            else {
                alert("Something went wrong. Please check console");
            }
        }
        catch (error) {
            console.error('Ошибка при отправке формы:', error);
            showError('Произошла ошибка сети. Попробуйте снова.');
        }
        finally
        {
            regForm.reset();
        }
    }

    async function submitNewPost()
    {
        try {
            const file = addContentSource.files[0];

            const formData = new FormData();
            formData.append('File', file, file.name);

            const publisherId = localStorage.getItem("user") ?? "1";

            const response = await fetch(addContentForm.action + `?Description=${addContentDescription.value}&PublisherId=${publisherId}&Hidden=${addContentHidden.value}&Alt=${addContentAlt.value}`, {
                method: "POST",

                body: formData
            });

            const result = await response.json();

            if (response.ok && result != null) {

                alert("Content was sussessfully added!");
            }
        }
        catch (error) {
            console.log(error);
            alert("An error occured, please see console log");
        }
        finally {
            addContentForm.reset();
        }
    }

    function createUserRow(data) {
        const tr = document.createElement('tr');
        const role = +data.role === 1 ? "Admin" : "User";

        // Использование innerHTML здесь эффективно, так как мы создаем всю разметку строки за один раз.
        tr.innerHTML = `
        <td>${data.id}</td>
        <td>${data.login}</td>
        <td>${data.password}</td>
        <td><span class="role-badge role-admin">${role}</span></td>
        <td class="actions">
            <a href="/admin/users/edit/${data.id}" class="btn btn-sm btn-edit" title="Edit">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"> <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" /> <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" /> </svg>
                <span class="visually-hidden">Edit</span>
            </a>
            <button type="button" class="btn btn-sm btn-delete" data-userid="${data.id}" data-username="${data.login}" title="Удалить">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"> <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" /> <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" /> </svg>
                <span class="visually-hidden">Удалить</span>
            </button>
        </td>`;
        return tr;
    }

    async function loadUsers() {
        // Получаем ссылки на элементы DOM один раз
        const userListBody = document.getElementById('user-list-body');
        const noUsersRow = document.getElementById("no-users-row");

        try {
            const response = await fetch('/Admin/users', {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });

            // Проверяем, успешен ли ответ от сервера
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const users = await response.json();

            // 1. Эффективная очистка таблицы
            userListBody.innerHTML = '';

            if (users && users.length > 0) {
                // Если есть пользователи, скрываем сообщение "No users found"
                if (noUsersRow) noUsersRow.style.display = 'none';

                // 2. Используем DocumentFragment для максимальной производительности
                const fragment = document.createDocumentFragment();

                users.forEach(user => {
                    const userRow = createUserRow(user); // Создаем строку
                    fragment.appendChild(userRow);     // Добавляем ее во фрагмент (это очень быстро)
                });

                // 3. Добавляем все созданные строки в DOM за одну операцию
                userListBody.appendChild(fragment);

            } else {
                // Если массив пользователей пуст, показываем сообщение "No users found"
                if (noUsersRow) noUsersRow.style.display = 'table-row';
            }

        } catch (error) {
            console.error("Failed to load users:", error);
            alert("Не удалось загрузить пользователей. Пожалуйста, проверьте консоль.");
            // В случае ошибки также показываем сообщение, что пользователей нет
            if (noUsersRow) {
                userListBody.innerHTML = ''; // Очищаем на случай, если там были старые данные
                noUsersRow.style.display = 'table-row';
            }
        }
    }

    editPostForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`/content/edit?PostId=${+editPostId.value}&Hidden=${editPostHidden.checked}&Alt=${editPostAlt.value}&Description=${editPostDescription.value}`, {
                method: "POST"
            });

            if (response.ok)
            {
                await LoadPosts();
                alert("Done");
            }
        }
        catch (error)
        {
            alert("An error occured, please see the console for details");
            console.log(error);
        }
        finally
        {
            editPopup.classList.add("hide-popup");
            editPopup.classList.remove("show-popup");
            popupOverlay.style.display = "none";
        }
    });



    function createPostRow(data) {
        const tr = document.createElement('tr');
        // Сохраняем все данные прямо в элементе <tr>. Это надежно и удобно.
        tr.dataset.postId = data.id;
        tr.dataset.source = data.source;
        tr.dataset.alt = data.alt;
        tr.dataset.description = data.description;
        tr.dataset.hidden = data.hidden;

        tr.innerHTML = `
        <td>${data.id}</td>
        <td class="text-truncate">
            <a href="${data.source}" target="_blank" title="${data.source}">${data.source}</a>
        </td>
        <td class="text-truncate">${data.alt}</td>
        <td class="text-truncate">${data.description}</td>
        <td style="text-align: center;">${data.likes}</td>
        <td style="text-align: center;">${data.hidden}</td>
        <td>${data.userId}</td>
        <td class="actions">
            <button type="button" class="btn btn-sm btn-edit" data-action="edit-post" title="Edit">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"> <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" /> <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" /> </svg>
                <span class="visually-hidden">Edit</span>
            </button>
            <button type="button" class="btn btn-sm btn-delete" data-postid="${data.id}" title="Удалить">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"> <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" /> <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" /> </svg>
                <span class="visually-hidden">Delete</span>
            </button>
        </td>`;
        return tr;
    }

    async function LoadPosts() {
        const postsListBody = document.getElementById('post-list-body');
        const noPostsRow = document.getElementById("no-posts-row");

        try {
            const response = await fetch("/Home/images?showHidden=true", { method: "GET" });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const posts = await response.json();

            // 1. Эффективная очистка таблицы
            postsListBody.innerHTML = '';

            if (posts && posts.length > 0) {
                if (noPostsRow) noPostsRow.style.display = 'none';

                // 2. Используем DocumentFragment для быстрой вставки
                const fragment = document.createDocumentFragment();
                posts.forEach(post => {
                    fragment.appendChild(createPostRow(post));
                });

                // 3. Вставляем все строки за одну операцию
                postsListBody.appendChild(fragment);
            } else {
                if (noPostsRow) noPostsRow.style.display = 'table-row';
            }
        } catch (error) {
            console.error("Failed to load posts:", error);
            alert("Не удалось загрузить посты. Пожалуйста, проверьте консоль.");
            if (noPostsRow) {
                postsListBody.innerHTML = '';
                noPostsRow.style.display = 'table-row';
            }
        }
    }

    const postsListBody = document.getElementById("post-list-body");
    if (postsListBody) {
        postsListBody.addEventListener("click", (event) => {
            // Ищем ближайшую кнопку редактирования к месту клика
            const editButton = event.target.closest('button[data-action="edit-post"]');

            if (editButton) {
                const postRow = editButton.closest('tr');
                if (postRow) {
                    onEditPostPopUp(postRow);
                }
            }
        });
    }

    function onEditPostPopUp(postRow) {
        // Показываем popup окно
        editPopup.classList.remove("hide-popup");
        editPopup.classList.add("show-popup");
        popupOverlay.style.display = "block";

        // 4. Получаем данные напрямую из dataset строки - это надежно!
        const { postId, source, description, alt, hidden } = postRow.dataset;

        // Заполняем поля формы
        editPostId.value = postId;
        editPostUrl.value = source;
        editPostDescription.value = description;
        editPostAlt.value = alt;
        editPostHidden.checked = (hidden === "true"); // Правильное преобразование строки в boolean
    }

    addUserLink.addEventListener("click", (event) => {
        event.preventDefault();

        inactiveAllSideLinks();
        addUserLink.classList.add("active");

        inactiveAllBlocks();
        addUserBlock.classList.remove('hideContentArea');
        addUserBlock.classList.add("showContentArea");
    });

    if (regForm)
    {
        regForm.addEventListener("submit", async (event) =>
        {
            event.preventDefault();
            signupAdminUser();
        });
    }

    if (addContentForm)
    {
        addContentForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            submitNewPost();
        });
    }

    if (usersLink)
    {
        usersLink.addEventListener("click", (event) => {
            event.preventDefault();

            inactiveAllSideLinks();
            inactiveAllBlocks();

            event.target.classList.add("active");
            userListBlock.classList.add('showContentArea');
            userListBlock.classList.remove('hideContentArea');
            loadUsers();
        });
    }

    if (postsLink)
    {
        postsLink.addEventListener("click", (event) => {
            event.preventDefault();

            inactiveAllSideLinks();
            inactiveAllBlocks();

            event.target.classList.add("active");
            postsBlock.classList.add('showContentArea');
            postsBlock.classList.remove('hideContentArea');
            LoadPosts();                       
        });
    }

    if (addPostLink)
    {
        addPostLink.addEventListener("click", (event) => {
            event.preventDefault();

            inactiveAllSideLinks();
            inactiveAllBlocks();

            event.target.classList.add("active");
            addPostBlock.classList.add('showContentArea');
            addPostBlock.classList.remove('hideContentArea');
        });
    }

    // Initial load
    inactiveAllSideLinks();
    inactiveAllBlocks();

    usersLink.classList.add("active");
    userListBlock.classList.add('showContentArea');
    userListBlock.classList.remove('hideContentArea');
    loadUsers();
});