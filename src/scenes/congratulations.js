import Phaser from '../lib/phaser.js'
export default class GameOver extends Phaser.Scene

{
constructor()
{
super('congratulations')
}

init(){
}

create()
{
    const width = this.scale.width
    const height = this.scale.height



    this.add.image(700, 450, 'background');
    this.add.text(width * 0.5, height * 0.5, "Well done!", {fontSize: 48}).setOrigin(0.5)



    const playagain = this.add.image(width * 0.5, height * 0.7, 'playagain').setInteractive()

    playagain.once('pointerdown', () => {


        this.scene.stop()

        // this.scene.start('bonus')

        this.scene.start('game', {
            level: 0,
            firstLevel: true
        })
    
    })

}

}