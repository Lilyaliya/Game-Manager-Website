import { makeAuthRequest } from './helpers.js';

// Главная функция приложения (отрабатывает 1 раз при загрузке json-файла, отрисовывает начальные карточки, устанавливает все слушатели на элементы)
const main = function () {
    'use strict';

    // чтение данных из формы
    const getInputData = () => {
        const username = $('.auth-form__control #login').val().trim() || null;
        const password = $('.auth-form__control #password').val().trim() || null;

        if (username && password) return { username, password };
        alert('Вы ввели не все данные!');
    };

    // обработка запроса авторизации
    const authenticate = async (data, mode) => {
        try {
            await makeAuthRequest(data, mode);
            alert('Авторизация прошла успешно');
            location.replace('./games.html'); // переходим на страницу каталога
        } catch (err) {
            console.log(err);
            console.log(err.responseText);
            alert(`Произошла ошибка${err.responseText ? ': ' + err.responseText : '\nПовторите попытку позже!'}`);
        }
    };

    // обработчик кнопки "войти"
    $('.auth-form__btn_signin').on('click', async () => await authenticate(getInputData(), 'signIn'));

    // обработчик кнопки "зарегистрироваться"
    $('.auth-form__btn_signup').on('click', async () => await authenticate(getInputData(), 'signUp'));
};

// вызов функции main после загрузки html-страницы
$(() => main());
