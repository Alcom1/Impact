//Constructor
var Projectile = function(speed)
{
	this.speed = speed;
	this.active = false;
}

//Returns the vector position of this projectile.
Projectile.prototype.getPos = function()
{
	return this.pos;
}

//Returns the active status of this projectile.
Projectile.prototype.getActive = function()
{
	return this.active;
}

//Spawns this projectile with a given position, destination, and lifeTime.
Projectile.prototype.spawn = function(pos, des, lifeTime, radius, colorFill, colorStroke, thickness, choice)
{
	if(!this.active)
	{
		var randomNormVect = new Vect(Math.random() * Math.PI * 2, 1, 1);
		this.active = true;
		this.pos = pos.getAdd(randomNormVect.getMult(5));
		switch(choice)
		{
			case 0:
				this.vel = des.getSub(pos).getNorm().getMult(this.speed);
				break;
			case 1:
				this.vel = des.getMult(10).getAdd(randomNormVect.getMult(this.speed, 1));
				break;
		}
		this.radius = radius;
		this.lifeTime = lifeTime;
		this.colorFill = colorFill;
		this.colorStroke = colorStroke;
		this.thickness = thickness;
		return true;
	}
	return false;
}

//Draw this projectile
Projectile.prototype.draw = function(ctx)
{	
	if(this.active)	//Only draw if active
	{
		ctx.save();
		ctx.beginPath();
		ctx.arc(
			this.pos.xPos, 
			this.pos.yPos, 
			this.radius, 
			0, 
			Math.PI * 2);
		ctx.fillStyle = this.colorFill;
		ctx.strokeStyle = this.colorStroke;
		ctx.lineWidth = this.thickness;
		ctx.fill();
		ctx.stroke();
		ctx.restore();
	}
}

//Move this projectile in the direction of its velocity.
Projectile.prototype.move = function(dt)
{
	if(this.active)	//Only move if active.
	{
		this.pos.add(this.vel.getMult(dt));
		
		this.lifeTime -= dt;
		if(this.lifeTime < 0)
		{
			this.active = false;
		}
	}
}

//Kill this projectile, deactivating it.
Projectile.prototype.kill = function()
{
	this.active = false;
}