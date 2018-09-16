require = function() {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw a.code = "MODULE_NOT_FOUND", a;
        }
        var p = n[i] = {
          exports: {}
        };
        e[i][0].call(p.exports, function(r) {
          var n = e[i][1][r];
          return o(n || r);
        }, p, p.exports, r, e, n, t);
      }
      return n[i].exports;
    }
    for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
    return o;
  }
  return r;
}()({
  CatControl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c2d63n/nCVLP4C8tJrzq6Ac", "CatControl");
    "use strict";
    var globalData = require("GlobalInfo");
    var LevelManager = require("LevelManager");
    var CatState;
    CatState = cc.Enum({
      FRONT: 0,
      AWAKEN: 1,
      BACK: 2,
      SLEEP: 3,
      DOWN: 4,
      MINIGAME: 5
    });
    cc.Class({
      extends: cc.Component,
      properties: {
        catCurrentState: {
          default: CatState.FRONT,
          type: CatState
        },
        catTeaser: {
          default: null,
          type: cc.Node
        },
        catMeow: [ cc.AudioClip ],
        timerForChangeCatState: 40,
        checkCatchTeaser: false,
        miniGameStateCounter: 0,
        miniGameState: 0,
        levelManager: LevelManager
      },
      onLoad: function onLoad() {
        this.catAnim = this.getComponent(cc.Animation);
        this.catCatchAnimanimState = this.catAnim.getAnimationState("Catch");
        this.catCatch2AnimanimState = this.catAnim.getAnimationState("Catch2");
      },
      start: function start() {
        this.generateRandomCatGesture();
        this.playCatVoiceAccordingToHappinessLevel(globalData.CatHappiness);
        var imageSprite = this.node.getComponent(cc.Sprite);
        this.node.on("touchend", function(event) {
          this.catCurrentState == CatState.FRONT || (this.catCurrentState == CatState.BACK ? this.catAnim.play("TurnBack") : this.catCurrentState == CatState.SLEEP && this.catAnim.play("WaveTail"));
          this.catCurrentState != CatState.MINIGAME && this.playCatVoiceAccordingToHappinessLevel(globalData.CatHappiness);
        }, this);
      },
      goToSleepState: function goToSleepState() {
        var imageSprite = this.node.getComponent(cc.Sprite);
        if (this.catCurrentState == CatState.FRONT) {
          this.catAnim.play("FontToBack");
          this.scheduleOnce(function() {
            this.catAnim.play("WakeToSleep");
          }, 1);
        } else this.catAnim.play("WakeToSleep");
        this.catCurrentState = CatState.SLEEP;
      },
      goToMiniGameState: function goToMiniGameState() {
        this.catCurrentState = CatState.MINIGAME;
        this.checkIsCatHappy() || this.catAnim.play("BackToFont");
        this.playCatVoiceAccordingToHappinessLevel(globalData.CatHappiness);
        this.scheduleOnce(function() {
          this.catAnim.play("Catch");
        }, 3);
        this.levelManager.resetComboPoint();
      },
      goToIdleState: function goToIdleState() {
        this.playCatVoiceAccordingToHappinessLevel(globalData.CatHappiness);
        var imageSprite = this.node.getComponent(cc.Sprite);
        if (this.catCurrentState == CatState.SLEEP) {
          this.catAnim.play("SleepToWake");
          this.catCurrentState = CatState.BACK;
          if (this.checkIsCatHappy()) {
            this.scheduleOnce(function() {
              this.catAnim.play("BackToFont");
            }, 1);
            this.catCurrentState = CatState.FRONT;
          }
        } else this.generateRandomCatGesture();
      },
      checkIsCatHappy: function checkIsCatHappy() {
        return globalData.CatHappiness >= 5;
      },
      generateRandomCatGesture: function generateRandomCatGesture() {
        var imageSprite = this.node.getComponent(cc.Sprite);
        var catGesture = 0;
        if (this.checkIsCatHappy()) {
          this.catCurrentState = CatState.FRONT;
          catGesture = 0;
        } else {
          this.catCurrentState = CatState.BACK;
          catGesture = 2;
        }
        switch (catGesture) {
         case 0:
          cc.loader.loadRes("CatState/Front", cc.SpriteFrame, function(err, spriteFrame) {
            imageSprite.spriteFrame = spriteFrame;
          });
          break;

         case 1:
          cc.loader.loadRes("CatState/turn_around", cc.SpriteFrame, function(err, spriteFrame) {
            imageSprite.spriteFrame = spriteFrame;
          });
          break;

         case 2:
          cc.loader.loadRes("CatState/watchtv_cat", cc.SpriteFrame, function(err, spriteFrame) {
            imageSprite.spriteFrame = spriteFrame;
          });
          break;

         case 3:
          cc.loader.loadRes("CatState/sleep_cat", cc.SpriteFrame, function(err, spriteFrame) {
            imageSprite.spriteFrame = spriteFrame;
          });
        }
      },
      playCatVoiceAccordingToHappinessLevel: function playCatVoiceAccordingToHappinessLevel(happiness) {
        cc.audioEngine.stop(this.current);
        if (happiness >= 5) {
          var randValue = Math.floor(2 * Math.random());
          if (0 == randValue) {
            var randValue2 = Math.floor(6 * Math.random()) + 4;
            this.current = cc.audioEngine.play(this.catMeow[randValue2], false, 1);
          } else this.current = cc.audioEngine.play(this.catMeow[10], false, 1);
        } else {
          var randValue = Math.floor(5 * Math.random());
          this.current = cc.audioEngine.play(this.catMeow[randValue], false, 1);
        }
      },
      checkCatchCatTeaser: function checkCatchCatTeaser() {
        if (this.catTeaser.y >= -370 && this.catTeaser.y <= -280) {
          this.checkCatchTeaser = false;
          this.catAnim.stop("Catch");
          this.catAnim.stop("Catch2");
          this.catAnim.setCurrentTime(0, "Catch2");
          this.catAnim.setCurrentTime(0, "Catch");
          this.levelManager.changeGameStateToIdle();
          this.levelManager.showMiniGameRewardSummary();
          this.levelManager.resetComboPoint();
        } else this.levelManager.addComboPoint();
      },
      switchMiniGameCatAnimationState: function switchMiniGameCatAnimationState() {
        if (this.catCurrentState == CatState.MINIGAME) {
          if (0 == this.miniGameState) {
            var ranTimer = 1 * Math.random() + 1;
            this.scheduleOnce(function() {
              this.catCatchAnimanimState.speed = .5;
              this.catAnim.play("Catch");
            }, ranTimer);
            console.log("State   0");
          } else if (1 == this.miniGameState) {
            var ranTimer = 1 * Math.random() + 1;
            this.catCatchAnimanimState.speed = 1;
            this.scheduleOnce(function() {
              this.catAnim.play("Catch");
            }, ranTimer);
            console.log("State   1");
          } else if (2 == this.miniGameState) {
            var ranTimer = 1.5 * Math.random() + .5;
            this.catCatch2AnimanimState.speed = 1;
            this.scheduleOnce(function() {
              this.catAnim.play("Catch2");
            }, ranTimer);
            console.log("State   2");
          } else if (3 == this.miniGameState) {
            var ranTimer = 2 * Math.random() + 2;
            this.catCatch2AnimanimState.speed = 1.5;
            this.scheduleOnce(function() {
              this.catAnim.play("Catch2");
            }, ranTimer);
            console.log("State   3");
          }
          this.miniGameStateCounter++;
        }
      },
      switchMiniGameState: function switchMiniGameState() {
        if (0 == this.miniGameState) {
          if (this.miniGameStateCounter >= 10) {
            var posbility = (this.miniGameStateCounter - 10) / 10;
            if (Math.random() <= posbility) {
              var randomNum = Math.random();
              this.miniGameState = randomNum <= .5 ? 1 : randomNum >= .7 ? 2 : 3;
              this.miniGameStateCounter = 0;
            }
          }
        } else if (1 == this.miniGameState) {
          if (this.miniGameStateCounter >= 3) {
            var posbility = (this.miniGameStateCounter - 3) / 3;
            if (Math.random() <= posbility) {
              var randomNum = Math.random();
              this.miniGameState = randomNum <= .4 ? 0 : randomNum >= .6 ? 2 : 3;
              this.miniGameStateCounter = 0;
            }
          }
        } else if (2 == this.miniGameState) {
          if (this.miniGameStateCounter >= 4) {
            var posbility = (this.miniGameStateCounter - 4) / 4;
            if (Math.random() <= posbility) {
              var randomNum = Math.random();
              this.miniGameState = randomNum <= .5 ? 0 : randomNum >= .6 ? 3 : 1;
              this.miniGameStateCounter = 0;
            }
          }
        } else if (3 == this.miniGameState) {
          this.miniGameState = 0;
          this.miniGameStateCounter = 0;
        }
        this.switchMiniGameCatAnimationState();
      }
    });
    cc._RF.pop();
  }, {
    GlobalInfo: "GlobalInfo",
    LevelManager: "LevelManager"
  } ],
  CatDreamPopup: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d30e4zqK6pFtbhJtKqVZd5P", "CatDreamPopup");
    "use strict";
    var globalData = require("GlobalInfo");
    var LevelManager = require("LevelManager");
    cc.Class({
      extends: cc.Component,
      properties: {
        dreamSprite: {
          default: null,
          type: cc.Node
        },
        levelManager: LevelManager,
        blocksGridLayout: {
          default: null,
          type: cc.Node
        },
        hiddenBlocks: {
          default: null,
          type: cc.Prefab
        },
        source: "",
        pieces: 16,
        keyBlocks: [],
        unlockedBlocks: [],
        isUnlocked: false,
        hiddenDreamBlocks: [ cc.Node ]
      },
      onLoad: function onLoad() {
        var count = 0;
        for (var i = 0; i < 5; i++) for (var j = 0; j < 5; j++) {
          var childNode = cc.instantiate(this.hiddenBlocks);
          childNode.x = childNode.width * i;
          childNode.y = 1920 - childNode.height * j;
          childNode.parent = this.blocksGridLayout;
          var nodeControl = childNode.getComponent("HideDreamBlocks");
          nodeControl.parent = this.node;
          nodeControl.index = count;
          this.hiddenDreamBlocks[count] = childNode;
          count++;
        }
      },
      start: function start() {},
      loadData: function loadData(source) {
        this.levelManager.updateDreamBoXDescription("点击方块查看梦境");
        var imageSprite = this.dreamSprite.getComponent(cc.Sprite);
        var imgPath = "Dream/" + source;
        this.source = source;
        cc.loader.loadRes(imgPath, cc.SpriteFrame, function(err, spriteFrame) {
          imageSprite.spriteFrame = spriteFrame;
        });
        var collectedDreamsArrarolder = globalData.CollectedDream;
        for (var index = 0; index < globalData.CollectedDream.length; index++) globalData.CollectedDream[index].source == this.source && (this.unlockedBlocks = globalData.CollectedDream[index].unlockedBlocks);
        for (var index = 0; index < this.hiddenDreamBlocks.length; index++) this.hiddenDreamBlocks[index].active = true;
        for (var j = 0; j < this.unlockedBlocks.length; j++) this.hiddenDreamBlocks[this.unlockedBlocks[j]].active = false;
      },
      unlockHideBlocks: function unlockHideBlocks(index, isKey) {
        var collectedDreamsArrarolder = globalData.CollectedDream;
        console.log("Points + " + globalData.ActionPoints);
        if (globalData.ActionPoints > 0) {
          globalData.ActionPoints--;
          this.levelManager.updateActionPoint();
          this.hiddenDreamBlocks[index].active = false;
          for (var i = 0; i < collectedDreamsArrarolder.length; i++) if (collectedDreamsArrarolder[i].source == this.source) {
            globalData.CollectedDream[i].unlockedBlocks.push(index);
            var keyPieceIndex = collectedDreamsArrarolder[i].keyBlocks.indexOf(index);
            keyPieceIndex > -1 && globalData.CollectedDream[i].keyBlocks.splice(keyPieceIndex, 1);
            if (globalData.CollectedDream[i].keyBlocks.length <= 0) {
              globalData.CollectedDream[i].isUnLocked = true;
              for (var j = 0; j < this.hiddenDreamBlocks.length; j++) {
                globalData.CollectedDream[i].unlockedBlocks.push(j);
                this.hiddenDreamBlocks[j].active = false;
              }
              this.levelManager.updateDreamBoXDescription("恭喜解锁新梦境");
            } else if (globalData.CollectedDream[i].unlockedBlocks.length >= globalData.CollectedDream[i].pieces) {
              globalData.CollectedDream[i].isUnLocked = true;
              this.levelManager.updateDreamBoXDescription("恭喜解锁新梦境");
            }
          }
        } else console.log("Not Enough Points");
        this.levelManager.saveGolbalData();
      }
    });
    cc._RF.pop();
  }, {
    GlobalInfo: "GlobalInfo",
    LevelManager: "LevelManager"
  } ],
  CatTeaser: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "329b3Ydd2tNYJPLELoDmekG", "CatTeaser");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        catTeaser: {
          default: null,
          type: cc.Node
        },
        catchedTimes: 0,
        canPulledOut: false,
        isCatched: false
      },
      start: function start() {
        this.catAnim = this.catTeaser.getComponent(cc.Animation);
        this.node.on("touchend", function(event) {
          this.isCatched ? this.canPulledOut || this.catAnim.play("Struggle") : this.catAnim.play("Pullup");
        }, this);
      }
    });
    cc._RF.pop();
  }, {} ],
  CollectiveObjects: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7a84e7FFTZNU4sUwWU1rWkH", "CollectiveObjects");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        value: 0,
        canvas: {
          default: null,
          type: cc.Node
        }
      },
      onLoad: function onLoad() {
        this.levelManagerControl = this.canvas.getComponent("LevelManager");
      },
      start: function start() {
        this.node.on("touchend", function(event) {
          this.levelManagerControl.collectObjects(this.value);
          this.node.active = false;
        }, this);
      }
    });
    cc._RF.pop();
  }, {} ],
  Dreams: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d0d97jP445AnbO1+r4jzf3d", "Dreams");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        source: "default",
        pieces: 0,
        keyBlocks: [],
        unlockedBlocks: [],
        isUnlocked: false,
        imgNode: {
          default: null,
          type: cc.Node
        },
        imgMask: {
          default: null,
          type: cc.Node
        },
        catDreamPopup: {
          default: null,
          type: cc.Node
        }
      },
      start: function start() {
        this.imgPath = "Dream/" + this.source;
        console.log("Dream" + this.imgPath + "  IsUnLocked " + this.isUnlocked);
        this.imgMask.active = !this.isUnlocked;
        var imageSprite = this.imgNode.getComponent(cc.Sprite);
        this.dreamPopUpControl = this.catDreamPopup.getComponent("CatDreamPopup");
        cc.loader.loadRes(this.imgPath, cc.SpriteFrame, function(err, spriteFrame) {
          imageSprite.spriteFrame = spriteFrame;
        });
        this.node.on("touchend", function(event) {
          this.openCatDreamPopup();
        }, this);
      },
      openCatDreamPopup: function openCatDreamPopup() {
        this.catDreamPopup.active = true;
        this.dreamPopUpControl.loadData(this.source);
      }
    });
    cc._RF.pop();
  }, {} ],
  FoodContainer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "776c8UwlO9Nq5NP97FJp5kX", "FoodContainer");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        bowlType: 0,
        bowlState: 0
      },
      start: function start() {
        var foodEmpty, waterEmpty, foodFull, waterFull;
        var imageSprite = this.node.getComponent(cc.Sprite);
        this.node.on("touchend", function(event) {
          if (0 == this.bowlState) {
            0 == this.bowlType ? cc.loader.loadRes("InteractiveObjecs/full_food_bowl", cc.SpriteFrame, function(err, spriteFrame) {
              imageSprite.spriteFrame = spriteFrame;
            }) : 1 == this.bowlType && cc.loader.loadRes("InteractiveObjecs/full_water_bowl", cc.SpriteFrame, function(err, spriteFrame) {
              imageSprite.spriteFrame = spriteFrame;
            });
            this.bowlState = 1;
          } else if (1 == this.bowlState) {
            0 == this.bowlType ? cc.loader.loadRes("InteractiveObjecs/empty_food_bowl", cc.SpriteFrame, function(err, spriteFrame) {
              imageSprite.spriteFrame = spriteFrame;
            }) : 1 == this.bowlType && cc.loader.loadRes("InteractiveObjecs/empty_water_bowl", cc.SpriteFrame, function(err, spriteFrame) {
              imageSprite.spriteFrame = spriteFrame;
            });
            this.bowlState = 0;
          }
        }, this);
      }
    });
    cc._RF.pop();
  }, {} ],
  GlobalInfo: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "93ca2tKjypCJrUvPhUYviP0", "GlobalInfo");
    "use strict";
    cc.director.getPhysicsManager().enabled = true;
    module.exports = {
      UserName: null,
      NicknName: null,
      AvatarURL: null,
      StoredBackedTime: 0,
      StoredEatingTime: 0,
      StoredDrinkingingTime: 0,
      StoredPlayingTime: 0,
      StoredWatchingTime: 0,
      ActionPoints: 0,
      CatHappiness: 6,
      CatHappinessGoUp: false,
      CollectedDream: []
    };
    cc._RF.pop();
  }, {} ],
  HideDreamBlocks: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c7019vdrsVKToJC/qoIlxeW", "HideDreamBlocks");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        index: 0,
        parent: {
          default: null,
          type: cc.Node
        }
      },
      start: function start() {
        this.node.on("touchend", function(event) {
          true == this.node.active && this.parent.getComponent("CatDreamPopup").unlockHideBlocks(this.index, this.index);
        }, this);
      }
    });
    cc._RF.pop();
  }, {} ],
  LevelManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "16309X6v0dDgbM4Y6yNoRIz", "LevelManager");
    "use strict";
    var globalData = require("GlobalInfo");
    var GameState;
    GameState = cc.Enum({
      IDLE: 0,
      GO_OUT: 1,
      SLEEP: 2,
      MINIGAME: 3
    });
    function CatDream(source, pieces, keyBlocks, unlockedBlocks, isUnLocked) {
      this.source = source;
      this.pieces = pieces;
      this.keyBlocks = keyBlocks;
      this.unlockedBlocks = unlockedBlocks;
      this.isUnLocked = isUnLocked;
    }
    var dreamBeach = new CatDream("Beach", 25, [ 4, 5, 6, 7, 8 ], [], false);
    var dreamBatMan = new CatDream("Batman", 25, [ 4, 5, 6, 7, 8 ], [], false);
    var dreamBlackCat = new CatDream("BlackCat", 25, [ 4, 5, 6, 7, 8 ], [], false);
    var dreamCatFish = new CatDream("CatFish", 25, [ 4, 5, 6, 7, 8 ], [], false);
    var dreamCloudCat = new CatDream("CloudCat", 25, [ 4, 5, 6, 7, 8 ], [], false);
    var dreamDogCat = new CatDream("Dogcat", 25, [ 4, 5, 6, 7, 8 ], [], false);
    var dreamFox = new CatDream("Fox", 25, [ 4, 5, 6, 7, 8 ], [], false);
    var dreamMerimaid = new CatDream("Merimaid", 25, [ 4, 5, 6, 7, 8 ], [], false);
    var dreamSpace = new CatDream("Space", 25, [ 4, 5, 6, 7, 8 ], [], false);
    var dreamTiger = new CatDream("TIger", 25, [ 4, 5, 6, 7, 8 ], [], false);
    var totalDream = [ dreamBeach, dreamBatMan, dreamBlackCat, dreamCatFish, dreamCloudCat, dreamDogCat, dreamFox, dreamMerimaid, dreamSpace, dreamTiger ];
    cc.Class({
      extends: cc.Component,
      properties: {
        cat: {
          default: null,
          type: cc.Node
        },
        countDownTime: {
          default: null,
          type: cc.Node
        },
        goOutUI: {
          default: null,
          type: cc.Node
        },
        goOutBtn: {
          default: null,
          type: cc.Node
        },
        sleepBtn: {
          default: null,
          type: cc.Node
        },
        miniGameBtn: {
          default: null,
          type: cc.Node
        },
        collectiveDreamBubble: {
          default: null,
          type: cc.Node
        },
        collectiveObject: {
          default: null,
          type: cc.Node
        },
        catDreamBoxUI: {
          default: null,
          type: cc.Node
        },
        combosLabelNode: {
          default: null,
          type: cc.Node
        },
        miniGameScorePopupUI: {
          default: null,
          type: cc.Node
        },
        minGameRewardedActionPointLabel: {
          default: null,
          type: cc.Label
        },
        combosLabel: {
          default: null,
          type: cc.Label
        },
        actionPointLabel: {
          default: null,
          type: cc.Label
        },
        descriptionDreamBoxLabel: {
          default: null,
          type: cc.Label
        },
        hiddenDream: {
          default: null,
          type: cc.Prefab
        },
        catDreamBoxGridLayout: {
          default: null,
          type: cc.Node
        },
        catDreamPopup: {
          default: null,
          type: cc.Node
        },
        sunMoonWheel: {
          default: null,
          type: cc.Node
        },
        currentState: {
          default: GameState.IDLE,
          type: GameState
        },
        tapArea: {
          default: null,
          type: cc.Node
        },
        catTeaser: {
          default: null,
          type: cc.Node
        },
        playerWaitingTime: 10,
        catHappiness: 0,
        userData: null,
        comboCount: 0
      },
      onLoad: function onLoad() {
        this.catControl = this.cat.getComponent("CatControl");
        this.loadGolbalData();
      },
      start: function start() {
        this.timeCountDownLabel = this.countDownTime.getComponent(cc.Label);
        this.goOutUI.active = false;
        this.countDownTime.active = false;
        this.catDreamPopup.active = false;
        this.catDreamBoxUI.active = false;
        this.collectiveObject.active = false;
        this.collectiveDreamBubble.active = false;
        this.tapArea.active = false;
        this.catTeaser.active = false;
        this.combosLabel.string = "";
        this.combosLabelNode.active = false;
        this.miniGameScorePopupUI.active = false;
        this.generatedDream = null;
        this.updateTimeWheelAccordingToRealTime();
        this.schedule(function() {
          this.updateTimeWheelAccordingToRealTime();
        }, 240);
        this.schedule(function() {
          10 == globalData.CatHappiness ? globalData.CatHappinessGoUp = false : 0 == tglobalData.CatHappiness;
          globalData.CatHappinessGoUp ? globalData.CatHappiness < 10 && globalData.CatHappiness++ : globalData.CatHappiness > 0 && globalData.CatHappiness--;
        }, 3600);
      },
      saveGolbalData: function saveGolbalData() {
        false;
      },
      loadGolbalData: function loadGolbalData() {
        var _this = this;
        var res;
        false;
      },
      changeGameStateToSleep: function changeGameStateToSleep() {
        var randValue = Math.floor(Math.random() * (10 - globalData.CatHappiness));
        0 == globalData.CatHappiness && (randValue = 10);
        if (globalData.CatHappiness >= 5 || randValue <= 1) {
          this.currentState = GameState.SLEEP;
          this.cat.active = true;
          this.catControl.goToSleepState();
          this.startCountDown(4 * this.playerWaitingTime);
        } else {
          globalData.CatHappiness > 0 && globalData.CatHappiness--;
          console.log("I am not happy");
        }
        this.catControl.playCatVoiceAccordingToHappinessLevel(globalData.CatHappiness);
      },
      changeGameStateToGoOut: function changeGameStateToGoOut() {
        var randValue = Math.floor(Math.random() * (10 - globalData.CatHappiness));
        0 == globalData.CatHappiness && (randValue = 10);
        if (globalData.CatHappiness >= 5 || randValue <= 1) {
          this.goOutUI.active = true;
          this.currentState = GameState.GO_OUT;
          this.cat.active = false;
          this.startCountDown(this.playerWaitingTime);
        } else {
          globalData.CatHappiness > 0 && globalData.CatHappiness--;
          console.log("I am not happy");
        }
        this.catControl.playCatVoiceAccordingToHappinessLevel(globalData.CatHappiness);
      },
      changeGameStateToMiniGame: function changeGameStateToMiniGame() {
        this.miniGameBtn.active = false;
        this.goOutBtn.active = false;
        this.sleepBtn.active = false;
        this.tapArea.active = true;
        this.catTeaser.active = true;
        this.combosLabel.string = "";
        this.combosLabelNode.active = true;
        this.cat.active = true;
        this.currentState = GameState.MINIGAME;
        this.catControl.goToMiniGameState();
      },
      changeGameStateToIdle: function changeGameStateToIdle() {
        if (this.currentState == GameState.SLEEP) {
          this.collectiveDreamBubble.active = true;
          this.generateRandomDream();
        } else this.currentState == GameState.GO_OUT ? this.collectiveObject.active = true : this.currentState == GameState.MINIGAME && this.onMIniGameFinished();
        this.currentState = GameState.IDLE;
        this.cat.active = true;
        this.tapArea.active = false;
        this.catTeaser.active = false;
        this.countDownTime.active = false;
        this.goOutUI.active = false;
        this.combosLabel.string = "";
        this.combosLabelNode.active = false;
        this.miniGameBtn.active = true;
        this.goOutBtn.active = true;
        this.sleepBtn.active = true;
        this.catControl.goToIdleState();
      },
      autoCollectObjectsAndDream: function autoCollectObjectsAndDream() {
        if (this.collectiveDreamBubble.active) {
          collectiveDreamBubble.active = false;
          this.collectObjects(0);
        }
        if (this.collectiveObject.active) {
          collectiveObject.active = false;
          this.collectObjects(1);
        }
      },
      generateRandomDream: function generateRandomDream() {
        this.generatedDream = totalDream[Math.floor(Math.random() * totalDream.length)];
      },
      collectObjects: function collectObjects(type) {
        switch (type) {
         case 0:
          var bFindexisted = false;
          var collectedDreamsArrarolder = globalData.CollectedDream;
          for (var index = 0; index < collectedDreamsArrarolder.length; index++) if (collectedDreamsArrarolder[index].source == this.generatedDream.source) {
            globalData.ActionPoints += 3;
            bFindexisted = true;
          }
          bFindexisted || globalData.CollectedDream.push(this.generatedDream);
          break;

         case 1:
         default:
          globalData.ActionPoints += type;
        }
        this.saveGolbalData();
      },
      loadAllDreamsFromGolbalData: function loadAllDreamsFromGolbalData() {
        var _this2 = this;
        this.actionPointLabel.string = globalData.ActionPoints;
        this.catDreamBoxGridLayout.removeAllChildren();
        globalData.CollectedDream.forEach(function(dream) {
          var node = cc.instantiate(_this2.hiddenDream);
          var catHiddenDreamCOntrol = node.getComponent("Dreams");
          catHiddenDreamCOntrol.source = dream.source;
          catHiddenDreamCOntrol.pieces = dream.pieces;
          catHiddenDreamCOntrol.keyBlocks = dream.keyBlocks;
          catHiddenDreamCOntrol.isUnlocked = dream.isUnLocked;
          catHiddenDreamCOntrol.unlockedBlocks = dream.unlockedBlocks;
          catHiddenDreamCOntrol.catDreamPopup = _this2.catDreamPopup;
          node.parent = _this2.catDreamBoxGridLayout;
        });
        console.log("ReLoad All Dream");
        this.updateDreamBoXDescription("点击方块解锁梦境");
      },
      updateActionPoint: function updateActionPoint() {
        this.actionPointLabel.string = globalData.ActionPoints;
        this.saveGolbalData();
      },
      showMiniGameRewardSummary: function showMiniGameRewardSummary() {
        var rewardedActionPoint = Math.floor(this.comboCount / 15);
        var countToNextPoint = 15 - this.comboCount % 15;
        this.miniGameScorePopupUI.active = true;
        this.minGameRewardedActionPointLabel.string = "You Score is " + this.comboCount + " You Earn " + rewardedActionPoint + " to unlock dreams ! " + countToNextPoint + " more to get next action point";
        globalData.ActionPoints += rewardedActionPoint;
        this.updateActionPoint();
      },
      hideGameRewardSummary: function hideGameRewardSummary() {
        this.miniGameScorePopupUI.active = false;
      },
      updateDreamBoXDescription: function updateDreamBoXDescription(value) {
        this.descriptionDreamBoxLabel.string = value;
      },
      addComboPoint: function addComboPoint() {
        this.comboCount++;
        this.combosLabel.string = "Combos " + this.comboCount;
      },
      resetComboPoint: function resetComboPoint() {
        this.comboCount = 0;
        this.combosLabel.string = "Combos " + this.comboCount;
      },
      getComboCount: function getComboCount() {
        return this.comboCount;
      },
      openCatDreamBoxUI: function openCatDreamBoxUI() {
        this.loadAllDreamsFromGolbalData();
        this.catDreamBoxUI.active = true;
      },
      closeCatDreamBoxUI: function closeCatDreamBoxUI() {
        this.catDreamBoxUI.active = false;
      },
      closeDreamPopUp: function closeDreamPopUp() {
        this.loadAllDreamsFromGolbalData();
        this.catDreamPopup.active = false;
      },
      onMIniGameFinished: function onMIniGameFinished() {
        globalData.CatHappiness++;
      },
      updateTimeWheelAccordingToRealTime: function updateTimeWheelAccordingToRealTime() {
        var data = new Date();
        var hours = data.getHours() + data.getMinutes() / 60;
        var degree = 15 * -hours;
        this.sunMoonWheel.rotation = degree;
      },
      startCountDown: function startCountDown(timeLength) {
        this.countDownTime.active = true;
        this.goOutBtn.active = false;
        this.sleepBtn.active = false;
        this.miniGameBtn.active = false;
        this.tapArea.active = false;
        this.catTeaser.active = false;
        this.combosLabel.string = "";
        this.combosLabelNode.active = false;
        var timestamp = Date.parse(new Date());
        console.log("Time " + timestamp);
        timestamp /= 1e3;
        var n = 1e3 * timestamp;
        var futureTimeStampCatBack = n + 60 * timeLength * 1e3;
        globalData.StoredTime = futureTimeStampCatBack;
        this.callback = function() {
          var now = new Date().getTime();
          var durationForCatbackTimeStamp = futureTimeStampCatBack - now;
          var hours = Math.floor(durationForCatbackTimeStamp / 36e5);
          var minutes = Math.floor(durationForCatbackTimeStamp % 36e5 / 6e4);
          var seconds = Math.floor(durationForCatbackTimeStamp % 6e4 / 1e3);
          this.timeCountDownLabel.string = hours + "h " + minutes + "m" + seconds + "s";
          if (durationForCatbackTimeStamp <= 1e3) {
            this.changeGameStateToIdle();
            this.unschedule(this.callback);
          }
        };
        this.schedule(this.callback, 1);
      }
    });
    cc._RF.pop();
  }, {
    GlobalInfo: "GlobalInfo"
  } ],
  StartLevel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "87be7kvdeFEhYCBBH7r2mVf", "StartLevel");
    "use strict";
    var globalData = require("GlobalInfo");
    cc.Class({
      extends: cc.Component,
      properties: {},
      start: function start() {},
      gameStart: function gameStart() {
        this.getUserInfo();
      },
      getUserInfo: function getUserInfo() {
        false;
      }
    });
    cc._RF.pop();
  }, {
    GlobalInfo: "GlobalInfo"
  } ],
  UISound: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1a74d8V2HJM45KfMX2y6Tdk", "UISound");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        UISounds: [ cc.AudioClip ]
      },
      start: function start() {},
      onBtnClicked: function onBtnClicked() {
        this.current = cc.audioEngine.play(this.UISounds[0], false, 1);
      }
    });
    cc._RF.pop();
  }, {} ]
}, {}, [ "CatControl", "CatDreamPopup", "CatTeaser", "CollectiveObjects", "Dreams", "FoodContainer", "GlobalInfo", "HideDreamBlocks", "LevelManager", "StartLevel", "UISound" ]);