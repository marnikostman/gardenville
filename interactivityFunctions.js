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