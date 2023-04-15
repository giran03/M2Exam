class GameScene extends Phaser.Scene
{
    constructor() 
    { 
        super('GameScene')

        // MAPS, TILESET, LAYER
        this.terrainMap
        this.terrainTileSet
        this.tileLayerTop
        this.tileLayerTop2
        this.coins
        this.winStatue

        // PLAYER
        this.player
        this.playerLasPosX
        this.playerLasPosY
        this.playerHeart

        // ENEMY
        this.enemyGroup
        this.ratOne
        this.ratTwo
        this.ratThree
        this.ratFour
        this.ratFive
        this.ratSix
        this.ratSeven

        // SCORE
        this.score

        // CONTROLS
        this.controls
        this.keyW
        this.keyA
        this.keyD

        // AUDIO
        this.coinSFX
        this.enemySFX
        this.playerHit
        this.waterSplash
    }

    create() {
        // INIT
        this.sound.resumeAll()
        this.sound.stopByKey('winSFX')
        this.sound.stopByKey('playerHit')
        this.sound.stopByKey('waterSplash')
        this.score = 0
        this.playerHeart = 3

        // AUDIO
        this.coinSFX = this.sound.add('coinSFX')
        this.coinSFX.setVolume(1)
        this.enemySFX = this.sound.add('enemySFX')
        this.enemySFX.setVolume(1)
        this.playerHit = this.sound.add('playerHit')
        this.playerHit.setVolume(1)
        this.waterSplash = this.sound.add('waterSplash')
        this.waterSplash.setVolume(1)

        // get the center of the screen
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2

        // 🗺️ TILE MAPS, SETS, LAYERS 🗺️
        this.terrainMap = this.make.tilemap({ key: 'terrainMap', tileHeight: 16, tileWidth: 16})
        this.terrainTileSet = this.terrainMap.addTilesetImage('terrainSet', 'terrainTiles')
        this.terrainMap.createLayer('background', this.terrainTileSet)
        this.tileLayerTop = this.terrainMap.createLayer('terrainLayer', this.terrainTileSet)
        this.tileLayerTop2 = this.terrainMap.createLayer('terrainTop', this.terrainTileSet)
        this.winStatue = this.terrainMap.createLayer('winStatue', this.terrainTileSet)
        this.coins = this.terrainMap.createLayer('coin', this.terrainTileSet)
        this.terrainMap.createLayer('decorations', this.terrainTileSet)        

        // 🫧 PLAYER 🫧
        this.player = this.physics.add.sprite(50, screenCenterY * 1.5, "baeIdle") //DEFAULT: 50, screenCenterY * 1.5 || 3453, 188
        .setCollideWorldBounds(false).play('playerIdle', true).setScale(.2)
        this.player.preFX.addGlow(0xff0000, 1)

        // 🐀 ENEMY GROUP 🐀
        this.enemyGroup = this.physics.add.group()
        this.ratOne = this.enemyGroup.create(498, 435.1, 'baelzRat')
        this.ratTwo = this.enemyGroup.create(740, 435.1, 'baelzRat')
        this.ratThree = this.enemyGroup.create(1208, 188, 'baelzRat')
        this.ratFour = this.enemyGroup.create(1600, 435.1, 'baelzRat')
        this.ratFive = this.enemyGroup.create(1150, 435.1, 'baelzRat')
        this.ratSix = this.enemyGroup.create(3493, 76, 'baelzRat')
        this.ratSeven = this.enemyGroup.create(3808, 252, 'baelzRat')
        // TWEEN ANIMATION FOR THE RATS
        this.tweens.add({ 
            targets: this.ratOne,
            x: 130,
            ease: 'linear',
            duration: 5000,
            repeat: -1,
            yoyo: true
        })
        this.tweens.add({ 
            targets: this.ratTwo,
            x: 850,
            ease: 'linear',
            duration: 3000,
            repeat: -1,
            yoyo: true
        })
        this.tweens.add({ 
            targets: this.ratThree,
            x: 1043,
            ease: 'linear',
            duration: 3000,
            repeat: -1,
            yoyo: true
        })
        this.tweens.add({ 
            targets: this.ratFour,
            x: 1910,
            ease: 'linear',
            duration: 3000,
            repeat: -1,
            yoyo: true
        })
        this.tweens.add({ 
            targets: this.ratFive,
            x: 1390,
            ease: 'linear',
            duration: 4000,
            repeat: -1,
            yoyo: true
        })
        this.tweens.add({ 
            targets: this.ratSix,
            x: 3608,
            ease: 'linear',
            duration: 2000,
            repeat: -1,
            yoyo: true
        })
        this.tweens.add({ 
            targets: this.ratSeven,
            x: 3933,
            ease: 'linear',
            duration: 1500,
            repeat: -1,
            yoyo: true
        })
        // set properties of each member
        this.enemyGroup.children.iterate((child)=>{
            child.preFX.addShadow()
            child.setScale(1.4)
            child.anims.play('ratRun',true)
            child.setOrigin(.5)
        })

        

        // 🗺️🗿 TILE MAP COLLISION DETECTOR 🗿🗺️
        this.tileLayerTop.setCollisionByExclusion([-1])
        this.tileLayerTop2.setCollisionByExclusion([-1])
        this.winStatue.setCollisionByExclusion([-1])
        this.coins.setCollisionByExclusion([-1])
        this.physics.add.collider(this.player, this.winStatue, ()=>{
            this.time.delayedCall(100, ()=>{
                this.scene.start('GameVictoryScene')
            })
        })
        this.physics.add.collider(this.player, this.tileLayerTop)
        this.physics.add.collider(this.player, this.tileLayerTop2)
        this.physics.add.collider(this.enemyGroup, this.tileLayerTop)
        this.physics.add.collider(this.enemyGroup, this.tileLayerTop2)
        this.physics.add.overlap(this.player, this.coins, this.coinCollected, null , this)
        this.physics.add.collider(this.player, this.enemyGroup, this.enemyCollided, null, this)

        // 📸 CAMERA 📸
        // Set camera bounds
        this.cameras.main.setBounds(0, 0, this.terrainMap.widthInPixels, this.terrainMap.heightInPixels);

        // ⌨️ CONTROL BINDING ⌨️
        this.controls = this.input.keyboard.createCursorKeys()
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)

        this.input.on('pointerdown', ()=> {
            console.log(`PLAYER X POS: ${this.player.x}`)
            console.log(`PLAYER Y POS: ${this.player.y}`)
        })
        
        let overlay = this.terrainMap.createLayer('overlay', this.terrainTileSet)
        overlay.alpha = .25

        this.scene.launch('OverlayScene') 
        this.scene.bringToTop('OverlayScene')
    }

    update() {
        if(this.cameras.x <= 0) {this.cameras.main.stopFollow() }
        this.cameras.main.startFollow(this.player, true)

        this.playerControls()
        this.playerBounds()
        this.data.set('score', this.score)
        this.data.set('heart', this.playerHeart)
    }
  
    // ========================================================= 🌀 FUNCTIONS 🌀 =========================================================
    playerControls() {
        // ⌨️ PLAYER CONTROLS ⌨️
        if (this.controls.right.isUp && this.controls.left.isUp && this.keyA.isUp && this.keyD.isUp ) {
            this.player.setVelocityX(0)
            this.player.anims.play('playerIdle', true)
        } 
        if (this.controls.left.isDown || this.keyA.isDown) {
            this.player.setVelocityX(-300).setFlipX(true)
            this.player.anims.play('playerRun', true)
            this.playerEmitter()
        }
        else if (this.controls.right.isDown || this.keyD.isDown) {
            this.player.setVelocityX(300).setFlipX(false)
            this.player.anims.play('playerRun', true)
            this.playerEmitter()
        }
        if (this.controls.up.isDown && this.player.body.blocked.down || this.keyW.isDown && this.player.body.blocked.down || this.controls.space.isDown && this.player.body.blocked.down) { 
            this.player.setVelocityY(-580)
            this.playerEmitter()
        }
    }
    playerEmitter() {
        this.player.depth = 10
        let emitter = this.add.particles(0,0, 'baeRun', {
            follow: this.player,
            scale: .2,
            lifespan: { min: 20, max: 50 },
            angle: { min: 180, max: 180 },
            speed: 50,
            blendMode: 'MULTIPLY'
        })
        this.time.delayedCall(50, () => { emitter.stop() }, null, this)
    }
    playerBounds() {
        if (this.playerHeart <= 0) { this.playerHeartHandler() } 
        else {
            if (this.player.y >= config.height + 50) {
                this.waterSplash.play()
                this.playerHeartHandler()
                this.playerHeart -= 1
            }
        }
    }
    coinCollected(player, coin) {
        if (coin.index == 1310) {
            this.coinSFX.play()
            this.score += 3
            this.coins.removeTileAt(coin.x, coin.y)
        }
    }
    enemyCollided(player, enemy) {
        if(this.playerHeart <= 0) { this.playerDeathAnim() }
        else {
            if(player.body.touching.down && enemy.body.touching.up) {
                this.enemySFX.play()
                this.enemyGroup.remove(enemy, true, true)   // Remove the member/child from the group and the world
                enemy.destroy()                             // Destroy the member/child to free up memory
            } else {
                this.playerHit.play()
                this.physics.pause()
                this.playerHeart -= 1
                this.playerDeathAnim()
                console.log('ENEMY COLLISSION')
            }

        }
    }
    playerHeartHandler() {
        if (this.playerHeart <= 0) {
            this.playerDeathAnim()
            this.time.delayedCall(200, ()=>{
                this.scene.start('GameOverScene')
            })
        } else {
            this.physics.resume()
            this.player.preFX.clear()
            this.player.preFX.addGlow(0xff0000, 1)
            if (this.player.x >= 2670) {
                this.player.enableBody(true, 2826, 230, true, true)
            }
            else if (this.player.x >= 1900 && this.player.x < 2670) {
                this.player.enableBody(true, 2045, 315, true, true)
            }
            else if (this.player.x < 1900  && this.player.x >= 580) {
                this.player.enableBody(true, 581, 150, true, true)
            } else {
                this.player.enableBody(true, 50, 360, true, true)
            }
            
        }
    }
    playerDeathAnim() {
        this.physics.pause()
        this.player.preFX.addCircle(1)
        this.player.preFX.addGlow(0xff0000, 2)
        this.time.delayedCall(150, ()=>{
            this.player.preFX.addBarrel(4)
        })
        this.time.delayedCall(200, ()=>{
            this.player.disableBody(true,true)
        })
        this.time.delayedCall(300, ()=>{
            this.playerHeartHandler()
        })
    }
}