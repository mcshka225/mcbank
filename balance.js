function updateBalance(username, amount) {
    // Получаем данные игрока
    const userData = localStorage.getItem(username);
    if (!userData) return false;
    
    const user = JSON.parse(userData);
    
    // Обновляем баланс
    user.balance = (user.balance || 0) + amount;
    
    // Сохраняем обратно
    localStorage.setItem(username, JSON.stringify(user));
    
    // Если это текущий пользователь - обновляем и его данные
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    if (currentUser.username === username) {
        currentUser.balance = user.balance;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Обновляем на странице
        const balanceElement = document.getElementById('user-balance');
        if (balanceElement) {
            balanceElement.textContent = currentUser.balance;
        }
    }
    
    return true;
}