class GameVictoryScene extends Phaser.Scene
{
    constructor() 
    { 
        super('GameVictoryScene')
        // MAPS, TILESET, LAYER
        this.terrainMap
        this.terrainTileSet

        this.GameScene = 'GameSceneLevel3'
    }

    create() {
        // AUDIO
        this.scene.stop('DungeonRoomLevel2')
        this.scene.stop('OverlaySceneLevel1')
        this.scene.stop('OverlaySceneLevel2')
        this.scene.stop('OverlaySceneLevel3')
        this.sound.pauseAll()
        this.sound.play('winSFX',{ volume: .8 })
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        // 🗺️ TILE MAPS, SETS, LAYERS 🗺️
        this.terrainMap = this.make.tilemap({ key: 'terrainMap', tileHeight: 16, tileWidth: 16})
        this.terrainTileSet = this.terrainMap.addTilesetImage('terrainSet', 'terrainTiles')
        this.terrainMap.createLayer('mainMenuBackground', this.terrainTileSet)
        this.terrainMap.createLayer('mainMenuBackgroundTop', this.terrainTileSet)
        this.terrainMap.createLayer('mainMenuBackgroundChar', this.terrainTileSet)

        // VICTORY TEXT
        const winningText = ['Y A T T A !', 'H O O O R A Y !', 'C O N G R A T S !', 'Y O U  W I N !'];
        let gameOverText = this.add.text(- 1000, screenCenterY*.4, `${winningText[Phaser.Math.Between(0,3)]}`, {
            fontSize: '80px', fontFamily: 'stackedPixel', fill: '#ffe863'
        }).setOrigin(0.5).setShadow(2, 2, '#000', 10, true, true)
        this.tweens.add({
            targets: gameOverText,
            x: screenCenterX,
            y: screenCenterY*.4,
            duration: 1000,
            ease: 'Bounce'
        })

        // PLAYER SPRITE
        const player = this.add.sprite(-100, screenCenterY*.9, "baeIdle")
        .play('playerRun', true).setScale(.8).setOrigin(.5)
        player.preFX.addGlow(0xff0000, 3)
        this.tweens.add({
            targets: player,
            x: screenCenterX*.7,
            y: screenCenterY*.9,
            duration: 2000,
            ease: 'Circ.easeOut'
        })
        player.depth = 10
        let emitter = this.add.particles(0,0, 'baeRun', {
            follow: player,
            scale: .8,
            lifespan: { min: 40, max: 200 },
            angle: { min: 180, max: 180 },
            speed: 100,
            blendMode: 'MULTIPLY'
        })
        this.time.delayedCall(1650, () => { emitter.stop() }, null, this)
        this.time.addEvent({
            delay: 1800,
            callback: ()=>{
                player.anims.play('playerIdle', true)
            }
        })

        // GAME PLAYER SCORE TEXT
        const playerScore = this.add.text(2000, screenCenterY*.73,
            `Score: ${this.scene.get(this.GameScene).data.get('score')}  `,
            { 
                fill: '#fff' , fontSize: '30px', fontFamily: 'stackedPixel'
            }).setOrigin(.5).setShadow(2, 2, '#000', 5, true, true)
        this.tweens.add({
            targets: playerScore,
            delay: 500,
            x: screenCenterX*1.1,
            y: screenCenterY*.73,
            duration: 1000,
            ease: 'Bounce.easeInOut'
        })
        const playerHearts = this.add.text(2000, screenCenterY*.9,
            `Heart: ${this.scene.get(this.GameScene).data.get('heart')}  `,
            { 
                fill: '#fff' , fontSize: '30px', fontFamily: 'stackedPixel'
            }).setOrigin(.5).setShadow(2, 2, '#000', 5, true, true)
        this.tweens.add({
            targets: playerHearts,
            delay: 700,
            x: screenCenterX*1.1,
            y: screenCenterY*.9,
            duration: 1000,
            ease: 'Bounce.easeInOut'
        })

        // RESTART BUTTON
        const restartBtn = this.add.sprite(-1000, screenCenterY*1.4, 'uiButtonLarge').setOrigin(.5).setInteractive().setScale(3).setInteractive()
        let restartText = this.add.text(screenCenterX*.85, screenCenterY*1.37, "R E S T A R T " ,{ 
            fill: '#000' , fontSize: '20px', fontStyle: 'italic' , fontFamily: 'impact'
        }).setOrigin(.5).setVisible(false)
        this.tweens.add({
            targets: restartBtn,
            x: screenCenterX*.85,
            y: screenCenterY*1.4,
            duration: 1000,
            ease: 'Bounce'
        })
        restartBtn.on("pointerover", ()=>{
            restartBtn.setTint(0xffb0ab)
            restartBtn.preFX.addGlow(0xff8b6e, 8)

        })
        restartBtn.on("pointerout", ()=>{
            restartText.y = screenCenterY*1.37
            restartBtn.clearTint()
            restartBtn.preFX.clear()
           
        })
        restartBtn.on("pointerdown", ()=>{
            restartText.y += 3
        })
        restartBtn.on("pointerup", ()=>{
            restartText.y -= 3
            this.time.delayedCall(50, () => {
                this.scene.start('GameSceneLevel1')
            })
        })

        // MENU BUTTON
        const menuBtn = this.add.sprite(1500, screenCenterY*1.4, 'uiButtonLarge').setOrigin(.5).setInteractive().setScale(3).setInteractive()
        let menuText = this.add.text(screenCenterX*1.15, screenCenterY*1.37, "M A I N  M E N U " ,{ 
            fill: '#000' , fontSize: '19px', fontStyle: 'italic' , fontFamily: 'impact'
        }).setOrigin(.5).setVisible(false)
        this.tweens.add({
            targets: menuBtn,
            x: screenCenterX*1.15,
            y: screenCenterY*1.4,
            duration: 1000,
            ease: 'Bounce'
        })
        menuBtn.on("pointerover", ()=>{
            menuBtn.setTint(0xffb0ab)
            menuBtn.preFX.addGlow(0xff8b6e, 8)

        })
        menuBtn.on("pointerout", ()=>{
            menuText.y = screenCenterY*1.37
            menuBtn.clearTint()
            menuBtn.preFX.clear()
           
        })
        menuBtn.on("pointerdown", ()=>{
            menuText.y += 3
        })
        menuBtn.on("pointerup", ()=>{
            menuText.y -= 3
            this.time.delayedCall(50, () => {
                this.scene.start("MainMenuScene")
            })
        })

        this.time.addEvent({
            delay: 1200,
            callback: ()=>{
                menuText.setVisible(true)
                restartText.setVisible(true)
            }
        })
    }
}