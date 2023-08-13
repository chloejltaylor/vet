import Phaser from '../lib/phaser.js'
export default class GameOver extends Phaser.Scene

{
constructor()
{
super('game-over')
}

preload()
{
    this.load.image('playagain', './src/assets/Buttons/playagain.png')
    this.load.image('background', './src/assets/Game/grid-bg.png')
}

create()
{
    const width = this.scale.width
    const height = this.scale.height


    this.add.image(700, 450, 'background');

    this.add.text(width * 0.5, height * 0.3, 'You Win!!', {
    fontSize: 48}).setOrigin(0.5)

    this.input.keyboard.once('keydown-SPACE', () => {this.scene.start('bonus')})

    const play = this.add.image(width * 0.5, height * 0.7, 'playagain').setInteractive()

    play.once('pointerdown', () => {this.scene.start('bonus')});

    // this.input.keyboard.once('keydown-SPACE', () => {this.scene.start('level1ff')})

    // const playagain = this.add.image(width * 0.5, height * 0.7, 'playagain').setScale(0.2).setInteractive()

    // playagain.once('pointerdown', () => {this.scene.start('bonus')});

}

}