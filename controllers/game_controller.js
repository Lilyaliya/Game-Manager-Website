// библиотеки для чтения локальных файлов
import * as fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
// наши файлы (модели/сервисы)
import Game from '../models/game.js';
import FileService from '../src/services/FileService.js';

class GamesController {
    // Получить все игры
    async getAll(_, res) {
        console.log('\nВызван GamesController.getAll');
        try {
            

            // для первого запуска: создать дефолтные игры из json-файла (можно закомментить, если это не нужно)
            if ((await Game.count()) === 0) await initialization();

            const games = await Game.find(); // метод find без аргументов вернет все документы для данной модели

            // если все ок, то возвращаем на клиент массив игр
            res.status(200).json(games);
            console.log('Игры возвращены!');
        } catch (error) {
            console.log(error);
            res.status(500).json(error.message);
        }
    }


    async getOne(req, res) {
        console.log('\nВызван GamesController.getOne');
        try {
            const id = req.params.id;
            if (!id) throw new Error('Id не указан!');

            // ищем в бд игру по айдишнику
            const game = await Game.findById(id);

            res.status(200).json(game);
            console.log('Игра возвращена!');
        } catch (error) {
            console.log(error);
            res.status(500).json(error.message);
        }
    }

    // Создать игру
    async create(req, res) {
        console.log('\nВызван GamesController.create');
        try {
            const mainImage = req.files?.image;

            // если mainImage указан, создаем файл, иначе - undefined
            const mainFileName = mainImage ? FileService.saveFile(mainImage) : undefined;

            // группируем данные для создания объекта игры
            const game = await Game.create({
                ...req.body,
                image: mainFileName,
            });

            // если все ок, то возвращаем на клиент созданную игру
            res.status(200).json(game);
            console.log('игра создана!');
        } catch (error) {
            console.log(error);
            res.status(500).json(error.message);
        }
    }


    async delete(req, res) {
        console.log('\nВызван GamesController.delete');
        try {
            const id = req.params.id;
            if (!id) throw new Error('Id не указан!');

            const deletedGame = await Game.findByIdAndDelete(id);


            res.status(200).json(deletedGame);
            console.log('Игра удалена!');
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

    // (только для разработки)
    async update(req, res) {
        console.log('\nВызван GamesController.update');
        try {
            const id = req.params.id;
            if (!id) throw new Error('Id не указан!');

            // с опцией "new: true" вернется объект ПОСЛЕ обновления
            const updatedGame = await Game.findByIdAndUpdate(id, req.body, { new: true });


            res.status(200).json(updatedGame);
            console.log('Игра обновлена!');
        } catch (error) {
            console.log(error);
            res.status(500).json(error.message);
        }
    }
}

export default new GamesController();

// инициализация: создание игр в БД (чтобы не создавать вручную)
const initialization = async () => {
    // читаем данные из локального json-файла
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const data = await fs.readFile(__dirname + '/games.json', 'utf8');

    // преобразуем их в массив обычных объектов
    const games = JSON.parse(data);

    // проходимся по массиву и создаем запись в БД для каждого
    for (const game of games) await Game.create(game);
};
