var config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1400 }
        }
    },
    fps: {
        limit: 120,
        forceSetTimeOut: true
    },
    scene: [PreLoadScene,
            OverlaySceneLevel1,
            OverlaySceneLevel2,
            DungeonRoomOverlay,
            OverlaySceneLevel3,
            MainMenuScene,
            CreditScene,
            GameSceneLevel1,
            GameSceneLevel2,
            DungeonRoomLevel2,
            GameSceneLevel3,
            GameVictoryScene,
            GameOverScene],
    render: {
        pixelArt: true
    }
};

const game = new Phaser.Game(config)