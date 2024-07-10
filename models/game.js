
import mongoose from 'mongoose';

// Схема - описание данных
const Game = new mongoose.Schema({
    // Обязательные поля
    game: { type: String, required: true },
	creator: {type: String, required: true},
    image: { type: String, required: true },
    description: { type: String, required: true },
	genres: {type: [String]},
});

// Экспортируем модель 'Game', созданную по одноименной схеме
export default mongoose.model('Game', Game);
