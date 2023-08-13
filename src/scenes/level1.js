import Phaser from '../lib/phaser.js'


export default class level1 extends Phaser.Scene
{
    constructor() 
    {
    super('level1')
    }

    // Time needed for onboarding

    onboardingtime = 0

    // Starting positions of the draggables
    startItem1X = 500
    startItem1Y = 760
    startItem2X = 700
    startItem2Y = 760
    startItem3X = 900
    startItem3Y = 760
    startItemsArray = [{x: this.startItem1X, y: this.startItem1Y},{x: this.startItem2X, y: this.startItem2Y}, {x: this.startItem3X, y: this.startItem3Y}]
    
    startTool1X = this.startItem1X
    startTool1Y = this.startItem1Y
    startTool2X = this.startItem2X
    startTool2Y = this.startItem2Y
    startTool3X = this.startItem3X
    startTool3Y = this.startItem3Y
    
    toolsArray=[]
    startToolsArray = [{x: this.startTool1X, y: this.startTool1Y},{x: this.startTool2X, y: this.startTool2Y}, {x: this.startTool3X, y: this.startItem3Y}]
    
    animalsSadArray = ['animal1-sad', 'animal2-sad', 'animal3-sad']
    animalsXrayArray = ['animal1-xray', 'animal2-xray', 'animal3-xray']
    animalsMediumArray = ['animal1-medium', 'animal2-medium', 'animal3-medium']
    animalsHappyArray = ['animal1-happy', 'animal2-happy', 'animal3-happy']
    itemArray = [['item1-correct', 'item1-wrong1', 'item1-wrong2'], ['item2-correct', 'item2-wrong1', 'item2-wrong2'], ['item3-correct', 'item3-wrong1', 'item3-wrong2']]

    toolArray = [['tool1-correct', 'tool1-wrong1', 'tool1-wrong2'],['tool2-correct', 'tool2-wrong1', 'tool2-wrong2'],['tool3-correct', 'tool3-wrong1', 'tool3-wrong2']]
    indexNumbers = [0,1,2]
    animalState = 'justArrived'
    currentTargetX = 700
    currentTargetY = 200
    animalNumber = 0

    onboardingItem


    init(data){
        this.parcelNum = 0
        this.animalState = 'justArrived'
        this.animalNumber = data.level
        this.firstLevel = data.firstLevel
        this.onboardingtime = 0
    }

    create()
    {


        // temporary text 

        this.text = this.add.text(200, 200, 'sad animal', {fontSize: 36, color: 'black'}).setOrigin(0.5).setDepth(1)
        


        // start the onboarding animation 
        if(this.firstLevel){
            this.onboardingtime = 5500
            this.onboardingTimer = this.time.delayedCall(800, this.onboardingAnim, [], this)
        }


        // Space around drop zone that is accepted
        let marginX = 150
        let marginY = 300


        //Position static images
        this.add.image(700, 450, 'background')
        this.add.image(700, 750, 'table')
        

        this.overlay = this.add.image(700, 450, this.animalsXrayArray[this.level]).setAlpha(0)
        this.dock = this.add.image(700, 800, 'dockA')
        this.animal = this.add.image(700,300, this.animalsSadArray[this.animalNumber])
      

        // Move the draggable with the pointer
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            let x = gameObject.x = dragX;
            let y = gameObject.y = dragY;
        })

        // Release the draggable
        this.input.on('dragend', (pointer, gameObject) => {
            

            // note where the draggable has been released
            const x = gameObject.x;
            const y = gameObject.y;

            // If the correct draggable is dropped in the drop zone...
            if ((x < this.currentTargetX+marginX && x > this.currentTargetX-marginX) && (y < this.currentTargetY+marginY && y > this.currentTargetY-marginY)
                && gameObject.correct
                )
            {
                
                this.sound.play('correct')
                if(this.animalState=='justArrived'){
                    this.time.delayedCall(2000, this.dispenseTools, [], this)
                    this.animalState ='diagnosed'
                    this.text.text = 'animal diagnosed'
                    this.item1Wrong1.destroy()
                    this.item1Wrong2.destroy()
                    this.animal.setTexture(this.animalsMediumArray[this.animalNumber])
                    

                } else if (this.animalState=='diagnosed'){
                    this.animalState ='treated'
                    this.text.text = 'animal treated'
                    // this.tool1Wrong1.destroy()
                    // this.tool1Wrong2.destroy()
                    this.animal.setTexture(this.animalsHappyArray[this.animalNumber])
                    this.time.delayedCall(2000, this.startNextSublevel, [], this)
                    
                    this.animalNumber++

                } 
                
                
                gameObject.disableInteractive()
                this.tweens.add({
                    targets: gameObject,
                    props: {
                        alpha: { value: 0, duration: 500 },
                    },
                    ease: 'Sine.easeInOut',
                })
                if(this.animalNumber==3){
                    this.time.delayedCall(2000, endGame, [], this)
                    function endGame(){
                        this.scene.start('intro-bonus')
                    }

                    
                } 



              
                

            } 
            else {

                this.sound.play('incorrect')
                this.tweens.add({
                    targets: gameObject,
                    props: {
                        x: {value: gameObject.startX, duration: 800},
                        y: { value: this.startItem1Y, duration: 800 },
                    },
                    ease: 'Sine.easeInOut',
                })
            }
            })

                    // Place draggables
        
        this.items = this.physics.add.group()
        this.tools = this.physics.add.group()
        this.toolsArray = [[this.tool1Correct, this.tool1Wrong1, this.tool1Wrong2]]
        
        this.onboardingTimer = this.time.delayedCall(this.onboardingtime, this.dispenseItems, [], this)



                    // Onboarding
        this.onboardingItem = this.add.image(this.startItem1X, this.startItem1Y, 'item1-correct').setAlpha(0)
        this.hand = this.add.spine(this.startItem1X, this.startItem1Y-300, 'hand')
        this.handanims = this.hand.getAnimationList()
        this.hand.setAlpha(0)
        


        }


        endGame(){
            this.items.setVisible(false)
            this.time.delayedCall(1000, moveToCongratulationsScreen, [], this)
            function moveToCongratulationsScreen(){
                this.scene.start('congratulations')
            }
            
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
                        x: this.currentTargetX,
                        y: this.currentTargetY,
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
            this.dock.setTexture('dockB')
            let indexNumbers = [0, 1, 2]
            function shuffle(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    const temp = array[i];
                    array[i] = array[j];
                    array[j] = temp;
                  }
              }
            shuffle(indexNumbers)
            this.tool1Correct = this.tools.create(this.startToolsArray[indexNumbers[0]].x, this.startToolsArray[indexNumbers[0]].y, this.toolArray[this.animalNumber][0]).setInteractive({ draggable: true }).setDepth(1)
            this.tool1Correct.startX = this.startToolsArray[indexNumbers[0]].x
            this.tool1Correct.startY = this.startToolsArray[indexNumbers[0]].y
            this.tool1Correct.correct = true
            this.tool1Wrong1 = this.tools.create(this.startToolsArray[indexNumbers[1]].x, this.startToolsArray[indexNumbers[0]].y,  this.toolArray[this.animalNumber][1]).setInteractive({ draggable: true }).setDepth(1)
            this.tool1Wrong1.startX = this.startToolsArray[indexNumbers[1]].x
            this.tool1Wrong1.startY = this.startToolsArray[indexNumbers[1]].y
            this.tool1Wrong2 = this.tools.create(this.startToolsArray[indexNumbers[2]].x, this.startToolsArray[indexNumbers[0]].y,  this.toolArray[this.animalNumber][2]).setInteractive({ draggable: true }).setDepth(1)
            this.tool1Wrong2.startX = this.startToolsArray[indexNumbers[2]].x
            this.tool1Wrong2.startY = this.startToolsArray[indexNumbers[2]].y
        }  

        dispenseItems()
        {
            let indexNumbers = [0, 1, 2]
            function shuffle(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    const temp = array[i];
                    array[i] = array[j];
                    array[j] = temp;
                  }
              }
            shuffle(indexNumbers)

            this.item1Correct = this.items.create(this.startItemsArray[indexNumbers[0]].x, this.startItemsArray[indexNumbers[0]].y, this.itemArray[this.animalNumber][0]).setInteractive({ draggable: true }).setDepth(1)
            this.item1Correct.startX = this.startItemsArray[indexNumbers[0]].x
            this.item1Correct.startY = this.startItemsArray[indexNumbers[0]].y
            this.item1Correct.correct = true
            this.item1Wrong1 = this.items.create(this.startItemsArray[indexNumbers[1]].x, this.startItemsArray[indexNumbers[0]].y,  this.itemArray[this.animalNumber][1]).setInteractive({ draggable: true }).setDepth(1)
            this.item1Wrong1.startX = this.startItemsArray[indexNumbers[1]].x
            this.item1Wrong1.startY = this.startItemsArray[indexNumbers[1]].y
            this.item1Wrong2 = this.items.create(this.startItemsArray[indexNumbers[2]].x, this.startItemsArray[indexNumbers[2]].y,  this.itemArray[this.animalNumber][2]).setInteractive({ draggable: true }).setDepth(1)
            this.item1Wrong2.startX = this.startItemsArray[indexNumbers[2]].x
            this.item1Wrong2.startY = this.startItemsArray[indexNumbers[2]].y
        }

        startNextSublevel(){
            const cont = this.add.image(700, 450, 'continue').setInteractive()
                    
                    cont.once('pointerdown', () => {
                            this.scene.start('level1', {
                            level: this.animalNumber
                        })
                    
                    })
        }


}