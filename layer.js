//creates context for 3 layers
var canvas1 = document.getElementById('layer1');
var context1 = canvas1.getContext('2d');

var canvas2 = document.getElementById('layer2');
var context2 = canvas2.getContext('2d');

var canvas3 = document.getElementById('layer3');
var context3 = canvas3.getContext('2d');

// draws stuff on the layers
context1.fillStyle = url("dirt.jpg");
context2.fillStyle = url("dirtpile.png");
context3.fillStyle = url("tulip_only.png")

context1.fillRect(0, 0, 150, 150);
context2.fillRect(0, 0, 150, 150);
context3.fillRect(0, 0, 150, 150);
