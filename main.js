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

var batt;			//battery capacity
var battTimer;		//idle batrery timer

var moving;
var walkTimerStart;
var walkTimerEnd;
var battWalkTimer;	//counter for running power consumption
var battText;

var cursors;

function create ()
{
	batt = 100;
	
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
	
	battText = this.add.text(500,16,'Battery: ' + batt,{fontSize: '32px',fill: '#000'});
	
	setInterval(batteryDrain, 2000);
	//clearInterval(batteryDrain); //how to stop this if need be later
	
}

function update ()
{
	
	//console.log(player.body.velocity.x);
	
	if (cursors.left.isDown)
	{
		player.setVelocityX(-160);
		moving = true;
	}
	else if (cursors.right.isDown)
	{
		player.setVelocityX(160);
		moving = true;
	}
	else
	{
		player.setVelocityX(0);
		moving = false;
	}

	if (cursors.up.isDown && player.body.touching.down)
	{
		player.setVelocityY(-330);
		moving = true;
	}	
	
	if(cursors.left.isDown || cursors.right.isDown){
		//use this shit https://www.w3schools.com/jsref/jsref_obj_date.asp
	}
	
	if (battWalkTimer == 1000){
		batteryDrain();
		battWalkTimer == 0;
	}
	
}

function resetWalkTimers(){
		walkTimerStart = 0;
		walkTimerEnd   = 0;
}

function batteryDrain(){
	batt -= 1;
	battText.setText('Battery: ' + batt);
}

function collectBattery (player, batteries)
{
    batteries.disableBody(true, true);

    score += 10;
    scoreText.setText('Score: ' + score);
	
	batt += 20;
	battText.setText('Battery: ' + batt);
}