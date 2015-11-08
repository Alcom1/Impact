// sound.js
"use strict";
// if app exists use the existing copy
// else create a new object literal
var app = app || {};

// define the .sound module and immediately invoke it in an IIFE
app.sound = (function()
{
	console.log("sound.js module loaded");
	var bgAudio = undefined;
	var pShootAudio = undefined;
	var tShootAudio = undefined;
	

	function init()
	{
		bgAudio = document.querySelector("#bgAudio");
		bgAudio.volume=0.25;
		
		pShootAudio = document.querySelector("#pShootAudio");
		pShootAudio.volume = 0.3;
		tShootAudio = document.querySelector("#tShootAudio");
		tShootAudio.volume = 0.3;
	}
	
	function playBGAudio()
	{
		bgAudio.play();
	}
	
	function stopBGAudio()
	{
		bgAudio.pause();
		bgAudio.currentTime = 0;
	}
	
	function pauseBGAudio()
	{
		bgAudio.pause();
	}
	
	function playPShootAudio()
	{
		pShootAudio.pause();
		pShootAudio.currentTime = 0;
		pShootAudio.play();
	}
	
	function playTShootAudio()
	{
		tShootAudio.play();
	}
	
	// export a public interface to this module (Why does this need to be same line bracket?)
	return{
		init : init,
		playBGAudio : playBGAudio,
		stopBGAudio : stopBGAudio,
		pauseBGAudio : pauseBGAudio,
		playPShootAudio : playPShootAudio,
		playTShootAudio : playTShootAudio,
	}
}());