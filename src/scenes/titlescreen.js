import Phaser from '../lib/phaser.js'

export default class Title extends Phaser.Scene

{

constructor()
{
super('title')
}


preload()
{

    this.load.atlas(
        'spritesheet-key',
        './src/assets/level_01/spritesheet_vet_key_assets.png',
        './src/assets/level_01/spritesheet_vet_key_assets.json'
      )

      this.load.atlas(
        'spritesheet-diag',
        './src/assets/level_01/spritesheet_vet_diag_treat.png',
        './src/assets/level_01/spritesheet_vet_diag_treat.json'
      )

      this.load.atlas(
        'spritesheet-diag2',
        './src/assets/level_01/spritesheet_vet_diag_treat_big.png',
        './src/assets/level_01/spritesheet_vet_diag_treat_big.json'
      )

      this.load.atlas(
        'spritesheet_bonus',
        './src/assets/bonus/spritesheet_vet_bonus.png',
        './src/assets/bonus/spritesheet_vet_bonus.json'
      )

    
    this.load.image('play', './src/assets/Buttons/play_big_idle.png')
    this.load.image('background', './src/assets/level_01/00_key_assets/bg_01.png')
    this.load.image('backgroundBonus', './src/assets/bonus/bg.png')
    
    this.load.image('dogzoom', './src/assets/level_01/02_treatment/bg_dog_zoom.png')
    this.load.image('catzoom', './src/assets/level_01/02_treatment/bg_cat_zoom.png')
    this.load.image('rabbitzoom', './src/assets/level_01/02_treatment/bg_rabbit_zoom.png')

    this.load.image('target', './src/assets/temp/hitzone.png')
    this.load.image('handHelper', './src/assets/onboarding/onboarding_hand.png')
    this.load.spine("hand","./src/assets/Anim/hand/onboarding_hand.json","./src/assets/Anim/hand/onboarding_hand.atlas")
    this.load.image('playagain', './src/assets/Buttons/playagain.png')


    this.load.image('background', './src/assets/Game/grid-bg.png')
    this.load.audio('correct', './src/assets/Sounds/correct.mp3')
    this.load.audio('incorrect', './src/assets/Sounds/cartoonbubblepop.mp3')
    
    this.load.spine("pw","./src/assets/char/char_pw.json","./src/assets/char/char_pw.atlas")
    this.load.spine("vet","./src/assets/level_01/vet/char_vt.json","./src/assets/level_01/vet/char_vt.atlas")

    this.load.image('continue', './src/assets/Buttons/continue.png')
    this.load.image('close', './src/assets/Buttons/close.png')


    // items 

    this.load.image('table', './src/assets/Items/examination_table.png')
    this.load.image('dockA', './src/assets/Items/items_a_dock.png')
    this.load.image('dockB', './src/assets/Items/items_b_dock.png')

    this.load.image('animal1-sad', './src/assets/animals/level-1_dog_1_unwell.png')
    this.load.image('animal1-xray', './src/assets/animals/x-ray_overlay-dog.png')
    this.load.image('animal1-medium', './src/assets/animals/level-1_dog_1_unwell.png')
    this.load.image('animal1-happy', './src/assets/animals/level-1_dog_2_cured.png')
    this.load.image('animal2-sad', './src/assets/animals/level-2_rabbit_1_unwell.png')
    this.load.image('animal2-xray', './src/assets/animals/x-ray_overlay-rabbit.png')
    this.load.image('animal2-medium', './src/assets/animals/level-2_rabbit_1_unwell.png')
    this.load.image('animal2-happy', './src/assets/animals/level-2_rabbit_2_cured.png')
    this.load.image('animal3-sad', './src/assets/animals/level-3_cat_1_unwell.png')
    this.load.image('animal3-xray', './src/assets/animals/x-ray_overlay-cat.png')
    this.load.image('animal3-medium', './src/assets/animals/level-3_cat_1_unwell.png')
    this.load.image('animal3-happy', './src/assets/animals/level-3_cat_1_cured.png')

    this.load.image('item1-correct', './src/assets/Items/items_a_1.png')
    this.load.image('item1-wrong1', './src/assets/Items/items_a_2.png')
    this.load.image('item1-wrong2', './src/assets/Items/items_a_3.png')
    this.load.image('item2-correct', './src/assets/Items/items_a_2.png')
    this.load.image('item2-wrong1', './src/assets/Items/items_a_1.png')
    this.load.image('item2-wrong2', './src/assets/Items/items_a_3.png')
    this.load.image('item3-correct', './src/assets/Items/items_a_3.png')
    this.load.image('item3-wrong1', './src/assets/Items/items_a_2.png')
    this.load.image('item3-wrong2', './src/assets/Items/items_a_1.png')

    this.load.image('tool1-correct', './src/assets/Items/items_b_1.png')
    this.load.image('tool1-wrong1', './src/assets/Items/items_b_2.png')
    this.load.image('tool1-wrong2', './src/assets/Items/items_b_3.png')
    this.load.image('tool2-correct', './src/assets/Items/items_b_2.png')
    this.load.image('tool2-wrong1', './src/assets/Items/items_b_1.png')
    this.load.image('tool2-wrong2', './src/assets/Items/items_b_3.png')
    this.load.image('tool3-correct', './src/assets/Items/items_b_3.png')
    this.load.image('tool3-wrong1', './src/assets/Items/items_b_1.png')
    this.load.image('tool3-wrong2', './src/assets/Items/items_b_2.png')

    this.load.image('hamster1', './src/assets/bonus_level/hamster_pick-up.png')
    this.load.image('hamster2', './src/assets/bonus_level/hamster_pick-up.png')
    this.load.image('hamster3', './src/assets/bonus_level/hamster_pick-up.png')
    this.load.image('hamster4', './src/assets/bonus_level/hamster_pick-up.png')
    this.load.image('hamster5', './src/assets/bonus_level/hamster_pick-up.png')
    this.load.image('hamster6', './src/assets/bonus_level/hamster_pick-up.png')
    this.load.image('hamster7', './src/assets/bonus_level/hamster_pick-up.png')
    this.load.image('hamster8', './src/assets/bonus_level/hamster_pick-up.png')
    
    this.load.image('barrier1', './src/assets/bonus_level/front_chairs.png')
    this.load.image('barrier2', './src/assets/bonus_level/2_middle_chairs.png')
    this.load.image('barrier3', './src/assets/bonus_level/3_back_chairs.png')
    this.load.image('barrier4', './src/assets/bonus_level/4_table.png')
    this.load.image('barrier5', './src/assets/bonus_level/5_reception-desk.png')
    this.load.image('hamsterhitzone', './src/assets/bonus_level/hamster-cage_hit-target.png')


   
}

create()
{

    this.input.keyboard.on('keydown-SPACE', () => {
		eventsCenter.emit('display-next-level', this)
	})

	this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
		this.input.keyboard.off('keydown-SPACE')
	})

    

    // const width = this.scale.width
    // const height = this.scale.height

    // this.add.image(700, 450, 'background');

    // this.add.text(width * 0.5, height * 0.3, 'VET', {
    // fontSize: 48}).setOrigin(0.5)

    // this.start = this.add.image(width * 0.5, height * 0.7, 'play').setScale(1.5).setInteractive()
    
    // this.start.once('pointerdown', () => {
    //     this.scene.stop()

        this.scene.start('game', {
            level: 0,
            firstLevel: true
        })

        // this.scene.start('bonus')

        // }
        // )

}

}