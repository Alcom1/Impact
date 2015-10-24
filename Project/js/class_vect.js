//Vector constructor
//Choice 0 takes x and y
//Choice 1 takes angle and magnitude
var Vect = function(a, b, choice)
{
	switch(choice)
	{
		case 0:
			this.xPos = a;
			this.yPos = b;
			break;
		case 1: 
			this.xPos = Math.sin(a) * b;
			this.yPos = Math.cos(a) * b;
			break;
	}
}

//Vector addition
Vect.prototype.add = function(vect)
{
	this.xPos += vect.xPos;
	this.yPos += vect.yPos;
}

//Vect get addition result
Vect.prototype.getAdd = function(vect)
{
	return new Vect(
		this.xPos + vect.xPos,
		this.yPos + vect.yPos,
		0);
}

//Vector subtraction
Vect.prototype.sub = function(vect)
{
	this.xPos -= vect.xPos;
	this.yPos -= vect.yPos;
}

//Vect get subtraction result
Vect.prototype.getSub = function(vect)
{
	return new Vect(
		this.xPos - vect.xPos,
		this.yPos - vect.yPos,
		0);
}

//Vector multiplication
Vect.prototype.mult = function(value)
{
	this.xPos *= value;
	this.yPos *= value;
}

//Vect get multiplication result
Vect.prototype.getMult = function(value)
{
	return new Vect(
		this.xPos * value,
		this.yPos * value, 
		0);
}

//Vector division
Vect.prototype.div = function(value)
{
	this.xPos /= value;
	this.yPos /= value;
}

//Vect get division result
Vect.prototype.getDiv = function(value)
{
	return new Vect(
		this.xPos / value,
		this.yPos / value, 
		0);
}

//Return dot product with another vector
Vect.prototype.dot = function(value)
{
	return this.xPos * value.xPos + this.yPos * value.yPos;
}

//Return cross product with another vector
Vect.prototype.cross = function(value)
{
	return this.xPos * value.yPos - this.yPos * value.xPos;
}

//Vector normalization
Vect.prototype.norm = function()
{
	var length = Math.sqrt(
		this.xPos * this.xPos + 
		this.yPos * this.yPos);
	this.xPos /= length;
	this.yPos /= length;
}

//Vector get normalization result
Vect.prototype.getNorm = function()
{
	var length = Math.sqrt(
		this.xPos * this.xPos + 
		this.yPos * this.yPos);
	return new Vect(
		this.xPos / length,
		this.yPos / length,
		0);
}

Vect.prototype.magnitude = function()
{
	return Math.sqrt(this.xPos * this.xPos + this.yPos * this.yPos);
}