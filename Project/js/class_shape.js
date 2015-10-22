var Shape = function()
{
	this.verticies = [];
}

Shape.prototype.getVertexCount = function()
{
	return this.verticies.length;
}

Shape.prototype.getVertex = function(index)
{
	return this.verticies[index];
}

Shape.prototype.add = function(a, b)
{
	this.verticies.push(new Vect(a, b, 0));
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
	for(var i = 0; i < this.verticies.length; i++)
	{
		ctx.lineTo(this.verticies[i].xPos, this.verticies[i].yPos);
	}
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
}

Shape.prototype.shrink = function(index)
{
	verticies.splice(index, 1);
}

