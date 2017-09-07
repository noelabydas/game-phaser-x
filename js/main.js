var GameState = {
    init: function() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 1000;
        this.cursors = game.input.keyboard.createCursorKeys();
    },
    preload: function() {
        this.load.image('hello','assets/f1.png');
        this.load.spritesheet('pet','assets/f5.png',100,100,4,0,0);
        //this.load.image('hello1','assets/leaf1.jpeg');
    },
    create: function() {
        //var player = this.add.sprite(0,0,'hello');
        this.player = this.add.sprite(0,0,'hello');
        //this.player = this.add.sprite(0,100,'hello1');
        this.pet=this.add.sprite(300,100,'pet',0);
       // this.pet = this.add.sprite(300,100,'pet',0);
        this.pet.anchor.setTo(0.5);
        this.pet.animations.add('eat',[0,1,2,3],4,true);
        this.pet.animations.play('eat');
        this.player.x = 300;
        this.player.y = 240;
        this.player.anchor.setTo(0.5);
        //this.player.scale.setTo(0.1);
        //player.scale.x = 2;
        //player.angle = 45;
        this.player.rotation = Math.PI/4;
        this.player.inputEnabled = true;
        this.player.input.enableDrag();
        //this.cursors = game.input.keyboard.createCursorKeys();
        //this.player.events.onInputDown.add(this.grow,this);
        this.player.events.onDragStart.add(function(sprite)
        {
            sprite.alpha = 0.3;
        },this);
        this.player.events.onDragStop.add(function(sprite)
        {
            sprite.alpha = 1;
        },this);
        this.game.physics.arcade.enable(this.pet);
        this.game.physics.arcade.enable(this.player);
        this.player.body.allowGravity = false;
        this.player.body.immovable = true;

    },
    grow: function(sprite) {
            sprite.scale.x += 0.5;
            sprite.scale.y += 0.5;
            this.player.scale.x += 0.5;
           this.player.scale.y += 0.5;
    },
    update: function() {
        if(this.cursors.up.isDown && this.pet.body.touching.down) {
            //this.player.y -= 3;
            this.pet.body.velocity.y = -400;
        }
        else if (this.cursors.down.isDown) {
            this.player.y += 3;
        }
        if (this.cursors.left.isDown) {
           // this.player.x -= 3;
            this.player.body.velocity.x = -200;
        }
        else if (this.cursors.right.isDown) {
            //this.player.x += 3;
            this.player.body.velocity.x = 200;
        }
        else
        {
            this.player.body.velocity.x = 0;
        }
        this.game.physics.arcade.collide(this.pet,this.player);
    }

};

var game = new Phaser.Game(1250,700,Phaser.AUTO);

game.state.add('GameState',GameState);

game.state.start('GameState');