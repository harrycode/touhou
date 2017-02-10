function loadBossImages(bossname)
{
    var to_load = [
        "boss.png",
        "spellcircle.png",
        "star_small_yellow.png",
        "star_small_pink.png",
        "star_small_red.png",
        "star_small_green.png",
        "star_small_blue.png",
        "star_big_red.png",
        "star_big_blue.png",
        "donald.png",
        "marisa.png",
        "laser_green.png",
        "laser_red.png",
        "masterspark.png",
    ];

    for(var i = 0; i < to_load.length; i++)
    {
        loader.add("bosses/" + bossname + "/resources/" + to_load[i]);
    }

}
