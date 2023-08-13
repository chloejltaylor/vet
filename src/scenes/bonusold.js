import Phaser from '../lib/phaser.js'
import game from './game.js'


export default class Bonus extends Phaser.Scene
{
    constructor() 
    {
    super('bonus')
    }

    // Time needed for onboarding

    onboardingtime = 6000
    numHamstersCaught = 0
    currentTargetX = 700
    currentTargetY = 480
    startItemsArray = [
        {x: 150, y:250},
        {x: 350, y:500},
        {x: 200, y:700},
        {x: 600, y:240},
        {x: 1250, y:250},
        {x: 1050, y:500},
        {x: 1200, y:700},
        {x: 800, y:240},
    ]
    endItemsArray = [
        {x: 600, y:400},
        {x: 650, y:400},
        {x: 700, y:400},
        {x: 750, y:400},
        {x: 800, y:400},
        {x: 650, y:350},
        {x: 700, y:350},
        {x: 750, y:350},
    ]
    barrier1Pos={x:700, y:600}
    barrier2Pos={x:700, y:450}
    barrier3Pos={x:700, y:300}
    barrier4Pos={x:700, y:500}
    barrier5Pos={x:700, y:220}
    
    hamsterArray=['hamster1', 'hamster2','hamster3','hamster4','hamster5','hamster6','hamster7', 'hamster8']
    hamsterDelay = 4000
    hamsterCaught = false
    hamsterState = ['hidden', 'revealed', 'grabbed']

    init(){
       this.numHamstersCaught = 0
    }

    create()
    {

        let marginX = 150
        let marginY = 300
        //Position static images
        this.add.image(700, 450, 'background')
        this.countingtext = this.add.text(700, 70, '0', {fontSize: 100}).setOrigin(0.5).setDepth(1)

        this.hitzone = this.add.image(this.currentTargetX, this.currentTargetY, 'hamsterhitzone').setDepth(21)

        this.hamsters = this.physics.add.group()
        this.hamster1 = this.hamsters.create(this.startItemsArray[0].x, this.startItemsArray[0].y, this.hamsterArray[0]).setInteractive({ draggable: true }).setDepth(2)
        this.hamster2 = this.hamsters.create(this.startItemsArray[1].x, this.startItemsArray[1].y, this.hamsterArray[1]).setInteractive({ draggable: true }).setDepth(4)
        this.hamster3 = this.hamsters.create(this.startItemsArray[2].x, this.startItemsArray[2].y, this.hamsterArray[2]).setInteractive({ draggable: true }).setDepth(6)
        this.hamster4 = this.hamsters.create(this.startItemsArray[3].x, this.startItemsArray[3].y, this.hamsterArray[3]).setInteractive({ draggable: true }).setDepth(0)
        this.hamster5 = this.hamsters.create(this.startItemsArray[4].x, this.startItemsArray[4].y, this.hamsterArray[4]).setInteractive({ draggable: true }).setDepth(2)
        this.hamster6 = this.hamsters.create(this.startItemsArray[5].x, this.startItemsArray[5].y, this.hamsterArray[5]).setInteractive({ draggable: true }).setDepth(4)
        this.hamster7 = this.hamsters.create(this.startItemsArray[6].x, this.startItemsArray[6].y, this.hamsterArray[6]).setInteractive({ draggable: true }).setDepth(6)
        this.hamster8 = this.hamsters.create(this.startItemsArray[7].x, this.startItemsArray[7].y, this.hamsterArray[7]).setInteractive({ draggable: true }).setDepth(0)

        this.hamster1.startX = this.startItemsArray[0].x
        this.hamster1.startY = this.startItemsArray[0].y
        this.hamster2.startX = this.startItemsArray[1].x
        this.hamster2.startY = this.startItemsArray[1].y
        this.hamster3.startX = this.startItemsArray[2].x
        this.hamster3.startY = this.startItemsArray[2].y
        this.hamster4.startX = this.startItemsArray[3].x
        this.hamster4.startY = this.startItemsArray[3].y
        this.hamster5.startX = this.startItemsArray[4].x
        this.hamster5.startY = this.startItemsArray[4].y
        this.hamster6.startX = this.startItemsArray[5].x
        this.hamster6.startY = this.startItemsArray[5].y
        this.hamster7.startX = this.startItemsArray[6].x
        this.hamster7.startY = this.startItemsArray[6].y
        this.hamster8.startX = this.startItemsArray[7].x
        this.hamster8.startY = this.startItemsArray[7].y
        this.hamster1.hamsterDepth = 2
        this.hamster2.hamsterDepth = 4
        this.hamster3.hamsterDepth = 6
        this.hamster4.hamsterDepth = 0
        this.hamster5.hamsterDepth = 2
        this.hamster6.hamsterDepth = 4
        this.hamster7.hamsterDepth = 6
        this.hamster8.hamsterDepth = 0

        this.hamster1.state = 'hidden'
        this.hamster2.state = 'hidden'
        this.hamster3.state = 'hidden'
        this.hamster4.state = 'hidden'
        this.hamster5.state = 'hidden'
        this.hamster6.state = 'hidden'
        this.hamster7.state = 'hidden'
        this.hamster8.state = 'hidden'

        this.add.image(this.barrier5Pos.x, this.barrier5Pos.y, 'barrier5').setDepth(1).setScale(0.7).setAlpha(0.9)
        this.add.image(this.barrier4Pos.x, this.barrier4Pos.y, 'barrier4').setDepth(8).setAlpha(0.9)
        this.add.image(this.barrier3Pos.x, this.barrier3Pos.y, 'barrier3').setDepth(3).setAlpha(0.9)
        this.add.image(this.barrier2Pos.x, this.barrier2Pos.y, 'barrier2').setDepth(5).setAlpha(0.9)
        this.add.image(this.barrier1Pos.x, this.barrier1Pos.y, 'barrier1').setDepth(7).setAlpha(0.9)
        


            this.time.addEvent({
                delay: this.hamsterDelay,   
                callback: 
                function hamstersAllPopOut() {
                    if(this.hamster1.state!='caught'){this.hamsterPopOut(this.hamster1, this.startItemsArray[0].y)}
                    if(this.hamster1.state!='caught'){this.hamsterPopOut(this.hamster2, this.startItemsArray[1].y)}
                    if(this.hamster1.state!='caught'){this.hamsterPopOut(this.hamster3, this.startItemsArray[2].y)}
                    if(this.hamster1.state!='caught'){this.hamsterPopOut(this.hamster4, this.startItemsArray[3].y)}
                    if(this.hamster1.state!='caught'){this.hamsterPopOut(this.hamster5, this.startItemsArray[4].y)}
                    if(this.hamster1.state!='caught'){this.hamsterPopOut(this.hamster6, this.startItemsArray[5].y)}
                    if(this.hamster1.state!='caught'){this.hamsterPopOut(this.hamster7, this.startItemsArray[6].y)}
                    if(this.hamster1.state!='caught'){this.hamsterPopOut(this.hamster8, this.startItemsArray[7].y)}
               },   
                callbackScope: this,
                loop: true
            })
        

             // Move the draggable with the pointer
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            if(gameObject.state == 'revealed' || gameObject.state == 'grabbed'){
                
                gameObject.setDepth(11)
                gameObject.x = dragX
                gameObject.y = dragY
                gameObject.state = 'grabbed'
            }

        })
    
        // Release the draggable
        this.input.on('dragend', (pointer, gameObject) => {
            
            
            // note where the draggable has been released
            const x = gameObject.x;
            const y = gameObject.y;

            // If the correct draggable is dropped in the drop zone...
            if ((x < this.currentTargetX+marginX && x > this.currentTargetX-marginX) && (y < this.currentTargetY+marginY && y > this.currentTargetY-marginY))
            {
                this.numHamstersCaught++
                this.countingtext.text = this.numHamstersCaught
                this.sound.play('correct')
                gameObject.state='caught'
                gameObject.setScale(0.6).setDepth(20-this.numHamstersCaught)
                gameObject.x=this.endItemsArray[this.numHamstersCaught-1].x
                gameObject.y=this.endItemsArray[this.numHamstersCaught-1].y

                                    
            }
            else {
                // if(!gameObject.state == 'hidden'){
                        this.sound.play('incorrect')
                        gameObject.state = 'hidden'
                        gameObject.setDepth(gameObject.hamsterDepth)
                        this.tweens.add({
                            targets: gameObject,
                            props: {
                                x: {value: gameObject.startX, duration: 800},
                                y: {value: gameObject.startY, duration: 800},
                            },
                            ease: 'Sine.easeInOut',
                        })
                // }
                

            }
            })
    }

        hamsterReveal(hamster, currentY){
                if(hamster.state != 'caught'){
                    hamster.state = 'revealed'
                    this.tweens.chain({
                        targets: [hamster],
                        tweens: [
                            {
                                y: currentY - 150,
                                ease: 'Sine.easeInOut',
                                duration: 400
                            }
                        ]
                    })
                }
    

        }

        
        hamsterHide(hamster, currentY){
            if(hamster.state == 'revealed'){
                this.tweens.chain({
                    targets: [hamster],
                    tweens: [
                        {
                            y: currentY,
                            ease: 'Sine.easeInOut',
                            duration: 200
                        }
                    ]
                })
            }
        }

        hamsterPopOut(hamster, currentY){
            this.time.delayedCall(Phaser.Math.Between(4000, 8000)  , pop, [], this)
            function pop(){
                this.hamsterReveal(hamster, currentY)
                if (!this.hamsterCaught){
                    this.time.delayedCall(3000, hide, [], this)
                    function hide() {
                        if(!this.hamsterCaught){
                        
                        this.hamsterHide(hamster, currentY)
                        }
                    }
                }
            }

        }



        endGame(){
            this.items.setVisible(false)
            this.time.delayedCall(1000, moveToCongratulationsScreen, [], this)
            function moveToCongratulationsScreen(){
                this.scene.start('congratulations')
            }
            
        }


        onboardingAnim() {
            this.tweens.chain({
                targets: [this.onboardingparcel, this.onboardingDial],
                tweens: [
                    {
                        alpha: 1,
                        ease: 'Sine.easeInOut',
                        duration: 200
                    },
                    {
                        alpha: 1,
                        ease: 'Sine.easeInOut',
                        duration: 3500
                    },
                    {
                        alpha: 0,
                        ease: 'Sine.easeInOut',
                        duration: 200
                    }
                ]
            })
            
            this.hand.play(this.handanims[1], false)
            this.tweens.chain({
                targets: [this.hand, this.onboardingItem],
                tweens: [
                    {
                        x: this.startStamp2X,
                        alpha: 0,
                        ease: 'Sine.easeInOut',
                        duration: 1000
                    },
                    {
                        alpha: 1,
                        ease: 'Sine.easeInOut',
                        duration: 200
                    },
                    {

                        y: this.startStamp2Y,
                        ease: 'Sine.easeInOut',
                        duration: 500
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



     


}