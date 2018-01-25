var canvas = document.getElementById("simon-game");
var c = canvas.getContext("2d");

var width=window.innerWidth;
var height=window.innerHeight;
canvas.width=width;
canvas.height=height;
//Simon Game Design
//OuterCircle
var outerRadius=200;
var x=(canvas.width-outerRadius)/2;
var y=(canvas.height-outerRadius)/2;
c.beginPath();
c.arc(x,y,outerRadius,0,Math.PI*2);
c.fillStyle="gray";
c.fill();
//Buttons
//Button1
var x=(canvas.width-outerRadius)/2;
var y=(canvas.height-outerRadius)/2;
c.beginPath();
c.arc(x,y,190,0,Math.PI/2);
c.lineTo(x,y);
c.fillStyle="#00AA00";
c.fill();
//Button2
var x=(canvas.width-outerRadius)/2;
var y=(canvas.height-outerRadius)/2;
c.beginPath();
c.arc(x,y,190,Math.PI/2,Math.PI);
c.lineTo(x,y);
c.fillStyle="#AA00FF";
c.fill();
//Button3
var x=(canvas.width-outerRadius)/2;
var y=(canvas.height-outerRadius)/2;
c.beginPath();
c.arc(x,y,190,Math.PI,-Math.PI/2);
c.lineTo(x,y);
c.fillStyle="#AA0000";
c.fill();
//Button4
var x=(canvas.width-outerRadius)/2;
var y=(canvas.height-outerRadius)/2;
c.beginPath();
c.arc(x,y,190,-Math.PI/2,0);
c.lineTo(x,y);
c.fillStyle="#0000AA";
c.fill();
//Inner Circle
var innerRadius=80;
var xInnerCircle=(canvas.width-outerRadius)/2;
var yInnerCircle=(canvas.height-outerRadius)/2;
c.beginPath();
c.arc(xInnerCircle,yInnerCircle,innerRadius,0,Math.PI*2);
c.fillStyle="white";
c.fill();
