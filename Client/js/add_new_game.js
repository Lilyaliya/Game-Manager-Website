import { currentUser } from './helpers.js';

function addNewGame(games){
    // if (isAdminLogged){
    //   alert('У данной учетной записи нет права на создание игр');
    //   return;
    // }
    let gName = document.getElementById('gameName').value;
    const image = $('.game-input-box #image')[0].files[0];
    const info = $('.game-input-box #info').val();
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
    // var element = {"game": gName, "image": 'other.jpg', "genres": genres};
  
    const showData = new FormData();
          showData.append('game', gName);
          showData.append('creator', currentUser());
          showData.append('description', info);
          showData.append('image', image);
          for (var i = 0; i < genres.length; i++) showData.append('genres', genres[i]);
  
    // $.post("games", showData, function(result) {
    //   console.log(result);
    //   games.push(showData);
      
    //   var sel = document.getElementById('select');
    //   var option = sel.querySelector('option');
    //   console.log(option.getAttribute('name'));
    //   option.setAttribute('name', needReload);
    //   console.log(option.getAttribute('name'));
    //   needReload = !needReload;
    //   select.dispatchEvent(even);
    //   json.add(showData);
    // });
  
  
    $.ajax({
      type: 'POST',
      url: '/games',
      cache: false,
      contentType: false,
      processData: false,
      data: showData,
      dataType: 'json',
      success: game => {
          games.push(game);
  
          $('.search-box input').trigger('input', '');
          // очищаем форму
          [
              $('.game-input-box #gameName'),
              $('.game-input-box #description'),
              $('.game-input-box #image'),
              $('.game-input-box #download')
          ].forEach(el => el.val(null));
          // очищаем теги
          $('.inp-group').empty();
      }
  });
  
  };

const main = function (games){
    // let submitBtn = document.getElementById('btn');
    // console.log(submitBtn);
    // submitBtn.addEventListener('click', addNewGame(games));

    $('.button-new-game').on('click', () => {addNewGame(games);});
}

$(() => $.getJSON('/games', games => main(games)));