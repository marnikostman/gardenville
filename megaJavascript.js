$(document).ready(function() {
    $(".fancybox").fancybox();
});

var ticksPerMinute = 6000;
var currency = {sunshine:10, energy:100, addEnergy: Date.now()}; //100 is the max energy
var actionEnergyAmount = 10;
var toDoListEnergy = 5;
var journalSunshine = 20;
var timedEnergy = 5;
var energyMax = 100;
var boardWidth = 7;
var boardLength = 4;
var teenPoints = 20;
var adultPoints = 50;

function unlockGraphic(lockedItemId, cost){
  var flowerCost = cost;
  if(currency.sunshine>=flowerCost){
    playSound("click")
    currency.sunshine = currency.sunshine - flowerCost;
    console.log(currency.sunshine);
    $("#" + lockedItemId + "01").show();
    $("#" + lockedItemId).hide();
  }
}

var gameTick = 6000;
var graphicId = [
  {name:"blank", state:[]},
  {name:"rose", state:[]},
  {name:"tulip", state:[]},
  {name:"sunflower", state:[]},
  {name:"house", state:[]},
  {name: "alert", state:[]}];
  //GraphicId[0].state[0] is the default which has nothing to layer at all.
graphicId[0].state[0] = "<img src='./assets/blank.png'>";
graphicId[1].state[0] = "<img src='./assets/stage_1_baby.png'>";
graphicId[1].state[1] = "<img src='./assets/stage_2_teen.png'>";
graphicId[1].state[2] = "<img src='./assets/stage_3_rose.png'>";
graphicId[2].state[0] = "<img src='./assets/stage_1_baby.png'>";
graphicId[2].state[1] = "<img src='./assets/stage_2_teen.png'>";
graphicId[2].state[2] = "<img src='./assets/stage_3_tulip.png'>";
graphicId[3].state[0] = "<img src='./assets/stage_1_baby.png'>";
graphicId[3].state[1] = "<img src='./assets/stage_2_teen.png'>";
graphicId[3].state[2] = "<img src='./assets/stage_3_sunflower.png'>";
graphicId[4].state[0] = "<img src='./assets/house.png'>";
graphicId[5].state[0] = "<img src='./assets/exclamation_alert.png'>";

gameBoard = new Array(boardLength);
for (var i = 0; i < boardLength; i++) //This is essentially the model
{
  gameBoard[i] = new Array(boardWidth);
  for (var j = 0; j < boardWidth; j++)
  {
    gameBoard[i][j] = {
      needTerraform: true,
      type: "blank",
      objectId: 0,
      stateId: 0,
      needFertilizer: true,
      nextFertilizer: Date.now(),
      harvest: false,
      growthPoints: 0,
      needWater: true,
      nextWater: Date.now(),
      effects: false,
      usable: true
    };
  }
}
for (var x = 0; x < boardLength; x++){
  for (var y = 0; y < boardWidth; y++){
    var id = getId(x, y);
    //alert(id);
    $(".gameboard").append("<div style='display: inline-block' class='cell' id='" + id + "'></div>");
    //Fills in art layers for each cell.
    drawCell(x, y, id);
    //Gives each cell the attribute to have things able to be dropped on it.
    $("#" + id).droppable({
      drop: itemDropped, //drop is a function, when it's done, it calls the function John wrote
      hoverClass: "dragHover" //makes each cell "pop" out a bit for user?; needs written or needs deleted
    });
  }
  $(".gameboard").append("<br/>");
}

function itemDropped(event, ui){
  var id = this.id
  var dropped = ui.draggable.attr("data-id");
  //Splits the idea up into the coordinate locations in the array of arrays
  var location = id.split("-");
  var x = location[0];
  var y = location[1];
  switch (dropped){
    case "terraform":
      terraformCell(x, y, id)
      break;
    case "water":
      waterPlant(x, y, id)
      break;
    case "fertilize":
      fertilizePlant(x, y, id)
      break;
    case "harvest":
      harvestPlant(x, y, id)
      break;
    default:
      placeGraphic(x, y, id, dropped)
      break;
      }
      drawCell(x, y, id);
      gameBoard[x][y].harvest = false;
    }

function harvestPlant(x,y,id){
  if(gameBoard[x][y].stateId==2){
    playSound("pop");
    gameBoard[x][y].type = "blank";
    gameBoard[x][y].stateId = 0;
    console.log(gameBoard[x][y].stateId);
    console.log(gameBoard[x][y].type);
    gameBoard[x][y].harvest = true;
    gameBoard[x][y].growthPoints = 0;
    currency.sunshine += 10;
  }
}

function waterPlant(x,y,id){
  if(gameBoard[x][y].type!="blank" && gameBoard[x][y].type!="house"){
    gameBoard[x][y].needWater=false;
    playSound("water")
    gameBoard[x][y].nextWater=Date.now() + 5 * (ticksPerMinute);
    if (gameBoard[x][y].stateId == 0 && gameBoard[x][y].growthPoints <= teenPoints)
      { gameBoard[x][y].growthPoints += 1;}
    if (gameBoard[x][y].stateId == 1)
      { gameBoard[x][y].growthPoints += 1;}
  }
}

function fertilizePlant(x, y, id){
  if(currency.energy >= actionEnergyAmount && (gameBoard[x][y].type!="blank" && gameBoard[x][y].type!="house")){
    gameBoard[x][y].needFertilizer = false;
    playSound("jingle")
    currency.energy = currency.energy - actionEnergyAmount;
    gameBoard[x][y].nextFertilizer=Date.now() + 5 * (ticksPerMinute);
    if (gameBoard[x][y].stateId == 0 && gameBoard[x][y].growthPoints <= teenPoints)
    {
      gameBoard[x][y].growthPoints += 10;
      if (gameBoard[x][y].growthPoints > teenPoints)
      {
        gameBoard[x][y].growthPoints = teenPoints;
      }
    }
    if (gameBoard[x][y].stateId == 1)
    { gameBoard[x][y].growthPoints += 10;}
  }
}

function terraformCell(x,y,id) {
  //  if it's a house don't do it, or if it's already terraformed
  if(currency.energy >= actionEnergyAmount && gameBoard[x][y].usable==true && gameBoard[x][y].needTerraform==true)
  {
    gameBoard[x][y].needTerraform = false;
    playSound("rake")
    currency.energy = currency.energy - actionEnergyAmount;
  }
  else if(currency.energy>= actionEnergyAmount && gameBoard[x][y].type!= "blank" && gameBoard[x][y].usable == true && gameBoard[x][y].stateId != 2){
    gameBoard[x][y].objectId = 0;
    gameBoard[x][y].stateId = 0;
    gameBoard[x][y].needWater = true;
    gameBoard[x][y].type = "blank";
    gameBoard[x][y].needFertilizer = true;
  }
}

function playEffect(x, y, id)
{
  gameBoard[x][y].effects == "true";
}

function placeGraphic(x,y,id, dropped){
  if(gameBoard[x][y].type=="blank" && currency.energy >= actionEnergyAmount){
    if(dropped=="house"){
      $(".toolbar").css("width", "50%");
      gameBoard[x][y].type = "house";
      playSound("jingle");
      gameBoard[x][y].objectId = 4;
      gameBoard[x][y].stateId = 0;
      gameBoard[x][y].usable = false;
    }
  }
  if(gameBoard[x][y].needTerraform==false && gameBoard[x][y].type=="blank" && currency.energy >= actionEnergyAmount)
  {
    if (dropped=="rose") {
      gameBoard[x][y].type = "rose";
      gameBoard[x][y].objectId = 1;
      gameBoard[x][y].stateId = 0;
    }
    else if (dropped=="tulip") {
      gameBoard[x][y].type = "tulip";
      gameBoard[x][y].objectId = 2;
      gameBoard[x][y].stateId = 0;
    }
    else if (dropped=="sunflower") {
      gameBoard[x][y].type = "sunflower";
      gameBoard[x][y].objectId = 3;
      gameBoard[x][y].stateId = 0;
    }
    currency.energy = currency.energy - actionEnergyAmount;
  }
}

function getId(x, y)
{
  return x.toString() + "-" + y.toString();
}

function updateGame(){
  playTransition("rooster", "song1");
  currency.energy = 100;
  for(var i=0; i<boardLength; i++){
    for(var j=0; j<boardWidth; j++){
      nextDay(i,j)
    }
  }
}

function nextDay(x,y){
  var maxstateId = 2;
  var midstateId = 1;
  var id = getId(x, y);
  if (gameBoard[x][y].type != "blank" && gameBoard[x][y].type != "house")
  {
      gameBoard[x][y].needWater = true;
      gameBoard[x][y].nextWater = Date.now();
      gameBoard[x][y].needFertilizer=true;
      gameBoard[x][y].nextFertilizer=Date.now();
    if (gameBoard[x][y].stateId < midstateId && gameBoard[x][y].growthPoints >= teenPoints)
    {
      gameBoard[x][y].stateId=1;
      drawCell(x, y, id)
    }
    else if (gameBoard[x][y].stateId < maxstateId && gameBoard[x][y].growthPoints >= adultPoints){
      gameBoard[x][y].stateId=2;
      drawCell(x, y, id)
    }
  }
}

function drawCell(x,y,id)
{
  $("#" + id).html("");
  if (gameBoard[x][y].needTerraform == true){
    $("#" + id).append("<img src='./assets/un_terraformed_dirt.png'>");
  }
  else{
    $("#" + id).append("<img src='./assets/terraformed_dirt.png'>");
  }
  if (gameBoard[x][y].needWater != true){
      $("#" + id).append("<img src='./assets/watered.png'>");
    }
  if (gameBoard[x][y].needFertilizer != true){
    $("#" + id).append("<img src='./assets/fertilized.png'>");
    }


  var i = 0;
  do {
    $("#" + id).append(graphicId[gameBoard[x][y].objectId].state[i]);
    i++;
  }
  while(i <= gameBoard[x][y].stateId);

  if (gameBoard[x][y].harvest == true){
    $("#" + id).append("<img src='./assets/terraformed_dirt.png'>");
    }
  if (gameBoard[x][y].effects == true){
    $("#" + id).append("<img src='./assets/butterflies.gif'>");
  }
  addToDoToHouse(x,y);
}


$("#house01").draggable({
  container: document,
  helper: houseHelper
});
function houseHelper(){
  return "<img src='./assets/house.png' class='dragged'>"
}

$("#fertilize01").draggable({
  container: document,
  helper: fertilizerHelper
});
function fertilizerHelper(){
  return "<img src='./assets/fertilizer_bag.png' class='dragged'>"
}

$("#water01").draggable({
  container: document,
  helper: waterHelper
});
function waterHelper(){
  return "<img src='./assets/happy_cloud.gif' class='dragged'>"
}

$("#spade01").draggable({
  container: document,
  helper: spadeHelper
});
function spadeHelper(){
  return "<img src='./assets/spade.png' class='dragged'>"
}

$("#tulip01").draggable({
  container: document,
  helper: tulipHelper
});
function tulipHelper(){
  return "<img src='./assets/stage_1_baby.png' class='dragged'>"
}

$("#rose01").draggable({
  container: document,
  helper: roseHelper
});
function roseHelper(){
  return "<img src='./assets/stage_1_baby.png' class='dragged'>"
}

$("#sunflower01").draggable({
  container: document,
  helper: sunflowerHelper
});
function sunflowerHelper(){
  return "<img src='./assets/stage_1_baby.png' class='dragged'>"
}

$("#harvest01").draggable({
  container: document,
  helper: harvestHelper
});
function harvestHelper(){
  return "<img src='./assets/glove.png' class='dragged'>"
}

function gameLoop ()
{
  document.getElementById("energy").innerHTML = "Energy: " + currency.energy + " | Sunshine: " + currency.sunshine;
  document.getElementById("energy").style.fontFamily = "pixelated";
  for (var x = 0; x < boardLength; x++)
  {
    for (var y = 0; y < boardWidth; y++)
    {
      if (gameBoard[x][y].nextWater < Date.now() && gameBoard[x][y].needWater == false)
      {
        var id = x.toString() + "-" + y.toString();
        gameBoard[x][y].needWater = true;
        drawCell(x, y, id);
        gameBoard[x][y].nextWater = Date.now() + 5 * (ticksPerMinute);
      }
      if (gameBoard[x][y].nextFertilizer < Date.now() && gameBoard[x][y].needFertilizer == false)
      {
        var id = x.toString() + "-" + y.toString();
        gameBoard[x][y].needFertilizer = true;
        drawCell(x, y, id);
      }
    }
  }

  if (currency.addEnergy < Date.now() && currency.energy < energyMax)
      {
        currency.energy++;
      }
  setTimeout(gameLoop, gameTick);
}

gameLoop();

function addToDoToHouse(x,y){
  if (gameBoard[x][y].objectId == 4){
    $(".toolbar #house01").remove();
    var id = ".gameboard #" + x + "-" + y;
    $(id).addClass("house01");
    $(".house01").click(function(){
        $("#toDoField").show();
        $(".house01").css('cursor', 'url(./assets/hand.png), auto');
    });
    $(".house01").css('cursor', 'url(./assets/hand.png), auto');
  }
    $(id).wrap("<a class='fancybox' href='#toDoField'></div>");
    $(".house01").css('cursor', 'url(./assets/hand.png), auto');
  }

function get_todos() {
    var todos = new Array;
    var todos_str = localStorage.getItem('todo');
    if (todos_str !== null) {
        todos = JSON.parse(todos_str);
    }
    return todos;
}

function add() {
    var task = document.getElementById('task').value;

    var todos = get_todos();
    if (task !== ""){
      todos.push(task);
      document.getElementById('task').value=''; //clears out the form text field after task is added.
    }
    else {
      alert("Invalid entry. No text entered.");
    }
    localStorage.setItem('todo', JSON.stringify(todos));

    show();
    return false;
}

function remove() {
    var id = this.getAttribute('id');
    var todos = get_todos();
    todos.splice(id, 1);
    localStorage.setItem('todo', JSON.stringify(todos));

    show();

    return false;
}

function accomplish() {
    var id = this.getAttribute('id');
    var todos = get_todos();
    todos.splice(id, 1);
    localStorage.setItem('todo', JSON.stringify(todos));

    show();
    currency.energy+=toDoListEnergy;
    if (currency.energy > energyMax){
      currency.energy = energyMax;
    }
    return false;
}

function show() {
    var todos = get_todos();

    var html = '<ul>';
    for(var i=0; i<todos.length; i++) {
        html += '<li>' + todos[i] + '<button class="remove" id="' + i  + '">x</button>' + '<button class="accomplished" id="' + i + '">&#10003;</button>' + '</li>';
    };
    html += '</ul>';

    document.getElementById('todos').innerHTML = html;

    var buttons = document.getElementsByClassName('remove');
    for (var i=0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', remove);
    };
    var accomplishButtons = document.getElementsByClassName('accomplished');
    for (var i=0; i < accomplishButtons.length; i++) {
        accomplishButtons[i].addEventListener('click', accomplish);
    };
}

document.getElementById('add').addEventListener('click', add);
show();

function get_entries() {
    var entries = new Array;
    var entry_str = localStorage.getItem('entry');
    if (entry_str !== null) {
        entries = JSON.parse(entry_str);
    }
    return entries;
}

function get_full_entries(){
  var fullEntries = new Array;
  var fullEntryStr = localStorage.getItem('fullEntry');
  if (fullEntryStr != null){
    fullEntries = JSON.parse(fullEntryStr);
  }
  return fullEntries;
}

function addJournal() {
    var entry = document.getElementById('entry').value;
    var fullEntry = {};
    fullEntry.entry = entry;
    fullEntry.uneasiness = document.getElementById('uneasiness').value;
    fullEntry.anger = document.getElementById('anger').value;
    fullEntry.anxiety = document.getElementById('anxiety').value;
    fullEntry.apathy = document.getElementById('apathy').value;
    fullEntry.serenity = document.getElementById('serenity').value;
    fullEntry.euphoria = document.getElementById('euphoria').value;

    var fullEntries = get_full_entries();
    if (fullEntry.entry !== ""){
      fullEntries.push(fullEntry);
      currency.sunshine += journalSunshine;
      localStorage.setItem('fullEntry', JSON.stringify(fullEntries));
    }
    else {
      alert("Invalid entry. No text entered.");
    }
    document.getElementById('entry').value = "";
    statsArray = document.getElementsByClassName('stat');
    for (s = 0; s < statsArray.length; s++){
      statsArray[s].value = "5";
    }
    return false;
}

function createJournalArray(){
  console.log(get_entries());
}

function createFullEntryArray(){
  console.log(get_full_entries());
}

document.getElementById('addJournal').addEventListener('click', addJournal);
