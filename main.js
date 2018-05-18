var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
	physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
	backgroundColor: '#ffffff',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
	this.load.image('player','assets/red_block.png');
	this.load.image('black_block','assets/black_block.png');
	this.load.image('battery','assets/battery.png');
}

var player;
var floor;
var batteries;
var score = 0;
var scoreText;

var cursors;

function create ()
{
	cursors = this.input.keyboard.createCursorKeys();
	
	player = this.physics.add.sprite(200,250,'player');
	player.setCollideWorldBounds(true);
	
	//this.add.image(200,250,'player');
	
	floor = this.physics.add.staticGroup();
	floor.create(200, 350, 'black_block');
	
	this.physics.add.collider(player, floor);
	
	batteries = this.physics.add.staticGroup();
	batteries.create(300,350,'battery').setScale(2).refreshBody();
	
	this.physics.add.collider(player, batteries, collectBattery, null, this);
	
	scoreText = this.add.text(16,16,'score: 0',{fontSize: '32px',fill: '#000'});
	
}

function update ()
{
	if (cursors.left.isDown)
	{
		player.setVelocityX(-160);
	}
	else if (cursors.right.isDown)
	{
		player.setVelocityX(160);
	}
	else
	{
		player.setVelocityX(0);
	}

	if (cursors.up.isDown && player.body.touching.down)
	{
		player.setVelocityY(-330);
	}	
}

function collectBattery (player, batteries)
{
    batteries.disableBody(true, true);

    score += 10;
    scoreText.setText('Score: ' + score);
}