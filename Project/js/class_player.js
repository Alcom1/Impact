//Constructor
var Player = function(x, y, colorFill, colorStroke, thickness)
{
	this.pos = new Vect(x, y, 0);
	this.vel = new Vect(0, 0, 0);
	this.colorFill = colorFill;
	this.colorStroke = colorStroke;
	this.thickness = thickness;
}

//Draw player
Player.prototype.draw = function(ctx)
{
	ctx.save();
	ctx.beginPath();
	ctx.arc(
		this.pos.xPos, 
		this.pos.yPos, 
		20, 
		0, 
		Math.PI * 2);
	ctx.fillStyle = this.colorFill;
	ctx.strokeStyle = this.colorStroke;
	ctx.lineWidth = this.thickness;
	ctx.fill();
	ctx.stroke();
	ctx.restore();
}