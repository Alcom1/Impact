var Shape = function()
{
	this.vects = [];
}

Shape.prototype.add = function(a, b)
{
	this.vects.push(new Vect(a, b, 0));
}

