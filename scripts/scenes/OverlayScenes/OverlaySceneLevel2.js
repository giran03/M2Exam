class OverlaySceneLevel2 extends Phaser.Scene
{
    constructor() { 
        super('OverlaySceneLevel2')
        // UI
        this.scoreText
        this.heartText
        this.fps

        // AUDIO
        this.wooshSFX

        this.GameScene = 'GameSceneLevel2'
    }
    create() {
        // INIT
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2

        // AUDIO
        this.wooshSFX = this.sound.add('wooshSFX')

        // MUTE BUTTON
        this.muteBtn = this.add.sprite(screenCenterX*1.9, screenCenterY*.1, 'uiButtonLarge').setOrigin(.5).setInteractive().setScale(2)
        .on('pointerdown', () => { this.sound.mute = !this.sound.mute })
        this.add.text(screenCenterX*1.9, screenCenterY*.08, "M U T E " ,{ 
            fill: '#000' , fontSize: '17px', fontStyle: 'italic' , fontFamily: 'impact'
        }).setOrigin(.5)

        // RESTART BUTTON
        this.restartBtn = this.add.sprite(screenCenterX*1.7, screenCenterY*.1, 'uiButtonLarge').setOrigin(.5).setInteractive().setScale(2)
        .on('pointerdown', () => { this.scene.stop(this.GameScene); this.scene.start('GameSceneLevel1') })
        this.add.text(screenCenterX*1.7, screenCenterY*.08, "R E S T A R T " ,{ 
            fill: '#000' , fontSize: '15px', fontStyle: 'italic' , fontFamily: 'impact'
        }).setOrigin(.5)

        //UI
        this.scoreText = this.add.text(screenCenterX*.15, screenCenterY*.05, 'Score: 0 ', {
            fontSize: '20px', 
            fill: '#ffe863' , 
            fontFamily: 'stackedPixel'
        }).setShadow(2, 2, '#000', 5, true, true).setOrigin(.5)

        this.heartText = this.add.text(screenCenterX*.35, screenCenterY*.05, 'Hearts: 3 ', {
            fontSize: '20px', 
            fill: '#ffe863' , 
            fontFamily: 'stackedPixel'
        }).setShadow(2, 2, '#000', 5, true, true).setOrigin(.5)

        const levelText = this.add.text(screenCenterX*.55, screenCenterY*.05, 'Level: 2 ', {
            fontSize: '20px', 
            fill: '#ffe863' , 
            fontFamily: 'stackedPixel'
        }).setShadow(2, 2, '#000', 5, true, true).setOrigin(.5)

        this.fps = this.add.text(config.width - 30,50, 'FPS: 0 ', {
            fontSize: '15px', 
            fill: '#ffe863' , 
            fontFamily: 'stackedPixel'
        }).setShadow(2, 2, '#000', 5, true, true).setOrigin(.5)

        // INTRO TEXT
        const introText = this.add.text(-1000, screenCenterY*.4,
            "W E L C O M E  T O\nTHE\nD U N G E O N ‼️",
            { 
                fill: '#ff8b6e' , fontSize: '30px', fontFamily: 'stackedPixel', align: 'center'
            }).setOrigin(.5).setShadow(2, 2, '#000', 5, true, true)
        this.tweens.add({
            targets: introText,
            delay: 700,
            x: screenCenterX,
            y: screenCenterY*.4,
            duration: 1000,
            ease: 'Expo.easeInOut'
        })
        this.time.delayedCall(3000,()=>{
            this.tweens.add({
                targets: introText,
                delay: 700,
                x: 1500,
                y: screenCenterY*.4,
                duration: 1000,
                ease: 'Circ.easeInOut'
            })
        })

        this.time.delayedCall(3500,()=>{
            const doorInfo = this.add.text(-1000, screenCenterY*.4,
                "F I N D  T H E  C L O S E D  D O O R!!!\nT H E R E ' S  A  T R E A S U R E\nW A I T I N G  I N S I D E",
                { 
                    fill: '#ff8b6e' , fontSize: '20px', fontFamily: 'stackedPixel', align: 'center'
                }).setOrigin(.5).setShadow(2, 2, '#000', 5, true, true)
            this.tweens.add({
                targets: doorInfo,
                delay: 700,
                x: screenCenterX,
                y: screenCenterY*.4,
                duration: 1000,
                ease: 'Expo.easeInOut'
            })
            this.time.delayedCall(8000,()=>{
                this.tweens.add({
                    targets: doorInfo,
                    x: 1500,
                    y: screenCenterY*.4,
                    duration: 1000,
                    ease: 'Circ.easeInOut'
                })
            })
        })

        // TEXT INFO SFX
        this.time.delayedCall(1000,()=>{
            this.wooshSFX.play()
            this.time.delayedCall(2800,()=>{
                this.wooshSFX.play()
                this.time.delayedCall(700,()=>{
                    this.wooshSFX.play()
                    this.time.delayedCall(7000,()=>{
                        this.wooshSFX.play()
                    })
                })
            })
        })
        
        if (this.scene.isActive('mySceneKey')) {
            console.log()
        }
    }

    update() {
        this.updateOverlay(this.GameScene)
    }

    updateOverlay(scene) {
        this.scoreText.setText(`Score: ${this.scene.get(scene).data.get('score')} `)
        this.heartText.setText(`Hearts: ${this.scene.get(scene).data.get('heart')} `)
        this.fps.setText(`FPS: ${Math.floor(this.game.loop.actualFps)} `)
    }
}