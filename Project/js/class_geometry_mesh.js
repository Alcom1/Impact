var Mesh = function(x, y, colorFill, colorStroke, thickness)
{
	this.area = 0;
	this.shape = new Shape();
	this.pos = new Vect(x, y, 0);
	this.colorFill = colorFill;
	this.colorStroke = colorStroke;
	this.thickness = thickness;
}

Mesh.prototype.generate = function()
{
	this.shape.generatePolygon(12, 100);
}

Mesh.prototype.draw = function(ctx)
{
	ctx.save();
	ctx.fillStyle = this.colorFill;
	ctx.strokeStyle = this.colorStroke;
	ctx.lineWidth = this.thickness;
	ctx.translate(this.pos.xPos, this.pos.yPos);
	this.shape.draw(ctx);
	ctx.restore();
}
