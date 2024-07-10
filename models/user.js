import mongoose from 'mongoose';

// Схема - описание данных
const User = new mongoose.Schema({
    // Обязательные поля

    username: { type: String, required: true },
    password: { type: String, required: true },

    // Необязательные поля
    // роли (является ли юзер админом - только у админа есть это свойство со значением 777)
    role: { type: Number }
});

// Экспортируем модель 'User', созданную по одноименной схеме
export default mongoose.model('User', User);