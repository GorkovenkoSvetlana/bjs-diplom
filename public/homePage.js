'use strict';

// Выход из личного кабинета

const logoutBtn = new LogoutButton();

logoutBtn.action = () => {
    ApiConnector.logout(response => {
        if (response.success) {
            location.reload();
        }
    });
}

// Получение информации о пользователе

ApiConnector.current(response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data)
    }
});

// Получение текущих курсов валюты

const ratesBoard = new ratesBoard();

function getRates() {
    ApiConnector.getStocks(response => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data); 
        }
    });
}

getRates();

setInterval(getRates, 60000);

// Операции с деньгами

const money = new MoneyManager();

// Пополнение баланса

money.addMoneyCallback = (data) => {
    ApiConnector.addMoney (data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            money.setMessage(false, 'Баланс успешно пополнен');
        } else  {
            money.setMessage(true, 'Ошибка, не удалось пополнить баланс');
        }
    });
}

//  Конвертирование валюты

money.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney (data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            money.setMessage(false, 'Конвертирование произведено');
        } else {
            money.setMessage(true, 'Ошибка, не удалось произвести конвертирование');
        }
    });
}

// Перевод валюты

money.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney (data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            money.setMessage(false, 'Перевод выполнен');
        } else {
            money.setMessage(true, 'Ошибка, не удалось произвести перевод');
        }
    });
}

// Работа с избранным

const favorites = new FavoritesWidget();

// Начальный список избранного

ApiConnector.getFavorites (response => {
    if (response.success) {
        favorites.clearTable();
        favorites.fillTable(response.data);
        money.updateUsersList(response.data);
    }
});

// Добавление пользователя в список избранного

favorites.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            favorites.clearTable();
            favorites.fillTable(response.data);
            favorites.updateUsersList(response.data);
            favorites.setMessage(false, 'Пользователь добавлен в избранное'); 
        } else {
            favorites.setMessage(true, 'Ошибка, пользователь не может быть добавлен в избранное')
        }
    });
}

// Удаление пользователя из списка избранного

favorites.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            favorites.clearTable();
            favorites.fillTable(response.data);
            favorites.updateUsersList(response.data);
            favorites.setMessage(false, 'Пользователь удален из избранного'); 
        } else {
            favorites.setMessage(true, 'Ошибка, пользователь не может быть удален')
        }
    });
}
