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
  const $home = document.getElementById('home');

  const $featuringContainer = document.getElementById('featuring');

  function setAttributes($element, attributes){
    for (const attribute in attributes){
      $element.setAttribute(attribute, attributes[attribute]);
    }
  }

  const BASE_API = 'https://yts.mx/api/v2/list_movies.json?';
  
  function featuringTemplate(peli){
    return(
       `
        <div class="featuring">
          <div class="featuring-image">
            <img src="${peli.medium_cover_image}" 
                width="auto" 
                height="100" 
                alt="" 
                style="margin-bottom: -3px;">
          </div>
          <div class="featuring-content">
            <p class="featuring-title">Pelicula encontrada</p>
            <p class="featuring-album">${peli.title}</p>
          </div>
        </div>
       `
    )
  }

  $form.addEventListener('submit', async (evento) => {
    event.preventDefault();
    $home.classList.add('search-active');
    const $loader = document.createElement('img');
    setAttributes($loader, {
      src: 'src/images/loader.gif',
      width: 50,
      height: 50,
    });
    $featuringContainer.append($loader);

    const data = new FormData($form);
    const {
      data: {
        movies: peli
      }
    } = await getData(`${BASE_API}limit=1&query_term=${data.get('name')}`);
    const HTMLString = featuringTemplate(peli[0]);
    $featuringContainer.innerHTML = HTMLString;
  });

  const { data: { movies: actionList } } = await getData(`${BASE_API}genre=action`);
  const { data: { movies: dramaList } } = await getData(`${BASE_API}genre=drama`);
  const { data: { movies: animationList } } = await getData(`${BASE_API}genre=animation`);

  function videoItemTemaplate(movie, category) {
    return (
      `<div class="primaryPlaylistItem" data-id="${movie.id}" data-category="${category}">
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
      //alert($element);
      shoModal($element);
    });
  }

  function renderMovieList(list, $container, category){
    $container.querySelector('img').remove();
    list.forEach((movie) => {
      const HTMLString = videoItemTemaplate(movie, category);
      const movieElement = createTemplate(HTMLString);
      $container.append(movieElement);
      addEventClick(movieElement);
    });
  }

  const $actionContainer = document.getElementById('action');
  const $dramaContainer = document.getElementById('drama');
  const $animationContainer = document.getElementById('animation');

  const $modal = document.getElementById('modal');
  const $overlay = document.getElementById('overlay');
  const $hideModal = document.getElementById('hide-modal');

  const $modalImg = $modal.querySelector('img');
  const $modalTitle = $modal.querySelector('h1');
  const $modalDescription = $modal.querySelector('p');


  function findById(list, id){
    return list.find( (movie) => movie.id === parseInt(id, 10))
    //return list.find( movie => movie.id === parseInt(id, 10))  este puede ser 
    // for ( let i = 0; i < list.length; i++ ){
    //   if (list[i].id === parseInt(id, 10)) {
    //     return list[i];
    //   }
    // }
  }

  function findMovie(id, category){
    switch (category){
      case 'action': {
        return findById(actionList, id);
      }
      case 'drama': {
        return findById(dramaList, id);
      }
      default: {
        return findById(animationList, id);
      }
    }
  }

  function shoModal($element){
    $overlay.classList.add('active');
    $modal.style.animation = 'modalIn 0.8s forwards';
    const idElement = $element.dataset.id;
    const categoryElement = $element.dataset.category;
    const data = findMovie(idElement, categoryElement);
    $modalImg.setAttribute('src', data.medium_cover_image);
    $modalTitle.textContent = data.title;
    $modalDescription.textContent = data.description_full;
  }
  
  $hideModal.addEventListener('click', hideModal);
  function hideModal() {
    $overlay.classList.remove('active');
    $modal.style.animation = 'modalOut 0.8s forwards';
  }


  renderMovieList(actionList ,$actionContainer, 'action');
  renderMovieList(dramaList, $dramaContainer, 'drama');
  renderMovieList(animationList, $animationContainer, 'animation');

})();