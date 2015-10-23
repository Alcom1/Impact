// projectiles.js
"use strict";
// if app exists use the existing copy
// else create a new object literal
var app = app || {};

// define the .projectiles module and immediately invoke it in an IIFE
app.projectiles = (function()
{
	var list = []
	var speed = 60.0;
	var fireRate = .4;
	var lifeTime = 2.0;
	
	function init()
	{
		var pLength = lifeTime / fireRate;
		for(var i = 0; i < pLength; i++)
		{
			list.push(new Projectile(speed));
		}
	}
	
	function spawnProjectile(pos, des)
	{
		for(var i = 0; i < list.length; i++)
		{
			if(!list[i].getActive())
			{
				list[i].spawn(pos, des, lifeTime);
				break;
			}
		}
	}
	
	function drawProjectiles(ctx)
	{
		for(var i = 0; i < list.length; i++)
		{
			if(list[i].getActive())
			{
				list[i].draw(ctx);
			}
		}
	}	
	
	function moveProjectiles(dt)
	{
		for(var i = 0; i < list.length; i++)
		{
			if(list[i].getActive())
			{
				list[i].move(dt);
			}
		}
	}
	
	// export a public interface to this module (Why does this need to be same line bracket?)
	return{
		init : init,
		spawnProjectile : spawnProjectile,
		drawProjectiles : drawProjectiles,
		moveProjectiles : moveProjectiles,
	}
}());