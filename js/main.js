let menu = document.querySelector('.menu-icon');
let navbar = document.querySelector('.menu');
menu.onclick=()=>{
    navbar.classList.toggle('active');
    menu.classList.toggle('move');
    bell.classList.remove('active');
}

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
   let doc  = document.createHTMLDocument(gName);
  // let gStr = genre === 'Action'? "Экшн": genre === 'RPG'? "Шутер": genre === 'Card'?"Карты": "Другое";
  let imgPath = genre === 'Экшн'? "action.jpg": genre === 'Шутер'? "rpg.jpg": genre === 'Карты'?"card.jpg": "other.jpg";
  console.log(imgPath);
  // <img src="https://drive.google.com/uc?export=view&id=${pathPreview}" alt=""> 
  let html = `<div class="box">
                <img src="https://drive.google.com/uc?export=view&id=${pathPreview}" alt=""> 
                <div class="box-text">
                    <h2>${gName}</h2>
                    <h3>${genre}</h3>
                    <div class="rating-download">
                        <div class="rating">
                            <i class='bx bxs-star' ></i>
                            <span>4.7</span>
                        </div>
                        <a href="${gName.html}" class="box-btn"><i class='bx bxs-message-alt-x' ></i></a>
                    </div>
                </div>
              </div>`;
  div.insertAdjacentHTML('afterbegin', html);
}


