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

//Vector subtraction
Vect.prototype.sub = function(vect)
{
	this.xPos -= vect.xPos;
	this.yPos -= vect.yPos;
}

//Vector multiplication
Vect.prototype.mult = function(value)
{
	this.xPos *= value;
	this.yPos *= value;
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

Vect.prototype.magnitude = function()
{
	return Maths.sqrt(a * a + b * b);
}