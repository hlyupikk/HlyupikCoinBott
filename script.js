// Получаем элементы
const coinCountElement = document.getElementById('coin-count');
const clickButton = document.getElementById('click-button');
const shopItems = document.querySelectorAll('.shop-item');

// Загружаем сохранённые данные из Local Storage
let coinCount = parseInt(localStorage.getItem('coinCount')) || 0;
let currentSkin = localStorage.getItem('currentSkin') || 'default';
let clickMultiplier = parseFloat(localStorage.getItem('clickMultiplier')) || 1;

// Устанавливаем количество монет на экране и применяем текущий скин
coinCountElement.textContent = coinCount;
applySkin(currentSkin);

// Функция для применения выбранного скина
function applySkin(skin) {
    let skinUrl;
    
    if (skin === 'default') {
        skinUrl = 'https://img.freepik.com/free-psd/realistic-lottery-symbol-isolated_23-2151177245.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1723680000&semt=ais_hybrid'; // Дефолтное изображение
    } else if (skin === 'skin1') {
        skinUrl = 'https://upload.wikimedia.org/wikipedia/commons/c/cb/1_hryvnia_coin_of_Ukraine%2C_2018_%28averse%29.jpg'
    } else if (skin === 'skin2') {
        skinUrl = 'https://upload.wikimedia.org/wikipedia/commons/5/5d/5_hryvnia_coin_of_Ukraine%2C_2018_%28averse%29.jpg'; // Зеленый фон
    } else if (skin === 'skin3') {
        skinUrl = 'https://cdn-icons-png.flaticon.com/512/40/40221.png'; // Синий фон
    } else {
        console.error('Unknown skin:', skin);
        return;
    }

    console.log(`Applying skin: ${skin} with URL: ${skinUrl}`);

    // Применяем фоновое изображение к кнопке
    clickButton.style.backgroundImage = `url('${skinUrl}')`;
    clickButton.style.backgroundSize = 'cover'; // Убедимся, что изображение масштабируется на всю кнопку
    clickButton.style.backgroundPosition = 'center'; // Центрируем изображение
    clickButton.style.border = 'none'; // Убираем границу кнопки
    clickButton.style.outline = 'none'; // Убираем обводку при фокусе
}

// Обрабатываем клики по кнопке
clickButton.addEventListener('click', () => {
    coinCount += clickMultiplier;
    coinCountElement.textContent = coinCount;
    localStorage.setItem('coinCount', coinCount);
});

// Обработка выбора магазина
shopItems.forEach(item => {
    item.addEventListener('click', () => {
        const type = item.dataset.type;
        if (type === 'skin') {
            const skin = item.dataset.skin;
            const price = skin === 'default' ? 0 : (skin === 'skin1' ? 100 : (skin === 'skin2' ? 250 : 500));
            if (coinCount >= price) {
                // Снимаем монеты за покупку
                coinCount -= price;
                coinCountElement.textContent = coinCount;
                localStorage.setItem('coinCount', coinCount);

                // Применяем и сохраняем новый скин
                currentSkin = skin;
                applySkin(currentSkin);
                localStorage.setItem('currentSkin', currentSkin);
            } else {
                alert('Недостаточно Хлюпиков!');
            }
        } else if (type === 'upgrade') {
            const multiplier = parseFloat(item.dataset.multiplier);
            const price = multiplier === 2 ? 150 : (multiplier === 3 ? 500 : 1000);
            if (coinCount >= price) {
                // Снимаем монеты за покупку
                coinCount -= price;
                coinCountElement.textContent = coinCount;
                localStorage.setItem('coinCount', coinCount);

                // Применяем и сохраняем новый множитель
                clickMultiplier = multiplier;
                localStorage.setItem('clickMultiplier', clickMultiplier);
            } else {
                alert('Недостаточно Хлюпиков!');
            }
        }
    });
});
