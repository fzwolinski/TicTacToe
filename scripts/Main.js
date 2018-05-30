var body = document.getElementsByTagName('body')[0];
var html = document.getElementsByTagName('html')[0];
var start_page = document.getElementById('start-page');
var choose_mode_page = document.getElementById('choose-mode');
var container = document.getElementById('container');
var board = document.getElementById('board');
var player_panel = document.getElementById('player-panel');
var PvP = document.getElementById('pvp');
var PvC = document.getElementById('pvc');
var gameMode = undefined;
var can_set_play = true;
var tic_tac_toe = undefined;

start_page.addEventListener("click", function() {
  this.style.left = "100vw";
  choose_mode_page.style.left = "0";
});

PvP.addEventListener("click", function() {
  gameMode = 'pvp';
  tic_tac_toe = new Game();
  choose_mode_page.style.left = "100vw";
  setTimeout(() => {
    board.style.opacity = 1;
    player_panel.style.opacity = 1;
  }, 200);
  body.style.overflow = 'unset';
  html.style.overflow = 'unset';
  body.style.overflowX = 'hidden';
  html.style.overflowX = 'hidden';
});

PvC.addEventListener("click", function() {
  gameMode = 'pvc';
  tic_tac_toe = new Game();
  choose_mode_page.style.left = "100vw";
  setTimeout(() => {
    board.style.opacity = 1;
    player_panel.style.opacity = 1;
  }, 200);
  body.style.overflow = 'unset';
  html.style.overflow = 'unset';
  body.style.overflowX = 'hidden';
  html.style.overflowX = 'hidden';
});

$('.field').click(function() {
  if(can_set_play) {
    if(occupied_field[this.className.split(' ')[1]] != '' || tic_tac_toe.gameEnded) {
      return;
    }
    occupied_field[this.className.split(' ')[1]] = tic_tac_toe.nowPlayer;
    var field = $(this).children(".field-content")[0];
    tic_tac_toe.setPlay(field);
    tic_tac_toe.changePawn();
    tic_tac_toe.setPlayerPanel();
    tic_tac_toe.checkIfSomeoneWon();
    if (gameMode == 'pvc' && !tic_tac_toe.gameEnded) {
      tic_tac_toe.computerMove();    
    }
  }
});

$('#show-hide-restart-game').click(function() {
  tic_tac_toe.showHideRestartGameOption(this);
});

$('#change-mode').click(function() {
  board.style.opacity = 0;
  player_panel.style.opacity = 0;
  var arrow = document.getElementById('show-hide-restart-game');
  tic_tac_toe.showHideRestartGameOption(arrow);
  tic_tac_toe.changeMode();
});

$('#restart-game').click(function() {
  var arrow = document.getElementById('show-hide-restart-game');
  tic_tac_toe.showHideRestartGameOption(arrow);
  tic_tac_toe.restartGame();
});

PvP.addEventListener('mouseover', function() {
  $('#pvp > img').attr('src', 'img/pvp-hover.png');
});

PvP.addEventListener('mouseout', function() {
  $('#pvp > img').attr('src', 'img/pvp.png');
});

PvC.addEventListener('mouseover', function() {
  $('#pvc > img').attr('src', 'img/pvc-hover.png');
});

PvC.addEventListener('mouseout', function() {
  $('#pvc > img').attr('src', 'img/pvc.png');
});

$(document).click(function(e) {
  if(e.target.id != 'restart-game' && e.target.id != 'change-mode' && e.target.id != 'start-page' && e.target.id != 'choose-mode' && e.target.id != 'pvp' && e.target.id != 'pvc' && document.getElementById('restart-game').className == 'noselect restart-game-show' && tic_tac_toe.gameEnded == false) {
    tic_tac_toe.hideRestartModeGameOption();
    var arrow = document.getElementById('show-hide-restart-game');
    tic_tac_toe.showHideRestartGameOption(arrow);
  }
});

var occupied_field = ['', '', '',
                      '', '', '',
                      '', '', '',
                     ];