var Modele = function () {
  /*
  Logic of the app:
  1)the user presses the power button
  2)the user presses the start buttons
  3)if user presses strict mode then
  when loses the game restarts at the beginning
  4)the app presses one random button then awaits
  for the user to press this same button before an elapsed time.
  if the user succeed then one more random button is pressed
  by the app and so on...
  */
  var seriesOfButton = ['red', 'yellow', 'green', 'blue'];
  /*
  Steps
  1)choose a random button->press-it->play his sound
  2)Do Step1->choose a random button->press it-> play his sound
  wait for the user to hit the right button:
  if he waits too long game over
  if he press the wrong button game over
  if he press the right combination of buttons before time is up
  3)Do step2->choose a random button->press it-> play his sound
  */

  var myController;
  var buttonsChosen=[];
  var buttonsPlayed=[];
  function chooseAndPlay() {
    var seriesOfButton=["yellow","red","green","blue"];
    var random = Math.floor(Math.random() * seriesOfButton.length);
    var buttonChosen = seriesOfButton[random];
    buttonsChosen.push(buttonChosen);
    myController.pressAndReleaseButton(buttonsChosen);
    myController.showStepNumber(buttonsChosen.length);
    setTimeout(function(){
      if(!isEqual(buttonsChosen,myController.buttonsPressed)){
        gameOver();
      }
      else{
        chooseAndPlay();
      }
    },5000)
  }

  
  function isEqual(arr1,arr2){
    for(var i=0;i<arr1.length;i++){
      if(arr2[i]!==arr1[i]){
        return false;
      }
    }
    return true;
  }
  
  function gameOver() {
    alert("Game Over");
    gameOn = false;
    gameStarted = false;
    strictMode = false;
    buttonsChosen=[];
    // if(strictMode){

    // }else{

    // }
  }

  var gameOn = false;

  var gameStarted = false;

  var strictMode = false;

 this.setController=function(passedController){
    myController=passedController;
 }

 this.toggleGame=function() {
    gameOn = !gameOn;
    if(!gameOn){
      myController.offGame();
      gameOver();
    }
    else{
     myController.onGame();
    }
  }

 function gameOver(){
   alert("Game Over");
   buttonsChosen=[];
   gameStarted=false;
 }

 this.toggleStrictMode=function(){
   strictMode=!strictMode;
   console.log('Strict Mode Is ON:'+strictMode);
 }

this.startGame=function() {
    if (gameOn) {
      if(!gameStarted){
        setTimeout(function(){
            myController.addListeners();
            gameStarted = true;
            chooseAndPlay();      
        },2000)
      }
    }
  }
}

