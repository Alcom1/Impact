var Projectile = function(speed)
{
	this.speed = speed;
	this.active = false;
}

Projectile.prototype.spawn = function(pos, des, lifeTime)
{
	this.active = true;
	this.pos = pos;
	this.vel = des.getSub(pos).getNorm().getMult(this.speed);
	this.lifeTime = lifeTime;
}

Projectile.prototype.draw = function(ctx)
{
	ctx.save();
	ctx.beginPath();
	ctx.arc(
		this.pos.xPos, 
		this.pos.yPos, 
		3, 
		0, 
		Math.PI * 2);
	ctx.fillStyle = "#FFA";
	ctx.strokeStyle = "hsla(60, 100%, 50%, .5)"
	ctx.lineWidth = 2;
	ctx.fill();
	ctx.stroke();
	ctx.restore();
}

Projectile.prototype.move = function(dt)
{
	this.pos.add(this.vel.getMult(dt));
	
	this.lifeTime -= dt;
	if(this.lifeTime < 0)
	{
		this.active = false;
	}
}

Projectile.prototype.getPos = function()
{
	return this.pos;
}

Projectile.prototype.getActive = function()
{
	return this.active;
}

Projectile.prototype.kill = function()
{
	this.active = false;
}