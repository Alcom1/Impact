//Constructor
var Player = function(x, y, maxSpeed, colorFill, colorStroke, thickness)
{
	this.pos = new Vect(x, y, 0);
	this.vel = new Vect(0, 0, 0);
	this.maxSpeed = maxSpeed;
	this.colorFill = colorFill;
	this.colorStroke = colorStroke;
	this.thickness = thickness;
	this.active = true;				//Drawing and moving occurs while player is active.
}

//Draw player
Player.prototype.draw = function(ctx)
{
	if(this.active)
	{
		ctx.save();
		ctx.beginPath();
		ctx.arc(
			this.pos.xPos, 
			this.pos.yPos, 
			12, 
			0, 
			Math.PI * 2);
		ctx.fillStyle = this.colorFill;
		ctx.strokeStyle = this.colorStroke;
		ctx.lineWidth = this.thickness;
		ctx.fill();
		ctx.stroke();
		ctx.restore();
	}
}

//Offset
Player.prototype.move = function()
{
	if(this.active)
	{
		this.pos.add(this.vel);
	}
}

//Limits the velocity magnitude to the maxSpeed of the player.
Player.prototype.limitSpeed = function()
{
	if(this.vel.magnitude() > this.maxSpeed)
	{
		this.vel = this.vel.getNorm().getMult(this.maxSpeed);
	}
}

//Kills the player.
Player.prototype.kill = function()
{
	this.active = false;
}

//Reactivates the player.
Player.prototype.unKill = function()
{
	this.active = true;
}