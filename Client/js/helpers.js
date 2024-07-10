// функция аутентификации (здесь отправляется запрос на сервер)
export const makeAuthRequest = (data, mode) => {
    return new Promise((resolve, reject) => {
        console.log(data);
        if (!data?.username || !data?.password) reject('Нет данных для авторизации');
        else
            $.ajax({
                url: '/users?mode=' + mode,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(data)
            })
                .done(currentUser => {
                    console.log(currentUser);

                    // сохраняем/обновляем в памяти браузера объект с данными пользователя
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));

                    resolve(currentUser);
                })
                .fail(err => reject(err));
    });
};

// проверка, админ ли на странице
export const isAdminLogged = () => JSON.parse(localStorage.getItem('currentUser'))?.role === 777;

// проверка, является ли аргемунт админом: чтобы менять надпись "Сделать/разжаловать администратора" в админке
export const isThisAdmin = user => user?.role === 777;

// проверка, является ли аргемунт текущим пользвователь: чтобы добавить запись "это вы" и запретить удаление пользователя в админке
export const isThisYou = user => JSON.parse(localStorage.getItem('currentUser'))?.username === user.username;

export const currentUser = () => JSON.parse(localStorage.getItem('currentUser'))?.username;
