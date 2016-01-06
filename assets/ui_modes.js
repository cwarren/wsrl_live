Game.UIMode = {};

Game.UIMode.gameStart = {
  enter: function () {
    console.log("Game.UIMode.gameStart enter");
  },
  exit: function () {
    console.log("Game.UIMode.gameStart exit");
  },
  handleInput: function (eventType, evt) {
    console.log("Game.UIMode.gameStart handleInput");
    Game.switchUiMode(Game.UIMode.gamePersistence);
  },
  renderOnMain: function (display) {
    console.log("Game.UIMode.gameStart renderOnMain");
    display.clear();
    display.drawText(4,4,"Welcome to WSRL");
    display.drawText(4,6,"press any key to continue");
  }
};

Game.UIMode.gamePersistence = {
  enter: function () {
    console.log("Game.UIMode.gamePersistence enter");
  },
  exit: function () {
    console.log("Game.UIMode.gamePersistence exit");
  },
  handleInput: function (eventType, evt) {
    console.log("Game.UIMode.gamePersistence handleInput");
    console.log(eventType);
    console.dir(evt);
    if (eventType == 'keypress' && evt.keyCode == ROT.VK_S && evt.shiftKey) {
      this.doSave();
    } else
    if (eventType == 'keypress' && evt.keyCode == ROT.VK_L && evt.shiftKey) {
      this.doLoad();
    } else
    if (eventType == 'keypress' && evt.keyCode == ROT.VK_N && evt.shiftKey) {
      this.doNew();
    }
  },
  renderOnMain: function (display) {
    console.log("Game.UIMode.gamePersistence renderOnMain");
    display.clear();
    display.drawText(4,4,"'S' to save, 'L' to load, 'N' for a new game");
    display.drawText(4,5,"(commands are case sensitive)");
  },
  doSave: function () {
    console.log("TODO: game save");
    if (this.localStorageAvailable()) {
      window.localStorage.setItem(Game.PERSISTANCE_NAMESPACE, JSON.stringify(Game._game)); // .toJSON()
      Game.switchUiMode(Game.UIMode.gamePlay);
    }
  },
  doLoad: function () {
    console.log("TODO: game load");
    if (this.localStorageAvailable()) {
      var json_state_data = window.localStorage.getItem(Game.PERSISTANCE_NAMESPACE);

      var state_data = JSON.parse(json_state_data);
      Game.setRandomSeed(state_data._randomSeed);
      Game.switchUiMode(Game.UIMode.gamePlay);
    }
  },
  doNew: function () {
    console.log("TODO: game new");
    Game.setRandomSeed(5 + Math.floor(ROT.RNG.getUniform()*100000));
    Game.switchUiMode(Game.UIMode.gamePlay);
  },
  localStorageAvailable: function () { // NOTE: see https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
    try {
      var x = '__storage_test__';
      window.localStorage.setItem(x, x);
      window.localStorage.removeItem(x);
      return true;
    }
    catch(e) {
      Game.Message.send('Sorry, no local data storage is available for this browser');
      return false;
    }
  }
};

Game.UIMode.gamePlay = {
  enter: function () {
    console.log("Game.UIMode.gamePlay enter");
  },
  exit: function () {
    console.log("Game.UIMode.gamePlay exit");
  },
  handleInput: function (eventType, evt) {
    console.log("Game.UIMode.gamePlay handleInput");
    console.log(eventType);
    console.dir(evt);
    if (eventType == 'keypress' && evt.keyCode == 13) { // 13 = Enter
      Game.switchUiMode(Game.UIMode.gameWin);
    } else
    if (eventType == 'keypress' && evt.keyCode == ROT.VK_EQUALS) {
      Game.switchUiMode(Game.UIMode.gamePersistence);
    } else
    if (eventType == 'keydown' && evt.keyCode == 27) { // 27 = Esc
      Game.switchUiMode(Game.UIMode.gameLose);
    }
  },
  renderOnMain: function (display) {
    console.log("Game.UIMode.gamePlay renderOnMain");
    display.clear();
    display.drawText(4,4,"Press [Enter] to win, [Esc] to lose, = for persistence");
  }
};

Game.UIMode.gameLose = {
  enter: function () {
    console.log("Game.UIMode.gameLose enter");
  },
  exit: function () {
    console.log("Game.UIMode.gameLose exit");
  },
  handleInput: function () {
    console.log("Game.UIMode.gameLose handleInput");
  },
  renderOnMain: function (display) {
    console.log("Game.UIMode.gameLose renderOnMain");
    display.clear();
    display.drawText(4,4,"You lost. :(");
  }
};

Game.UIMode.gameWin = {
  enter: function () {
    console.log("Game.UIMode.gameWin enter");
  },
  exit: function () {
    console.log("Game.UIMode.gameWin exit");
  },
  handleInput: function () {
    console.log("Game.UIMode.gameWin handleInput");
  },
  renderOnMain: function (display) {
    console.log("Game.UIMode.gameWin renderOnMain");
    display.clear();
    display.drawText(4,4,"You WON!!!!");
  }
};
