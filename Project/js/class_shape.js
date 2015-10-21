var Shape = function()
{
	this.vects = [];
}

Shape.prototype.add = function(a, b)
{
	this.vects.push(new Vect(a, b, 0));
}

Shape.prototype.generatePolygon = function(edgeCount, radius)
{
	for(var i = 0; i < edgeCount; i++)
	{
		this.add(
			Math.sin(2 * i * Math.PI / edgeCount) * radius,
			Math.cos(2 * i * Math.PI / edgeCount) * radius);
	}
}

Shape.prototype.draw = function(ctx)
{
	ctx.beginPath();
	for(var i = 0; i < this.vects.length; i++)
	{
		ctx.lineTo(this.vects[i].xPos, this.vects[i].yPos);
	}
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
}

Shape.prototype.shrink = function(index)
{
	vects.splice(index, 1);
}

