import Phaser from './lib/phaser.js'
import Title from './scenes/titlescreen.js'
import game from './scenes/game.js'
import GameOver from './scenes/congratulations.js'

import introBonus from './scenes/introBonus.js'
import Bonus from './scenes/bonus.js'

export default new Phaser.Game({
type: Phaser.AUTO,
width: 1400,
height: 900,
backgroundColor: "#8B8B8B",
scene: [
    Title, game,introBonus, 
    Bonus,
    GameOver],
physics: {
        default: 'arcade',
        arcade: {
            gravity: {
            y: 0
            },
            debug: false
        }
    },
scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
},

plugins: {
    scene: [
        { key: 'SpinePlugin', plugin: window.SpinePlugin, mapping: 'spine' }
    ]
}




})