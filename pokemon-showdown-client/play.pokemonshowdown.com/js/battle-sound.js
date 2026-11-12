"use strict";var

BattleBGM=function(){





















function BattleBGM(url,loopstart,loopend){this.sound=void 0;this.url=void 0;this.timer=undefined;this.loopstart=void 0;this.loopend=void 0;this.isPlaying=false;this.isActuallyPlaying=false;this.willRewind=true;
this.url=url;
this.loopstart=loopstart;
this.loopend=loopend;
}var _proto=BattleBGM.prototype;_proto.
play=function play(){
this.willRewind=true;
this.resume();
};_proto.
resume=function resume(){
this.isPlaying=true;
this.actuallyResume();
};_proto.
pause=function pause(){
this.isPlaying=false;
this.actuallyPause();
BattleBGM.update();
};_proto.
stop=function stop(){
this.pause();
this.willRewind=true;
};_proto.
destroy=function destroy(){
BattleSound.deleteBgm(this);
this.pause();
};_proto.

actuallyResume=function actuallyResume(){var _this=this;
if(this!==BattleSound.currentBgm())return;
if(this.isActuallyPlaying)return;

if(!this.sound)this.sound=BattleSound.getSound(this.url);
if(!this.sound)return;
if(this.willRewind)this.sound.currentTime=0;
this.willRewind=false;
this.isActuallyPlaying=true;
this.sound.volume=BattleSound.bgmVolume/100;
var playPromise=this.sound.play();
if(playPromise&&typeof playPromise["catch"]==='function'){
playPromise["catch"](function(){
_this.isActuallyPlaying=false;
BattleSound.queueUnlock();
});
}
this.updateTime();
};_proto.
actuallyPause=function actuallyPause(){
if(!this.isActuallyPlaying)return;
this.isActuallyPlaying=false;
this.sound.pause();
this.updateTime();
};_proto.



updateTime=function updateTime(){var _this2=this;
clearTimeout(this.timer);
this.timer=undefined;
if(this!==BattleSound.currentBgm())return;
if(!this.sound)return;

var progress=this.sound.currentTime*1000;
if(progress>this.loopend-1000){
this.sound.currentTime-=(this.loopend-this.loopstart)/1000;
}

this.timer=setTimeout(function(){
_this2.updateTime();
},Math.max(this.loopend-progress,1));
};BattleBGM.

update=function update(){
var current=BattleSound.currentBgm();for(var _i2=0,_BattleSound$bgm2=
BattleSound.bgm;_i2<_BattleSound$bgm2.length;_i2++){var bgm=_BattleSound$bgm2[_i2];
if(bgm.isPlaying){
if(bgm===current){
bgm.actuallyResume();
}else{
bgm.actuallyPause();
}
}
}
};return BattleBGM;}();


var BattleSound=new(function(){function _class(){this.
soundCache={};this.

bgm=[];this.


effectVolume=50;this.
bgmVolume=50;this.
muted=false;this.
unlockQueued=false;}var _proto2=_class.prototype;_proto2.

queueUnlock=function queueUnlock(){var _this3=this;
if(this.unlockQueued||typeof window==='undefined')return;
this.unlockQueued=true;
var unlock=function(){
_this3.unlockQueued=false;
window.removeEventListener('pointerdown',unlock,true);
window.removeEventListener('keydown',unlock,true);
BattleBGM.update();
};
window.addEventListener('pointerdown',unlock,true);
window.addEventListener('keydown',unlock,true);
};_proto2.

resolveAudioUrl=function resolveAudioUrl(url){
if(/^https?:\/\//i.test(url))return url;
var routes=Config.routes;
if(routes.audio){
var base=routes.audio.replace(/\/+$/,'');
return base+"/"+url.replace(/^\/+/,'');
}

return"https://play.pokemonshowdown.com/"+url.replace(/^\/+/,'');
};_proto2.

getSound=function getSound(url){
if(!window.HTMLAudioElement)return;
if(this.soundCache[url])return this.soundCache[url];
try{
var sound=document.createElement('audio');
sound.src=this.resolveAudioUrl(url);
sound.volume=this.effectVolume/100;
this.soundCache[url]=sound;
return sound;
}catch(_unused){}
};_proto2.

playEffect=function playEffect(url){
this.playSound(url,this.muted?0:this.effectVolume);
};_proto2.

playSound=function playSound(url,volume){
if(!volume)return;
var effect=this.getSound(url);
if(effect){
effect.volume=volume/100;
var p=effect.play();
if(p&&typeof p["catch"]==='function')p["catch"](function(){});
}
};_proto2.


loadBgm=function loadBgm(url,loopstart,loopend,replaceBGM){
if(replaceBGM){
replaceBGM.stop();
this.deleteBgm(replaceBGM);
}

var bgm=new BattleBGM(url,loopstart,loopend);
this.bgm.push(bgm);
return bgm;
};_proto2.
deleteBgm=function deleteBgm(bgm){
var soundIndex=BattleSound.bgm.indexOf(bgm);
if(soundIndex>=0)BattleSound.bgm.splice(soundIndex,1);
};_proto2.

currentBgm=function currentBgm(){
if(!this.bgmVolume||this.muted)return false;for(var _i4=0,_this$bgm2=
this.bgm;_i4<_this$bgm2.length;_i4++){var bgm=_this$bgm2[_i4];
if(bgm.isPlaying)return bgm;
}
return null;
};_proto2.


setMute=function setMute(muted){
muted=!!muted;
if(this.muted===muted)return;
this.muted=muted;
BattleBGM.update();
};_proto2.

loudnessPercentToAmplitudePercent=function loudnessPercentToAmplitudePercent(loudnessPercent){

var decibels=10*Math.log(loudnessPercent/100)/Math.log(2);
return Math.pow(10,decibels/20)*100;
};_proto2.
setBgmVolume=function setBgmVolume(bgmVolume){
this.bgmVolume=this.loudnessPercentToAmplitudePercent(bgmVolume);
BattleBGM.update();
};_proto2.
setEffectVolume=function setEffectVolume(effectVolume){
this.effectVolume=this.loudnessPercentToAmplitudePercent(effectVolume);
};return _class;}())(
);

if(typeof PS==='object'){
PS.prefs.subscribeAndRun(function(key){
if(!key||key==='musicvolume'||key==='effectvolume'||key==='mute'){
BattleSound.effectVolume=PS.prefs.effectvolume;
BattleSound.bgmVolume=PS.prefs.musicvolume;
BattleSound.muted=PS.prefs.mute;
BattleBGM.update();
}
});
}
//# sourceMappingURL=battle-sound.js.map