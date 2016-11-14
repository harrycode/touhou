function Bullet(x, y, direction, speed, sprite, bulletclass)
{
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.cos = Math.cos(direction/180 * Math.PI);
    this.sin = Math.sin(direction/180 * Math.PI);
    this.speed = speed;
    this.sprite = sprite;
    this.remove = false;
    engine.setSpriteRotation(this.sprite, direction + 90);

    this.bulletclass = new bulletclass(this)
    this.hitbox = this.bulletclass.hitbox;
    this.kind = this.bulletclass.kind;

}

function HitboxCircle(radius)
{
    this.type = "circle";
    this.radius = radius;
}

var BulletHandler = function(engine)
{
    var bullets = []
    this.bullets = bullets
    this.bulletUpdate = function()

    {
        // console.log(bullets.length);
        for(var i = bullets.length - 1; i >= 0; i--)
        {
            var bullet = bullets[i];
            bullet.bulletclass.update()
            bullet.x += bullet.speed * bullet.cos;
            bullet.y += bullet.speed * bullet.sin;
            engine.setSpritePosition(bullet.sprite, bullet.x, bullet.y);


            var remove = false;
            if(bullet.remove)
            {
                remove = true;
            }

            if(bullet.kind == 0 || bullet.kind == 1)
            {
                if(bullet.y < -200 || bullet.y > 1200 || bullet.x < -200 || bullet.y > 900)
                {
                    remove = true;
                }
            }

            if(bullet.kind == 0)
            {
                var distance = Math.sqrt(Math.pow(engine.player.getX()-bullet.x, 2)+Math.pow(engine.player.getY()-bullet.y,2))
                if(distance < bullet.hitbox.radius + 1)
                {
                    remove = true;
                    if(engine.player.immunityCountDown == 0)
                    {
                        engine.player.health -= 1;
                        engine.player.immunityCountDown = 20;
                        // engine.clearBullets();
                    }

                }
            }
            else if(bullet.kind == 1)
            {
                var distance = Math.sqrt(Math.pow(engine.bosscore.x - bullet.x, 2) + Math.pow(engine.bosscore.y - bullet.y,2))
                if(distance < bullet.hitbox.radius + 30)
                {
                    if(engine.bosscore.health == 0)
                    {
                        console.log("daed ag");
                    }
                    else
                    {
                        engine.bosscore.health -= 1;
                        remove = true;
                    }
                    engine.bosscore.health -= 1;
                    remove = true;
                }
            }

            if(remove)
            {
                engine.removeSprite(bullet.sprite);
                bullets.splice(i, 1);
            }
        }
    }

    this.addBullet = function(bullet)
    {
        bullets.push(bullet);
    }

    this.clearBullets = function()
    {
        for(var i = bullets.length - 1; i >= 0; i--)
        {
            var bullet = bullets[i];
            engine.removeSprite(bullet.sprite);
            bullets.splice(i, 1);
            engine.makeBullet(bullet.x, bullet.y, 270, 22, Score, "images/score.png")
        }
    }
}

function Generic(bullet)
{
    this.hitbox = new HitboxCircle(3);
    this.kind = 0;

    this.setParams = function(hitboxradius)
    {
        this.hitbox = HitboxCircle(hitboxradius);
    }

    this.update = function()
    {
    }
}
