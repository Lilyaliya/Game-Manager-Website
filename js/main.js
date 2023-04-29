let menu = document.querySelector('.menu-icon');
let navbar = document.querySelector('.menu');
menu.onclick=()=>{
    navbar.classList.toggle('active');
    menu.classList.toggle('move');
    bell.classList.remove('active');
}

// Это глоб переменная для хранения json
var json = null;
// вывод содержимого по умолчанию
var def = false;
var needReload = false; // state of reload
// результат парсинга
var games = [];
//Уведомления
let bell = document.querySelector('.notification');
document.querySelector('#bell-icon').onclick = ()=>{
    bell.classList.toggle('active');
}
//Слайдер
var swiper = new Swiper(".trending-content", {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay:{
      delay: 5000,
      disableOnInteraction: false,
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      1068: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
    },
  });

  // Скроллбар прочитаного
window.onscroll = function(){mufunction()};
function mufunction(){
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById('scroll-bar').style.width = scrolled + '%';
}

// добаввление новой игры в коллекцию
// 1. Создали div и добавили к странице
let div = document.createElement('div');
div.classList.add('game-content');
let gamesContainer = document.querySelector('section.games.container');
gamesContainer.appendChild(div);
// 2. добавили прослушку на кнопку
let submitBtn = document.getElementById('btn');
console.log(submitBtn);
submitBtn.addEventListener('click', addNewGame);

var select = document.getElementById('select');
var even = new Event('change');
var option = select.querySelector('option');
// Dispatch it.
// option.dispatchEvent(even);

document.getElementById('1').onchange = SortProduct;
// 10. добавим li и поставим туда все доступные теги

let main = document.querySelector('.main');


// функция получения списка игр по жанрам
var fillGenreList = function (elements){
  var genres =[];
  elements.forEach(function (list) {
    list.genres.forEach(function (genre) {
      if (genres.indexOf(genre) === -1){
        genres.push(genre);
      }
      });
    });
    console.log(genres);
    
// парсим список с играми из json
    var games = genres.map(function (genre){
      // список игр такого-то жанра
      var gamesOfGenre = [];
      var images = [];
      elements.forEach(function (list) {
        if (list.genres.indexOf(genre) !== -1){
          gamesOfGenre.push(list.game);
          images.push(list.image);
        }
        });
        return {"genre": genre, "game": gamesOfGenre, "image": images};

    });
    console.log(games);
    return games;
};


// функция получения игр из json
var fillGameList = function (elements){
  // filled names
  var names =[];
  // var images = [];
  var temp;
  elements.forEach(function (element) {
      if (names.indexOf(element.game) === -1){
        names.push(element.game);
      }
    });
    var gameList = names.map(function (game) {
        var genres = [];
        var image = [];
        elements.forEach(function (element) {
          if (game === element.game){
            image.push(element.image);
            genres.push(element.genres);
          }
          });
          return {"game": game, "image": image, "genres": genres};
      });
    console.log(gameList);
    return gameList;
};


// функция добавления новых игр
var insertGames = function (elements){
  games = elements.map(function (game){
    var name = game.name;
    var genres = [];
    var image = game.image;
    game.genres.forEach(function (Genres){
      genres.push(Genres);
    });
    return {"game": name, "image": image, "genres": genres};
  });
  console.log(games);
  //"use strict";
  if (def)
     displayGenreJson(games);
 else
     displayGameJson(games);
  
}

function addInput(){
  const genre = document.createElement('input');
  genre.type = "text";
  genre.name = "genrick";
  genre.placeholder = "введите свой жанр";
  const btn = document.createElement('a');
  btn.className = "delete";
  btn.innerHTML = "&times";

  const flex = document.createElement('div');
  flex.className = "flex";

  input.appendChild(flex);
  flex.appendChild(genre);
  flex.appendChild(btn);

}

// Добавим функционал добавления нового жанра к игре
const addBtn = document.querySelector(".add");
const input = document.querySelector('.inp-group');
addBtn.addEventListener("click", addInput);


function addNewGame(){
  let gName = document.getElementById('gameName').value;
  let image = document.getElementById('photoPreview').value;
  var genres = [];
  var temp = document.querySelectorAll('.flex');
  temp.forEach(function (el){
    var text = el.querySelector('input[name="genrick"]').value;
    console.log(text);
    if (genres.indexOf(text) === -1){
      genres.push(text);
    }
  });
  console.log(genres);
  var element = {"game": gName, "image": 'other.jpg', "genres": genres};
  games.push(element);
  var sel = document.getElementById('select');
  var option = sel.querySelector('option');
  console.log(option.getAttribute('name'));
  option.setAttribute('name', needReload);
  console.log(option.getAttribute('name'));
  needReload = !needReload;
  select.dispatchEvent(even);
}



var displayGameJson = function(elements){
  //"use strict";
  var games = fillGameList(elements);
  console.log(games);
  games.forEach(function (game){
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
    div.insertAdjacentHTML('beforeend', html);
  });
}

var displayGenreJson = function(elements){
  
  var genres = fillGenreList(elements);
  // return {"genre": genre, "game": gamesOfGenre[], "image": images[]};
  genres.forEach(function (genre){
    
    let div2 = document.createElement('div');
    div2.classList.add('filter-genre');
    gamesContainer.appendChild(div2);
    let heading = `<h1 class="form-title">${genre.genre}</h1>`;
    div2.insertAdjacentHTML('beforeend', heading);
    
    let div = document.createElement('div');
    div.classList.add('game-content');
    gamesContainer.appendChild(div);
    
    
    // 'beforeend'
    for (let i=0; i < genre.game.length;i++){
      let html = `<div class="box">
        <img src="img/${genre.image[i]}" alt=""> 
        <div class="box-text">
            <h2>${genre.game[i]}</h2>
            <div class="rating-download">
                <div class="rating">
                    <i class='bx bxs-star' ></i>
                    <span>4.7</span>
                </div>
                <a href="download.html" class="box-btn"><i class='bx bxs-message-alt-x' ></i></a>
            </div>
        </div>
        </div>`;
      div.insertAdjacentHTML('beforeend', html);
    }
  });
}


//"use strict";
$(document).ready(function () {
	$.getJSON("js/data.json", function (elements) {
        json = elements;
      // вызов функции insertGames с аргументом в виде объекта elements 
        insertGames(elements);
        });
  });






 function SortProduct() {
  var select = document.getElementById('select');
  var option = select.querySelector('option');
  
  this.run = ()=>{
    addevent();
  }

  function addevent(){
    select.onchange = sortingValue;

     

  }

  function sortingValue(){
  
    if (this.value === 'Default') {
      
      
      def = false;
      if (needReload)
        needReload = false;
      $(".game-content").empty();
      $(".filter-genre").empty();
      displayGameJson(games);
      
      
    }
    if (this.value === 'Genres') {
      
      
      def = true;
      if (needReload)
        needReload = false;
      $(".game-content").empty();
      $(".filter-genre").empty();
      displayGenreJson(games);
      

    }
    
  }
  
}
new SortProduct().run();


