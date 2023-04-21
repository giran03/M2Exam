class GameSceneLevel3 extends Phaser.Scene
{
    constructor() 
    { 
        super('GameSceneLevel3')

        // MAPS, TILESET, LAYER
        this.terrainMap
        this.terrainTileSet
        this.terrainTiles
        this.dangerTiles
        this.statueTile
        this.coinTile
        this.coins

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
        this.ratEight
        this.ratNine
        this.ratTen
        this.ratEleven
        this.ratTwelve
        this.ratThirteen
        this.ratFourteen

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
        this.scene.stop('DungeonRoomOverlay')
        this.scene.stop('GameSceneLevel2')
        this.scene.stop('DungeonRoomLevel2')

        // INIT
        this.sound.resumeAll()
        this.sound.stopByKey('dungeonBGM')
        this.sound.stopByKey('winSFX')
        this.sound.stopByKey('playerHit')
        this.sound.stopByKey('waterSplash')
        const dungeonData = this.scene.get('DungeonRoomLevel2').data.get('score')
        if(dungeonData == null) {
            this.score = this.scene.get('GameSceneLevel2').data.get('score')
            console.log('GETTING THE SCORE FROM GAMESCENE LEVEL 2')
        } else {
            this.score = this.scene.get('DungeonRoomLevel2').data.get('score')
        }
        this.playerHeart = 3
        console.log(`LEVEL 3\nscore: ${this.score }\nhearts: ${this.playerHeart} `)
        this.screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2
        this.screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2

        // AUDIO
        this.coinSFX = this.sound.add('coinSFX')
        this.enemySFX = this.sound.add('enemySFX').setVolume(.8)
        this.playerHit = this.sound.add('playerHit').setVolume(.8)
        this.waterSplash = this.sound.add('waterSplash').setVolume(.8)
        this.sound.play( 'lastBGM', {
            loop: true,
            volume: .7
        })

        // 🗺️ TILE MAPS, SETS, LAYERS 🗺️
        this.terrainMap = this.make.tilemap({ key: 'level3', tileHeight: 16, tileWidth: 16})
        this.terrainTileSet = this.terrainMap.addTilesetImage('terrainSet', 'terrainTiles')

        this.terrainMap.createLayer('backgroundBottom', this.terrainTileSet)
        this.terrainMap.createLayer('backgroundMid', this.terrainTileSet)
        
        this.terrainTiles = this.terrainMap.createLayer('terrainTiles', this.terrainTileSet)
        this.statueTile = this.terrainMap.createLayer('statueTile', this.terrainTileSet)
        this.coinTile = this.terrainMap.createLayer('coinTiles', this.terrainTileSet)
        
        this.terrainMap.createLayer('backgroundTop', this.terrainTileSet)

        // 🫧 PLAYER 🫧
        this.player = this.physics.add.sprite(32, 48, "baeIdle") //DEFAULT: 32, 48
        .setCollideWorldBounds(false).play('playerIdle', true).setScale(.2)
        this.player.preFX.addGlow(0xff0000, 1)

        // 🐀 ENEMY GROUP 🐀
        this.enemyGroup = this.physics.add.group()
        this.ratOne = this.enemyGroup.create(60, 380, 'baelzRat')
        this.enemyMovement(this.ratOne, 155, 3000)
        this.ratTwo = this.enemyGroup.create(626, 188, 'baelzRat').setFlipX(true)
        this.enemyMovement(this.ratTwo, 521, 3000)
        this.ratThree = this.enemyGroup.create(342, 348, 'baelzRat')
        this.enemyMovement(this.ratThree, 434, 3000)
        this.ratFour = this.enemyGroup.create(1325, 92, 'baelzRat').setFlipX(true)
        this.enemyMovement(this.ratFour, 1135, 3000)
        this.ratFive = this.enemyGroup.create(1620, 140, 'baelzRat')
        this.enemyMovement(this.ratFive, 1815, 3000)
        this.ratSix = this.enemyGroup.create(840, 412, 'baelzRat')
        this.enemyMovement(this.ratSix, 1030, 3000)
        this.ratSeven = this.enemyGroup.create(2347, 140, 'baelzRat').setFlipX(true)
        this.enemyMovement(this.ratSeven, 2152, 3000)
        this.ratEight = this.enemyGroup.create(2832, 188, 'baelzRat')
        this.enemyMovement(this.ratEight, 2962, 3000)
        this.ratNine = this.enemyGroup.create(3186, 140, 'baelzRat').setFlipX(true)
        this.enemyMovement(this.ratNine, 3051, 3000)
        this.ratTen = this.enemyGroup.create(3646, 92, 'baelzRat')
        this.enemyMovement(this.ratTen, 3756, 3000)
        this.ratEleven = this.enemyGroup.create(3971, 124, 'baelzRat').setFlipX(true)
        this.enemyMovement(this.ratEleven, 3856, 3000)
        this.ratTwelve = this.enemyGroup.create(3727, 412, 'baelzRat')
        this.enemyMovement(this.ratTwelve, 3987, 3000)
        this.ratThirteen = this.enemyGroup.create(4257, 412, 'baelzRat').setFlipX(true)
        this.enemyMovement(this.ratThirteen, 4037, 3000)
        this.ratFourteen = this.enemyGroup.create(4312, 412, 'baelzRat')
        this.enemyMovement(this.ratFourteen, 4466, 3000)
        
        // set properties of each member
        this.enemyGroup.children.iterate((child)=>{
            child.preFX.addShadow()
            child.setScale(1.4)
            child.anims.play('ratRun',true)
            child.setOrigin(.5)
        })

        // 🗺️🗿 TILE MAP COLLISION DETECTOR 🗿🗺️
        this.terrainTiles.setCollisionByExclusion([-1])
        this.statueTile.setCollisionByExclusion([-1])
        this.coinTile.setCollisionByExclusion([-1])
        this.physics.add.collider(this.player, this.terrainTiles)
        this.physics.add.collider(this.enemyGroup, this.terrainTiles)
        this.physics.add.collider(this.player, this.enemyGroup, this.enemyCollided, null, this)
        this.physics.add.collider(this.player, this.statueTile, this.statueHandler, null, this)
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
        this.scene.launch('OverlaySceneLevel3') 
        this.scene.bringToTop('OverlaySceneLevel3')
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
            if (this.player.x >= 3100) {
                this.player.enableBody(true, 3142, 140, true, true)
            } else if (this.player.x >= 1400 && this.player.x < 3100) {
                this.player.enableBody(true, 1465, 156, true, true)
            } else {
                this.player.enableBody(true, 32, 48, true, true)
            }
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
        this.playerHit.play()
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
    statueHandler(player, door) {
        this.playerWarpAnimation()
        this.time.delayedCall(300, ()=>{
            this.scene.start('GameVictoryScene')
        })
    } 
}