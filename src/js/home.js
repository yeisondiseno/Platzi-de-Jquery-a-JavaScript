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
// })

  Promise.race([
    getuser,
    getuser,
  ])
  .then(function(message){
    console.log(message)
  })
  .catch(function(message){
    console.log(message);
  })