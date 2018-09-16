require=function n(c,s,l){function r(e,t){if(!s[e]){if(!c[e]){var a="function"==typeof require&&require;if(!t&&a)return a(e,!0);if(h)return h(e,!0);var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}var o=s[e]={exports:{}};c[e][0].call(o.exports,function(t){return r(c[e][1][t]||t)},o,o.exports,n,c,s,l)}return s[e].exports}for(var h="function"==typeof require&&require,t=0;t<l.length;t++)r(l[t]);return r}({CatControl:[function(t,e,a){"use strict";cc._RF.push(e,"c2d63n/nCVLP4C8tJrzq6Ac","CatControl");var i,o=t("GlobalInfo"),n=t("LevelManager");i=cc.Enum({FRONT:0,AWAKEN:1,BACK:2,SLEEP:3,DOWN:4,MINIGAME:5}),cc.Class({extends:cc.Component,properties:{catCurrentState:{default:i.FRONT,type:i},catTeaser:{default:null,type:cc.Node},catMeow:[cc.AudioClip],timerForChangeCatState:40,checkCatchTeaser:!1,miniGameStateCounter:0,miniGameState:0,levelManager:n},onLoad:function(){this.catAnim=this.getComponent(cc.Animation),this.catCatchAnimanimState=this.catAnim.getAnimationState("Catch"),this.catCatch2AnimanimState=this.catAnim.getAnimationState("Catch2")},start:function(){this.generateRandomCatGesture(),this.playCatVoiceAccordingToHappinessLevel(o.CatHappiness);this.node.getComponent(cc.Sprite);this.node.on("touchend",function(t){this.catCurrentState==i.FRONT||(this.catCurrentState==i.BACK?this.catAnim.play("TurnBack"):this.catCurrentState==i.SLEEP&&this.catAnim.play("WaveTail")),this.catCurrentState!=i.MINIGAME&&this.playCatVoiceAccordingToHappinessLevel(o.CatHappiness)},this)},goToSleepState:function(){this.node.getComponent(cc.Sprite);this.catCurrentState==i.FRONT?(this.catAnim.play("FontToBack"),this.scheduleOnce(function(){this.catAnim.play("WakeToSleep")},1)):this.catAnim.play("WakeToSleep"),this.catCurrentState=i.SLEEP},goToMiniGameState:function(){this.catCurrentState=i.MINIGAME,this.checkIsCatHappy()||this.catAnim.play("BackToFont"),this.playCatVoiceAccordingToHappinessLevel(o.CatHappiness),this.scheduleOnce(function(){this.catAnim.play("Catch")},3),this.levelManager.resetComboPoint()},goToIdleState:function(){this.playCatVoiceAccordingToHappinessLevel(o.CatHappiness);this.node.getComponent(cc.Sprite);this.catCurrentState==i.SLEEP?(this.catAnim.play("SleepToWake"),this.catCurrentState=i.BACK,this.checkIsCatHappy()&&(this.scheduleOnce(function(){this.catAnim.play("BackToFont")},1),this.catCurrentState=i.FRONT)):this.generateRandomCatGesture()},checkIsCatHappy:function(){return 5<=o.CatHappiness},generateRandomCatGesture:function(){var a=this.node.getComponent(cc.Sprite),t=0;switch(this.checkIsCatHappy()?(this.catCurrentState=i.FRONT,t=0):(this.catCurrentState=i.BACK,t=2),t){case 0:cc.loader.loadRes("CatState/Front",cc.SpriteFrame,function(t,e){a.spriteFrame=e});break;case 1:cc.loader.loadRes("CatState/turn_around",cc.SpriteFrame,function(t,e){a.spriteFrame=e});break;case 2:cc.loader.loadRes("CatState/watchtv_cat",cc.SpriteFrame,function(t,e){a.spriteFrame=e});break;case 3:cc.loader.loadRes("CatState/sleep_cat",cc.SpriteFrame,function(t,e){a.spriteFrame=e})}},playCatVoiceAccordingToHappinessLevel:function(t){if(cc.audioEngine.stop(this.current),5<=t){if(0==(a=Math.floor(2*Math.random()))){var e=Math.floor(6*Math.random())+4;this.current=cc.audioEngine.play(this.catMeow[e],!1,1)}else this.current=cc.audioEngine.play(this.catMeow[10],!1,1)}else{var a=Math.floor(5*Math.random());this.current=cc.audioEngine.play(this.catMeow[a],!1,1)}},checkCatchCatTeaser:function(){-370<=this.catTeaser.y&&this.catTeaser.y<=-280?(this.checkCatchTeaser=!1,this.catAnim.stop("Catch"),this.catAnim.stop("Catch2"),this.catAnim.setCurrentTime(0,"Catch2"),this.catAnim.setCurrentTime(0,"Catch"),this.levelManager.changeGameStateToIdle(),this.levelManager.showMiniGameRewardSummary(),this.levelManager.resetComboPoint()):this.levelManager.addComboPoint()},switchMiniGameCatAnimationState:function(){if(this.catCurrentState==i.MINIGAME){if(0==this.miniGameState){var t=1*Math.random()+1;this.scheduleOnce(function(){this.catCatchAnimanimState.speed=.5,this.catAnim.play("Catch")},t),console.log("State   0")}else if(1==this.miniGameState){t=1*Math.random()+1;this.catCatchAnimanimState.speed=1,this.scheduleOnce(function(){this.catAnim.play("Catch")},t),console.log("State   1")}else if(2==this.miniGameState){t=1.5*Math.random()+.5;this.catCatch2AnimanimState.speed=1,this.scheduleOnce(function(){this.catAnim.play("Catch2")},t),console.log("State   2")}else if(3==this.miniGameState){t=2*Math.random()+2;this.catCatch2AnimanimState.speed=1.5,this.scheduleOnce(function(){this.catAnim.play("Catch2")},t),console.log("State   3")}this.miniGameStateCounter++}},switchMiniGameState:function(){if(0==this.miniGameState){if(10<=this.miniGameStateCounter){var t=(this.miniGameStateCounter-10)/10;if(Math.random()<=t){var e=Math.random();this.miniGameState=e<=.5?1:.7<=e?2:3,this.miniGameStateCounter=0}}}else if(1==this.miniGameState){if(3<=this.miniGameStateCounter){t=(this.miniGameStateCounter-3)/3;if(Math.random()<=t){e=Math.random();this.miniGameState=e<=.4?0:.6<=e?2:3,this.miniGameStateCounter=0}}}else if(2==this.miniGameState){if(4<=this.miniGameStateCounter){t=(this.miniGameStateCounter-4)/4;if(Math.random()<=t){e=Math.random();this.miniGameState=e<=.5?0:.6<=e?3:1,this.miniGameStateCounter=0}}}else 3==this.miniGameState&&(this.miniGameState=0,this.miniGameStateCounter=0);this.switchMiniGameCatAnimationState()}}),cc._RF.pop()},{GlobalInfo:"GlobalInfo",LevelManager:"LevelManager"}],CatDreamPopup:[function(t,e,a){"use strict";cc._RF.push(e,"d30e4zqK6pFtbhJtKqVZd5P","CatDreamPopup");var c=t("GlobalInfo"),i=t("LevelManager");cc.Class({extends:cc.Component,properties:{dreamSprite:{default:null,type:cc.Node},levelManager:i,blocksGridLayout:{default:null,type:cc.Node},hiddenBlocks:{default:null,type:cc.Prefab},source:"",pieces:16,keyBlocks:[],unlockedBlocks:[],isUnlocked:!1,hiddenDreamBlocks:[cc.Node]},onLoad:function(){for(var t=0,e=0;e<5;e++)for(var a=0;a<5;a++){var i=cc.instantiate(this.hiddenBlocks);i.x=i.width*e,i.y=1920-i.height*a,i.parent=this.blocksGridLayout;var o=i.getComponent("HideDreamBlocks");o.parent=this.node,o.index=t,this.hiddenDreamBlocks[t]=i,t++}},start:function(){},loadData:function(t){this.levelManager.updateDreamBoXDescription("点击方块查看梦境");var a=this.dreamSprite.getComponent(cc.Sprite),e="Dream/"+t;this.source=t,cc.loader.loadRes(e,cc.SpriteFrame,function(t,e){a.spriteFrame=e});c.CollectedDream;for(var i=0;i<c.CollectedDream.length;i++)c.CollectedDream[i].source==this.source&&(this.unlockedBlocks=c.CollectedDream[i].unlockedBlocks);for(i=0;i<this.hiddenDreamBlocks.length;i++)this.hiddenDreamBlocks[i].active=!0;for(var o=0;o<this.unlockedBlocks.length;o++)this.hiddenDreamBlocks[this.unlockedBlocks[o]].active=!1},unlockHideBlocks:function(t,e){var a=c.CollectedDream;if(console.log("Points + "+c.ActionPoints),0<c.ActionPoints){c.ActionPoints--,this.levelManager.updateActionPoint(),this.hiddenDreamBlocks[t].active=!1;for(var i=0;i<a.length;i++)if(a[i].source==this.source){c.CollectedDream[i].unlockedBlocks.push(t);var o=a[i].keyBlocks.indexOf(t);if(-1<o&&c.CollectedDream[i].keyBlocks.splice(o,1),c.CollectedDream[i].keyBlocks.length<=0){c.CollectedDream[i].isUnLocked=!0;for(var n=0;n<this.hiddenDreamBlocks.length;n++)c.CollectedDream[i].unlockedBlocks.push(n),this.hiddenDreamBlocks[n].active=!1;this.levelManager.updateDreamBoXDescription("恭喜解锁新梦境")}else c.CollectedDream[i].unlockedBlocks.length>=c.CollectedDream[i].pieces&&(c.CollectedDream[i].isUnLocked=!0,this.levelManager.updateDreamBoXDescription("恭喜解锁新梦境"))}}else console.log("Not Enough Points");this.levelManager.saveGolbalData()}}),cc._RF.pop()},{GlobalInfo:"GlobalInfo",LevelManager:"LevelManager"}],CatTeaser:[function(t,e,a){"use strict";cc._RF.push(e,"329b3Ydd2tNYJPLELoDmekG","CatTeaser"),cc.Class({extends:cc.Component,properties:{catTeaser:{default:null,type:cc.Node},catchedTimes:0,canPulledOut:!1,isCatched:!1},start:function(){this.catAnim=this.catTeaser.getComponent(cc.Animation),this.node.on("touchend",function(t){this.isCatched?this.canPulledOut||this.catAnim.play("Struggle"):this.catAnim.play("Pullup")},this)}}),cc._RF.pop()},{}],CollectiveObjects:[function(t,e,a){"use strict";cc._RF.push(e,"7a84e7FFTZNU4sUwWU1rWkH","CollectiveObjects"),cc.Class({extends:cc.Component,properties:{value:0,canvas:{default:null,type:cc.Node}},onLoad:function(){this.levelManagerControl=this.canvas.getComponent("LevelManager")},start:function(){this.node.on("touchend",function(t){this.levelManagerControl.collectObjects(this.value),this.node.active=!1},this)}}),cc._RF.pop()},{}],Dreams:[function(t,e,a){"use strict";cc._RF.push(e,"d0d97jP445AnbO1+r4jzf3d","Dreams"),cc.Class({extends:cc.Component,properties:{source:"default",pieces:0,keyBlocks:[],unlockedBlocks:[],isUnlocked:!1,imgNode:{default:null,type:cc.Node},imgMask:{default:null,type:cc.Node},catDreamPopup:{default:null,type:cc.Node}},start:function(){this.imgPath="Dream/"+this.source,console.log("Dream"+this.imgPath+"  IsUnLocked "+this.isUnlocked),this.imgMask.active=!this.isUnlocked;var a=this.imgNode.getComponent(cc.Sprite);this.dreamPopUpControl=this.catDreamPopup.getComponent("CatDreamPopup"),cc.loader.loadRes(this.imgPath,cc.SpriteFrame,function(t,e){a.spriteFrame=e}),this.node.on("touchend",function(t){this.openCatDreamPopup()},this)},openCatDreamPopup:function(){this.catDreamPopup.active=!0,this.dreamPopUpControl.loadData(this.source)}}),cc._RF.pop()},{}],FoodContainer:[function(t,e,a){"use strict";cc._RF.push(e,"776c8UwlO9Nq5NP97FJp5kX","FoodContainer"),cc.Class({extends:cc.Component,properties:{bowlType:0,bowlState:0},start:function(){var a=this.node.getComponent(cc.Sprite);this.node.on("touchend",function(t){0==this.bowlState?(0==this.bowlType?cc.loader.loadRes("InteractiveObjecs/full_food_bowl",cc.SpriteFrame,function(t,e){a.spriteFrame=e}):1==this.bowlType&&cc.loader.loadRes("InteractiveObjecs/full_water_bowl",cc.SpriteFrame,function(t,e){a.spriteFrame=e}),this.bowlState=1):1==this.bowlState&&(0==this.bowlType?cc.loader.loadRes("InteractiveObjecs/empty_food_bowl",cc.SpriteFrame,function(t,e){a.spriteFrame=e}):1==this.bowlType&&cc.loader.loadRes("InteractiveObjecs/empty_water_bowl",cc.SpriteFrame,function(t,e){a.spriteFrame=e}),this.bowlState=0)},this)}}),cc._RF.pop()},{}],GlobalInfo:[function(t,e,a){"use strict";cc._RF.push(e,"93ca2tKjypCJrUvPhUYviP0","GlobalInfo"),cc.director.getPhysicsManager().enabled=!0,e.exports={UserName:null,NicknName:null,AvatarURL:null,StoredBackedTime:0,StoredEatingTime:0,StoredDrinkingingTime:0,StoredPlayingTime:0,StoredWatchingTime:0,ActionPoints:0,CatHappiness:6,CatHappinessGoUp:!1,CollectedDream:[]},cc._RF.pop()},{}],HideDreamBlocks:[function(t,e,a){"use strict";cc._RF.push(e,"c7019vdrsVKToJC/qoIlxeW","HideDreamBlocks"),cc.Class({extends:cc.Component,properties:{index:0,parent:{default:null,type:cc.Node}},start:function(){this.node.on("touchend",function(t){1==this.node.active&&this.parent.getComponent("CatDreamPopup").unlockHideBlocks(this.index,this.index)},this)}}),cc._RF.pop()},{}],LevelManager:[function(t,e,a){"use strict";cc._RF.push(e,"16309X6v0dDgbM4Y6yNoRIz","LevelManager");var i,o=t("GlobalInfo");function n(t,e,a,i,o){this.source=t,this.pieces=e,this.keyBlocks=a,this.unlockedBlocks=i,this.isUnLocked=o}i=cc.Enum({IDLE:0,GO_OUT:1,SLEEP:2,MINIGAME:3});var c=[new n("Beach",25,[4,5,6,7,8],[],!1),new n("Batman",25,[4,5,6,7,8],[],!1),new n("BlackCat",25,[4,5,6,7,8],[],!1),new n("CatFish",25,[4,5,6,7,8],[],!1),new n("CloudCat",25,[4,5,6,7,8],[],!1),new n("Dogcat",25,[4,5,6,7,8],[],!1),new n("Fox",25,[4,5,6,7,8],[],!1),new n("Merimaid",25,[4,5,6,7,8],[],!1),new n("Space",25,[4,5,6,7,8],[],!1),new n("TIger",25,[4,5,6,7,8],[],!1)];cc.Class({extends:cc.Component,properties:{cat:{default:null,type:cc.Node},countDownTime:{default:null,type:cc.Node},goOutUI:{default:null,type:cc.Node},goOutBtn:{default:null,type:cc.Node},sleepBtn:{default:null,type:cc.Node},miniGameBtn:{default:null,type:cc.Node},collectiveDreamBubble:{default:null,type:cc.Node},collectiveObject:{default:null,type:cc.Node},catDreamBoxUI:{default:null,type:cc.Node},combosLabelNode:{default:null,type:cc.Node},miniGameScorePopupUI:{default:null,type:cc.Node},minGameRewardedActionPointLabel:{default:null,type:cc.Label},combosLabel:{default:null,type:cc.Label},actionPointLabel:{default:null,type:cc.Label},descriptionDreamBoxLabel:{default:null,type:cc.Label},hiddenDream:{default:null,type:cc.Prefab},catDreamBoxGridLayout:{default:null,type:cc.Node},catDreamPopup:{default:null,type:cc.Node},sunMoonWheel:{default:null,type:cc.Node},currentState:{default:i.IDLE,type:i},tapArea:{default:null,type:cc.Node},catTeaser:{default:null,type:cc.Node},playerWaitingTime:10,catHappiness:0,userData:null,comboCount:0},onLoad:function(){this.catControl=this.cat.getComponent("CatControl"),this.loadGolbalData()},start:function(){this.timeCountDownLabel=this.countDownTime.getComponent(cc.Label),this.goOutUI.active=!1,this.countDownTime.active=!1,this.catDreamPopup.active=!1,this.catDreamBoxUI.active=!1,this.collectiveObject.active=!1,this.collectiveDreamBubble.active=!1,this.tapArea.active=!1,this.catTeaser.active=!1,this.combosLabel.string="",this.combosLabelNode.active=!1,this.miniGameScorePopupUI.active=!1,this.generatedDream=null,this.updateTimeWheelAccordingToRealTime(),this.schedule(function(){this.updateTimeWheelAccordingToRealTime()},240),this.schedule(function(){10==o.CatHappiness?o.CatHappinessGoUp=!1:tglobalData.CatHappiness,o.CatHappinessGoUp?o.CatHappiness<10&&o.CatHappiness++:0<o.CatHappiness&&o.CatHappiness--},3600)},saveGolbalData:function(){0},loadGolbalData:function(){},changeGameStateToSleep:function(){var t=Math.floor(Math.random()*(10-o.CatHappiness));0==o.CatHappiness&&(t=10),5<=o.CatHappiness||t<=1?(this.currentState=i.SLEEP,this.cat.active=!0,this.catControl.goToSleepState(),this.startCountDown(4*this.playerWaitingTime)):(0<o.CatHappiness&&o.CatHappiness--,console.log("I am not happy")),this.catControl.playCatVoiceAccordingToHappinessLevel(o.CatHappiness)},changeGameStateToGoOut:function(){var t=Math.floor(Math.random()*(10-o.CatHappiness));0==o.CatHappiness&&(t=10),5<=o.CatHappiness||t<=1?(this.goOutUI.active=!0,this.currentState=i.GO_OUT,this.cat.active=!1,this.startCountDown(this.playerWaitingTime)):(0<o.CatHappiness&&o.CatHappiness--,console.log("I am not happy")),this.catControl.playCatVoiceAccordingToHappinessLevel(o.CatHappiness)},changeGameStateToMiniGame:function(){this.miniGameBtn.active=!1,this.goOutBtn.active=!1,this.sleepBtn.active=!1,this.tapArea.active=!0,this.catTeaser.active=!0,this.combosLabel.string="",this.combosLabelNode.active=!0,this.cat.active=!0,this.currentState=i.MINIGAME,this.catControl.goToMiniGameState()},changeGameStateToIdle:function(){this.currentState==i.SLEEP?(this.collectiveDreamBubble.active=!0,this.generateRandomDream()):this.currentState==i.GO_OUT?this.collectiveObject.active=!0:this.currentState==i.MINIGAME&&this.onMIniGameFinished(),this.currentState=i.IDLE,this.cat.active=!0,this.tapArea.active=!1,this.catTeaser.active=!1,this.countDownTime.active=!1,this.goOutUI.active=!1,this.combosLabel.string="",this.combosLabelNode.active=!1,this.miniGameBtn.active=!0,this.goOutBtn.active=!0,this.sleepBtn.active=!0,this.catControl.goToIdleState()},autoCollectObjectsAndDream:function(){this.collectiveDreamBubble.active&&(collectiveDreamBubble.active=!1,this.collectObjects(0)),this.collectiveObject.active&&(collectiveObject.active=!1,this.collectObjects(1))},generateRandomDream:function(){this.generatedDream=c[Math.floor(Math.random()*c.length)]},collectObjects:function(t){switch(t){case 0:for(var e=!1,a=o.CollectedDream,i=0;i<a.length;i++)a[i].source==this.generatedDream.source&&(o.ActionPoints+=3,e=!0);e||o.CollectedDream.push(this.generatedDream);break;case 1:default:o.ActionPoints+=t}this.saveGolbalData()},loadAllDreamsFromGolbalData:function(){var i=this;this.actionPointLabel.string=o.ActionPoints,this.catDreamBoxGridLayout.removeAllChildren(),o.CollectedDream.forEach(function(t){var e=cc.instantiate(i.hiddenDream),a=e.getComponent("Dreams");a.source=t.source,a.pieces=t.pieces,a.keyBlocks=t.keyBlocks,a.isUnlocked=t.isUnLocked,a.unlockedBlocks=t.unlockedBlocks,a.catDreamPopup=i.catDreamPopup,e.parent=i.catDreamBoxGridLayout}),console.log("ReLoad All Dream"),this.updateDreamBoXDescription("点击方块解锁梦境")},updateActionPoint:function(){this.actionPointLabel.string=o.ActionPoints},showMiniGameRewardSummary:function(){var t=Math.floor(this.comboCount/15),e=15-this.comboCount%15;this.miniGameScorePopupUI.active=!0,this.minGameRewardedActionPointLabel.string="You Score is "+this.comboCount+" You Earn "+t+" to unlock dreams ! "+e+" more to get next action point",o.ActionPoints+=t,this.updateActionPoint()},hideGameRewardSummary:function(){this.miniGameScorePopupUI.active=!1},updateDreamBoXDescription:function(t){this.descriptionDreamBoxLabel.string=t},addComboPoint:function(){this.comboCount++,this.combosLabel.string="Combos "+this.comboCount},resetComboPoint:function(){this.comboCount=0,this.combosLabel.string="Combos "+this.comboCount},getComboCount:function(){return this.comboCount},openCatDreamBoxUI:function(){this.loadAllDreamsFromGolbalData(),this.catDreamBoxUI.active=!0},closeCatDreamBoxUI:function(){this.catDreamBoxUI.active=!1},closeDreamPopUp:function(){this.loadAllDreamsFromGolbalData(),this.catDreamPopup.active=!1},onMIniGameFinished:function(){o.CatHappiness++},updateTimeWheelAccordingToRealTime:function(){var t=new Date,e=15*-(t.getHours()+t.getMinutes()/60);this.sunMoonWheel.rotation=e},startCountDown:function(t){this.countDownTime.active=!0,this.goOutBtn.active=!1,this.sleepBtn.active=!1,this.miniGameBtn.active=!1,this.tapArea.active=!1,this.catTeaser.active=!1,this.combosLabel.string="",this.combosLabelNode.active=!1;var e=Date.parse(new Date);console.log("Time "+e);var n=1e3*(e/=1e3)+60*t*1e3;o.StoredTime=n,this.callback=function(){var t=(new Date).getTime(),e=n-t,a=Math.floor(e/36e5),i=Math.floor(e%36e5/6e4),o=Math.floor(e%6e4/1e3);this.timeCountDownLabel.string=a+"h "+i+"m"+o+"s",e<=1e3&&(this.changeGameStateToIdle(),this.unschedule(this.callback))},this.schedule(this.callback,1)}}),cc._RF.pop()},{GlobalInfo:"GlobalInfo"}],StartLevel:[function(t,e,a){"use strict";cc._RF.push(e,"87be7kvdeFEhYCBBH7r2mVf","StartLevel");t("GlobalInfo");cc.Class({extends:cc.Component,properties:{},start:function(){},gameStart:function(){this.getUserInfo()},getUserInfo:function(){0}}),cc._RF.pop()},{GlobalInfo:"GlobalInfo"}],UISound:[function(t,e,a){"use strict";cc._RF.push(e,"1a74d8V2HJM45KfMX2y6Tdk","UISound"),cc.Class({extends:cc.Component,properties:{UISounds:[cc.AudioClip]},start:function(){},onBtnClicked:function(){this.current=cc.audioEngine.play(this.UISounds[0],!1,1)}}),cc._RF.pop()},{}]},{},["CatControl","CatDreamPopup","CatTeaser","CollectiveObjects","Dreams","FoodContainer","GlobalInfo","HideDreamBlocks","LevelManager","StartLevel","UISound"]);