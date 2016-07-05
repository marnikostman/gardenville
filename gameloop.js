function gameLoop ()
{
  updateEnergyAndSunshine();
  for (var x = 0; x < boardLength; x++)
  {
    for (var y = 0; y < boardWidth; y++)
    {
      if (gameBoard[x][y].nextWater < Date.now() && gameBoard[x][y].needWater == false)
      {
        var id = x.toString() + "-" + y.toString();
        gameBoard[x][y].needWater = true;
        drawCell(x, y, id);
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