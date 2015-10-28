// projectiles.js
"use strict";
// if app exists use the existing copy
// else create a new object literal
var app = app || {};

// define the .projectiles module and immediately invoke it in an IIFE
app.projectiles = (function()
{
	var level = [];
	
	function init()
	{
		
	}
	
	function getMeshes(index)
	{
		var meshes = level[i].meshes;
		return meshes;
	}
	
	function getTurrets(index)
	{
		var turrets = level[i].turrets;
		return turrets;
	}
	
	// export a public interface to this module. This needs to be a same-like bracket because a new-line bracket creates a new scope!
	return{
		init : init,
		getMeshes : getMeshes,
		getTurrets : getTurrets
	}
}());