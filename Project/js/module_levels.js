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
		var level0 = {};
		
		//Level 0
		level0.meshes = [];
		level0.meshes.push(new Mesh(
			0, 
			0,
			"#999",
			"#CCC",
			3));
		level0.turrets = []; 
		levels.push(level0);
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
	
	// export a public interface to this module. This needs to be a same-like bracket because a new-line bracket creates a new scope!
	return{
		init : init,
		getMeshes : getMeshes,
		getTurrets : getTurrets, 
	}
}());