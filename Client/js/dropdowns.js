var getGenres = function (elements){
    var genres =[];
    elements.forEach(function (list) {
        list.genres.forEach(function (genre) {
        if (genres.indexOf(genre) === -1){
            genres.push(genre);
        }
        });
        });
        console.log(genres);
        return genres;
};

const dropdowns = document.querySelectorAll('.dropdown');

function assingAction(){
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
                            displayGameJson(json);
                        else
                            displayOfGenre(genre.innerText);
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
                    menu.classList.remove('menu-open');
                    genres.forEach(genre=>{
                        genre.classList.remove('active');
    
                    });
                    genre.classList.add('active');
                });
            });
        });
}