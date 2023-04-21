class DungeonRoomLevel2 extends Phaser.Scene
{
    constructor() 
    { 
        super('DungeonRoomLevel2')

        // MAPS, TILESET, LAYER
        this.terrainMap
        this.terrainTileSet
        this.terrainTiles
        this.dangerTiles
        this.doorTile
        this.coinTile
        this.coins

        // PLAYER
        this.player
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
        this.keyS
        this.keyD

        // AUDIO
        this.coinSFX
        this.enemySFX
        this.playerHit
        this.waterSplash

        // MISC
        this.screenCenterX
        this.screenCenterY
    }

    create() {
        this.scene.stop('OverlaySceneLevel2')
        this.scene.stop('GameSceneLevel2')

        // INIT
        this.sound.resumeAll()
        this.sound.stopByKey('winSFX')
        this.sound.stopByKey('playerHit')
        this.sound.stopByKey('waterSplash')
        this.score = this.scene.get('GameSceneLevel2').data.get('score')
        this.playerHeart = 3
        console.log(`LEVEL 2 DUNGEON score: ${this.score }\nhearts: ${this.playerHeart} `)
        this.screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2
        this.screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2

        // AUDIO
        this.coinSFX = this.sound.add('coinSFX')
        this.enemySFX = this.sound.add('enemySFX').setVolume(.8)
        this.playerHit = this.sound.add('playerHit').setVolume(.8)
        this.waterSplash = this.sound.add('waterSplash').setVolume(.8)

        // 🗺️ TILE MAPS, SETS, LAYERS 🗺️
        this.terrainMap = this.make.tilemap({ key: 'dungeonRoomLevel2', tileHeight: 16, tileWidth: 16})
        this.terrainTileSet = this.terrainMap.addTilesetImage('terrainSet', 'terrainTiles')

        this.terrainMap.createLayer('backgroundBottom', this.terrainTileSet)
        this.terrainMap.createLayer('backgroundMid', this.terrainTileSet)
        
        this.terrainTiles = this.terrainMap.createLayer('terrainTiles', this.terrainTileSet)
        // this.dangerTiles = this.terrainMap.createLayer('dangerTiles', this.terrainTileSet)
        this.doorTile = this.terrainMap.createLayer('doorTile', this.terrainTileSet)
        this.coinTile = this.terrainMap.createLayer('coinTiles', this.terrainTileSet)
        
        this.terrainMap.createLayer('backgroundTop', this.terrainTileSet)

        // 🫧 PLAYER 🫧
        this.player = this.physics.add.sprite(2288, 320, "baeIdle") //DEFAULT: 2288, 320
        .setCollideWorldBounds(false).play('playerIdle', true).setScale(.2)
        this.player.preFX.addGlow(0xff0000, 1)

        // 🐀 ENEMY GROUP 🐀
        // this.enemyGroup = this.physics.add.group()
        // this.ratOne = this.enemyGroup.create(498, 435.1, 'baelzRat')
        // this.ratOne.setFlipX(true)
        // this.enemyMovement(this.ratOne, 130, 5000)

        // set properties of each member
        // this.enemyGroup.children.iterate((child)=>{
        //     child.preFX.addShadow()
        //     child.setScale(1.4)
        //     child.anims.play('ratRun',true)
        //     child.setOrigin(.5)
        // })

        // 🗺️🗿 TILE MAP COLLISION DETECTOR 🗿🗺️
        this.terrainTiles.setCollisionByExclusion([-1])
        // this.dangerTiles.setCollisionByExclusion([-1])
        this.doorTile.setCollisionByExclusion([-1])
        this.coinTile.setCollisionByExclusion([-1])
        this.physics.add.collider(this.player, this.terrainTiles)
        // this.physics.add.collider(this.player, this.dangerTiles, this.dangerTilesHandler ,null, this)
        this.physics.add.overlap(this.player, this.doorTile, this.doorHandler, null, this)
        this.physics.add.overlap(this.player, this.coinTile, this.coinCollected, null, this)

        // 📸 CAMERA 📸
        // Set camera bounds
        this.cameras.main.setBounds(0, 0, this.terrainMap.widthInPixels, this.terrainMap.heightInPixels);

        // ⌨️ CONTROL BINDING ⌨️
        this.controls = this.input.keyboard.createCursorKeys()
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)

        this.input.on('pointerdown', ()=> {
            console.log(`PLAYER X POS: ${this.player.x}`)
            console.log(`PLAYER Y POS: ${this.player.y}`)
        })
        
        // Camera Overlay

        this.scene.launch('DungeonRoomOverlay') 
        this.scene.bringToTop('DungeonRoomOverlay')
    }

    update() {
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
            this.coinTile.removeTileAt(coin.x, coin.y)
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
            this.player.enableBody(true, 2288, 320, true, true) // default 2288, 320
        }
    }
    playerDeathAnim() {
        this.playerWarpAnimation()
        this.time.delayedCall(300, ()=>{
            this.playerHeartHandler()
        })
    }
    playerWarpAnimation() {
        this.physics.pause()
        this.player.preFX.addCircle(1)
        this.player.preFX.addGlow(0xff0000, 2)
        this.time.delayedCall(150, ()=>{
            this.player.preFX.addBarrel(4)
        })
        this.time.delayedCall(200, ()=>{
            this.player.disableBody(true,true)
        })
    }
    enemyMovement(target, x, duration) {
        this.tweens.add({ 
            targets: target,
            x: x,
            duration: duration,
            ease: 'linear',
            repeat: -1,
            yoyo: true
        })
        this.time.addEvent({
            delay: duration,
            loop: true,
            callback:()=>{
                if(target.flipX) {
                    target.setFlipX(false)
                this.time.delayedCall(duration,()=>{
                    target.setFlipX(true)
                })
                }
                else {
                    target.setFlipX(true)
                    this.time.delayedCall(duration,()=>{
                        target.setFlipX(false)
                    })
                }
            }
        })
    }
    dangerTilesHandler(player, tiles) {
        if(this.playerHeart <= 0) { this.playerDeathAnim() }
        else {
            this.playerHit.play()
            this.physics.pause()
            this.playerHeart -= 1
            this.playerDeathAnim()
        }
    }
    doorHandler(player, door) {
        if(door.index ===  2739 && this.keyS.isDown || this.controls.down.isDown) {
            this.playerWarpAnimation()
            this.time.delayedCall(300,()=>{
                this.scene.start('GameSceneLevel3')
            })
        }
    }
}