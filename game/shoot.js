var bulletTime1 = 0;

var bullet_player1_material = new THREE.MeshLambertMaterial(
{
    color: 0x00ff00, 
    transparent: false
});

function shoot()
{
    if (keyboard.pressed("space") && bulletTime1 + 0.8 < clock.getElapsedTime())
    {
        bullet = new THREE.Mesh(
            new THREE.SphereGeometry(2),
            bullet_player1_material);
        scene.add(bullet);
        bullet.position.x = player1.graphic.position.x + 7.5 * Math.cos(player1.direction);
        bullet.position.y = player1.graphic.position.y + 7.5 * Math.sin(player1.direction);
        bullet.angle = player1.direction;
        player1.bullets.push(bullet);
        bulletTime1 = clock.getElapsedTime();
    } 

    // move bullets
    var moveDistance = 5;

    for (var i = 0; i < player1.bullets.length; i++)
    {
        player1.bullets[i].position.x += moveDistance * Math.cos(player1.bullets[i].angle);
        player1.bullets[i].position.y += moveDistance * Math.sin(player1.bullets[i].angle);
    }

}

function collisions()
{
    bullet_collision();
    player_collision();
    player_falling();
}

function bullet_collision()
{
    //collision between bullet and walls
    for (var i = 0; i < player1.bullets.length; i++)
    {
        if (Math.abs(player1.bullets[i].position.x) >= WIDTH / 2 ||
            Math.abs(player1.bullets[i].position.y) >= HEIGHT / 2)
        {
            scene.remove(player1.bullets[i]);
            player1.bullets.splice(i, 1);
            i--;
        }
    }

}

function player_collision()
{
    //collision between player and walls
    var x = player1.graphic.position.x;
    var y = player1.graphic.position.y;

    var minX = -WIDTH / 2;
    var minY = -HEIGHT / 2;

    if (x < minX) {
        player1.graphic.position.x = minX;
    }

    if (y < minY) {
        player1.graphic.position.y = minY;
    } else if (y > -minY) { 
        player1.graphic.position.y = -minY;
    }
}

function player_falling() {
    var nb_tile = 10;
    var sizeOfTileX = WIDTH / nb_tile;
    var sizeOfTileY = HEIGHT / nb_tile;
    var x = player1.graphic.position.x | 0;
    var y = player1.graphic.position.y | 0;

    var playerTileX = Math.floor((x + WIDTH / 2) / sizeOfTileX);
    var playerTileY = Math.floor((y + HEIGHT / 2) / sizeOfTileY);

    for (var i = 0; i < noGround.length; i++) {
        var tileX = Math.floor((noGround[i][0] + WIDTH / 2) / sizeOfTileX);
        var tileY = Math.floor((noGround[i][1] + HEIGHT / 2) / sizeOfTileY);

        if (playerTileX === tileX && playerTileY === tileY) {
            player1.dead(); 
            return; 
        }
    }
}


