var isPlaying;
var allMute = false;
function loadSound(){
  createjs.Sound.registerSounds([{src:"./sound/healthyMuzak.mp3", id:"song1"}, {src:"./sound/pop.wav", id:"pop"}, {src:"./sound/bookpages.wav", id:"book"}, {src:"./sound/watering-plants.wav", id:"water"}, {src:"./sound/jingle-win.wav", id:"jingle"}, {src:"./sound/raking.wav", id:"rake"}]);
  createjs.Sound.registerSounds([{src:"./sound/rooster_crow.wav", id:"rooster"}, {src:"./sound/button-click.wav", id:"click"}, {src:"./sound/ta_da.wav", id:"tada"}]);
};
createjs.Sound.addEventListener("fileload", handleLoad);
function handleLoad(event){
  if(event.id=="song1"){
    playSong("song1");
  }
}
function functionName() {

}
function playSong(songName){
  createjs.Sound.stop();
    isPlaying = createjs.Sound.play(songName, {loop: -1});
    // Below is the function to set the volume for each song.
    // The volume is set between 0 and 1
    isPlaying.volume = isPlaying.volume * .5;
  };

function playSound(soundEffect){
      effectVolume = createjs.Sound.play(soundEffect);
      if(soundEffect=="rake"){
        effectVolume.volume = effectVolume.volume * .1;
      }
      if(soundEffect=="water"){
        effectVolume.volume = effectVolume.volume * .6;
      }
      if(soundEffect=="jingle"){
        effectVolume.volume = effectVolume.volume * .5;
      }
      if(soundEffect=="tada"){
        effectVolume.volume = effectVolume.volume * .6;
      }
      if(allMute==true){
        effectVolume.volume = effectVolume.volume * 0;
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

function muteEffects() {
  allMute = !allMute;
}
