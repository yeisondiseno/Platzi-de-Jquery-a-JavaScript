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

  const actionList = await getData('https://yts.mx/api/v2/list_movies.json?genre=action');
  const dramaList = await getData('https://yts.mx/api/v2/list_movies.json?genre=drama');
  const animationList = await getData('https://yts.mx/api/v2/list_movies.json?genre=animation');
  
  console.log(actionList, dramaList, animationList);
})();