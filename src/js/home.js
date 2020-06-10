console.log('hola mundo!');

const getuserAll = new Promise(function(todoBien, todoMal){
  // llamar a un api, siguientes intervals
  //setInterval
  setTimeout(function(){
    // luego de 3 segundos se ejecuta 
    todoBien('Se acabó el tiempo');
  }, 5000)
});

const getuser = new Promise(function (todoBien, todoMal) {
  // llamar a un api, siguientes intervals
  //setInterval
  setTimeout(function () {
    // luego de 3 segundos se ejecuta 
    todoBien('Se acabó el tiempo 3');
  }, 3000)
});


// getuser
// .then(function(){
//   console.log('Todo está bien');
// })
// .catch(function(message){
//   console.log(message);
// });

Promise.race([
    getuserAll,
    getuser,
  ])
  .then(function(message){
    console.log(message)
  })
  .catch(function(message){
    console.log(message);
  });


// obtener datos de una api
fetch('https://randomuser.me/api/')
  .then( (response) => {
    console.log(response);
    return response.json();
  })
  .then( (user)=>{
    console.log('User', user.results[0].name.first);
  })
  .catch( ()=>{
    console.log('Algo falló');
  });

(async function load(){
  // await
  async function getData(url){
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  const $form = document.getElementById('form');

  $form.addEventListener('submit', (evento) => {
    event.preventDefault();
    
  })

  const actionList = await getData('https://yts.mx/api/v2/list_movies.json?genre=action');
  const dramaList = await getData('https://yts.mx/api/v2/list_movies.json?genre=drama');
  const animationList = await getData('https://yts.mx/api/v2/list_movies.json?genre=animation');

  function videoItemTemaplate(movie) {
    return (
      `<div class="primaryPlaylistItem">
        <div class="primaryPlaylistItem-image">
          <img src="${movie.medium_cover_image}">
        </div>
        <h4 class="primaryPlaylistItem-title">
          ${movie.title}
        </h4>
      </div>`
    )
  };

  function createTemplate(HTMLString){
    const html = document.implementation.createHTMLDocument();
    html.body.innerHTML = HTMLString;
    return html.body.children[0];
  }

  function addEventClick($element){
    $element.addEventListener('click', function(){
      alert($element);
    });
  }

  function renderMovieList(list, $container){
    $container.querySelector('img').remove();
    list.data.movies.forEach((movie) => {
      const HTMLString = videoItemTemaplate(movie);
      const movieElement = createTemplate(HTMLString);
      $container.append(movieElement);
      addEventClick(movieElement);
    });
  }

  const $actionContainer = document.getElementById('action');
  const $dramaContainer = document.getElementById('drama');
  const $animationContainer = document.getElementById('animation');

  const $featuringContainer = document.getElementById('featuring');
  const $home = document.getElementById('home');

  const $modal = document.getElementById('modal');
  const $overlay = document.getElementById('overlay');
  const $hideModal = document.getElementById('hide-modal');

  const $modalImg = $modal.querySelector('img');
  const $modalTitle = $modal.querySelector('h1');
  const $modalDescription = $modal.querySelector('p');


  renderMovieList(actionList ,$actionContainer);
  renderMovieList(dramaList, $dramaContainer);
  renderMovieList(animationList, $animationContainer);

})();