let menu = document.querySelector('.menu-icon');
let navbar = document.querySelector('.menu');
menu.onclick=()=>{
    navbar.classList.toggle('active');
    menu.classList.toggle('move');
    bell.classList.remove('active');
}

// Это глоб переменная для хранения json
var json = null;

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
console.log(gamesContainer);
gamesContainer.appendChild(div);
// 2. добавили прослушку на кнопку
let submitBtn = document.getElementById('btn');
console.log(submitBtn);
submitBtn.addEventListener('click', displayGameDetail);

// 10. добавим main и поставим туда все доступные теги
let main = document.createElement('div');
main.classList.add('main');
let list = document.createElement('ul');
list.classList.add('indicator');
main.appendChild(list);
gamesContainer.appendChild(main);

// 11. глобальная переменная для хранения json
 //var json = readJSON();
 "use strict";
 //var gen = fillUniqueGenres(json);
// fillSectionSort(genres);

// function fillSectionSort(genres){
//   let html = <li data-filter = "all"> <a href="#">All</a></li>;
//   list.insertAdjacentHTML('beforeend', html);
//   genres.forEach(function (genre){
//     html = `<li data-filter = "${genre}"> <a href="#">${genre}</a></li>`;
//     div.insertAdjacentHTML('beforeend', html);
//   });
  
// }
//window.onload = function(){insertGames()};

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
      elements.forEach(function (list) {
        if (list.genres.indexOf(genre) !== -1){
          gamesOfGenre.push(list.name);
        }
        });
        return {"genre": genre, "game": gamesOfGenre};

    });
    console.log(games);
    return games;
};

var fillUniqueGenres = function (elements) {
  var genres =[];
  elements.forEach(function (list) {
    list.genres.forEach(function (genre) {
      if (genres.indexOf(genre) === -1){
        genres.push(genre);
      }
      });
    });
    var arrGenres = genres.map(function (genre) { 
      return {"genre": genre};
     });
     return arrGenres;
  }

// функция получения игр из json
var fillGameList = function (elements){
  // filled names
  var names =[];
  // var images = [];
  var temp;
  elements.forEach(function (element) {
      if (names.indexOf(element.name) === -1){
        names.push(element.name);
      }
      // if (images.indexOf(element.image) === -1){
      //   images.push(element.image);
      // }
    });
  
    var gameList = names.map(function (game) {
        var genres = [];
        var image = [];
        elements.forEach(function (element) {
          if (game === element.name){
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
  //"use strict";
  // var arrGames = elements.map(function (item) {
	// 	// просто возвращаем имя игры
	// 	return item.name;
	// });

  displayGameJson(elements);
}

// 3. создадим функцию отображения единицы игры
function displayGameDetail(){
  let gName = document.getElementById('gameName').value;
  console.log(gName);
  var pathPreview = document.getElementById('photoPreview').value;
  console.log(pathPreview);
  var pathTeaser = document.getElementById('teaser').value;
  console.log(pathTeaser);
  // выбрали жанр игры
  let genre = document.querySelector('input[name="genre"]:checked').value;
  console.log(genre);
  pathPreview = pathPreview.toString();
  pathTeaser = pathTeaser.toString();
  var t = pathTeaser.split('/')[5];
  var m = pathPreview.split('/')[5];
  if (t){
    console.log("Id-шечка на Тихона: " + t);
  }
  if (m){
    console.log("Id-шечка на обложку: " + m);
  }
  // let doc  = document.createHTMLDocument(gName);
  // let gStr = genre === 'Action'? "Экшн": genre === 'RPG'? "Шутер": genre === 'Card'?"Карты": "Другое";
  let imgPath = genre === 'Экшн'? "action.jpg": genre === 'Шутер'? "rpg.jpg": genre === 'Карты'?"card.jpg": "other.jpg";
  console.log(imgPath);
  // <img src="https://drive.google.com/uc?export=view&id=${pathPreview}" alt=""> 
  // <img src="img/${imgPath}" alt=""> 
  let html = `<div class="box">
                <img src="img/${imgPath}" alt=""> 
                <div class="box-text">
                    <h2>${gName}</h2>
                    <h3>${genre}</h3>
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

function readJSON(){
  $(document).ready(function () {
    $.getJSON("js/data.json", function (elements) {
        
          return elements;
          });
    });
};
//"use strict";
$(document).ready(function () {
	$.getJSON("js/data.json", function (elements) {
        json = elements;
      // вызов функции insertGames с аргументом в виде объекта elements 
        insertGames(elements);
        });
  });
