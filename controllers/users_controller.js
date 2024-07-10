import User from '../models/user.js';

class UsersController {
    // Получить всех Юзеров
    async getAll(_, res) {
        console.log('\nВызван UsersController.getAll');
        try {
            // для разработки: удалить все записи
            // await User.deleteMany();

            // берем из бд все спектакли
            // метода find без аргументов вернет все документы для данной модели
            const users = await User.find();

            // если все ок, то возвращаем на клиент массив Пользователей
            res.status(200).json(users);
            console.log('Пользователи возвращены!');
        } catch (error) {
            console.log(error);
            res.status(500).json(error.message);
        }
    }

    // Аутентификация (POST-запрос)
    async auth(req, res) {
        console.log('\nВызван UsersController.auth');
        try {
            const userData = req.body;
            // mode: 'signIn' - вход или 'signUp' - регистрация
            const mode = req.query.mode;

            if (!mode || (mode !== 'signIn' && mode !== 'signUp'))
                throw new Error("Режим mode ('signIn' или 'signUp') не указан или указан неверно!");

            if (!userData.username || !userData.password) throw new Error('Вы не ввели данные авторизации!');

            // ищем в бд юзера с таким логином
            let [user] = await User.find({ username: userData.username });

            // если режим "регистрация"
            if (mode === 'signUp') {
                if (user) throw new Error('Пользователь уже существует!');
                // если в бд нет ни одного юзера, то назначить первого созданного юзера АДМИНОМ
                // (имя/пароль придут с фронта, на бэке добавляем свойство "роль" со значением 777, так мы сможем проверять на фронте, что юзеру доступны удаление/обновление/добавление спектаклей)
                if ((await User.count()) === 0) user = await User.create({ ...userData, role: 777 });
                // иначе - создаем обычного юзера, который может только просматривать каталог
				// else user = await User.create({ ...userData, role: 777 });
                else user = await User.create(userData);
                console.log('Пользователь создан');
				// console.log(User.count());
            }
            // если режим "авторизация"
            else {
                if (!user) throw new Error('Пользователя не существует!');
                console.log('Авторизация прошла успешно');
            }

            // если все ок, то возвращаем на клиент авторизованного Пользователя
            res.status(200).json(user);
        } catch (error) {
            console.log(error);
            res.status(500).json(error.message);
        }
    }

    // Обновление юзера (Права пользователя: сделать админом/разжаловать)
    async update(req, res) {
        console.log('\nВызван UsersController.update');
        try {
            const id = req.params.id;
            const newData = req.body;
            if (!id) throw new Error('Id не указан!');

            // с опцией "new: true" вернется объект ПОСЛЕ обновления
            const updatedUser = await User.findByIdAndUpdate(id, newData, { new: true });
            console.log(updatedUser);

            // если все ок, то возвращаем на клиент обновленного Пользователя
            res.status(200).json(updatedUser);
            console.log('Пользователь обновлен!');
        } catch (error) {
            console.log(error);
            res.status(500).json(error.message);
        }
    }

    // Удалить Юзера
    async destroy(req, res) {
        console.log('\nВызван UsersController.destroy');
        try {
            const id = req.params.id;
            if (!id) throw new Error('Id не указан!');

            const deletedUser = await User.findByIdAndDelete(id);

            // если все ок, то возвращаем на клиент удаленного Пользователя
            res.status(200).json(deletedUser);
            console.log('Пользователь удален!');
        } catch (error) {
            console.log(error);
            res.status(500).json(error.message);
        }
    }

    //
    //
    //
    //
    //

    // На фронте не используется (только для разработки)
    async getOne(req, res) {
        console.log('\nВызван UsersController.getOne');
        try {
            const id = req.params.id;
            if (!id) throw new Error('Id не указан!');

            // Ищем в БД юзера по айдишнику
            const user = await User.findById(id);

            // если все ок, то возвращаем на клиент Пользователя
            res.status(200).json(user);
            console.log('Пользователь возвращен!');
        } catch (error) {
            console.log(error);
            res.status(500).json(error.message);
        }
    }
}

export default new UsersController();