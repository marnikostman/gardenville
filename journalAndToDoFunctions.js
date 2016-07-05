$(document).ready(function() {
    $(".fancybox").fancybox();
});

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
    var errors = 0;

    var todos = get_todos();
    if (task !== ""){
      todos.push(task);
      document.getElementById('task').value=''; //clears out the form text field after task is added.
    }
    else {
      errors += 1;
    }

    if(errors > 0){
        $('#task_error').text("All fields are required");
    }
    else {
        $('#task_error').text("");
    }

    localStorage.setItem('todo', JSON.stringify(todos));

    show();
    event.preventDefault();
}

function remove() {
    var id = this.getAttribute('id');
    var todos = get_todos();
    todos.splice(id, 1);
    localStorage.setItem('todo', JSON.stringify(todos));

    show();

    event.preventDefault();
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
    updateEnergyAndSunshine();
    playSound('checkmark');

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
    var errors = 0;

    if (fullEntry.entry !== ""){
      fullEntries.push(fullEntry);
      currency.sunshine += journalSunshine;
      updateEnergyAndSunshine();
      localStorage.setItem('fullEntry', JSON.stringify(fullEntries));
      playSound('tada');
    }
    else {
      errors += 1;
    }

    if(errors > 0){
        $('#entry_error').text("All fields are required");
    }
    else {
        $('#entry_error').text("");
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
