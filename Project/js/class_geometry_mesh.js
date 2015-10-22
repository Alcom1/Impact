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
	this.calculateArea();
	console.log("Area: " + this.area);
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

Mesh.prototype.checkCollision = function(gx, gy)
{
	for(var i = 0; i < this.shape.getVertexCount(); i++)
	{
		var bx = this.shape.getVertex(i).xPos;
		var by = this.shape.getVertex(i).yPos;
		var cx = this.shape.getVertex(
			i + 1 < this.shape.getVertexCount() ?
			i + 1 :
			0).xPos;
		var cy = this.shape.getVertex(
			i + 1 < this.shape.getVertexCount() ?
			i + 1 :
			0).yPos;
		var px = gx - pos.x;
		var py = gy - pos.y;
		var div = bx * cy - cx * by;
		var u = (px * cy - cx * py) / div;
		var v = (bx * py - px * by) / div;
		if(u > 0 && v > 0 && u + v < 1)
		{
			return i;
		}
	}
	return -1;
}

Mesh.prototype.calculateArea = function()
{
	this.area = 0;
	for(var i = 0; i < this.shape.getVertexCount(); i++)
	{
		this.area += Math.abs(
			this.shape.getVertex(i).cross(
				this.shape.getVertex(
					i + 1 < this.shape.getVertexCount() ?
					i + 1 :
					0)));
	}
}
