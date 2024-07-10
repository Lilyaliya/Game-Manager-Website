const search = document.querySelector(".search-box input");
let games_search = document.querySelectorAll(".box");

var getGames = function(elements){
    games = elements.map(function (game){
        var name = game.game;
        var genres = [];
        var image = game.image;
        game.genres.forEach(function (Genres){
            genres.push(Genres);
        });
        return {"game": name, "image": image, "genres": genres};
        });
}

var displayGames = function(elements, list){
    //"use strict";
    var games = fillGameList(elements);
    console.log(games);
    games.forEach(function (game){
        if (list.includes(game.game)){
        var gName = game.game;
        var genres = game.genres;
        var image = game.image;
        let html = `<div class="box">
        <img src="img/${image}" alt="">
        <div class="box-text">
            <h2>${gName}</h2>
            <h3>${genres}</h3>
            <div class="rating-download">
                <div class="rating">
                    <i class='bx bxs-star' ></i>
                    <span>4.7</span>
                </div>
                <a href="download.html" class="box-btn"><i class='bx bxs-message-alt-x' ></i></a>
            </div>
        </div>
        </div>`;
        div.insertAdjacentHTML('beforeend', html);}
    });
    }

search.addEventListener("keyup", e=>{
    if (e.key == "Enter"){
        let searchValue = search.value;
        value = searchValue.toLowerCase();
        console.log(value);
        getGames(json);
        var games_list = [];
        games.forEach(game=>{
            game.genres.forEach(genre=>{
                if (genre.toLowerCase().includes(value.toLowerCase()))
                games_list.push(game.game);
            });
            let game_name = game.game;
            console.log(game_name.toLowerCase());
            if (game_name.toLowerCase().includes(value.toLowerCase()) && games_list.indexOf(game.game) === -1){
                games_list.push(game.game);
            }
        });
        $(".game-content").empty();
        displayGames(json, games_list);
    }
});

search.addEventListener("keyup", ()=>{
    if (search.value != "")
    return;
    $(".game-content").empty();
    displayGameJson(json);
});