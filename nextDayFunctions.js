function updateGame(){
  playTransition("rooster", "song1");
  currency.energy = energyMax;
  updateEnergyAndSunshine();
  for(var i=0; i<boardLength; i++){
    for(var j=0; j<boardWidth; j++){
    setTimeout(nextDay, 1000, i, j);
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
      gameBoard[x][y].nextFertilizer= Date.now();
      drawCell(x, y, id);  
    if (gameBoard[x][y].stateId < midstateId && gameBoard[x][y].growthPoints >= teenPoints)
    {
      gameBoard[x][y].stateId=1;
      drawCell(x, y, id);  
    }
    else if (gameBoard[x][y].stateId < maxstateId && gameBoard[x][y].growthPoints >= adultPoints){
      gameBoard[x][y].stateId=2;
      drawCell(x, y, id);  
      if (gameBoard[x][y].stateId==2)
      {
          var rndNum = Math.floor((Math.random() * 10) + 1);
          if (rndNum>6) //effects display only about 1/3 of the time
          {
            gameBoard[x][y].effects=true;
            drawCell(x, y, id);   
          }
      }
    }
  }
}