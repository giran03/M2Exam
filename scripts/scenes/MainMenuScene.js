class MainMenuScene extends Phaser.Scene
{
    constructor() 
    { 
        super('MainMenuScene')

        // MAPS, TILESET, LAYER
        this.terrainMap
        this.terrainTileSet
        
        this.gameScene = 'GameSceneLevel1' // scene to start for play button
    }
    
    create() {
        // INIT
        this.sound.stopAll() // stops all sound if entering this scene

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        // AUDIO
        this.sound.play( 'bgMusic', {
            loop: true,
            volume: .7
        })

        // 🗺️ TILE MAPS, SETS, LAYERS 🗺️
        this.terrainMap = this.make.tilemap({ key: 'terrainMap', tileHeight: 16, tileWidth: 16})
        this.terrainTileSet = this.terrainMap.addTilesetImage('terrainSet', 'terrainTiles')
        this.terrainMap.createLayer('mainMenuBackground', this.terrainTileSet)
        this.terrainMap.createLayer('mainMenuBackgroundTop', this.terrainTileSet)
        this.terrainMap.createLayer('mainMenuBackgroundChar', this.terrainTileSet)

        // PLAYER SPRITE
        this.add.sprite(screenCenterX, screenCenterY*.5, "baeIdle")
        .play('playerIdle', true).setScale(.8).setOrigin(.5).preFX.addGlow(0xff0000, 3)

        // MUTE BUTTON
        this.muteBtn = this.add.sprite(screenCenterX*.15, screenCenterY*.1, 'uiButtonLarge').setOrigin(.5).setInteractive().setScale(2)
        .on('pointerdown', () => { this.sound.mute = !this.sound.mute })
        this.add.text(screenCenterX*.15, screenCenterY*.08, "M U T E " ,{ 
            fill: '#000' , fontSize: '17px', fontStyle: 'italic' , fontFamily: 'impact'
        }).setOrigin(.5)
        
        // ⌨️ CONTROLS INFO ⌨️
        let controlsText = this.add.text(screenCenterX*1.75, screenCenterY*.1, "C O N T R O L S  " ,
        { fill: '#ffe863' , fontSize: '20px', fontFamily: 'stackedPixel'}).setShadow(2, 2, '#000', 5, true, true).setOrigin(.5).setVisible(true)

        let letterW = this.add.sprite(screenCenterX*1.9, screenCenterY*.25, 'letterKeys').setScale(2).setOrigin(.5).setVisible(true)
        letterW.anims.play('animLetterW', true)
        let letterA = this.add.sprite(screenCenterX*1.9, screenCenterY*.4, 'letterKeys').setScale(2).setOrigin(.5).setVisible(true)
        letterA.anims.play('animLetterA', true)
        let letterD = this.add.sprite(screenCenterX*1.9, screenCenterY*.55, 'letterKeys').setScale(2).setOrigin(.5).setVisible(true)
        letterD.anims.play('animLetterD', true)

        let spaceBar = this.add.sprite(screenCenterX*1.66, screenCenterY*.25, 'spaceKey').setScale(1.8).setOrigin(.5).setVisible(true)
        spaceBar.anims.play('animSpacebar', true)
        let arrowUp = this.add.sprite(screenCenterX*1.82, screenCenterY*.25, 'arrowKeys').setScale(2).setOrigin(.5).setVisible(true)
        arrowUp.anims.play('animUp', true)
        let arrowL = this.add.sprite(screenCenterX*1.82, screenCenterY*.4, 'arrowKeys').setScale(2).setOrigin(.5).setVisible(true)
        arrowL.anims.play('animL', true)
        let arrowR = this.add.sprite(screenCenterX*1.82, screenCenterY*.55, 'arrowKeys').setScale(2).setOrigin(.5).setVisible(true)
        arrowR.anims.play('animR', true)

        let spacebarText = this.add.text(screenCenterX*1.47, screenCenterY*.25, "J U M P  " ,
        { fill: '#ffe863' , fontSize: '20px', fontStyle: 'italic' , fontFamily: 'stackedPixel'}).setShadow(2, 2, '#000', 5, true, true).setOrigin(.5).setVisible(true)
        let leftText = this.add.text(screenCenterX*1.7, screenCenterY*.4, "L E F T  " ,
        { fill: '#ffe863' , fontSize: '20px', fontStyle: 'italic' , fontFamily: 'stackedPixel'}).setShadow(2, 2, '#000', 5, true, true).setOrigin(.5).setVisible(true)
        let rightText = this.add.text(screenCenterX*1.7, screenCenterY*.55, "R I G H T  " ,
        { fill: '#ffe863' , fontSize: '20px', fontStyle: 'italic' , fontFamily: 'stackedPixel'}).setShadow(2, 2, '#000', 5, true, true).setOrigin(.5).setVisible(true)

        // 🌀 BUTTONS 🌀
        this.playBtn = this.add.sprite(screenCenterX, screenCenterY - 1000, 'uiButtonLarge').setOrigin(.5).setInteractive().setScale(3)
        let playText = this.add.text(screenCenterX, screenCenterY*1.17, "P L A Y " ,{ 
            fill: '#000' , fontSize: '20px', fontStyle: 'italic' , fontFamily: 'impact'
        }).setOrigin(.5).setVisible(false)
        this.tweens.add({
            targets: this.playBtn,
            x: screenCenterX,
            y: screenCenterY*1.19,
            duration: 1000,
            ease: 'Bounce'
        })

        this.creditsBtn = this.add.sprite(screenCenterX - 1000, screenCenterY*1.41, 'uiButtonLarge').setOrigin(.5).setInteractive().setScale(3)
        let creditsText = this.add.text(screenCenterX, screenCenterY*1.39, "C R E D I T S " ,{ 
            fill: '#000' , fontSize: '20px', fontStyle: 'italic' , fontFamily: 'impact'
        }).setOrigin(.5).setVisible(false)
        this.tweens.add({
            targets: this.creditsBtn,
            x: screenCenterX,
            y: screenCenterY*1.41,
            duration: 1000,
            ease: 'Expo.easeInOut'
        })

        this.quitBtn = this.add.sprite(screenCenterX, screenCenterY + 1000, 'uiButtonLarge').setOrigin(.5).setInteractive().setScale(3)
        let quitText = this.add.text(screenCenterX, screenCenterY*1.6, "Q U I T " ,{ 
            fill: '#000' , fontSize: '20px', fontStyle: 'italic' , fontFamily: 'impact'
        }).setOrigin(.5).setVisible(false)
        this.tweens.add({
            targets: this.quitBtn,
            x: screenCenterX,
            y: screenCenterY*1.62,
            duration: 1000,
            ease: 'Circ.easeInOut'
        })

        // button text revealed after 1.2 seconds
        this.time.addEvent({
            delay: 1200,
            callback:()=>{
                playText.setVisible(true)
                creditsText.setVisible(true)
                quitText.setVisible(true)
 
                controlsText.setVisible(true)
                leftText.setVisible(true)
                letterA.setVisible(true)
                arrowL.setVisible(true)
                rightText.setVisible(true)
                letterD.setVisible(true)
                arrowR.setVisible(true)
                spacebarText.setVisible(true)
                spaceBar.setVisible(true)
            }
        })

        this.playBtn.on("pointerover", ()=>{
            this.playBtn.setTint(0xffb0ab)
            this.playBtn.preFX.addGlow(0xff8b6e, 8)

            this.creditsBtn.preFX.addPixelate(1)
            creditsText.preFX.addPixelate(1)
            this.quitBtn.preFX.addPixelate(1)
            quitText.preFX.addPixelate(1)
        })
        this.playBtn.on("pointerout", ()=>{
            playText.y = screenCenterY*1.17
            this.playBtn.clearTint()
            this.playBtn.preFX.clear()
            
            this.creditsBtn.preFX.clear()
            creditsText.preFX.clear()
            this.quitBtn.preFX.clear()
            quitText.preFX.clear()
        })
        this.playBtn.on("pointerdown", ()=>{
            playText.y += 3
        })
        this.playBtn.on("pointerup", ()=>{
            playText.y -= 3
            this.time.delayedCall(50, () => {
                this.scene.start(this.gameScene)
            })
        })

        this.creditsBtn.on("pointerover", ()=>{
            this.creditsBtn.setTint(0xffb0ab)
            this.creditsBtn.preFX.addGlow(0xff8b6e, 8)

            this.playBtn.preFX.addPixelate(1)
            playText.preFX.addPixelate(1)
            this.quitBtn.preFX.addPixelate(1)
            quitText.preFX.addPixelate(1)
        })
        this.creditsBtn.on("pointerout", ()=>{
            creditsText.y = screenCenterY*1.39
            this.creditsBtn.clearTint()
            this.creditsBtn.preFX.clear()

            this.playBtn.preFX.clear()
            playText.preFX.clear()
            this.quitBtn.preFX.clear()
            quitText.preFX.clear()
        })
        this.creditsBtn.on("pointerdown", ()=>{
            creditsText.y += 3
        })
        this.creditsBtn.on("pointerup", ()=>{
            creditsText.y -= 3
            this.time.delayedCall(50, () => {
                this.scene.start("CreditScene")
            })
        })
        
        this.quitBtn.on("pointerover", ()=>{
            this.quitBtn.setTint(0xffb0ab)
            this.quitBtn.preFX.addGlow(0xff8b6e, 8)

            this.playBtn.preFX.addPixelate(1)
            playText.preFX.addPixelate(1)
            this.creditsBtn.preFX.addPixelate(1)
            creditsText.preFX.addPixelate(1)
        })
        this.quitBtn.on("pointerout", ()=>{
            quitText.y = screenCenterY*1.6
            this.quitBtn.clearTint()
            this.quitBtn.preFX.clear()

            this.playBtn.preFX.clear()
            playText.preFX.clear()
            this.creditsBtn.preFX.clear()
            creditsText.preFX.clear()
        })
        this.quitBtn.on("pointerdown", ()=>{
            quitText.y += 3
        })
        this.quitBtn.on("pointerup", ()=>{
            quitText.y -= 3
            this.time.delayedCall(50, () => {
                this.sound.stopAll()
                alert('Thank you for playing!!!')
                window.location.reload();
            })
        })

    }
}