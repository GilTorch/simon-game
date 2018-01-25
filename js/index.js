var canvas=document.getElementById("simon-game");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

function init(){
  alert("called");
  var stage = new createjs.Stage("simon-game");
  var outerCircle = new createjs.Shape();
  var simonGameContainer=new createjs.Container();
  outerCircle.graphics.f(createjs.Graphics.getRGB(0x333333));
  outerCircle.graphics.moveTo(0,0)
  outerCircle.graphics.arc(0,0,200,0,Math.PI*2);
  outerCircle.x=100;
  outerCircle.y=100;
  simonGameContainer.addChild(outerCircle);

  var redButton=new createjs.Shape();
  redButton.graphics.f(createjs.Graphics.getRGB(0xFF0000));
  redButton.graphics.moveTo(0,0)
  redButton.graphics.arc(0,0,180,0,Math.PI/2);
  redButton.x=100;
  redButton.y=100;
  simonGameContainer.addChild(redButton);

  var greenButton=new createjs.Shape();
  greenButton.graphics.f(createjs.Graphics.getRGB(0x00FF00));
  greenButton.graphics.moveTo(0,0)
  greenButton.graphics.arc(0,0,180,Math.PI/2,Math.PI);
  greenButton.x=100;
  greenButton.y=100;
  stage.addChild(greenButton);

  var blueButton=new createjs.Shape();
  greenButton.graphics.f(createjs.Graphics.getRGB(0x0000FF));
  greenButton.graphics.moveTo(0,0)
  greenButton.graphics.arc(0,0,180,Math.PI,-Math.PI/2);
  greenButton.x=100;
  greenButton.y=100;
  simonGameContainer.addChild(greenButton);

  var yellowButton=new createjs.Shape();
  greenButton.graphics.f(createjs.Graphics.getRGB(0xFFFF00));
  greenButton.graphics.moveTo(0,0)
  greenButton.graphics.arc(0,0,180,-Math.PI/2,0);
  greenButton.x=100;
  greenButton.y=100;
  simonGameContainer.addChild(greenButton);

  var innerCircle=new createjs.Shape();
  innerCircle.graphics.f(createjs.Graphics.getRGB(0xFFFFFF));
  innerCircle.graphics.moveTo(0,0)
  innerCircle.graphics.arc(0,0,80,0,2*Math.PI);
  innerCircle.x=100;
  innerCircle.y=100;
  simonGameContainer.addChild(innerCircle);

  stage.addChild(simonGameContainer);
  simonGameContainer.x=(canvas.width-200)/2;
  simonGameContainer.y=(canvas.height-200)/2;
  stage.update();
}
