var canvas = document.getElementById("simon-game");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var audioCtx = new (window.AudioContext || window.webkitAudioContext);
var speaker=audioCtx.destination;
var volume=audioCtx.createGain();
volume.connect(speaker);
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
  3)Do step2->choose a random button->press it-> play his sound
  */

  var myController;

  function doStep(step) {
    if (step == 0) {
      /** Choose a random button **/
      var random = Math.floor(Math.random * seriesOfButton.length);
      var buttonChosen = seriesOfButton[random];
      /** Tell the vue to press this button**/
      myController.pressButton(buttonChosen);
      // setTimeout(function () {
      //   gameOver();
      // }, 3000);
    }
    else {
      doStep(step - 1);
      doStep(step);
    }
  }

  function gameOver() {
    gameOn = false;
    gameStarted = false;
    strictMode = false;
  }

  var gameOn = false;

  var gameStarted = false;

  var strictMode = false;

 this.setController=function(passedController){
    myController=passedController;
 }

 this.toggleGame=function() {
    gameOn = !gameOn;
    console.log('Game Is ON:'+gameOn);
  }

 this.toggleStrictMode=function(){
   strictMode=!strictMode;
   console.log('Strict Mode Is ON:'+strictMode);
 }

this.startGame=function() {
    if (gameOn) {
      gameStarted = true;
      step = 1
      doStep(step);
      step++;//If the user clicks the right button then this part gets done
      if (strictMode) {

      }
      else {

      }
    }
  }
}

var Controller = function (){
  var myVue = new Vue();
  var myModel=new Modele();
  myModele.setController(this);
  myVue.init();
  var buttons=myVue.buttons;
  var startButton=buttons[0];
  var strictButton=buttons[1];
  var powerButton=buttons[2];
  powerButton.addEventListener('click',myModel.toggleGame);
  strictButton.addEventListener('click',myModel.toggleStrictMode)
  startButton.addEventListener('click',myModel.startGame);
  this.pressButton=function(id){
    console.log("Button Pressed:");
  }
}

var Vue = function () {
  this.stage = new createjs.Stage("simon-game");
  this.startButton;
  this.strictButton;
  this.strictButtonLED;
  this.strictMode = false;
  this.screenText;
  this.greenButton;
  this.yellowButton;
  this.redButton;
  this.blueButton;
  this.powerButton;
  ///Power Button variables for animation
  this.powerButtonClicked = false;
  this.powerButtonInitialXPosition = 81;
  //Simon Game Container
  this.simonGameContainer;
  //inner Circle Container
  this.innerCircleContainer;
  var that = this;
  this.buttons = [];

  this.redButtonColorReleased = 0x880000;
  this.blueButtonColorReleased = 0x000088;
  this.greenButtonColorReleased = 0x008800;
  this.yellowButtonColorReleased = 0x888800;
  this.strictButtonLEDColorOff= 0x660000;
  this.strictButtonLEDColorOn = 0xFF0000;
  var strictButtonLEDCurrentColor=this.strictButtonLEDColorOff;
  this.redButtonColorPressed = 0xFF0000;
  this.blueButtonColorPressed = 0x0000FF;
  this.greenButtonColorPressed = 0x00FF00;
  this.yellowButtonColorPressed = 0xFFFFFF00;


  var yellowSound;
  var greenSound;
  var redSound;
  var blueSound;

  this.draw = function () {
    var outerCircle = new createjs.Shape();
    this.simonGameContainer = new createjs.Container();
    outerCircle.graphics.f(createjs.Graphics.getRGB(0x333333));
    outerCircle.graphics.moveTo(0, 0)
    outerCircle.graphics.arc(0, 0, 210, 0, Math.PI * 2);
    outerCircle.x = 100;
    outerCircle.y = 100;
    outerCircle.shadow = new createjs.Shadow("#000000", 0, 0, 10);
    this.simonGameContainer.addChild(outerCircle);
    this.redButton = drawSoundButton(this.redButtonColorReleased, "top right");
    this.simonGameContainer.addChild(this.redButton);
    this.blueButton = drawSoundButton(this.blueButtonColorReleased, "top left");
    this.simonGameContainer.addChild(this.blueButton);
    this.greenButton = drawSoundButton(this.greenButtonColorReleased, "bottom left");
    this.simonGameContainer.addChild(this.greenButton);
    this.yellowButton = drawSoundButton(this.yellowButtonColorReleased, "bottom right");
    this.simonGameContainer.addChild(this.yellowButton);
    this.innerCircleContainer = new createjs.Container();
    var innerCircle = new createjs.Shape();
    innerCircle.graphics.f(createjs.Graphics.getRGB(0x444444));
    innerCircle.graphics.setStrokeStyle(10);
    var strokeCommand4 = innerCircle.graphics.beginStroke("#333").command;
    innerCircle.graphics.arc(0, 0, 100, 0, 2 * Math.PI);
    innerCircle.x = 100;
    innerCircle.y = 100;
    this.innerCircleContainer.addChild(innerCircle);
    var screen = new createjs.Shape();
    screen.graphics.f(createjs.Graphics.getRGB(0x330000));
    screen.graphics.setStrokeStyle(3);
    var strokeCommand5 = screen.graphics.beginStroke("#000000").command;
    screen.graphics.moveTo(0, 0);
    screen.graphics.drawRoundRect(0, 0, 50, 30, 3);
    screen.x = 20;
    screen.y = 90;
    this.innerCircleContainer.addChild(screen);
    var screenToShowStepsTitle = new createjs.Text("COUNT", "10px Arial", "#FFF");
    screenToShowStepsTitle.x = 25;
    screenToShowStepsTitle.y = 125;
    this.innerCircleContainer.addChild(screenToShowStepsTitle);
    this.startButton = new createjs.Shape();
    this.startButton.graphics.f(createjs.Graphics.getRGB(0xFF0000));
    this.startButton.graphics.setStrokeStyle(3);
    var strokeCommand6 = this.startButton.graphics.beginStroke("#333333").command;
    this.startButton.graphics.arc(0, 0, 12, 0, 2 * Math.PI);
    this.startButton.x = 100;
    this.startButton.y = 105;
    this.innerCircleContainer.addChild(this.startButton);
    var startButtonText = new createjs.Text("START", "10px Arial", "#FFF");
    startButtonText.x = 85;
    startButtonText.y = 125;
    this.innerCircleContainer.addChild(startButtonText);
    this.strictButtonLED = drawStrictButtonLED(strictButtonLEDCurrentColor);
    this.strictButton = new createjs.Shape();
    this.strictButton.graphics.f(createjs.Graphics.getRGB(0xFFFF00));
    this.strictButton.graphics.setStrokeStyle(3);
    var strokeCommand6 = this.strictButton.graphics.beginStroke("#333333").command;
    this.strictButton.graphics.arc(0, 0, 12, 0, 2 * Math.PI);
    this.strictButton.x = 150;
    this.strictButton.y = 105;
    this.innerCircleContainer.addChild(this.strictButton);
    var strictButtonText = new createjs.Text("STRICT", "10px Arial", "#FFF");
    strictButtonText.x = 135;
    strictButtonText.y = 125;
    this.innerCircleContainer.addChild(strictButtonText);
    var powerButtonSupport = new createjs.Shape();
    powerButtonSupport.graphics.f(createjs.Graphics.getRGB(0x333333));
    powerButtonSupport.graphics.moveTo(0, 0);
    powerButtonSupport.graphics.drawRoundRect(0, 0, 45, 20, 2);
    powerButtonSupport.x = 80;
    powerButtonSupport.y = 150;
    this.innerCircleContainer.addChild(powerButtonSupport);
    this.powerButton = new createjs.Shape();
    this.powerButton.graphics.f(createjs.Graphics.getRGB(0x00AAFF));
    this.powerButton.graphics.moveTo(0, 0);
    this.powerButton.graphics.drawRoundRect(0, 0, 20, 18, 2);
    this.powerButton.x = 81;
    this.powerButton.y = 151;
    this.innerCircleContainer.addChild(this.powerButton);
    var offText = new createjs.Text("OFF", "10px Arial", "#FFF");
    offText.x = 60;
    offText.y = 155;
    this.innerCircleContainer.addChild(offText);
    var onText = new createjs.Text("ON", "10px Arial", "#FFF");
    onText.x = 130;
    onText.y = 155;
    this.innerCircleContainer.addChild(onText);
    var gameName = new createjs.Text("Simon Game", "30px 'Anton'", "#FFF");
    gameName.x = 29;
    gameName.y = 30;
    this.innerCircleContainer.addChild(gameName);
    this.screenText = new createjs.Text("--", "25px 'Orbitron'", "#F00");
    this.screenText.x = 33;
    this.screenText.y = 90;
    this.innerCircleContainer.addChild(this.screenText);
    this.innerCircleContainer.x = 0;
    this.innerCircleContainer.y = 0;
    this.simonGameContainer.addChild(this.innerCircleContainer);
    this.stage.addChild(this.simonGameContainer);
    this.simonGameContainer.x = (canvas.width - 200) / 2;
    this.simonGameContainer.y = (canvas.height - 200) / 2;
    this.stage.update();
    this.greenButton.id = 'green';
    this.yellowButton.id = 'yellow';
    this.redButton.id = 'red';
    this.blueButton.id = 'blue';
    this.startButton.id = 'start';
    this.strictButton.id = 'strict';
    this.powerButton.id = 'power';
    this.redButton.groupName = 'soundButtons';
    this.greenButton.groupName = 'soundButtons';
    this.yellowButton.groupName = 'soundButtons';
    this.blueButton.groupName = 'soundButtons';
    that.buttons = [this.startButton, this.strictButton, this.powerButton, this.redButton, this.yellowButton, this.greenButton, this.blueButton];
    addEventListeners();
  }

  function drawStrictButtonLED(strictButtonLEDColor) {
    that.strictButtonLED = new createjs.Shape();
    that.strictButtonLED.graphics.f(createjs.Graphics.getRGB(strictButtonLEDColor));
    that.strictButtonLED.graphics.setStrokeStyle(3);
    var strokeCommand6 = that.strictButtonLED.graphics.beginStroke("#333333").command;
    that.strictButtonLED.graphics.arc(0, 0, 5, 0, 2 * Math.PI);
    that.strictButtonLED.x = 150;
    that.strictButtonLED.y = 80;
    that.innerCircleContainer.addChild(that.strictButtonLED);
  }

  function drawSoundButton(buttonColor, buttonPosition) {
    var button = new createjs.Shape();
    button.graphics.f(createjs.Graphics.getRGB(buttonColor));
    button.graphics.setStrokeStyle(20);
    var strokeCommand = button.graphics.beginStroke("#333").command;
    button.graphics.moveTo(0, 0);
    switch (buttonPosition) {
      case "bottom right":
        button.graphics.arc(0, 0, 200, 0, Math.PI / 2);
        break;
      case "bottom left":
        button.graphics.arc(0, 0, 200, Math.PI / 2, Math.PI);
        break;
      case "top left":
        button.graphics.arc(0, 0, 200, Math.PI, -Math.PI / 2);
        break;
      case "top right":
        button.graphics.arc(0, 0, 200, -Math.PI / 2, 0);
        break;
      default:
        return;
        break;
    }
    button.graphics.lineTo(0, 0);
    button.x = 100;
    button.y = 100;
    return button;
  }

  function addEventListeners() {
    that.buttons.forEach(function (button) {
      if (button.groupName) {
        if (button.groupName === 'soundButtons') {
          button.addEventListener('mousedown', handleSoundButtonPressed);
          button.on('pressup', handleSoundButtonReleased);
        }
      }
      else {
        button.addEventListener('click', handleButtonClicks);
      }
    });
  }

  function handleSoundButtonPressed(e) {
    console.log('button pressed');
    var button = e.target;
    if (button.id === 'red') {
      button = drawSoundButton(that.redButtonColorPressed, "top right");
    }
    if (button.id === 'yellow') {
      button = drawSoundButton(that.yellowButtonColorPressed, "bottom right");
    }
    if (button.id === 'green') {
      button = drawSoundButton(that.greenButtonColorPressed, "bottom left");
    }
    if (button.id === 'blue') {
      button = drawSoundButton(that.blueButtonColorPressed, "top left");
    }
    playSound(e.target.id);
    that.simonGameContainer.addChild(button);
    that.simonGameContainer.addChild(that.innerCircleContainer);
    this.strictButtonLED = drawStrictButtonLED(strictButtonLEDCurrentColor);
  }

  function handleSoundButtonReleased(e) {
    console.log('button released');
    var button = e.target;
    if (button.id === 'red') {
      button = drawSoundButton(that.redButtonColorReleased, "top right");
    }
    if (button.id === 'yellow') {
      button = drawSoundButton(that.yellowButtonColorReleased, "bottom right");
    }
    if (button.id === 'green') {
      button = drawSoundButton(that.greenButtonColorReleased, "bottom left");
    }
    if (button.id === 'blue') {
      button = drawSoundButton(that.blueButtonColorReleased, "top left");

    }
    stopSound(e.target.id);
    that.simonGameContainer.addChild(button);
    that.simonGameContainer.addChild(that.innerCircleContainer);
    this.strictButtonLED = drawStrictButtonLED(strictButtonLEDCurrentColor);
  }

  this.pressButton = function (idButton) {
    var button = buttons.filter(function (button) {
       button.id = idButton;
    });
    animateButton(button);
    playSound(idButton);
  }

  function handleButtonClicks(e) {
    animateButton(e.target);
  }

  function animateButton(button) {
    if (button.id === 'power') {
      this.powerButtonClicked = !this.powerButtonClicked;
      if (this.powerButtonClicked) {
        createjs.Tween.get(button, { loop: false })
          .to({ x: 105 }, 500, createjs.Ease.getPowInOut(4));
      }
      else {
        createjs.Tween.get(button, { loop: false })
          .to({ x: 81 }, 500, createjs.Ease.getPowInOut(4));
      }
    }

    if (button.id === 'start' || button.id === 'strict') {
      createjs.Tween.get(button, { loop: false })
        .to({ scaleX: 0.8, scaleY: 0.8 }, 50, createjs.Ease.getPowInOut(4))
        .to({ scaleX: 1, scaleY: 1 }, 50, createjs.Ease.getPowInOut(4));
    }

    if (button.id === 'strict') {
      this.strictMode = !this.strictMode;
      if (this.strictMode) {
        console.log('Strict mode is on');
        that.strictButtonLED = drawStrictButtonLED(that.strictButtonLEDColorOn);
        strictButtonLEDCurrentColor=that.strictButtonLEDColorOn;
      }
      else {
        console.log('Strict mode is off');
        that.strictButtonLED = drawStrictButtonLED(that.strictButtonLEDColorOff);
        strictButtonLEDCurrentColor=that.strictButtonLEDColorOff;
      }
    }
  }
  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener("tick", this.stage);

function createSound(color){
  var frequencies={
    yellow:220.00,
    blue:277.18,
    green:329.63,
    red:164.81
  }
  var sound=audioCtx.createOscillator();
      sound.frequency.value =frequencies[color];
      sound.type = "sine";
      sound.start();
      sound.connect(volume);
  return sound;
}

  function playSound(id) {
    switch(id){
      case "yellow":
        yellowSound=createSound("yellow");
        break;
      case "red":
      redSound=createSound("red");
        break;
      case "blue":
        // blueSound.start();
      blueSound=createSound("blue");
        break;
      case "green":
        // greenSound.start();
      greenSound=createSound("green");
        break;
    }
  }

  function stopSound(id) {
    console.log('play sound called');
    switch(id){
      case "yellow":
        yellowSound.stop();
        break;
      case "red":
        redSound.stop();
        break;
      case "blue":
        blueSound.stop();
        break;
      case "green":
        greenSound.stop();
        break;
    }
  }

  this.init = function () {
    this.draw();
  }
}


function launchApp() {
  var controller=new Controller();
}

launchApp();
