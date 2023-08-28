import Phaser from '../lib/phaser.js'

export default class Bonus extends Phaser.Scene
{
    constructor() 
    {
    super('bonus')
    }

    counter


    numHamstersCaught = 0
    currentTargetX = 700
    currentTargetY = 450
    startItemsArray = [
        {x: 600, y:420},
        {x: 350, y:580},
        {x: 260, y:620},
        {x: 220, y:700},
        {x: 800, y:420},
        {x: 1050, y:580},
        {x: 1140, y:620},
        {x: 420, y:320},
    ]
    endItemsArray = [
        {x: 550, y:550},
        {x: 625, y:550},
        {x: 700, y:550},
        {x: 775, y:550},
        {x: 850, y:550},
        {x: 600, y:500},
        {x: 700, y:500},
        {x: 800, y:500},
    ]
    barrier1Pos={x:700, y:420}
    barrier2Pos={x:700, y:500}
    barrier3Pos={x:700, y:560}
    barrier4Pos={x:700, y:620}
    barrier5Pos={x:700, y:660}
    barrier6Pos={x:300, y:750}
    barrier7Pos={x:700, y:240}
    

    hamsterDelay = 1000
    hamsterCaught = false
    hamsterState = ['hidden', 'revealed', 'grabbed']

    init(){
       this.numHamstersCaught = 0
    }

    create()
    {

        this.onboardingTimer = this.time.delayedCall(800, this.onboardingAnim, [], this)

        
        let marginX = 150
        let marginY = 300
        //Position static images
        this.add.image(700, 450, 'backgroundBonus')
        this.counter = this.add.image(700, 100, 'spritesheet_bonus', 'counter.png')

        this.countingtext = this.add.text(750, 100, '0', {fontSize: 100, color: 'black'}).setOrigin(0.5).setDepth(1)
        this.add.image(this.currentTargetX, this.currentTargetY, 'spritesheet_bonus', 'cage_back.png').setDepth(11)
        this.hitzone = this.add.image(this.currentTargetX, this.currentTargetY, 'spritesheet_bonus', 'cage_front.png').setDepth(100)

        this.hamsters = this.physics.add.group()
        this.hamster1 = this.hamsters.create(this.startItemsArray[0].x, this.startItemsArray[0].y, 'spritesheet_bonus', 'hamster.png').setInteractive({ draggable: true }).setDepth(2)
        this.hamster2 = this.hamsters.create(this.startItemsArray[1].x, this.startItemsArray[1].y, 'spritesheet_bonus', 'hamster.png').setInteractive({ draggable: true }).setDepth(4)
        this.hamster3 = this.hamsters.create(this.startItemsArray[2].x, this.startItemsArray[2].y, 'spritesheet_bonus', 'hamster.png').setInteractive({ draggable: true }).setDepth(6)
        this.hamster4 = this.hamsters.create(this.startItemsArray[3].x, this.startItemsArray[3].y, 'spritesheet_bonus', 'hamster.png').setInteractive({ draggable: true }).setDepth(8)
        this.hamster5 = this.hamsters.create(this.startItemsArray[4].x, this.startItemsArray[4].y, 'spritesheet_bonus', 'hamster.png').setInteractive({ draggable: true }).setDepth(2)
        this.hamster6 = this.hamsters.create(this.startItemsArray[5].x, this.startItemsArray[5].y, 'spritesheet_bonus', 'hamster.png').setInteractive({ draggable: true }).setDepth(4)
        this.hamster7 = this.hamsters.create(this.startItemsArray[6].x, this.startItemsArray[6].y, 'spritesheet_bonus', 'hamster.png').setInteractive({ draggable: true }).setDepth(6)
        this.hamster8 = this.hamsters.create(this.startItemsArray[7].x, this.startItemsArray[7].y, 'spritesheet_bonus', 'hamster.png').setInteractive({ draggable: true }).setDepth(2)

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

        this.add.image(this.barrier5Pos.x, this.barrier5Pos.y, 'spritesheet_bonus', 'table.png').setDepth(1)
        this.add.image(this.barrier4Pos.x, this.barrier4Pos.y, 'spritesheet_bonus', 'chairs_01.png').setDepth(9)
        this.add.image(this.barrier3Pos.x, this.barrier3Pos.y, 'spritesheet_bonus', 'chairs_02.png').setDepth(7)
        this.add.image(this.barrier2Pos.x, this.barrier2Pos.y, 'spritesheet_bonus', 'chairs_03.png').setDepth(5)
        this.add.image(this.barrier1Pos.x, this.barrier1Pos.y, 'spritesheet_bonus', 'desk.png').setDepth(3)
        this.add.image(this.barrier6Pos.x, this.barrier6Pos.y, 'spritesheet_bonus', 'plant_pot.png').setDepth(11)
        this.add.image(this.barrier7Pos.x, this.barrier7Pos.y, 'spritesheet_bonus', 'desk_props.png').setDepth(3)
        

            this.time.addEvent({
                delay: this.hamsterDelay,   
                callback: 
                function hamstersAllPopOut() {
                    if(this.hamster1.state=='hidden'){this.hamsterPopOut(this.hamster1, this.startItemsArray[0].y)}
                    if(this.hamster2.state=='hidden'){this.hamsterPopOut(this.hamster2, this.startItemsArray[1].y)}
                    if(this.hamster3.state=='hidden'){this.hamsterPopOut(this.hamster3, this.startItemsArray[2].y)}
                    if(this.hamster4.state=='hidden'){this.hamsterPopOut(this.hamster4, this.startItemsArray[3].y)}
                    if(this.hamster5.state=='hidden'){this.hamsterPopOut(this.hamster5, this.startItemsArray[4].y)}
                    if(this.hamster6.state=='hidden'){this.hamsterPopOut(this.hamster6, this.startItemsArray[5].y)}
                    if(this.hamster7.state=='hidden'){this.hamsterPopOut(this.hamster7, this.startItemsArray[6].y)}
                    if(this.hamster8.state=='hidden'){this.hamsterPopOut(this.hamster8, this.startItemsArray[7].y)}

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
                if(this.numHamstersCaught==4){
                    // this.moreHamsters()
                }
                this.countingtext.text = this.numHamstersCaught
                this.sound.play('correct')
                gameObject.state='caught'
                gameObject.setScale(0.8).setDepth(20-this.numHamstersCaught)
                gameObject.x=this.endItemsArray[this.numHamstersCaught-1].x
                gameObject.y=this.endItemsArray[this.numHamstersCaught-1].y
                if(this.numHamstersCaught == 8) {
                    this.time.delayedCall(2000, endGame, [], this)
                    function endGame(){
                        this.scene.start('congratulations')
                    }
                }
                                    
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

            // Onboarding
            this.onboardingHamster = this.add.image(this.startItemsArray[2].x, this.startItemsArray[2].y, 'spritesheet_bonus', 'hamster.png').setDepth(6)
            this.onboardingHamster2 = this.add.image(this.startItemsArray[2].x, this.startItemsArray[2].y-75, 'spritesheet_bonus', 'hamster.png').setDepth(30).setAlpha(0)
            this.hand = this.add.spine(this.startItemsArray[2].x, this.startItemsArray[2].y-100, 'hand').setDepth(30).setAlpha(0)

            this.handanims = this.hand.getAnimationList()

    }

        hamsterReveal(hamster, currentY){
                if(hamster.state == 'hidden'){
                    hamster.state = 'revealed'
                    this.tweens.chain({
                        targets: [hamster],
                        tweens: [
                            {
                                y: currentY - 100,
                                ease: 'Sine.easeInOut',
                                duration: 400
                            }
                        ]
                    })
                }
    

        }

        
        hamsterHide(hamster, currentY){
            if(hamster.state == 'revealed'){
                hamster.state = 'hidden'
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
            this.time.delayedCall(Phaser.Math.Between(6000, 12000)  , pop, [], this)
            function pop(){
                console.log("hamsterPopOut")
                this.hamsterReveal(hamster, currentY)
                if (hamster.hamsterState!='caught'){
                    this.time.delayedCall(3000, hide, [], this)
                    function hide() {
                        this.hamsterHide(hamster, currentY)
                    }
                }
            }

        }

        // moreHamsters(){

        // }



        endGame(){
            this.items.setVisible(false)
            this.time.delayedCall(1000, moveToCongratulationsScreen, [], this)
            function moveToCongratulationsScreen(){
                this.scene.start('congratulations')
            }
            
        }


        onboardingAnim() {
            this.tweens.chain({
                targets: [this.onboardingHamster],
                tweens: [
                    {
                        alpha: 1,
                        ease: 'Sine.easeInOut',
                        duration: 0
                    },
                    {
                        y: this.startItemsArray[2].y-75,
                        ease: 'Sine.easeInOut',
                        duration: 1500
                    },
                    {
                        alpha: 1,
                        ease: 'Sine.easeInOut',
                        duration: 1500
                    },
                    {
                        alpha: 0,
                        ease: 'Sine.easeInOut',
                        duration: 0
                    }
                ]
            })
            
            this.hand.play(this.handanims[1], false)
            this.tweens.chain({
                targets: [this.onboardingHamster2, this.hand],
                tweens: [
                    {
                        alpha: 0,
                        ease: 'Sine.easeInOut',
                        duration: 3000
                    },
                    {
                        alpha: 1,
                        ease: 'Sine.easeInOut',
                        duration: 0
                    },
                    {
                        x: 700,
                        ease: 'Sine.easeInOut',
                        duration: 1000
                    },
                    {
                        alpha: 1,
                        ease: 'Sine.easeInOut',
                        duration: 500
                    },
                    {
                        alpha: 0,
                        ease: 'Sine.easeInOut',
                        duration: 0,
                        
                    }
                ]
            })

        }



     


}