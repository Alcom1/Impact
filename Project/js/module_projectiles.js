// projectiles.js
"use strict";
// if app exists use the existing copy
// else create a new object literal
var app = app || {};

// define the .projectiles module and immediately invoke it in an IIFE
app.projectiles = (function()
{
	var list = []
	var speed = 110.0;
	var fireRate = .1;
	var fireRateCounter = 0;
	var lifeTime = 2.0;
	
	function init()
	{
		var pLength = Math.ceil(lifeTime / fireRate);
		for(var i = 0; i < pLength; i++)
		{
			list.push(new Projectile(speed));
		}
	}
	
	function getList()
	{
		return list;
	}
	
	
	function spawnProjectile(pos, des)
	{
		if(fireRateCounter == 0)
		{
			for(var i = 0; i < list.length; i++)
			{
				if(!list[i].getActive())
				{
					list[i].spawn(new Vect(pos.xPos, pos.yPos, 0), des, lifeTime);
					fireRateCounter = fireRate;
					break;
				}
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
	
	function tickFireRate(dt)
	{
		fireRateCounter -= dt;
		if(fireRateCounter < 0)
		{
			fireRateCounter = 0;
		}
	}
	
	// export a public interface to this module (Why does this need to be same line bracket?)
	return{
		init : init,
		getList : getList,
		spawnProjectile : spawnProjectile,
		drawProjectiles : drawProjectiles,
		moveProjectiles : moveProjectiles,
		tickFireRate : tickFireRate,
	}
}());