var Controller=function (){
  var that=this;
  var myVue = new Vue();
  var myModel=new Modele();
  myModel.setController(this);
  myVue.setController(this);
  myVue.init();
  var buttons=myVue.buttons;
  var startButton=buttons[0];
  var strictButton=buttons[1];
  var powerButton=buttons[2];

  this.buttonsPressed=[];

  powerButton.addEventListener('click',myModel.toggleGame);
  
  this.getButtonPressed=function(button){
    this.buttonsPressed.push(button.id);
  }

  this.offGame=function(){
    myVue.offGame();
    that.showStepNumber("--");
  }

  this.onGame=function(){
    strictButton.addEventListener('click',myModel.toggleStrictMode)
    startButton.addEventListener('click',myModel.startGame);
  }

  this.addListeners=function(){
    myVue.addEventListeners();
  }

  this.showStepNumber=function(step){
    if(step<10)step="0"+step.toString();
    else{
      step=step.toString();
    }
    myVue.screenText.text=step;
  }
  
  this.pressAndReleaseButton=function(buttonsId){
       
    buttonsId.forEach(function(buttonId){
      actionateButton(buttonId);
    })
  }

  function actionateButton(buttonId){
    myVue.animateButtonPressedReleased(buttonId,"pressed");
    setTimeout(function(){
      myVue.animateButtonPressedReleased(buttonId,"release");
    },1000);
  }
}


