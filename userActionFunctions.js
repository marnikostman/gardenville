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

function harvestPlant(x,y,id){
  if(gameBoard[x][y].stateId==2){
    playSound("pop");
    gameBoard[x][y].type = "blank";
    gameBoard[x][y].stateId = 0;
    gameBoard[x][y].objectId = 0;
    gameBoard[x][y].harvest = true;
    gameBoard[x][y].growthPoints = 0;
    gameBoard[x][y].effects = false;
    currency.sunshine += 10;
    updateEnergyAndSunshine();
  }
}

function fertilizePlant(x, y, id){
  if(currency.energy >= actionEnergyAmount && gameBoard[x][y].type!="blank" && gameBoard[x][y].type!="house"){
    gameBoard[x][y].needFertilizer = false;
    gameBoard[x][y].nextFertilizer = Date.now() + 5 * (ticksPerMinute);
    playSound("jingle");
    currency.energy = currency.energy - actionEnergyAmount;
    updateEnergyAndSunshine();

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
    updateEnergyAndSunshine()
  }
  else if(currency.energy>= actionEnergyAmount && gameBoard[x][y].type!= "blank" && gameBoard[x][y].usable == true && gameBoard[x][y].stateId != 2){
    gameBoard[x][y].objectId = 0;
    gameBoard[x][y].stateId = 0;
    gameBoard[x][y].needWater = true;
    gameBoard[x][y].type = "blank";
    gameBoard[x][y].needFertilizer = true;
  }
}

function placeGraphic(x,y,id, dropped){
  if(gameBoard[x][y].type=="blank" && currency.energy >= actionEnergyAmount){
    if(dropped=="house"){
      $(".toolbar").css("width", "42%");
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
    updateEnergyAndSunshine();
  }
}

function unlockGraphic(lockedItemId, cost){
  var flowerCost = cost;
  if(currency.sunshine>=flowerCost){
    playSound("click")
    currency.sunshine = currency.sunshine - flowerCost;
    updateEnergyAndSunshine();
    $("#" + lockedItemId + "01").show();
    $("#" + lockedItemId).hide();
  }
}