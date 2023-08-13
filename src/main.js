import Phaser from './lib/phaser.js'
import Title from './scenes/titlescreen.js'

import GameOver from './scenes/congratulations.js'

import UIScene from './scenes/ui.js'
import backtomenu from './scenes/backtomenu.js'
import preloader from './scenes/preloader.js'
import music from './scenes/music.js'
import pause from './scenes/pause.js'
import introBonus from './scenes/introBonus.js'
import Bonus from './scenes/bonus.js'
import level1 from './scenes/level1.js'

export default new Phaser.Game({
type: Phaser.AUTO,
width: 1400,
height: 900,
backgroundColor: "#8B8B8B",
scene: [
    Title, preloader, music,  
    level1,
    introBonus, Bonus,
    pause, UIScene, backtomenu, GameOver],
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