// projectiles.js
"use strict";
// if app exists use the existing copy
// else create a new object literal
var app = app || {};

// define the .projectiles module and immediately invoke it in an IIFE
app.levels = (function()
{
	var levels = [];
	
	function init()
	{
		
		//Level 0
		var level0 = {};
		level0.meshes = [];
		level0.meshes.push(new Mesh(
			0, 
			0,
			"#999",
			"#CCC",
			3,
			6,
			100));
		level0.turrets = [];
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
	
	function getMeshes(index)
	{
		var meshes = levels[index].meshes;
		return meshes;
	}
	
	function getTurrets(index)
	{
		var turrets = levels[index].turrets;
		return turrets;
	}
	
	function getStart(index)
	{
		return levels[index].start;
	}
	
	// export a public interface to this module. This needs to be a same-like bracket because a new-line bracket creates a new scope!
	return{
		init : init,
		getMeshes : getMeshes,
		getTurrets : getTurrets,
		getStart : getStart,
	}
}());