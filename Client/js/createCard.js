import { currentUser } from "./helpers.js";
/**

 * @param {any} game
 * @returns {JQuery<HTMLElement>} HTML-элемент
 */
export const createCard = (game) => {
    const $card = $('<div>').addClass('box');

    const $img = $('<img>').attr({src: game.image});

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
                ]),
                $('<a>').addClass('box-btn').on('click', function(event) {
                    event.preventDefault();
                    if (confirm('Вы уверены, что хотите удалить игру ' + game.game + '?'))
                        $.ajax({
                            url: '/games/' + game._id,
                            type: 'DELETE'
                        })
                            .done(deletedGame => {
                                alert('Игра удалена');
        
                                const removedIndex = games.findIndex(savedGame => savedGame._id === deletedGame._id);
                                shows.splice(removedIndex, 1);
        
                                $('.search-box input').trigger('input', '');
                            })
                            .fail(() => alert('Произошла ошибка! Повторите попытку позже!'));
                })
                .append([
                    $('<i>').addClass('bx bxs-message-square-x')
                ]),
                $('<a>')
                .addClass('box-btn').append(
                    $('<i>').addClass('bx bx-edit-alt')
                )
            ]),
        ]);
    if (currentUser() === game.creator){
        $card.append([$img, $infoColumn]);
        return $card;
    }

    return;
};