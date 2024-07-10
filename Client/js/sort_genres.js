import { createCard } from "./createCard.js";
const dropdowns = document.querySelectorAll('.dropdown');

var fillGenresList = function(genres, games){
    let _where_place_genre_list = document.querySelector('ul.menu-genres');
    genres.forEach( function(genre){
        let html = `<li>${genre}</li>`;
        _where_place_genre_list.insertAdjacentHTML('beforeend', html);
    });
    assingAction(games);
    };

    function displayGames(games){
        $('.game-content').empty();
        games.forEach(game => $('.game-content').append(createCard(game)));
    }

    function displayOfGenre(text, games){
        $('.game-content').empty();
        $('.empty').empty();
        const filteredGames = games.filter(
            game =>
                // каждый жанр и строку filter переводим в нижний регистр, чтобы поиск был не чувствителен к регистру
                game.genres.some(genre => genre.toLowerCase().includes(text.trim().toLowerCase())) // поиск по тегам
        );
        filteredGames.forEach(game => $('.game-content').append(createCard(game)));
    }

    function assingAction(games){
        const dropdowns = document.querySelectorAll('.dropdown');

        dropdowns.forEach(dropdown=>
            {
                const select = dropdown.querySelector('.select');
                const caret = dropdown.querySelector('.caret');
                const menu_genres = dropdown.querySelector('.menu-genres');
                const genres = dropdown.querySelectorAll('.menu-genres li');
                const selected = dropdown.querySelectorAll('.selected');
        
                select.addEventListener('click', ()=>{
                    select.classList.toggle('select-clicked');
                    caret.classList.toggle('caret-rotate');
                    menu_genres.classList.toggle('menu-open');
                    genres.forEach(genre=>{
                        if (genre.classList.contains('active')){
                            $(".game-content").empty();
                            if (genre.innerText === "Все жанры")
                                displayGames(games);
                            else
                                displayOfGenre(genre.innerText, games);
                        };
                    })
                });
                /*
                const el = document.getElementById('recordplayerstick')
                const classNames = ['pinplace', 'pinsongplay']
                if (classNames.some(className => el.classList.contains(className))) {
                    removeping()
                }
                */
                genres.forEach(genre=>{
                    genre.addEventListener('click', ()=>{
                        select.innerText = genre.innerText;
                        select.classList.remove('select-clicked');
                        // caret.classList.remove('caret-rotate');
                        menu_genres.classList.remove('menu-open');
                        genres.forEach(genre=>{
                            genre.classList.remove('active');
        
                        });
                        genre.classList.add('active');
                    });
                });
            });
    }


const main = async function (games) {
    // 'use strict';
    $('.game-content').empty();
    games.forEach(game => {

        $('.game-content').append(createCard(game));
    });

    var genres = [];
    games.forEach(game=>(
        game.genres.forEach(function (genre){
            if (genres.indexOf(genre) === -1){
                genres.push(genre);
            }
        })
    ));
    fillGenresList(genres, games);
};

$(() => $.getJSON('/games', games => main(games)));