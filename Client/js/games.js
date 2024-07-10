import { currentUser } from './helpers';

/**
 
 * @param {any} game 
 * @returns {JQuery<HTMLElement>} HTML-элемент
 */
const createCard = game => {
    const $card = $('<div>').addClass('box');

   
    const $img = $('<img>').attr({src: game.image});

    // Краткая информация
    const $infoColumn = $('<div>')
        .addClass('box-text')
        .append([
            $('<h2>').text(game.game),
            $('<h3>').text(game.genres.join(',')),
            $('<div>').addClass('rating-download').append([
                $('<div>').addClass('rating').append([
                    $('<i>').addClass('bx bxs-star'),
                    $('<span>').text("4.7")
                ]),
                $('<a>')
                .addClass('box-btn')
                .attr('href', () => `download.html?id=${game._id}`).append([
                    $('<i>').addClass('bx bx-down-arrow-alt')
                ])
            ]),
        ]);
    if (currentUser() === game.creator)
        $card.append([$img, $infoColumn]);

    return $card;
};

const main = function (games) {
    'use strict';

    games.forEach(game => $('.game-content').append(createCard(game)));
};


// вызов функции main с аргументом в виде объекта games
$(() => $.getJSON('/games', games => main(games)));
