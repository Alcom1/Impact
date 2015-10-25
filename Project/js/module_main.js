// main.js
// Dependencies: 
// Description: singleton object
// This object will be our main "controller" class and will contain references
// to most of the other objects in the game.

"use strict";

// if app exists use the existing copy
// else create a new object literal
var app = app || {};

/*
 .main is an object literal that is a property of the app global
 This object literal has its own properties and methods (functions)
 
 */
app.main =
{
	//  properties
    WIDTH : 480, 
    HEIGHT : 480,
    canvas : undefined,
    ctx : undefined,
   	lastTime : 0, // used by calculateDeltaTime() 
    debug : true,
	
	paused : false,
	animationID : 0,
	
	testObject : undefined,
	testPlayer : undefined,
	
    // methods
	init : function()
	{
		console.log("app.main.init() called");
		// initialize properties
		this.canvas = document.querySelector('canvas');
		this.canvas.width = this.WIDTH;
		this.canvas.height = this.HEIGHT;
		this.ctx = this.canvas.getContext('2d');
		this.ctx.translate(this.WIDTH / 2, this.HEIGHT / 2);
		
		//Hook up mouse events
		this.canvas.onmousedown = this.doMousedown.bind(this);
		
		//Test object
		this.testObject = new Mesh(
			0, 
			0,
			"#999",
			"#CCC",
			3);
		this.testObject.generate();
		
		this.testPlayer = new Player(
			0, 
			-200,
			"#00F",
			"#AAF",
			3);
		
		// start the game loop
		this.update();
	},
	
	update : function()
	{
		//LOOP
	 	this.animationID = requestAnimationFrame(this.update.bind(this));
	 	
	 	//Calculate Delta Time of frame
	 	var dt = this.calculateDeltaTime();
	 	 
	 	//UPDATE
		this.subUpdate(dt);
		
		//DRAW
		this.draw(dt);
	},
	
	subUpdate : function(dt)
	{
		this.projectiles.movePlayerProjectiles(dt);
		this.projectiles.movePlayerDebris(dt);
		this.projectiles.tickPlayerFireRate(dt);
		var playerProjectiles = this.projectiles.getPlayerProjectiles();
		for(var i = 0; i < playerProjectiles.length; i++)
		{
			if(playerProjectiles[i].getActive())
			{
				if(this.testObject.collapse(this.testObject.checkCollision(playerProjectiles[i].getPos().xPos, playerProjectiles[i].getPos().yPos)))
				{
					playerProjectiles[i].kill();
				}
			}
		}
		
		if(this.testPlayer.active && this.testObject.checkCollision(this.testPlayer.pos.xPos, this.testPlayer.pos.yPos) != -1)
		{
			this.testPlayer.kill();
			this.projectiles.spawnPlayerDebris(
				this.testPlayer.pos,
				this.testPlayer.vel);
		}
		
		if(myKeys.keydown[myKeys.KEYBOARD.KEY_W])
		{
			this.testPlayer.vel.yPos -= 8 * dt;
		}
		if(myKeys.keydown[myKeys.KEYBOARD.KEY_D])
		{
			this.testPlayer.vel.xPos += 8 * dt;
		}
		if(myKeys.keydown[myKeys.KEYBOARD.KEY_S])
		{
			this.testPlayer.vel.yPos += 8 * dt;
		}
		if(myKeys.keydown[myKeys.KEYBOARD.KEY_A])
		{
			this.testPlayer.vel.xPos -= 8 * dt;
		}
		this.testPlayer.move();
	},
	
	draw : function(dt)
	{
		this.ctx.clearRect(-this.WIDTH / 2, -this.HEIGHT / 2, this.WIDTH, this.HEIGHT);
		this.testObject.draw(this.ctx);
		this.testPlayer.draw(this.ctx);
		this.projectiles.drawPlayerProjectiles(this.ctx);
		this.projectiles.drawPlayerDebris(this.ctx);
	
		// 5b) draw HUD
		if(this.paused)
		{
			this.drawPauseScreen(this.ctx);
			return;
		}
		
		// 5c) draw debug info
		if (this.debug)
		{
			// draw dt in bottom right corner
			this.fillText("dt: " + dt.toFixed(3), 100, 230, "18pt courier", "white");
		}
	},
		
	calculateDeltaTime : function()
	{
		// what's with (+ new Date) below?
		// + calls Date.valueOf(), which converts it from an object to a 	
		// primitive (number of milliseconds since January 1, 1970 local time)
		var now,fps;
		now = (+new Date); 
		fps = 1000 / (now - this.lastTime);
		fps = clamp(fps, 12, 60);
		this.lastTime = now; 
		return 1/fps;
	},
	
	fillText : function(string, x, y, css, color)
	{
		this.ctx.save();
		// https://developer.mozilla.org/en-US/docs/Web/CSS/font
		this.ctx.font = css;
		this.ctx.fillStyle = color;
		this.ctx.fillText(string, x, y);
		this.ctx.restore();
	},
	
	doMousedown: function(e)
	{
		var mouse = getMouse(e, this.WIDTH / 2, this.HEIGHT / 2);
		
		if(this.testPlayer.active)
			this.projectiles.spawnPlayerProjectile(this.testPlayer.pos, mouse);
	},
	
	drawPauseScreen : function(ctx)
	{
		ctx.save();
		ctx.translate(-this.WIDTH / 2, -this.HEIGHT / 2);
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT);
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		this.fillText(
			"... PAUSED ...",
			this.WIDTH / 2,
			this.HEIGHT / 2, 
			"40pt courier",
			"white");
		ctx.restore()
	},
}; // end app.main