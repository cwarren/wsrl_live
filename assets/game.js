console.log("hello console");

window.onload = function() {
    console.log("starting WSRL - window loaded");
    // Check if rot.js can work on this browser
    if (!ROT.isSupported()) {
        alert("The rot.js library isn't supported by your browser.");
    } else {
        // Initialize the game
        Game.init();

        // Add the containers to our HTML page
        document.getElementById('wsrl-avatar-display').appendChild(   Game.getDisplay('avatar').getContainer());
        document.getElementById('wsrl-main-display').appendChild(   Game.getDisplay('main').getContainer());
        document.getElementById('wsrl-message-display').appendChild(   Game.getDisplay('message').getContainer());

        Game.Message.sendMessage("Welcome to WSRL");

    }
};

var Game = {
  DISPLAYS: {
    avatar: {
      w: 20,
      h: 24,
      o: null
    },
    main: {
      w: 80,
      h: 24,
      o: null
    },
    message: {
      w: 100,
      h: 6,
      o: null
    }
  },
  init: function () {
    console.log("WSRL Live Initialization");
    // this.DISPLAYS.main.o = new ROT.Display({width:this.DISPLAYS.main.w, height:this.DISPLAYS.main.h});
    for (var displayName in this.DISPLAYS) {
      if (this.DISPLAYS.hasOwnProperty(displayName)) {
        this.DISPLAYS[displayName].o = new ROT.Display({width:this.DISPLAYS[displayName].w, height:this.DISPLAYS[displayName].h});
      }
    }
    this.renderAll();
  },
  getDisplay: function(displayName) {
    return this.DISPLAYS[displayName].o;
  },
  renderAll: function() {
    this.renderAvatar();
    this.renderMain();
    this.renderMessage();
  },
  renderAvatar: function() {
    this.DISPLAYS.avatar.o.drawText(2,3,"avatar display");
  },
  renderMain: function() {
    this.DISPLAYS.main.o.drawText(2,1,"main display");
    for (var i = 0; i < 5; i++) {
      this.DISPLAYS.main.o.drawText(2,3+i,"TADA!!!");
    }
  },
  renderMessage: function() {
    // this.DISPLAYS.message.o.drawText(2,3,"message display");
    Game.Message.renderOn(this.DISPLAYS.message.o);
  }
};
