function getId(x, y)
{
  return x.toString() + "-" + y.toString();
}

function playEffect(x, y, id)
{
  gameBoard[x][y].effects == "true";
}

/*This creates the visible player board. To change the length and width of the board, go to the "models and variables" file and change
boardLength and boardWidth*/
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
      hoverClass: "dragHover" //makes each cell "pop" out a bit for user.
    });
  }
  $(".gameboard").append("<br/>");
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
    //gameBoard[x][y].nextFertilizer = Date.now() + 5 * ticksPerMinute;
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

function updateEnergyAndSunshine(){
  document.getElementById("energy").innerHTML = "Energy: " + currency.energy + " | Sunshine: " + currency.sunshine;
  document.getElementById("energy").style.fontFamily = "pixelated";
}

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