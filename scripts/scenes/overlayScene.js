class OverlayScene extends Phaser.Scene
{
    constructor() { 
        super('OverlayScene')
        // UI
        this.scoreText
        this.heartText
        this.fps
    }

    create() {
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2

        // MUTE BUTTON
        this.muteBtn = this.add.sprite(screenCenterX*1.9, screenCenterY*.1, 'uiButtonLarge').setOrigin(.5).setInteractive().setScale(2)
        .on('pointerdown', () => { this.sound.mute = !this.sound.mute })
        this.add.text(screenCenterX*1.9, screenCenterY*.08, "M U T E " ,{ 
            fill: '#000' , fontSize: '17px', fontStyle: 'italic' , fontFamily: 'impact'
        }).setOrigin(.5)

        // RESTART BUTTON
        this.restartBtn = this.add.sprite(screenCenterX*1.7, screenCenterY*.1, 'uiButtonLarge').setOrigin(.5).setInteractive().setScale(2)
        .on('pointerdown', () => { this.scene.start('GameScene') })
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

        this.fps = this.add.text(config.width - 30,50, 'FPS: 0 ', {
            fontSize: '15px', 
            fill: '#ffe863' , 
            fontFamily: 'stackedPixel'
        }).setShadow(2, 2, '#000', 5, true, true).setOrigin(.5)

        // INTRO TEXT
        const introText = this.add.text(-1000, screenCenterY*.4,
            "T I M E  T O  H U N T ‼️",
            { 
                fill: '#fff' , fontSize: '30px', fontFamily: 'stackedPixel'
            }).setOrigin(.5).setShadow(2, 2, '#000', 5, true, true)
        this.tweens.add({
            targets: introText,
            delay: 700,
            x: screenCenterX,
            y: screenCenterY*.4,
            duration: 1000,
            ease: 'Expo.easeInOut'
        })
        this.time.delayedCall(2500,()=>{
            this.tweens.add({
                targets: introText,
                delay: 700,
                x: 1500,
                y: screenCenterY*.4,
                duration: 1000,
                ease: 'Circ.easeInOut'
            })
        })

        this.time.delayedCall(5000,()=>{
            const cloudInfo = this.add.text(-1000, screenCenterY*.4,
                "☁️ SOME CLOUDS IS A PLATFORM ‼️\nWATCH OUT 😶‍🌫️",
                { 
                    fill: '#fff' , fontSize: '30px', fontFamily: 'stackedPixel'
                }).setOrigin(.5).setShadow(2, 2, '#000', 5, true, true)
            this.tweens.add({
                targets: cloudInfo,
                delay: 700,
                x: screenCenterX,
                y: screenCenterY*.4,
                duration: 1000,
                ease: 'Expo.easeInOut'
            })
            this.time.delayedCall(5000,()=>{
                this.tweens.add({
                    targets: cloudInfo,
                    x: 1500,
                    y: screenCenterY*.4,
                    duration: 1000,
                    ease: 'Circ.easeInOut'
                })
            })
        })
        
    }

    update() {
        this.scoreText.setText(`Score: ${this.scene.get('GameScene').data.get('score')} `)
        this.heartText.setText(`Hearts: ${this.scene.get('GameScene').data.get('heart')} `)
        this.fps.setText(`FPS: ${Math.floor(this.game.loop.actualFps)} `)
    }

}