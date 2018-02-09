var canvas=document.getElementById("simon-game");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

var Modele=function(vue){
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

var myVue=new Vue();

var seriesOfButton=['red','yellow','green','blue'];
/*
Steps
1)choose a random button->press-it->play his sound
2)Do Step1->choose a random button->press it-> play his sound
3)Do step2->choose a random button->press it-> play his sound
*/

function doStep(step){
  if(step==0)
  {
    /** Choose a random button **/
    var random=Math.floor(Math.random*seriesOfButton.length);
    var buttonChosen=seriesOfButton[random];
    /** Tell the vue to press this button**/
    myVue.pressButton(buttonChosen);
    setTimeout(function(){
       gameOver();
    },3000);
  }
  else{
    doStep(step-1);
    doStep(step);
  }
}

function gameOver(){
  gameOn=false;
  gameStarted=false;
  strictMode=false;
}

var gameOn=false;

var gameStarted=false;

var strictMode=false;

function onApp(){
  gameOn=true;
}

// this.getButtonPressedByUser(button){
//
// }

function startGame(){
   if(gameOn)
   {
      gameStarted=true;
      step=1
      doStep(step);
      step++;//If the user clicks the right button then this part gets done
      if(strictMode)
      {

      }
      else{

      }
   }
}
}

var Controller=function(vue){

  var myVue=vue;
  var vueButtons=vue.buttons;



}

var Vue=function(){
  this.stage = new createjs.Stage("simon-game");
  this.startButton;
  this.strictButton;
  this.strictButtonLED;
  this.strictMode=false;
  this.screenText;
  this.greenButton;
  this.yellowButton;
  this.redButton;
  this.blueButton;
  this.powerButton;
  ///Power Button variables for animation
  this.powerButtonClicked=false;
  this.powerButtonInitialXPosition=81;
  //Simon Game Container
  this.simonGameContainer;
  var that=this;
  var buttons=[];

  this.draw=function(redButtonColor=0x440000,blueButtonColor=0x000044,greenButtonColor=0x004400,yellowButtonColor=0x444400,strictButtonLEDColor=0x330000){
    var outerCircle = new createjs.Shape();
    this.simonGameContainer=new createjs.Container();
    outerCircle.graphics.f(createjs.Graphics.getRGB(0x333333));
    outerCircle.graphics.moveTo(0,0)
    outerCircle.graphics.arc(0,0,210,0,Math.PI*2);
    outerCircle.x=100;
    outerCircle.y=100;
    outerCircle.shadow=new createjs.Shadow("#000000",0, 0, 10);
    this.simonGameContainer.addChild(outerCircle);
    this.redButton=new createjs.Shape();
    this.redButton.graphics.f(createjs.Graphics.getRGB(redButtonColor));
    this.redButton.graphics.setStrokeStyle(20);
    var strokeCommand = this.redButton.graphics.beginStroke("#333").command;
    this.redButton.graphics.moveTo(0,0)
    this.redButton.graphics.arc(0,0,200,0,Math.PI/2);
    this.redButton.graphics.lineTo(0,0);
    this.redButton.x=100;
    this.redButton.y=100;
    this.simonGameContainer.addChild(this.redButton);
    this.greenButton=new createjs.Shape();
    this.greenButton.graphics.f(createjs.Graphics.getRGB(greenButtonColor));
    this.greenButton.graphics.setStrokeStyle(20);
    var strokeCommand1 = this.greenButton.graphics.beginStroke("#333").command;
    this.greenButton.graphics.moveTo(0,0)
    this.greenButton.graphics.arc(0,0,200,Math.PI/2,Math.PI);
    this.greenButton.graphics.lineTo(0,0);
    this.greenButton.x=100;
    this.greenButton.y=100;
    this.simonGameContainer.addChild(this.greenButton);
    this.blueButton=new createjs.Shape();
    this.blueButton.graphics.f(createjs.Graphics.getRGB(blueButtonColor));
    this.blueButton.graphics.setStrokeStyle(20);
    var strokeCommand2 = this.blueButton.graphics.beginStroke("#333").command;
    this.blueButton.graphics.moveTo(0,0)
    this.blueButton.graphics.arc(0,0,200,Math.PI,-Math.PI/2);
    this.blueButton.x=100;
    this.blueButton.y=100;
    this.simonGameContainer.addChild(this.blueButton);
    this.yellowButton=new createjs.Shape();
    this.yellowButton.graphics.f(createjs.Graphics.getRGB(yellowButtonColor));
    this.yellowButton.graphics.setStrokeStyle(20);
    var strokeCommand3 = this.yellowButton.graphics.beginStroke("#333").command;
    this.yellowButton.graphics.moveTo(0,0)
    this.yellowButton.graphics.arc(0,0,200,-Math.PI/2,0);
    this.yellowButton.graphics.lineTo(0,0);
    this.yellowButton.x=100;
    this.yellowButton.y=100;
    this.simonGameContainer.addChild(this.yellowButton);
    var innerCircle=new createjs.Shape();
    innerCircle.graphics.f(createjs.Graphics.getRGB(0x444444));
    innerCircle.graphics.setStrokeStyle(10);
    var strokeCommand4 = innerCircle.graphics.beginStroke("#333").command;
    innerCircle.graphics.arc(0,0,100,0,2*Math.PI);
    innerCircle.x=100;
    innerCircle.y=100;
    this.simonGameContainer.addChild(innerCircle);
    var screen=new createjs.Shape();
    screen.graphics.f(createjs.Graphics.getRGB(0x330000));
    screen.graphics.setStrokeStyle(3);
    var strokeCommand5=screen.graphics.beginStroke("#000000").command;
    screen.graphics.moveTo(0,0);
    screen.graphics.drawRoundRect(0,0,50,30,3);
    screen.x=20;
    screen.y=90;
    this.simonGameContainer.addChild(screen);
    var screenToShowStepsTitle = new createjs.Text("COUNT", "10px Arial", "#FFF");
    screenToShowStepsTitle.x=25;
    screenToShowStepsTitle.y=125;
    this.simonGameContainer.addChild(screenToShowStepsTitle);
    this.startButton=new createjs.Shape();
    this.startButton.graphics.f(createjs.Graphics.getRGB(0xFF0000));
    this.startButton.graphics.setStrokeStyle(3);
    var strokeCommand6 = this.startButton.graphics.beginStroke("#333333").command;
    this.startButton.graphics.arc(0,0,12,0,2*Math.PI);
    this.startButton.x=100;
    this.startButton.y=105;
    this.simonGameContainer.addChild(this.startButton);
    var startButtonText = new createjs.Text("START", "10px Arial", "#FFF");
    startButtonText.x =85;
    startButtonText.y=125;
    this.simonGameContainer.addChild(startButtonText);
    this.strictButtonLED=drawStrictButtonLED(0x440000);
    this.strictButton=new createjs.Shape();
    this.strictButton.graphics.f(createjs.Graphics.getRGB(0xFFFF00));
    this.strictButton.graphics.setStrokeStyle(3);
    var strokeCommand6 = this.strictButton.graphics.beginStroke("#333333").command;
    this.strictButton.graphics.arc(0,0,12,0,2*Math.PI);
    this.strictButton.x=150;
    this.strictButton.y=105;
    this.simonGameContainer.addChild(this.strictButton);
    var strictButtonText = new createjs.Text("STRICT", "10px Arial", "#FFF");
    strictButtonText.x =135;
    strictButtonText.y=125;
    this.simonGameContainer.addChild(strictButtonText);
    var powerButtonSupport=new createjs.Shape();
    powerButtonSupport.graphics.f(createjs.Graphics.getRGB(0x333333));
    powerButtonSupport.graphics.moveTo(0,0);
    powerButtonSupport.graphics.drawRoundRect(0,0,45,20,2);
    powerButtonSupport.x=80;
    powerButtonSupport.y=150;
    this.simonGameContainer.addChild(powerButtonSupport);
    this.powerButton=new createjs.Shape();
    this.powerButton.graphics.f(createjs.Graphics.getRGB(0x00AAFF));
    this.powerButton.graphics.moveTo(0,0);
    this.powerButton.graphics.drawRoundRect(0,0,20,18,2);
    this.powerButton.x=81;
    this.powerButton.y=151;
    this.simonGameContainer.addChild(this.powerButton);
    var offText = new createjs.Text("OFF", "10px Arial", "#FFF");
    offText.x=60;
    offText.y=155;
    this.simonGameContainer.addChild(offText);
    var onText = new createjs.Text("ON", "10px Arial", "#FFF");
    onText.x=130;
    onText.y=155;
    this.simonGameContainer.addChild(onText);
    var gameName = new createjs.Text("Simon Game", "30px 'Anton'", "#FFF");
    gameName.x=29;
    gameName.y=30;
    this.simonGameContainer.addChild(gameName);
    this.screenText = new createjs.Text("--", "25px 'Orbitron'", "#F00");
    this.screenText.x=33;
    this.screenText.y=90;
    this.simonGameContainer.addChild(this.screenText);
    this.stage.addChild(this.simonGameContainer);
    this.simonGameContainer.x=(canvas.width-200)/2;
    this.simonGameContainer.y=(canvas.height-200)/2;
    this.stage.update();
    this.greenButton.id='green';
    this.yellowButton.id='yellow';
    this.redButton.id='red';
    this.blueButton.id='blue';
    this.startButton.id='start';
    this.strictButton.id='strict';
    this.powerButton.id='power';
    this.startButton.on('click',handleButtonClicks);
    // buttons=[
    //   {name:"start",value=this.startButton},
    //   {name:"strict",value=this.strictButton},
    //   {name:"power",value=this.startButton},
    //   {name:"red",value=this.redButton},
    //   {name:"yellow",value=this.yellowButton},
    //   {name:"green",value=this.startButton},
    //   {name:"blue",value=this.startButton},
    // ]
    buttons=[this.startButton,this.strictButton,this.powerButton,this.redButton,this.yellowButton,this.greenButton,this.blueButton];
    addEventListeners();
  }

  function drawStrictButtonLED(strictButtonLEDColor){
    that.strictButtonLED=new createjs.Shape();
    that.strictButtonLED.graphics.f(createjs.Graphics.getRGB(strictButtonLEDColor));
    that.strictButtonLED.graphics.setStrokeStyle(3);
    var strokeCommand6 = that.strictButtonLED.graphics.beginStroke("#333333").command;
    that.strictButtonLED.graphics.arc(0,0,5,0,2*Math.PI);
    that.strictButtonLED.x=150;
    that.strictButtonLED.y=80;
    that.simonGameContainer.addChild(that.strictButtonLED);
  }


  function addEventListeners(){
    buttons.forEach(function(button){
      button.addEventListener('click',handleButtonClicks);
    });
  }

  this.pressButton=function(idButton){
    var button=buttons.filter(function(button){
      return button.id=idButton;
    });
    animateButton(button);
    playSound(idButton);
  }


  function handleButtonClicks(e){
    animateButton(e.target);
    switch(e.target.id){
      case 'red':
        playSound('red');
      break;
      case 'yellow':
        playSound('yellow');
      break;
      case 'blue':
        playSound('blue');
      break;
      case 'green':
        playSound('green');
      break;
      case 'start':
        console.log('game started');
      break;
      case 'strict':
        console.log('strict mode');
      break;
      case 'power':
        console.log('power button');
      break;
    }
  }

  function animateButton(button){
    if(button.id==='power')
    {
      this.powerButtonClicked=!this.powerButtonClicked;
      if(this.powerButtonClicked)
      {
        createjs.Tween.get(button, { loop: false })
          .to({ x:105}, 500, createjs.Ease.getPowInOut(4));
      }
      else{
        createjs.Tween.get(button, { loop: false })
          .to({ x:81}, 500, createjs.Ease.getPowInOut(4));
      }
    }

    if(button.id==='start' || button.id==='strict')
    {
      createjs.Tween.get(button, { loop: false })
          .to({scaleX: 0.8, scaleY: 0.8},50, createjs.Ease.getPowInOut(4))
          .to({scaleX: 1, scaleY: 1}, 50, createjs.Ease.getPowInOut(4));
    }

    if(button.id==='strict'){
      this.strictMode=!this.strictMode;
      if(this.strictMode){
        console.log('Strict mode is on');
        this.strictButtonLED=drawStrictButtonLED(0xFF0000);
      }
      else{
        console.log('Strict mode is off');
        this.strictButtonLED=drawStrictButtonLED(0x440000);
      }
    }
  }
  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener("tick", this.stage);

  function playSound(id){
    createjs.Sound.play(id);
  }


  function loadSounds(){
    createjs.Sound.registerSound("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",'yellow');
    createjs.Sound.registerSound("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",'green');
    createjs.Sound.registerSound("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",'blue');
    createjs.Sound.registerSound("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3",'red');
  }

  this.init=function(){
    loadSounds();
    this.draw();
  }
}


function launchApp(){
  var vue=new Vue();
  vue.init();
}

launchApp();
