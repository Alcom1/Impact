// projectiles.js
"use strict";
// if app exists use the existing copy
// else create a new object literal
var app = app || {};

// define the .projectiles module and immediately invoke it in an IIFE
app.projectiles = (function()
{
	var playerProjectiles = [];
	var pPSpeed = 300.0;
	var pPFireRate = .1;
	var pPFireRateCounter = 0;
	var pPLifeTime = 2.0;
	var pPRadius = 3;
	var pPColorFill = "#FFA";
	var pPColorStroke = "rgba(255, 255, 0, .5)";
	var pPThickness = 2;
	
	var playerDebris = [];
	var pDSpeedMin = 5;
	var pDSpeedRange = 30;
	var pDLength = 20;
	var pDRadius = 4;
	var pDColorFill = "rgba(0, 0, 255, .6)";
	var pDColorStroke = "rgba(170, 170, 255, .4)";
	var pDThickness = 2;
	
	function init()
	{
		var pPLength = Math.ceil(pPLifeTime / pPFireRate);
		for(var i = 0; i < pPLength; i++)
		{
			playerProjectiles.push(new Projectile(pPSpeed));
		}
		for(var i = 0; i < pDLength; i++)
		{
			playerDebris.push(new Projectile(Math.random() * pDSpeedRange + pDSpeedMin));
		}
	}
	
	function getPlayerProjectiles()
	{
		return playerProjectiles;
	}
	
	
	function spawnPlayerProjectile(pos, des)
	{
		if(pPFireRateCounter == 0)
		{
			for(var i = 0; i < playerProjectiles.length; i++)
			{
				if(playerProjectiles[i].spawn(
					new Vect(pos.xPos, pos.yPos, 0), 
					des,
					pPLifeTime,
					pPRadius,
					pPColorFill,
					pPColorStroke,
					pPThickness,
					0))
				{
					pPFireRateCounter = pPFireRate;
					return true;
				}
			}
		}
		
		return false;
	}
	
	function drawPlayerProjectiles(ctx)
	{
		for(var i = 0; i < playerProjectiles.length; i++)
		{
			playerProjectiles[i].draw(ctx);
		}
	}	
	
	function movePlayerProjectiles(dt)
	{
		for(var i = 0; i < playerProjectiles.length; i++)
		{
			playerProjectiles[i].move(dt);
		}
	}
	
	function tickPlayerFireRate(dt)
	{
		pPFireRateCounter -= dt;
		if(pPFireRateCounter < 0)
		{
			pPFireRateCounter = 0;
		}
	}
	
	function spawnPlayerDebris(pos, vel, pDLifeTime)
	{
		for(var i = 0; i < playerDebris.length; i++)
		{
			playerDebris[i].spawn(
				new Vect(pos.xPos, pos.yPos, 0), 
				vel,
				pDLifeTime,
				pDRadius,
				pDColorFill,
				pDColorStroke,
				pDThickness,
				1);
		}
	}
	
	function drawPlayerDebris(ctx)
	{
		for(var i = 0; i < playerDebris.length; i++)
		{
			playerDebris[i].draw(ctx);
		}
	}	
	
	function movePlayerDebris(dt)
	{
		for(var i = 0; i < playerDebris.length; i++)
		{
			playerDebris[i].move(dt);
		}
	}
	
	function reset()
	{
		for(var i = 0; i < playerProjectiles.length; i++)
		{
			playerProjectiles[i].kill();
		}
	}
	
	// export a public interface to this module (Why does this need to be same line bracket?)
	return{
		init : init,
		getPlayerProjectiles : getPlayerProjectiles,
		spawnPlayerProjectile : spawnPlayerProjectile,
		drawPlayerProjectiles : drawPlayerProjectiles,
		movePlayerProjectiles : movePlayerProjectiles,
		tickPlayerFireRate : tickPlayerFireRate,
		spawnPlayerDebris : spawnPlayerDebris,
		drawPlayerDebris : drawPlayerDebris,
		movePlayerDebris : movePlayerDebris,
		reset : reset,
	}
}());