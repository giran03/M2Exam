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
    scene: [PreLoadScene,OverlayScene,MainMenuScene,CreditScene,GameScene,GameVictoryScene,GameOverScene],
    render: {
        pixelArt: true
    }
};

const game = new Phaser.Game(config)