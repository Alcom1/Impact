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
	gameState : undefined,
	saveImage : undefined,
	
	GAME_STATE: Object.freeze
	({
		MENU : 0,
		GAME : 1,
		RESULT : 2,
	}),
	
	levelNum: 0,
	meshes: undefined,
	turrets: undefined,
	
	paused : false,
	animationID : 0,
	
	sound : undefined,
	
	testPlayer : undefined,
	isPlayerDead : false,
	lifeSpan : 2.0,
	lifeSpanCounter : 0,
	
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
		
		//Game State
		this.gameState = this.GAME_STATE.MENU;
		
		//Test objects
		this.testPlayer = new Player(
			0, 
			0,
			3,
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
		
	 	//UPDATE-DRAW
		switch(this.gameState)
		{
			case this.GAME_STATE.MENU:
				if(!this.paused)
					this.updateMenu(dt);
				this.drawMenu(dt, this.ctx);
				break;
			case this.GAME_STATE.GAME:
				if(!this.paused)
					this.updateGame(dt);
				this.drawGame(dt, this.ctx);
				break;
			case this.GAME_STATE.RESULT:
				if(!this.paused)
					this.updateResult(dt);
				this.drawResult(dt, this.ctx);
				break;
		}

		//Draw HUD
		if(this.paused)
		{
			this.drawPauseScreen(this.ctx);
			return;
		}
		
		//Draw debug info
		if (this.debug)
		{
			// draw dt in bottom right corner
			this.fillText("dt: " + dt.toFixed(3), 170, 230, "18pt courier", "black");
		}
	},
	
	updateMenu : function(dt)
	{
		
	},
	
	drawMenu : function(dt, ctx)
	{
		ctx.clearRect(-this.WIDTH / 2, -this.HEIGHT / 2, this.WIDTH, this.HEIGHT);
		this.drawBackground(false);
		
		//Text
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		this.fillText(
			"IMPACT",
			0,
			0, 
			"40pt impact",
			"white");
		this.fillText(
			"Click to Continue",
			0,
			50, 
			"20pt courier",
			"white");
	},
	
	updateGame : function(dt)
	{
		this.projectiles.movePlayerProjectiles(dt);
		this.projectiles.movePlayerDebris(dt);
		this.projectiles.tickPlayerFireRate(dt);
		var playerProjectiles = this.projectiles.getPlayerProjectiles();
		for(var i = 0; i < playerProjectiles.length; i++)
		{
			if(playerProjectiles[i].getActive())
			{
				if(playerProjectiles[i].pos.magnitude() > this.HEIGHT / 2)
				{
					playerProjectiles[i].kill();
				}
				
				for(var j = 0; j < this.meshes.length; j++)
				{
					if(this.meshes[j].collapse(this.meshes[j].checkCollision(playerProjectiles[i].getPos().xPos, playerProjectiles[i].getPos().yPos)))
					{
						playerProjectiles[i].kill();
						if(this.checkVictory())
						{
							this.gameState = this.GAME_STATE.RESULT;
						}
					}
				}
			}
		}
		
		for(var i = 0; i < this.meshes.length; i++)
		{		
			if(this.testPlayer.active && this.meshes[i].checkCollision(this.testPlayer.pos.xPos, this.testPlayer.pos.yPos) != -1)
			{
				this.killPlayer();
			}
		}
		
		if(this.testPlayer.active && this.testPlayer.pos.magnitude() > this.HEIGHT / 2)
		{
			this.killPlayer();
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
		this.testPlayer.limitSpeed();
		this.testPlayer.move();
		
		if(this.isPlayerDead)
		{
			this.lifeSpanCounter -= dt;
			if(this.lifeSpanCounter < 0)
			{
				this.lifeSpanCounter = 0;
				this.isPlayerDead = false;
				this.loadLevel();
				this.testPlayer.unKill();
			}
		}
	},
	
	drawGame : function(dt, ctx)
	{
		ctx.clearRect(-this.WIDTH / 2, -this.HEIGHT / 2, this.WIDTH, this.HEIGHT);
		this.drawBackground(false);
		for(var i = 0; i < this.meshes.length; i++)
		{		
			this.meshes[i].draw(this.ctx);
		}
		this.testPlayer.draw(ctx);
		this.projectiles.drawPlayerProjectiles(ctx);
		this.projectiles.drawPlayerDebris(ctx);
		
		//Get data for upcoming result frame.
		if(this.gameState == this.GAME_STATE.RESULT)
		{
			this.saveImage = this.ctx.getImageData(-this.WIDTH / 2, -this.HEIGHT / 2, this.WIDTH * 2, this.HEIGHT * 2);
		}
	},
	
	updateResult : function(dt)
	{
		
	},
	
	drawResult : function(dt, ctx)
	{
		ctx.clearRect(-this.WIDTH / 2, -this.HEIGHT / 2, this.WIDTH, this.HEIGHT);
		
		//Display end of level
		ctx.putImageData(this.saveImage, -this.WIDTH / 2, -this.HEIGHT / 2);
		
		//Blackout
		this.drawBackground(true);
		
		//Text
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		this.fillText(
			"Level Complete",
			0,
			0, 
			"40pt courier",
			"white");
		this.fillText(
			"Click to Continue",
			0,
			50, 
			"32pt courier",
			"white");
	},
	
	doMousedown: function(e)
	{	
		switch(this.gameState)
		{
			case this.GAME_STATE.MENU:
				this.gameState = this.GAME_STATE.GAME;
				this.sound.playBGAudio();
				this.loadLevel();
				break;
			case this.GAME_STATE.GAME:
				var mouse = getMouse(e, this.WIDTH / 2, this.HEIGHT / 2);
				
				if(this.testPlayer.active)
				{
					if(this.projectiles.spawnPlayerProjectile(this.testPlayer.pos, mouse))
					{
						this.sound.playPShootAudio();
					}
				}
				break;
			case this.GAME_STATE.RESULT:
				this.levelNum++;
				this.gameState = this.GAME_STATE.GAME;
				this.loadLevel();
				break;
		}
	},
	
	killPlayer: function()
	{
		this.testPlayer.kill();
		this.projectiles.spawnPlayerDebris(
			this.testPlayer.pos,
			this.testPlayer.vel,
			this.lifeSpan);
		this.isPlayerDead = true;
		this.lifeSpanCounter = this.lifeSpan;
	},
	
	checkVictory : function()
	{
		for(var i = 0; i < this.meshes.length; i++)
		{
			if(!this.meshes[i].getDead())
			{
				return false;
			}
		}
				
		return true;
	},
	
	drawBackground : function(useTrans)
	{
		this.ctx.save();
		
		var lineWidth = 3;
		
		//Black space
		this.ctx.beginPath();
		this.ctx.arc(
			0,
			0,
			this.HEIGHT / 2 - lineWidth / 2,
			0,
			Math.PI * 2);
		if(useTrans)
		{
			this.ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
			this.ctx.strokeStyle = "rgba(0, 0, 0, 0.0)";
		}
		else
		{
			this.ctx.fillStyle = "#000";
			this.ctx.strokeStyle = "#CCC";
		}
		this.ctx.lineWidth = 3;
		this.ctx.fill();
		this.ctx.stroke();
		this.ctx.restore();
	},
	
	drawPauseScreen : function(ctx)
	{
		ctx.save();
		this.drawBackground(false);
		
		ctx.translate(-this.WIDTH / 2, -this.HEIGHT / 2);
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
	
	fillText : function(string, x, y, css, color)
	{
		this.ctx.save();
		// https://developer.mozilla.org/en-US/docs/Web/CSS/font
		this.ctx.font = css;
		this.ctx.fillStyle = color;
		this.ctx.fillText(string, x, y);
		this.ctx.restore();
	},
	
	pauseBGAudio : function()
	{
		this.sound.pauseBGAudio();
	},
	
	resumeBGAudio : function()
	{
		if(this.gameState != this.GAME_STATE.MENU)
			this.sound.playBGAudio();
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
	
	loadLevel : function()
	{
		if(this.levels.check(this.levelNum))
		{
			this.meshes = this.levels.getMeshes(this.levelNum);
			this.turrets = this.levels.getTurrets(this.levelNum);
			
			//Level objects
			for(var i = 0; i < this.meshes.length; i++)
			{
				this.meshes[i].generate();
			}
			
			//Player start
			this.testPlayer.pos = this.levels.getStart(this.levelNum);
			this.testPlayer.vel = new Vect(0, 0, 0);
			
			//Kill projectiles
			this.projectiles.reset();
		}
		else
		{
			this.gameState = this.GAME_STATE.MENU;
			this.levelNum = 0;
			this.sound.stopBGAudio();
		}
	}
}; // end app.main