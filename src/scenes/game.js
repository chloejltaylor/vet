import Phaser from '../lib/phaser.js'


export default class game extends Phaser.Scene
{
    constructor() 
    {
    super('game')
    }

    background

    dropZoneAnimal
    dropZoneTweezers
    dropZoneFleas
    dropZoneBandage

    onboardingtime = 0

    // Starting positions of the draggables
    startItem1X = 500
    startItem1Y = 800
    startItem2X = 700
    startItem2Y = 800
    startItem3X = 900
    startItem3Y = 800

    icon1
    icon2
    icon3
    tool1
    tool2
    tool3
    
    vet
    table
    thorn

    animalsSadArray = ['dog_01.png', 'cat_01.png', 'rabbit_01.png']
    animalsXrayArray = ['diagnostic_xray_dog.png', 'diagnostic_xray_cat.png', 'diagnostic_xray_rabbit.png']
    animalsMagArray = ['diagnostic_mag_glass_dog.png', 'diagnostic_mag_glass_cat.png', 'diagnostic_mag_glass_rabbit.png']
    animalsMediumArray = ['dog_01.png', 'diagnostic_xray_cat.png', 'rabbit_02.png']
    animalsHappyArray = ['dog_02.png', 'cat_02.png', 'rabbit_03.png']
    diagnosisArray = ['mag', 'xray', 'exam']
    treatArray = ['flea', 'bandage', 'tweezers']
    iconArray = ['icon_diagnostic_examine.png', 'icon_diagnostic_xray.png','icon_diagnostic_mag_glass.png']
    toolsArray = ['icon_treatment_flea.png', 'icon_treatment_bandage.png','icon_treatment_tweezers.png']
    backgroundArray = ['dogzoom', 'catzoom', 'rabbitzoom']

    tick
    hex1
    hex2
    circle1
    circle2
    circle3
    circle4
    hexBig
    circleBig1
    circleBig2
    circleBigBandage
    circleBigFleas
    circleBigTweezers

    bandage1
    bandage2
    bandage3

    animalState = 'justArrived'
    currentAnimalX = 700
    currentAnimalY = 350
    animalNumber
    animalX =700
    animalY = 350
    onboardingItem

    charanims


    init(data){
        this.parcelNum = 0
        this.animalState = 'justArrived'
        // this.animalNumber=2
        this.animalNumber = data.level
        this.firstLevel = data.firstLevel
        this.onboardingtime = 0
    }

    create()
    {



        this.tick = this.add.image(1000, 350, 'spritesheet-key', 'indicator_tick.png').setDepth(5).setAlpha(0)
        this.circle1 = this.add.image(860, 550, 'spritesheet-key', 'indicator_circle.png').setDepth(5).setAlpha(0)
        this.circle2 = this.add.image(600, 150, 'spritesheet-key', 'indicator_circle.png').setDepth(5).setAlpha(0)
        this.circle3 = this.add.image(730, 350, 'spritesheet-key', 'indicator_circle.png').setDepth(5).setAlpha(0)
        this.circle4 = this.add.image(600, 550, 'spritesheet-key', 'indicator_circle.png').setDepth(5).setAlpha(0)
        this.circleBig1 = this.add.image(800, 400, 'spritesheet-key', 'indicator_circle_big.png').setDepth(5).setAlpha(0)
        this.circleBig2 = this.add.image(650, 450, 'spritesheet-key', 'indicator_circle_big.png').setDepth(5).setAlpha(0)
        this.circleBigFleas = this.add.image(800, 400, 'spritesheet-key', 'indicator_circle_big.png').setDepth(5).setAlpha(0)
        this.circleBigBandage = this.add.image(650, 450, 'spritesheet-key', 'indicator_circle_big.png').setDepth(5).setAlpha(0)
        this.circleBigTweezers = this.add.image(720, 380, 'spritesheet-key', 'indicator_circle_big.png').setDepth(5).setAlpha(0)

        
        this.bandage1 = this.add.image(700, 370, 'spritesheet-diag', 'treatment_bandage_01.png').setDepth(5).setAlpha(0)
        this.bandage2 = this.add.image(700, 370, 'spritesheet-diag', 'treatment_bandage_02.png').setDepth(5).setAlpha(0)
        this.bandage3 = this.add.image(700, 370, 'spritesheet-diag', 'treatment_bandage_03.png').setDepth(5).setAlpha(0)
        this.hex1 = this.add.image(720, 340, 'spritesheet-key', 'indicator_hex_big.png').setDepth(5).setAlpha(0)
        this.hex2 = this.add.image(630, 550, 'spritesheet-key', 'indicator_hex.png').setDepth(5).setAlpha(0)
        this.thorn = this.add.image(735, 335, 'spritesheet-diag', 'treatment_thorn.png').setDepth(5).setAlpha(0)


            
        // start the onboarding animation 
        if(this.firstLevel){
            this.onboardingtime = 5500
            this.onboardingTimer = this.time.delayedCall(800, this.onboardingAnim, [], this)
        }


        //Position static images
        this.background = this.add.image(700, 450, 'background')
        this.vet = this.add.spine(1100, 650, 'vet').setScale(4,4)
        this.vet.setInteractive()
        this.charanims = this.vet.getAnimationList()
        this.table = this.add.image(700, 750, 'spritesheet-key', 'table.png')
        

        this.dock = this.add.image(700, 800,  'spritesheet-key', 'dock.png')
        this.animal = this.add.image(this.animalX,this.animalY, 'spritesheet-key', this.animalsSadArray[this.animalNumber])
        this.animal.correctDiagnostic = this.diagnosisArray[this.animalNumber]
        this.animal.correctTool= this.treatArray[this.animalNumber]
        this.animal.beingXrayed = false


        this.dropZoneAnimal = new Phaser.Geom.Rectangle(
            this.animal.x - this.animal.displayWidth / 2,
            this.animal.y - this.animal.displayHeight / 2,
            this.animal.displayWidth,
            this.animal.displayHeight
            )

        this.dropZoneFleas = new Phaser.Geom.Rectangle(
            this.circleBigFleas.x - this.circleBigFleas.displayWidth / 2,
            this.circleBigFleas.y - this.circleBigFleas.displayHeight / 2,
            this.circleBigFleas.displayWidth,
            this.circleBigFleas.displayHeight
            )
        
        this.dropZoneTweezers = new Phaser.Geom.Rectangle(
            this.circleBig2.x - this.circleBig2.displayWidth / 2,
            this.circleBig2.y - this.circleBig2.displayHeight / 2,
            this.circleBig2.displayWidth,
            this.circleBig2.displayHeight
            )
    
        this.dropZoneBandage = new Phaser.Geom.Rectangle(
            this.circleBigBandage.x - this.circleBigBandage.displayWidth / 2,
            this.circleBigBandage.y - this.circleBigBandage.displayHeight / 2,
            this.circleBigBandage.displayWidth,
            this.circleBigBandage.displayHeight
            )


    
            
        // When the draggable is being dragged...

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            let x = gameObject.x = dragX
            let y = gameObject.y = dragY

            if(gameObject.equipment=='exam'){
                gameObject.setTexture('spritesheet-diag', 'diagnostic_examine.png')
                    if(this.scene.animalNumber==0){
                        this.scene.appearCircle(this.scene.circle1)
                        this.scene.appearCircle(this.scene.circle2)
                    } else if(this.scene.animalNumber==1){
                        this.scene.appearCircle(this.scene.circle3)
                        this.scene.appearCircle(this.scene.circle4)
                    } else if(this.scene.animalNumber==2){
                        this.scene.appearCircle(this.scene.circle1)
                        this.scene.appearCircle(this.scene.circle2)
                        this.scene.appearCircle(this.scene.circle3)
                        this.scene.appearCircle(this.scene.circle4)
                    } 

            }
            if(gameObject.equipment=='xray'){
                gameObject.setTexture('spritesheet-diag2', 'diagnostic_xray_screen.png')
                this.scene.xrayAnimal()
            }
            if(gameObject.equipment=='mag'){
                gameObject.setScale(2)
            }
            if(gameObject.tool=='flea'){
                gameObject.setTexture('spritesheet-diag', 'treatment_flea_hand.png')
                if(this.scene.animalNumber==0){
                    console.log("show circle")
                    this.scene.appearCircle(this.scene.circleBigFleas
                 )}
            }
            if(gameObject.tool=='tweezers'){
                if(this.scene.animalNumber==2){
                this.scene.appearCircle(this.scene.circleBigTweezers)
                }
                gameObject.setTexture('spritesheet-diag', 'treatment_tweezers.png')
            }
            if(gameObject.tool=='bandage'){
                if(this.scene.animalNumber==1){
                    this.scene.appearCircle(this.scene.circleBigBandage)
                }
                gameObject.setTexture('spritesheet-diag', 'treatment_bandage_hand_01.png').setAngle(45)
            }



        })

        // When the draggable is being released...

        this.input.on('dragend', (pointer, gameObject) => {

        this.setCircleDropZones()

      // DEFINE DROP ZONES

          
        const inDropZoneAnimal = Phaser.Geom.Intersects.RectangleToRectangle(
            gameObject.getBounds(),
            this.dropZoneAnimal
        )

        const inDropZoneTweezers = Phaser.Geom.Intersects.RectangleToRectangle(
            gameObject.getBounds(),
            this.dropZoneTweezers
        )

        const inDropZoneFleas = Phaser.Geom.Intersects.RectangleToRectangle(
            gameObject.getBounds(),
            this.dropZoneFleas
        )

        const inDropZoneBandage = Phaser.Geom.Intersects.RectangleToRectangle(
            gameObject.getBounds(),
            this.dropZoneTweezers
        )

        const inDropZoneCircle1 = Phaser.Geom.Intersects.RectangleToRectangle(
            gameObject.getBounds(),
            this.dropZoneCircle1
        )

        const inDropZoneCircle2 = Phaser.Geom.Intersects.RectangleToRectangle(
            gameObject.getBounds(),
            this.dropZoneCircle2
        )

        const inDropZoneCircle3 = Phaser.Geom.Intersects.RectangleToRectangle(
            gameObject.getBounds(),
            this.dropZoneCircle3
        )

        const inDropZoneCircle4 = Phaser.Geom.Intersects.RectangleToRectangle(
            gameObject.getBounds(),
            this.dropZoneCircle4
        )
        // note where the draggable has been released
        const x = gameObject.x
        const y = gameObject.y


            // NOTE IF IT IS THE CORRECT DROP ZONE FOR THE GAME OBJECT
        let correctDropZoneObject
        if(gameObject.equipment == 'exam') {correctDropZoneObject= inDropZoneCircle4}
        if(gameObject.equipment == 'xray') {correctDropZoneObject= inDropZoneAnimal}
        if(gameObject.equipment == 'mag') {correctDropZoneObject= inDropZoneAnimal}
        if(gameObject.tool == 'flea') {correctDropZoneObject= inDropZoneFleas}
        if(gameObject.tool == 'bandage') {correctDropZoneObject= inDropZoneBandage}
        if(gameObject.tool == 'tweezers') {correctDropZoneObject= inDropZoneTweezers}

            // NOTE IF IT IS THE CORRECT OBJECT FOR THE ANIMAL
        let correctEquipment
        let correctTool
        if(this.animalNumber==0) {correctEquipment='mag'}  //diagnose dog
        if(this.animalNumber==0) {correctTool='flea'}   //treat dog
        if(this.animalNumber==1) {correctEquipment='xray'}  //diagnose cat
        if(this.animalNumber==1) {correctTool='bandage'}    //treat cat
        if(this.animalNumber==2) {correctEquipment='exam'} //diagnose rabbit
        if(this.animalNumber==2) {correctTool='tweezers'}  // treat rabbit


            // HANDLE CIRCLES 
        
        if(
            (gameObject.equipment == 'exam')
            &&
            (inDropZoneCircle1 || inDropZoneCircle2 || inDropZoneCircle3)
            &&
            inDropZoneAnimal
            ) 
            {
            console.log("wrong circle")
            this.handleDropZoneIncorrect(gameObject, x, y)
            this.resetafterIncorrect(gameObject)

        }
        
        else

                    // IF ITEM IS NOT DROPPED IN THE DROP ZONE, MAKE IT DISAPPEAR AND RESET ITEMS

        if(!correctDropZoneObject)
        {
            console.log("missed target")
             this.disappear(gameObject)
             this.resetafterIncorrect(gameObject)
            }
        // ELSE IF ITEM IS DROPPED IN THE DROP ZONE but IS THE INCORRECT ITEM FOR THAT ANIMAL, REACT ACCORDINGLY AND RESET

        else             

        if
        (
            correctDropZoneObject && (gameObject.equipment != correctEquipment && gameObject.tool != correctTool)
        )
        {
            console.log("wrong item")
            this.handleDropZoneIncorrect(gameObject, x, y)
            this.resetafterIncorrect(gameObject)
        } 

        // ELSE IF ITEM IS DROPPED IN THE DROP ZONE and IS THE CORRECT ITEM FOR THAT ANIMAL, REACT ACCORDINGLY AND MOVE ON
     
        else 
        {
            console.log("you got it right")
            this.moveToNextAnimalState()
            this.handleDropZoneCorrect(gameObject, x, y)
        }


        })

                    // Place draggables
        
        this.items = this.physics.add.group()
        this.tools = this.physics.add.group()
        // this.toolsArray = [[this.tool1Correct, this.tool1Wrong1, this.tool1Wrong2]]
        
        this.onboardingTimer = this.time.delayedCall(this.onboardingtime, this.dispenseDiagnosticTools, [], this)



                    // Onboarding
        this.onboardingItem = this.add.image(this.startItem1X, this.startItem1Y, 'spritesheet-key', this.iconArray[0]).setAlpha(0)
        this.hand = this.add.spine(this.startItem1X, this.startItem1Y-300, 'hand')
        this.handanims = this.hand.getAnimationList()
        this.hand.setAlpha(0)
        


        }


        onboardingAnim() {
            
            this.hand.play(this.handanims[1], false)
            this.tweens.chain({
                targets: [this.hand, this.onboardingItem],
                tweens: [
                    {
                        alpha: 1,
                        ease: 'Sine.easeInOut',
                        duration: 200
                    },
                    {

                        y: this.startItem1Y,
                        ease: 'Sine.easeInOut',
                        duration: 1000
                    },
                    {
                        x: this.currentAnimalX,
                        y: this.currentAnimalY,
                        ease: 'Sine.easeInOut',
                        duration: 2000
                    },
                    {
                        alpha: 0,
                        ease: 'Sine.easeInOut',
                        duration: 200
                    },

                ]
            })

        }


        dispenseTools()
        {
            this.background.setTexture(this.backgroundArray[this.animalNumber])
            this.table.setAlpha(0)
            this.animal.setAlpha(0).setDepth(1)
            this.vet.setAlpha(0)
            this.removeEquipment()
            if(this.animalNumber==2){this.thorn.setAlpha(1)}
            this.tool1 = this.items.create(this.startItem1X, this.startItem1Y, 'spritesheet-key', this.toolsArray[0]).setInteractive({ draggable: true }).setDepth(1)
            this.tool1.startX = this.startItem1X
            this.tool1.startY = this.startItem1Y
            this.tool1.tool = 'flea'

            this.tool2 = this.items.create(this.startItem2X, this.startItem2Y, 'spritesheet-key',  this.toolsArray[1]).setInteractive({ draggable: true }).setDepth(1)
            this.tool2.startX = this.startItem2X
            this.tool2.startY = this.startItem2Y
            this.tool2.tool = 'bandage'

            this.tool3 = this.items.create(this.startItem3X, this.startItem3Y, 'spritesheet-key',  this.toolsArray[2]).setInteractive({ draggable: true }).setDepth(1)
            this.tool3.startX = this.startItem3X
            this.tool3.startY = this.startItem3Y
            this.tool3.tool = 'tweezers'

        }  

        dispenseDiagnosticTools()
        {

            this.icon1 = this.items.create(this.startItem1X, this.startItem1Y, 'spritesheet-key', this.iconArray[0]).setInteractive({ draggable: true }).setDepth(1)
            this.icon1.startX = this.startItem1X
            this.icon1.startY = this.startItem1Y
            this.icon1.equipment = 'exam'

            this.icon2 = this.items.create(this.startItem2X, this.startItem2Y, 'spritesheet-key',  this.iconArray[1]).setInteractive({ draggable: true }).setDepth(1)
            this.icon2.startX = this.startItem2X
            this.icon2.startY = this.startItem2Y
            this.icon2.equipment = 'xray'

            this.icon3 = this.items.create(this.startItem3X, this.startItem3Y, 'spritesheet-key',  this.iconArray[2]).setInteractive({ draggable: true }).setDepth(1)
            this.icon3.startX = this.startItem3X
            this.icon3.startY = this.startItem3Y
            this.icon3.equipment = 'mag'


        }

        xrayAnimal(){
            if(this.animal.beingXrayed == false){
                this.animal.setTexture('spritesheet-diag', this.animalsXrayArray[this.animalNumber])
                this.animal.beingXrayed = true
            }

        }

        appearCircle(circle){

            this.tweens.chain({
                targets: [circle],
                tweens: [
                    {
                        scale: 1,
                        alpha: 1,
                        ease: 'Sine.easeInOut',
                        duration: 100
                    }

                ]
            })
        }

        appearHex(hex){

            this.tweens.chain({
                targets: [hex],
                tweens: [
                    {
                        alpha: 0,
                        ease: 'Sine.easeInOut',
                        duration: 400
                    },
                    {
                        alpha: 1,
                        ease: 'Sine.easeInOut',
                        duration: 1000
                    },
                    {
                        alpha: 0,
                        ease: 'Sine.easeInOut',
                        duration: 400
                    }

                ]
            })
        }

        
        appear(object){
            this.tweens.chain({
                targets: [object],
                tweens: [
                    {
                        alpha: 0,
                        ease: 'Sine.easeInOut',
                        duration: 400
                    },
                    {
                        alpha: 1,
                        ease: 'Sine.easeInOut',
                        duration: 400
                    }

                ]
            })   
        }

        disappear(object){
            this.sound.play('incorrect')
            this.tweens.chain({
                targets: [object],
                tweens: [
                    {
                        scale: 0,
                        ease: 'Sine.easeInOut',
                        duration: 400
                    },
                    {
                        alpha: 0,
                        ease: 'Sine.easeInOut',
                        duration: 400
                    }

                ]
            })   
        }

        resetafterIncorrect(gameObject){

        // make circles disappear
        this.removeCircles()

        // after a short period, return the animal to its sad state 
        this.time.delayedCall(2000, resetAnimal, [], this)
        this.animal.setDepth(1)
        function resetAnimal(){
            this.animal.setTexture('spritesheet-key', this.animalsSadArray[this.animalNumber])
            this.animal.setDepth(1)
        }

        this.time.delayedCall(2000, resetIcon, [], this)
        function resetIcon(){

            gameObject.setAlpha(1).setScale(1)
            if(gameObject.equipment=='exam') {gameObject.setTexture('spritesheet-key', this.iconArray[0])}
            if(gameObject.equipment=='xray') {gameObject.setTexture('spritesheet-key', this.iconArray[1])}
            if(gameObject.equipment=='mag') {gameObject.setTexture('spritesheet-key', this.iconArray[2])}
            if(gameObject.tool=='flea') {gameObject.setTexture('spritesheet-key', this.toolsArray[0])}
            if(gameObject.tool=='bandage') {gameObject.setTexture('spritesheet-key', this.toolsArray[1])}
            if(gameObject.tool=='tweezers') {gameObject.setTexture('spritesheet-key', this.toolsArray[2])}
            this.tweens.add({
                targets: gameObject,
                props: {
                    x: {value: gameObject.startX, duration: 0},
                    y: { value: this.startItem1Y, duration: 0 },
                },
                ease: 'Sine.easeInOut',
            })
        }
        }

        disappearHex(hex){

            this.tweens.chain({
                targets: [hex],
                tweens: [
                    {
                        alpha: 0,
                        ease: 'Sine.easeInOut',
                        duration: 400
                    }

                ]
            })
        }

        disappearSoftly(circle){
            this.tweens.chain({
                targets: [circle],
                tweens: [

                    {
                        scale: 0,
                        alpha: 0,
                        ease: 'Sine.easeInOut',
                        duration: 400,
                    }

                ]
            })
        }

        removeCircles(){
            this.disappearSoftly(this.circle1)
            this.disappearSoftly(this.circle2)
            this.disappearSoftly(this.circle3)
            this.disappearSoftly(this.circle4)
            this.disappearSoftly(this.circleBigBandage)
            this.disappearSoftly(this.circleBigFleas)
            this.disappearSoftly(this.circleBigTweezers)
        }


        appearTick(tick){
            this.tweens.chain({
                targets: [tick],
                tweens: [
                    {
                        alpha: 0,
                        ease: 'Sine.easeInOut',
                        duration: 100
                    },
                    {

                        alpha: 1,
                        ease: 'Sine.easeInOut',
                        duration: 1000
                    },
                    {
                        alpha: 0,
                        ease: 'Sine.easeInOut',
                        duration: 400
                    }

                ]
            })
        }

        bandageAppear(){
            this.tweens.chain({
                targets: [this.bandage1],
                tweens: [
                    {
                        alpha: 1,
                        ease: 'Sine.easeInOut',
                        duration: 600
                    }

                ]
            })
        this.time.delayedCall(600, bandageNo2, [], this)
        this.time.delayedCall(1200, bandageNo3, [], this)
        function bandageNo2(){

                this.tweens.chain({
                    targets: [this.bandage2],
                    tweens: [
                        {
                            alpha: 1,
                            ease: 'Sine.easeInOut',
                            duration: 600
                        }
    
                    ]
                })
        }
        function bandageNo3(){
            this.tweens.chain({
                targets: [this.bandage3],
                tweens: [
                    {
                        alpha: 1,
                        ease: 'Sine.easeInOut',
                        duration: 600
                    }

                ]
            })
    }
        }

        

        removeEquipment(){
            this.icon1.destroy()
            this.icon2.destroy()
            this.icon3.destroy()
        }

        startHappyAnimal(){
            this.background.setTexture('background')
            this.animal.setTexture('spritesheet-key', this.animalsHappyArray[this.animalNumber]).setAlpha(1)
            this.table.setAlpha(1)
            this.vet.setAlpha(1)
            this.bandage1.setAlpha(0)
            this.bandage2.setAlpha(0)
            this.bandage3.setAlpha(0)

        }

        startNextSublevel(){
            // this.animal.setTexture('spritesheet-key', this.animalsHappyArray[this.animalNumber])
            this.animalNumber++
            console.log("here")
            const cont = this.add.image(700, 450, 'continue').setInteractive().setDepth(3)
                if(this.animalNumber == 3) {
                    cont.once('pointerdown', () => {
                        this.scene.start('intro-bonus')
                
                })
                } else {
                    cont.once('pointerdown', () => {
                        this.scene.start('game', {
                        level: this.animalNumber
                    })
                
                })
                }

        }

        handleDropZoneIncorrect(gameObject, x, y){
            this.sound.play('incorrect')
            if(gameObject.equipment=='exam' || gameObject.tool == 'bandage' || gameObject.tool == 'tweezers'  ){
                this.appearTick(this.tick)
                this.tweens.chain({
                    targets: [gameObject],
                    tweens: [
                        {
                            x: x-50,
                            ease: 'Sine.easeInOut',
                            duration: 400
                        },
                        {
    
                            x: x+50,
                            ease: 'Sine.easeInOut',
                            duration: 600
                        },
                        {
                            x: x,
                            ease: 'Sine.easeInOut',
                            duration: 400
                        },

                        {
                            alpha: 0,
                            ease: 'Sine.easeInOut',
                            duration: 40
                        },

                        {
                            y: gameObject.startY,
                            x: gameObject.startX,
                            ease: 'Sine.easeInOut',
                            duration: 0
                        },
    
                    ]
                })
            }

            if(gameObject.equipment=='xray'){

                console.log("animal xrayed")
                //display an x-rayed animal
                this.animal.setTexture('spritesheet-diag', this.animalsXrayArray[this.animalNumber])                    
                gameObject.x = this.animalX
                gameObject.y = this.animalY

                this.appearTick(this.tick)
               
            }
            if(gameObject.equipment=='mag'){

                console.log("animal magnified")

                this.appearTick(this.tick)
               
            }
            if(gameObject.tool=='flea'){
                const drop = this.add.image(gameObject.x-120, gameObject.y+200, 'spritesheet-diag', 'treatment_flea_drop.png').setAlpha(0).setDepth(2)
                this.tweens.chain({
                    targets: drop,
                    tweens: [
                        {
                            alpha: 1,
                            ease: 'Sine.easeInOut',
                            duration: 400
                        },
                        {
                            alpha: 1,
                            ease: 'Sine.easeInOut',
                            duration: 400
                        },
                        {
                            y: gameObject.y+400,
                            ease: 'Sine.easeInOut',
                            duration: 1000
                        },
                        {
                            alpha: 0,
                            ease: 'Sine.easeInOut',
                            duration: 400
                        },
                    ]
                })
            }

        }

        handleDropZoneCorrect(gameObject, x, y){
            this.sound.play('correct')
            this.vet.play(this.charanims[3], false)
            if((this.animalState=='diagnosed')){this.removeInteractiveIcons()}
            if((this.animalState=='treated')){this.removeInteractiveTools()}
            this.removeCircles()
            if(gameObject.equipment=='exam'){
                this.animal.setTexture('spritesheet-key', this.animalsMediumArray[2])
                this.tweens.chain({
                    targets: [gameObject],
                    tweens: [
                        {
                            x: 600,
                            y: 550,
                            ease: 'Sine.easeInOut',
                            duration: 400
                        },
                        {
    
                            x: 650,
                            ease: 'Sine.easeInOut',
                            duration: 400
                        },
                        {
    
                            x: 550,
                            ease: 'Sine.easeInOut',
                            duration: 600
                        },
                        {
                            x: 600,
                            ease: 'Sine.easeInOut',
                            duration: 400
                        },

                        {
                            alpha: 0,
                            ease: 'Sine.easeInOut',
                            duration: 40
                        },

                        {
                            y: gameObject.startY,
                            x: gameObject.startX,
                            ease: 'Sine.easeInOut',
                            duration: 0
                        },
    
                    ]
                })
            }
            if(gameObject.equipment=='xray'){
                this.animal.setDepth(3).setTexture('spritesheet-diag', this.animalsXrayArray[this.animalNumber])                    //hold the xray screen up only if the target is hit
                gameObject.x = this.animalX
                gameObject.y = this.animalY
                this.appearHex(this.hex2)
            }
            if(gameObject.equipment=='mag'){
                gameObject.setScale(1)
                gameObject.setTexture('spritesheet-diag2', this.animalsMagArray[this.animalNumber])
                gameObject.x = this.animalX
                gameObject.y = this.animalY
                this.appearHex(this.hex1)
            }
            if(gameObject.tool=='flea'){
                this.tweens.chain({
                    targets: [gameObject],
                    tweens: [
                        {
                            x: 930,
                            y: 150,
                            ease: 'Sine.easeInOut',
                            duration: 400
                        },
                    ]
                })
                const drop = this.add.image(800, 380, 'spritesheet-diag', 'treatment_flea_drop.png').setAlpha(0)
                this.tweens.chain({
                    targets: drop,
                    tweens: [
                        {
                            alpha: 1,
                            ease: 'Sine.easeInOut',
                            duration: 400
                        },
                        {
                            alpha: 1,
                            ease: 'Sine.easeInOut',
                            duration: 400
                        },
                        {
                            y: 500,
                            ease: 'Sine.easeInOut',
                            duration: 1000
                        },
                        {
                            alpha: 0,
                            ease: 'Sine.easeInOut',
                            duration: 400
                        }
                    ]
                })
                this.removeCircles()
                this.time.delayedCall(1500, removeGameObject, [], this)
                function removeGameObject(){
                    this.disappearSoftly(gameObject)
                }
                
            }
            if(gameObject.tool=='bandage'){
                this.disappearSoftly(this.circleBigBandage)
                this.bandageAppear()
                gameObject.setTexture('spritesheet-diag', 'treatment_bandage_hand_02.png').setDepth(10)
                this.tweens.chain({
                    targets: [gameObject],
                    tweens: [
                        {
                            x: 650,
                            y: 450,
                            ease: 'Sine.easeInOut',
                            duration: 400
                        },
                        {
    
                            x: 750,
                            ease: 'Sine.easeInOut',
                            duration: 400
                        },
                        {
                            x: 550,
                            ease: 'Sine.easeInOut',
                            duration: 1000
                        },
                        {
                            x: 650,
                            ease: 'Sine.easeInOut',
                            duration: 400
                        },

                        {
                            alpha: 0,
                            ease: 'Sine.easeInOut',
                            duration: 40
                        },
                    ]
                })
            }
            if(gameObject.tool=='tweezers'){
                this.disappearSoftly(this.circleBigTweezers)
                this.tweens.chain({
                    targets: [gameObject],
                    tweens: [
                        {
                            x: 600,
                            y: 240,
                            ease: 'Sine.easeInOut',
                            duration: 400
                        }
                    ]
                })
                this.time.delayedCall(1000, removeTreatment, [], this)
                function removeTreatment(){
                    this.disappearSoftly(gameObject)
                    this.disappearSoftly(this.thorn)
                }
            }
        }

        moveToNextAnimalState(){
            if(this.animalState=='justArrived'){
                
                // mark animal as diagnosed
                this.animalState ='diagnosed'

                // display the tools needed for treatment 
                this.time.delayedCall(4000, this.dispenseTools, [], this)
                

            } else if (this.animalState=='diagnosed'){
                this.animalState ='treated'
                this.time.delayedCall(1000, happyAnimal, [], this)
                function happyAnimal(){
                    this.animal.setTexture('spritesheet-key',this.animalsHappyArray[this.animalNumber]).setDepth(1)

                }
               

                this.time.delayedCall(3000, this.startHappyAnimal, [], this)

                this.time.delayedCall(5000, this.startNextSublevel, [], this)

            } 
        }

        removeInteractiveIcons(){

            this.icon1.disableInteractive()
            this.icon2.disableInteractive()
            this.icon3.disableInteractive()
        }
        removeInteractiveTools(){
            this.tool1.disableInteractive()
            this.tool2.disableInteractive()
            this.tool3.disableInteractive()
        }

        setCircleDropZones(){
            this.dropZoneCircle1 = new Phaser.Geom.Rectangle(
                this.circle1.x - this.circle1.displayWidth / 2,
                this.circle1.y - this.circle1.displayHeight / 2,
                this.circle1.displayWidth,
                this.circle1.displayHeight
                )
    
            this.dropZoneCircle2 = new Phaser.Geom.Rectangle(
                this.circle2.x - this.circle2.displayWidth / 2,
                this.circle2.y - this.circle2.displayHeight / 2,
                this.circle2.displayWidth,
                this.circle2.displayHeight
                )
            this.dropZoneCircle3 = new Phaser.Geom.Rectangle(
                this.circle3.x - this.circle3.displayWidth / 2,
                this.circle3.y - this.circle3.displayHeight / 2,
                this.circle3.displayWidth,
                this.circle3.displayHeight
                )
            this.dropZoneCircle4 = new Phaser.Geom.Rectangle(
                this.circle4.x - this.circle4.displayWidth / 2,
                this.circle4.y - this.circle4.displayHeight / 2,
                this.circle4.displayWidth,
                this.circle4.displayHeight
                )
        }
}