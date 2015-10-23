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
	this.verticies = [];
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

//Collapse the shape between a vertex at an index and the next vertex.
Shape.prototype.collapse = function(index)
{
	console.log("LOL: " + index);
	this.verticies[index].xPos =
		(this.verticies[index].xPos + 
		this.verticies[(index + 1) % this.getVertexCount()].xPos) / 2;
	
	this.verticies[index].yPos =
		(this.verticies[index].yPos + 
		this.verticies[(index + 1) % this.getVertexCount()].yPos) / 2;
		
	this.verticies.splice((index + 1) % this.getVertexCount(), 1);
}

//Offset shape away from given vector.
Shape.prototype.offsetAway = function(offset)
{
	for(var i = 0; i < this.getVertexCount(); i++)
	{
		this.getVertex(i).sub(offset);
	}
}

