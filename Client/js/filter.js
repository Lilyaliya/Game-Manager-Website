import { createCard } from "./createCard.js";
import { currentUser } from "./helpers.js";


/**
 * @param {any} games - массив всех игр
 * @param {any} filter - строка, по которой искать ()
 * @returns {JQuery<HTMLElement>} HTML-элемент
 */
const getFilteredShows = (games, filter) => {
    // очищаем список игр
    $('.game-content').empty();
    $('.empty').empty();
    const filteredGames = games.filter(
        game =>
            game.genres.some(genre => game.creator === currentUser() && (genre.toLowerCase().includes(filter.trim().toLowerCase())) || // поиск по тегам
            game.game.toLowerCase().includes(filter.trim().toLowerCase())) // поиск по названию
    );

    // если ничего не найдено, то выводится надпись 'Ничего не найдено'
    if (filteredGames.length === 0)
        $('.empty').append([
            $('<h2>').text('Ничего не найдено 😞')
        ]
        );
    else {
        
        filteredGames.forEach(game => $('.game-content').append(createCard(game)));

    }
};


const main = async function (games) {

    $('.game-content').empty();
    games.forEach(game => $('.game-content').append(createCard(game)));
    // вешаем на поле поиска "слушатель события" и при вводе вызываем функцию getFilteredShows
    $('.search-box input').on('input', evt => getFilteredShows(games, evt.target.value));

};

// вызов функции main с аргументом в виде объекта shows
$(() => $.getJSON('/games', games => main(games)));
