import express from 'express';
import fileUpload from 'express-fileupload';
import mongoose from 'mongoose';
// подключаем контроллеры
import GamesController from './controllers/game_controller.js';
import UsersController from './controllers/users_controller.js';

// создаем экземпляр приложения
const app = express();

// по умолчанию express не может воспринимать поступающие данные как json, поэтому явно указываем это
app.use(express.json());

// для работы с файлами (картинками, в нашем случае)
app.use(fileUpload());


app.use(express.static('src/static'));

// Запросы для игр
app.get('/games', GamesController.getAll);
app.get('/games/:id', GamesController.getOne);
app.post('/games', GamesController.create);
app.put('/games/:id', GamesController.update);
app.delete('/games/:id', GamesController.delete);

// Запросы для Пользователей
app.get('/users', UsersController.getAll); // Получить всех Юзеров
app.get('/users/:id', UsersController.getOne); // Получить конкретного Юзера
app.post('/users', UsersController.auth); // Создать Юзера
app.put('/users/:id', UsersController.update); // Обновить Юзера
app.delete('/users/:id', UsersController.destroy); // Удалить Юзера

// "клиент" и "сервер" будут работать "по одному и тому же адресу"
// при запросе в браузере адреса сервера (localhost:3000 в нашем случае) откроется index.html из папки Сlient
app.use('/', express.static('Client'));

async function startApp() {
    try {
        // Подключение к БД
        mongoose.set('strictQuery', false);
        await mongoose.connect('mongodb://127.0.0.1:27017/game_manager');
        console.log('База Данных Подключена');

        // просим приложение прослушивать PORT
        app.listen(3000, () => console.log('Сервер запущен на Порту #' + 3000));
    } catch (err) {
        console.log('Произошла ошибка при запуске сервера: ', err.message);
    }
}
startApp();
