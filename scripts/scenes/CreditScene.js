class CreditScene extends Phaser.Scene
{
    constructor() 
    { 
        super("CreditScene")

        // MAPS, TILESET, LAYER
        this.terrainMap
        this.terrainTileSet
    }

    create() {
        // INIT
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
       
        // 🗺️ TILE MAPS, SETS, LAYERS 🗺️
        this.terrainMap = this.make.tilemap({ key: 'terrainMap', tileHeight: 16, tileWidth: 16})
        this.terrainTileSet = this.terrainMap.addTilesetImage('terrainSet', 'terrainTiles')
        this.terrainMap.createLayer('mainMenuBackground', this.terrainTileSet)
        this.terrainMap.createLayer('mainMenuBackgroundTop', this.terrainTileSet)
        this.terrainMap.createLayer('mainMenuBackgroundChar', this.terrainTileSet)

        // BACK BUTTON
        const backBtn = this.add.sprite(80, 30, 'uiButtonLarge').setOrigin(.5).setScale(2).setInteractive()
        let backText = this.add.text(80, 24, "B A C K " ,{
            fill: '#000' , fontSize: '20px', fontStyle: 'italic' , fontFamily: 'stackedPixel'
        }).setOrigin(.5)

        backBtn.on("pointerover", ()=>{
            backBtn.setTint(0xffb0ab)
            backBtn.preFX.addGlow(0xff8b6e, 3)
        })
        backBtn.on("pointerout", ()=>{
            backText.y = 24
            backBtn.clearTint()
            backBtn.preFX.clear()
        })
        backBtn.on("pointerdown", ()=>{
            backText.y += 3
        })
        backBtn.on("pointerup", ()=>{
            backText.y -= 3
            this.time.delayedCall(50, () => {
                this.scene.start("MainMenuScene")
            })
        })

        // DEVELOPER INFORMATION
        let devInfo = this.add.text(1500, screenCenterY*.75, "Developer: Guillan Fredd T. Parreño\n\nSection: A223\n\nProgram: EMC", {
            fontSize: '25px', fontFamily: 'stackedPixel', align: 'center', fill: '#f7e55e'
        }).setOrigin(.5).setShadow(2, 2, '#000', 5, true, true)
        this.tweens.add({
            targets: devInfo,
            x: screenCenterX,
            y: screenCenterY*.75,
            duration: 1000,
            ease: 'Bounce.easeOut'
        })
        
        // PLAYER SPRITE
        let player = this.add.sprite(-1000, screenCenterY*1.4, "inaIdle").setScale(.8).play('playerRun', true)
        player.preFX.addGlow(0xff0000, 3)
        this.tweens.add({
            targets: player,
            delay: 600,
            x: screenCenterX,
            y: screenCenterY*1.4,
            duration: 1000,
            ease: 'Expo.easeOut'
        })
        this.time.addEvent({
            delay: 2000,
            loop: true,
            callback: ()=>{
                player.play('playerRun', true)
            }
        })
        this.time.addEvent({
            delay: 4000,
            loop: true,
            callback: ()=>{
                player.play('playerIdle', true)
            }
        })
        

    }
}