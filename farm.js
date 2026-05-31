// Адрес вашего сервера (если локально — http://localhost:3000)
const SERVER_URL = 'http://localhost:3000'; 
// Идентификатор игрока (в реальной игре это будет логин или токен)
const PLAYER_ID = 'player1'; 

// Функция для получения баланса с сервера
async function updateBalanceUI() {
    try {
        const response = await fetch(`${SERVER_URL}/api/balance?id=${PLAYER_ID}`);
        const data = await response.json();
        
        // Находим спан внутри блока баланса на любой из страниц и обновляем
        const balanceSpan = document.querySelector('.balance-container span');
        if (balanceSpan) {
            balanceSpan.innerText = data.balance;
        }
    } catch (error) {
        console.error('Ошибка получения баланса:', error);
    }
}

// Функция для изменения баланса на сервере (при клике или покупке)
async function changeBalance(amount) {
    try {
        const response = await fetch(`${SERVER_URL}/api/balance/change`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: PLAYER_ID, amount: amount })
        });
        const data = await response.json();
        
        // Сразу обновляем интерфейс новым балансом от сервера
        const balanceSpan = document.querySelector('.balance-container span');
        if (balanceSpan) {
            balanceSpan.innerText = data.balance;
        }
    } catch (error) {
        console.error('Ошибка изменения баланса:', error);
    }
}

// Запускаем автоматическое обновление баланса при загрузке любой страницы
document.addEventListener('DOMContentLoaded', updateBalanceUI);

// Для ферм: можно обновлять баланс каждые 5 секунд, чтобы видеть пассивный доход
if (window.location.pathname.includes('farm')) {
    setInterval(updateBalanceUI, 5000);
}
