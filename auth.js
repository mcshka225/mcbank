document.addEventListener('DOMContentLoaded', function() {
    // Получаем элементы форм
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const switchLink = document.getElementById('switch-link');
    const switchText = document.getElementById('switch-text');
    const formTitle = document.getElementById('form-title');
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');

    // Переключение между формами
    let isLoginForm = false;
    
    switchLink.addEventListener('click', function() {
        isLoginForm = !isLoginForm;
        
        if (isLoginForm) {
            registerForm.style.display = 'none';
            loginForm.style.display = 'block';
            formTitle.textContent = 'Авторизация';
            switchText.textContent = 'Нет аккаунта?';
            switchLink.textContent = 'Зарегистрироваться';
        } else {
            registerForm.style.display = 'block';
            loginForm.style.display = 'none';
            formTitle.textContent = 'Регистрация';
            switchText.textContent = 'Уже есть аккаунт?';
            switchLink.textContent = 'Войти';
        }
        
        // Очищаем сообщения при переключении
        errorMessage.textContent = '';
        successMessage.textContent = '';
    });

    // Обработка регистрации
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('reg-username').value.trim();
        const password = document.getElementById('reg-password').value.trim();
        
        // Валидация
        if (username.length < 4) {
            showError('Логин должен содержать минимум 4 символа');
            return;
        }
        
        if (password.length < 6) {
            showError('Пароль должен содержать минимум 6 символов');
            return;
        }
        
        // Проверяем, существует ли пользователь
        if (localStorage.getItem(username)) {
            showError('Пользователь с таким логином уже существует');
            return;
        }
        
        // Сохраняем пользователя
        localStorage.setItem(username, JSON.stringify({
            username: username,
            password: password, // В реальном приложении пароль должен быть хеширован!
            balance: 0  // Добавляем начальный баланс
        }));
        
        showSuccess('Регистрация прошла успешно! Теперь вы можете войти.');
        registerForm.reset();
    });

    // Обработка авторизации
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value.trim();
        
        // Получаем пользователя из localStorage
        const userData = localStorage.getItem(username);
        
        if (!userData) {
            showError('Пользователь с таким логином не найден');
            return;
        }
        
        const user = JSON.parse(userData);
        
        if (user.password !== password) {
            showError('Неверный пароль');
            return;
        }
        
        showSuccess('Авторизация прошла успешно!');
        loginForm.reset();
        
        // Сохраняем текущего пользователя
        localStorage.setItem('currentUser', JSON.stringify({
            username: user.username,
            balance: user.balance || 0
        }));
        
        // Проверка на админа и показ кнопки
        if (username === 'admin') {
            // Сохраняем флаг админа
            localStorage.setItem('currentUser', JSON.stringify({
                username: 'admin',
                isAdmin: true,  // Добавляем специальный флаг
                balance: user.balance || 0
            }));
        }

        window.location.href = '/index.html';
    });

    // Функции для отображения сообщений
    function showError(message) {
        errorMessage.textContent = message;
        successMessage.textContent = '';
    }
    
    function showSuccess(message) {
        successMessage.textContent = message;
        errorMessage.textContent = '';
    }
});