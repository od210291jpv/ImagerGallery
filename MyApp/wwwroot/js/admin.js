document.addEventListener('DOMContentLoaded', () => {

    const loginForm = document.getElementById('admin-login-form');
    const errorMessageDiv = document.getElementById('login-error-message');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const username = usernameInput.value.trim();
            const password = passwordInput.value;

            if (!username || !password) {
                showError('Пожалуйста, заполните все поля.');
                event.preventDefault();
                return;
            }
            
            hideError();
            try {
                const response = await fetch(loginForm.action, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ Username: username, Password: password })
                });

                const result = await response.json();

                if (response.ok && result.success) {
                    localStorage.setItem(result.userId, result.token);
                    window.location.href = result.redirectUrl || '/admin/dashboard';
                    
                } else {
                    showError(result.message || 'Ошибка входа. Проверьте данные.');
                }

            } catch (error) {
                console.error('Ошибка при отправке формы:', error);
                showError('Произошла ошибка сети. Попробуйте снова.');
            }
        });
    }

    function showError(message) {
        if (errorMessageDiv) {
            errorMessageDiv.textContent = message;
            errorMessageDiv.classList.add('visible');
        }
    }

    function hideError() {
        if (errorMessageDiv) {
            errorMessageDiv.textContent = '';
            errorMessageDiv.classList.remove('visible');
        }
    }
});