class Game {
    constructor() {
      this.gameEnded = false;
      this.chooseStartingPlayer();
      this.setStartingPlayer();
    }
  
    chooseStartingPlayer() {
      if(gameMode == 'pvp') {
        this.nowPlayer = (Math.round(Math.random()) == 0 ? 'O' : 'X');
      } else {
        this.nowPlayer = 'X';
      }
    }
    
    setStartingPlayer() {
      document.getElementById('player-panel').innerHTML = this.nowPlayer;
    }
    
    setPlay(obj) {
      if(this.nowPlayer == "X") {
        var animation_div = document.createElement('div');
        animation_div.setAttribute('class', 'animated-cross');
        obj.appendChild(animation_div);
      } else {
        var animation_div = document.createElement('div');
        animation_div.setAttribute('class', 'animated-circle');
        obj.appendChild(animation_div);
      }
    }
    
    changePawn() {
      this.nowPlayer = (this.nowPlayer == 'X') ? 'O' : 'X';
    }
    
    setPlayerPanel() {
      document.getElementById('player-panel').innerHTML = this.nowPlayer;
    }
  
    computerMove() {
      can_set_play = false;
      var free_fields = [];
      for (var i = 0, len = occupied_field.length; i < len; i++) {
        if(occupied_field[i] == '') {
          free_fields.push(i);
        }    
      }

      var free_field_to_set_play = free_fields[Math.floor(Math.random()*free_fields.length)];
      var animation_div = document.createElement('div');
      animation_div.setAttribute('class', 'animated-circle');
  
      if(free_field_to_set_play != undefined) {
        setTimeout(() => {
          document.querySelectorAll('.field > .field-content')[free_field_to_set_play].appendChild(animation_div);
          occupied_field[free_field_to_set_play] = 'O';
          can_set_play = true;
          this.changePawn();
          this.setPlayerPanel();
          this.checkIfSomeoneWon();
        }, 500);
      }
    }
    
    checkIfSomeoneWon() {
      if (occupied_field[0] == occupied_field[1] && occupied_field[1] == occupied_field[2] && occupied_field[0] != '') {
        this.win(0, 1, 2);
        this.gameEnded = true;
      } else if (occupied_field[3] == occupied_field[4] && occupied_field[4] == occupied_field[5] && occupied_field[3] != '') {
        this.win(3, 4, 5);
        this.gameEnded = true;
      } else if (occupied_field[6] == occupied_field[7] && occupied_field[7] == occupied_field[8] && occupied_field[6] != '') {
        this.win(6, 7, 8);
        this.gameEnded = true;
      } else if (occupied_field[0] == occupied_field[3] && occupied_field[3] == occupied_field[6] && occupied_field[0] != '') {
        this.win(0, 3, 6);
        this.gameEnded = true;
      } else if (occupied_field[1] == occupied_field[4] && occupied_field[4] == occupied_field[7] && occupied_field[1] != '') {
        this.win(1, 4, 7);
        this.gameEnded = true;
      } else if (occupied_field[2] == occupied_field[5] && occupied_field[5] == occupied_field[8] && occupied_field[2] != '') {
        this.win(2, 5, 8);
        this.gameEnded = true;
      } else if (occupied_field[0] == occupied_field[4] && occupied_field[4] == occupied_field[8] && occupied_field[0] != '') {
        this.win(0, 4, 8);
        this.gameEnded = true;
      } else if (occupied_field[2] == occupied_field[4] && occupied_field[4] == occupied_field[6] && occupied_field[2] != '') {
        this.win(2, 4, 6);
        this.gameEnded = true;
      }
  
      if(occupied_field[0] != '' && occupied_field[1] != '' && occupied_field[2] != '' && occupied_field[3] != '' && occupied_field[4] != '' && occupied_field[5] != '' && occupied_field[6] != '' && occupied_field[7] != '' && occupied_field[8] != '') {
        this.showRestartModeGameOption(1000);
        this.gameEnded = true;
      }
    }
  
    win(f1, f2, f3) {
      var field1 = document.querySelectorAll('.field > .field-content')[f1];
      var field2 = document.querySelectorAll('.field > .field-content')[f2];
      var field3 = document.querySelectorAll('.field > .field-content')[f3];
      field1.className += ' win-animation';
      field2.className += ' win-animation';
      field3.className += ' win-animation';
      this.showRestartModeGameOption(2400);
    }
  
    showHideRestartGameOption(elem) {
        if (window.innerWidth > 1010) {
            if(elem.className !== 'show-hide-restart-game' && this.gameEnded == false) {
                this.showRestartModeGameOption(0);
                elem.className = 'show-hide-restart-game';    
            } else {
                this.hideRestartModeGameOption();
                elem.className = '';
            }
        }
    }
  
    showRestartModeGameOption(timeout) {
      if (window.innerWidth > 1010) {
          setTimeout(() => {
              document.getElementById('restart-game').className = 'noselect restart-game-show';
              document.getElementById('change-mode').className = 'noselect change-mode-show';
          }, timeout);
      }
    }
  
    hideRestartModeGameOption() {
      document.getElementById('restart-game').className = 'noselect restart-game-hide';
      document.getElementById('change-mode').className = 'noselect change-mode-hide';
      setTimeout(() => {
        document.getElementById('restart-game').className = 'noselect';
        document.getElementById('change-mode').className = 'noselect';
      }, 900);
    }
  
    changeMode() {
        setTimeout(() => {
            choose_mode_page.style.left = "0";
            this.restartGame();
        }, 10);
    }
  
    restartGame() {
      can_set_play = false;
      occupied_field = ['', '', '',
                        '', '', '',
                        '', '', '',
                       ];
  
      this.gameEnded = false;
  
      $('.field-content').each(function() {
        this.className = 'field-content hide-all';
      });
  
      setTimeout(() => {
        $('.field-content').each(function() {
          this.innerHTML = '';
          this.className = 'field-content';
        });
        tic_tac_toe.chooseStartingPlayer();
        tic_tac_toe.setStartingPlayer();
        can_set_play = true;
      }, 500);
      if (window.innerWidth > 1010) {
        this.hideRestartModeGameOption();
      }
    }
  }