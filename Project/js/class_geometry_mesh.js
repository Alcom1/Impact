//Constructor
var Mesh = function(x, y, colorFill, colorStroke, thickness, edgeCount, radius)
{
	this.shape = new Shape();
	this.pos = new Vect(x, y, 0);
	this.colorFill = colorFill;
	this.colorStroke = colorStroke;
	this.thickness = thickness;
	this.edgeCount = edgeCount;
	this.radius = radius;
}

Mesh.prototype.get = function()
{
	return new Mesh(
		this.pos.xPos,
		this.pos.yPos,
		this.colorFill,
		this.colorStroke,
		this.thickness,
		this.edgeCount,
		this.radius);
}

//Generate mesh
Mesh.prototype.generate = function()
{
	this.shape.generatePolygon(this.edgeCount, this.radius);
	this.threshold = this.shape.getAverageEdgeLength() * 1.4;
	this.shape.getArea();
}

//Draw mesh
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

//Checks collision based on given x and y position.
Mesh.prototype.checkCollision = function(gx, gy)
{
	//for every abstract triangle based on the mesh center and every shape edge,
    //perform a barycentric comparison with the explicit point. Comparison checks if point is in triangle.
	for(var i = 0; i < this.shape.getVertexCount(); i++)
	{
		var bx = this.shape.getVertex(i).xPos;		//x coor of vertex b
		var by = this.shape.getVertex(i).yPos;		//y coor of vertex b
		var cx = this.shape.getVertex(				//x coor of vertex c
			i + 1 < this.shape.getVertexCount() ?
			i + 1 :
			0).xPos;
		var cy = this.shape.getVertex(				//x coor of vertex c
			i + 1 < this.shape.getVertexCount() ?
			i + 1 :
			0).yPos;
		var px = gx - this.pos.xPos;				//Move px to relative position.
		var py = gy - this.pos.yPos;				//Move py to relative position.
		var div = bx * cy - cx * by;				//Denominator of barycentric formula
		var s = (px * cy - cx * py) / div;			//Barycentric coor s
		var t = (bx * py - px * by) / div;			//Barycentric coor t
		if(s > 0 && t > 0 && s + t < 1)				//Barycentric comparison for collision
		{
			return i;	//Return index representing collided triangle.
		}
	}
	return -1;
}

//Collapses the mesh, reducing an edge to a vertex.
//A vertex is selected. That vertex is moved to the center of the line, and the vertex after it is deleted.
//index == index of the point to be deleted.
//Returns true if collapsing occurred.
Mesh.prototype.collapse = function(index)
{
	//Do nothing if the index is less than zero.
	if(index < 0)
	{
		return false;
	}
	
	//Empty and return if the shape is a triangle before shrinking.
	if(this.shape.getVertexCount() < 4)
	{
		this.shape.generatePolygon(0, 0);
		return true;
	}
	
	//Collapse, recalculate area after collapsing, recalculate center to be at center of mesh, and return true.
	this.shape.collapse(index);
	this.shape.getArea();
	this.recalcCenter();
	this.shape.crater(this.threshold);
	return true;
}

//Recalculates the center of the mesh and repositions the mesh so that the mesh doesn't move.
Mesh.prototype.recalcCenter = function()
{
	var offset = new Vect(0, 0, 0);

	//Calculate the new center of the mesh.
	for(var i = 0; i < this.shape.getVertexCount(); i++)
	{
		offset.add(this.shape.getVertex(i));
	}
	offset.div(this.shape.getVertexCount());
	
	//Move the Mesh center to the new position.
	this.pos.add(offset);

	//Move the geometry so that the mesh doesn't move.
	this.shape.offsetAway(offset);
}

Mesh.prototype.getDead = function()
{
	if(this.shape.getArea() == 0)
	{
		return true;
	}
	
	return false;
}
