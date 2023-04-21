class PreLoadScene extends Phaser.Scene
{
    constructor() { 
        super('PreLoadScene')
        this.sceneStart = 'MainMenuScene' // ⚠️ CHANGE HERE TO SKIP TO SCENES | DEFAULT: 'MainMenuScene' ⚠️
    }

    preload() {
        // PHASER V3.60.0 IS USED IN THIS PROJECT
        this.sound.pauseOnBlur = false
        // TILE MAPS
        // ATLAS
        this.load.image('terrainTiles', './assets/atlas/terrainSet.png')
        // LEVEL 1
        this.load.tilemapTiledJSON('terrainMap', './assets/maps/level1/terrainMap.json')
        // LEVEL 2
        this.load.tilemapTiledJSON('level2', './assets/maps/level2/secondLevel.json')
        this.load.tilemapTiledJSON('dungeonRoomLevel2', './assets/maps/level2/subLevel.json')
        // LEVEL 3
        this.load.tilemapTiledJSON('level3', './assets/maps/level3/thirdLevel.json')

        // PLAYER
        this.load.spritesheet('baeIdle', './assets/player/Baelz_IdleAnim.png', { frameWidth: 150, frameHeight: 198 })
        this.load.spritesheet('baeRun', './assets/player/Baelz_RunAnim.png', { frameWidth: 162, frameHeight: 198 })
        this.load.spritesheet('baelzRat', './assets/enemy/Baelzrat.png', { frameWidth: 29, frameHeight: 18 })

        // FONTS
        this.loadFont("stackedPixel", "./assets/fonts/stackedPixel.ttf")

        // GUI
        this.load.spritesheet('spaceKey', './assets/gui/SPACE.png', { frameWidth: 67, frameHeight: 16 })
        this.load.spritesheet('letterKeys', './assets/gui/letter_keys.png', { frameWidth: 17, frameHeight: 16 })
        this.load.spritesheet('arrowKeys', './assets/gui/arrow_keys.png', { frameWidth: 17, frameHeight: 16 })
        this.load.spritesheet('uiButtonLarge', './assets/gui/buttonsLarge.png', { frameWidth: 48, frameHeight: 16 })

        // AUDIO
        this.load.audio('bgMusic', './assets/audio/bgm.ogg')
        this.load.audio('dungeonBGM', './assets/audio/dungeonBGM.ogg')
        this.load.audio('lastBGM', './assets/audio/lastBGM.ogg')
        this.load.audio('wooshSFX', './assets/audio/woosh.ogg')
        this.load.audio('winSFX', './assets/audio/victory.ogg')
        this.load.audio('gOverSFX', './assets/audio/defeat.ogg')
        this.load.audio('coinSFX', './assets/audio/coin.ogg')
        this.load.audio('enemySFX', './assets/audio/enemyDefeat.ogg')
        this.load.audio('playerHit', './assets/audio/playerHit.ogg')
        this.load.audio('waterSplash', './assets/audio/waterSplash.ogg')

        this.load.on("progress", (percent)=> { console.log("loading: "+ percent) })

        this.add.text(config.width*.3,config.height*.5,"L O A D I N G . . .", { fontSize: '30px' })
    }

    create() {
        // 🗿 PLAYER ANIMATION 🗿
        this.anims.create({
            key: 'playerIdle',
            frames: this.anims.generateFrameNumbers('baeIdle', { start: 0, end: 3 }),
            frameRate: 6,
            repeat: -1
        })
        this.anims.create({
            key: 'playerRun',
            frames: this.anims.generateFrameNumbers('baeRun', { start: 0, end: 5 }),
            frameRate: 8,
            repeat: -1
        })

        // ENEMY ANIMATION
        this.anims.create({
            key: 'ratRun',
            frames: this.anims.generateFrameNumbers('baelzRat', { start: 0, end: 2 }),
            frameRate: 8,
            repeat: -1
        })

        // BUTTON ANIMATION
        this.anims.create({
            key: 'animUp',
            frames: this.anims.generateFrameNumbers('arrowKeys', { start: 2, end: 3 }),
            frameRate: 2,
            repeat: -1
        })
        this.anims.create({
            key: 'animL',
            frames: this.anims.generateFrameNumbers('arrowKeys', { start: 0, end: 1 }),
            frameRate: 1,
            repeat: -1
        })
        this.anims.create({
            key: 'animR',
            frames: this.anims.generateFrameNumbers('arrowKeys', { start: 4, end: 5 }),
            frameRate: 5,
            repeat: -1
        })

        this.anims.create({
            key: 'animLetterW',
            frames: this.anims.generateFrameNumbers('letterKeys', { start: 0, end: 1 }),
            frameRate: 5,
            repeat: -1
        })
        this.anims.create({
            key: 'animLetterA',
            frames: this.anims.generateFrameNumbers('letterKeys', { start: 2, end: 3 }),
            frameRate: 3,
            repeat: -1
        })
        this.anims.create({
            key: 'animLetterD',
            frames: this.anims.generateFrameNumbers('letterKeys', { start: 4, end: 5 }),
            frameRate: 2,
            repeat: -1
        })

        this.anims.create({
            key: 'animSpacebar',
            frames: this.anims.generateFrameNumbers('spaceKey', { start: 0, end: 1 }),
            frameRate: 4,
            repeat: -1
        })
        console.log('LOADING ASSETS....\nDONE!!!')
        
        this.scene.start(this.sceneStart)
    }

    loadFont(name, url) {
        var newFont = new FontFace(name, `url(${url})`);
        newFont.load().then(function (loaded) {
            document.fonts.add(loaded);
        }).catch(function (error) {
            return error;
        });
    }
}