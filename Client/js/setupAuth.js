import { isAdminLogged } from './helpers.js';

$(() => {
    // проверяем, залогинены ли мы
    const savedUserString = localStorage.getItem('currentUser');
    const currentUser = savedUserString ? JSON.parse(localStorage.getItem('currentUser')) : null;

    // устанавливаем значение в строке приветствия
    $('.greetings .username').text(currentUser?.username ?? 'гость');

    // админка
    if (isAdminLogged()) $('#admin').text('Панель управления').attr({ href: './admin.html' });
    else $('#admin').hide();

    console.log(isAdminLogged());

    // устанавливаем значение/поведение кнопки авторизации в меню
    $('#auth')
        .text(currentUser ? 'Выйти' : 'Войти')
        .on('click', () => {
            // выходим (но остаемся на странице)
            if (currentUser) {
                localStorage.removeItem('currentUser');
                // перезагружаем страницу для применения изменений
                location.replace('./index.html');
            }
            // вход (переход на странциу авторизации)
            else location.replace('#autho');
        });
});
