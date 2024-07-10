import { isAdminLogged, isThisAdmin, isThisYou } from './helpers.js';

// Создание карточки пользователя
const createUserCard = user => {
    // создаем пустой блок-карточку
    const $userCard = $('<li>').addClass('users__user');
    if (isThisAdmin(user)) $userCard.addClass('users_user_admin');

    // имя
    const $userName = $('<h2>')
        .addClass('users__user-name')
        .append([
            'Имя пользователя: ',
            $('<span>')
                .addClass('users__user-name-value')
                .text(user.username + (isThisYou(user) ? ' (Это вы)' : ''))
        ]);

    // кнопки
    // контейнер для кнопок
    const $btnsContainer = $('<div>').addClass('users__user-btns');
    // кнопка "сделать админом"
    const $makeAdmin = $('<button>')
        .addClass('users__user-btn users__user-btn_make-admin')
        .text(isThisAdmin(user) ? 'Разжаловать' : 'Сделать админом')
        .on('click', () => {
            console.log('делаем админом');

            $.ajax({
                url: '/users/' + user._id,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({ role: isThisAdmin(user) ? null : 777 })
            })
                .done(() => {
                    alert('Права пользователя обновлены');
                    // обновляем страницу
                    location.reload();
                })
                .fail(err => console.log(err));
        });
    // кнопка удаления
    const $deleteUser = $('<button>')
        .addClass('users__user-btn users__user-btn_delete')
        .text('Удалить')
        .on('click', () => {
            if (confirm('Вы уверены, что хотите удалить пользователя ' + user.username + '?'))
                $.ajax({
                    url: '/users/' + user._id,
                    type: 'DELETE'
                })
                    .done(() => {
                        alert('Пользователь успешно удален');
                        // обновляем страницу
                        location.reload();
                    })
                    .fail(() => alert('Произошла ошибка! Повторите попытку позже!'));
        });
    $btnsContainer.append([$makeAdmin, $deleteUser]);
    // запрет удалять самого себя
    if (isThisYou(user)) $btnsContainer.hide();

    $userCard.append($userName, $btnsContainer);

    return $userCard;
};

// Главная функция приложения (отрабатывает 1 раз при загрузке json-файла, отрисовывает начальные карточки, устанавливает все слушатели на элементы)
const main = async function (users) {
    'use strict';

    console.log(users);
    // запрет посещать Панель администратора, если залогинен не админ (если ввели в браузере)
    if (!isAdminLogged()) {
        alert('Доступ запрещен!');
        location.replace('./index.html');
    }

    // после загрузки страницы отрисовываем карточки всех пользователей
    users.forEach(user => $('.users').append(createUserCard(user)));
};

// вызов функции main с аргументом в виде объекта users после загрузки html-страницы
$(() => $.getJSON('/users', users => main(users)));
