var isPlaying;
function loadSound(){
  createjs.Sound.registerSounds([{src:"./sound/hhavok-main.mp3", id:"song2"}, {src:"./sound/watering-plants.wav", id:"water"}, {src:"./sound/jingle-win.wav", id:"jingle"}, {src:"./sound/raking.wav", id:"rake"}, {src:"./sound/button-click.wav", id:"click"}]);
};
createjs.Sound.addEventListener("fileload", handleLoad);
function handleLoad(event){
  if(event.id=="song2"){
    playSong("song2");
  }
}
function playSong(songName){
  createjs.Sound.stop();
    isPlaying = createjs.Sound.play(songName, {loop: -1});
    // Below is the function to set the volume for each song.
    // The volume is set between 0 and 1
    isPlaying.volume = isPlaying.volume * .1;
  };

function playSound(soundEffect){
      effectVolume = createjs.Sound.play(soundEffect);
      if(soundEffect=="rake"){
        effectVolume.volume = effectVolume.volume * .4;
      }
    };

function stopAllSound(){
  createjs.Sound.stop();
};

function playTransition(soundEffect, songName){
  createjs.Sound.stop();
  console.log(soundEffect + " " + songName);
  var transition = createjs.Sound.play(soundEffect);
  transition.on("complete", function () { playSong(songName); });
}

function muteSound(){
  console.log("hi");
  isPlaying.muted = !isPlaying.muted;
}
