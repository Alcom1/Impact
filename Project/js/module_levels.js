// projectiles.js
"use strict";
// if app exists use the existing copy
// else create a new object literal
var app = app || {};

// define the .projectiles module and immediately invoke it in an IIFE
app.levels = (function()
{
	var levels = [];	//Array of levels
	
	function init()
	{
		
		//Level 0
		var level0 = {};				//New Level
		level0.meshes = [];				//Meshes that display in the level
		level0.meshes.push(new Mesh(
			0, 
			0,
			"#999",
			"#CCC",
			3,
			8,
			100));
		level0.turrets = [];			//Turrets that display in the level
		level0.start = new Vect(0, -200, 0);
		levels.push(level0);
		
		//Level 1
		var level1 = {};
		level1.meshes = [];
		level1.meshes.push(new Mesh(
			0, 
			0,
			"#999",
			"#CCC",
			3,
			12,
			100));
		level1.turrets = []; 
		level1.start = new Vect(0, -200, 0);
		levels.push(level1);
	}
	
	//Returns a copy of the meshes at the level index.
	function getMeshes(index)
	{
		var send = [];	//Copy of meshes to send
		for(var i = 0; i < levels[index].meshes.length; i++)
		{
			send.push(levels[index].meshes[i].get());
		}
		return send;
	}
	
	//Returns a copy of the meshes at the level index.
	function getTurrets(index)
	{
		var send = [];	//Copy of turrets to send.
		for(var i = 0; i < levels[index].turrets.length; i++)
		{
			send.push(levels[index].turrets[i].get());
		}
		return send;
	}
	
	//Returns a copy of the start vector.
	function getStart(index)
	{
		return levels[index].start.get();
	}
	
	//Returns true if the given index is of a valid level.
	function check(index)
	{
		if(index < levels.length)
		{
			return true;
		}
		return false;
	}
	
	// export a public interface to this module. This needs to be a same-like bracket because a new-line bracket creates a new scope!
	return{
		init : init,
		getMeshes : getMeshes,
		getTurrets : getTurrets,
		getStart : getStart,
		check : check,
	}
}());