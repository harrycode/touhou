function Boss(engine)
{
    // coordinates for the boss.

    var core = new BossCore(380, 200, 150);
    this.core = core;

    var state = 0;
    var timer = 0;
    var accel = 0;
    var right;
    var up = 0;
    var image_prefix = "bosses/test2/images/";

    //boss sprite
    var bossSprite;

    //ghetto variables for square

    // called at the very beginning
    this.bossInit = function()
    {
        bossSprite = engine.makeNamedSprite("boss", image_prefix+"boss.png", core.x, core.y, 24)

        // engine.effects.spellcardCircle(core);
    }

    // gets called every update
    this.bossUpdate = function(player)
    {
        // State system! Each state = different behavior from the boss.


        if(state == 0)
        {
        	engine.effects.displayOverlay("images/harambe.png");
            var playerangle = Math.atan2(core.y - player.getY(), core.x - player.getX()) * 180 / Math.PI;
            // make five rounds of yellow leafs
            for(var k = 0; k < 5; k++)
            {
                // make 13 yellow leafs in part of a circle
                for(var i = 0; i < 13; i++)
                {
                    var b = engine.makeBullet(core.x, core.y, -10*i + 60 + 270 + playerangle, 1 + 0.7*(5 - k), Blue, image_prefix+"leaf_blue.png");
                    b.bulletclass.setParams(80 + (5 - k)*40, -90);
                }
            }

            state = 1;
            timer = 0;
        }
        if(state == 1 && timer == 120)
        {
            var playerangle = Math.atan2(core.y - player.getY(), core.x - player.getX()) * 180 / Math.PI;
            // make five rounds of yellow leafs
            for(var k = 0; k < 5; k++)
            {
                // make 13 yellow leafs in part of a circle
                for(var i = 0; i < 13; i++)
                {
                    var b = engine.makeBullet(core.x, core.y, -10*i + 60 + 90 + playerangle, 1 + 0.7*(5 - k), Blue, image_prefix+"leaf_yellow.png");
                    b.bulletclass.setParams(80 + (5 - k)*40, 90);
                }
            }
            state = 2;
            timer = 0;
        }

        if(state == 2 && timer == 150)
        {
        	state = 0;
            timer = 0;
        }


        if((state == 0 || state == 1 || state) == 2 && core.health <= 0)
        {
            engine.clearBullets();
            core.health = 500;
            state = 3;
            console.log("same");
        }

        timer += 1;

    }

}

function Blue(bullet)
{
    this.hitbox = new HitboxCircle(13);
    this.kind = 0;

    var timer = 0;
    var delay;
    var turndir;

    this.setParams = function(delay_in, turndir_in)
    {
        delay = delay_in;
        turndir = turndir_in;
    }

    this.update = function()
    {
        if(timer < delay)
        {
            if(bullet.speed > 0.05)
            {
                bullet.speed -= 0.05;
            }
            else
            {
                bullet.speed = 0;
            }
        }
        else if(timer == delay)
        {
            bullet.speed = 4;
            engine.setBulletDirection(bullet, bullet.direction + turndir);
        }

        timer += 1;
    }
}
