        // note where the draggable has been released
        const x = gameObject.x
        const y = gameObject.y

        //drop zones
            
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

            //display the correct image for the equipment that has been used
            if(gameObject.equipment=='exam'){
                // make circles disappear
                this.disappearCircle(this.circle1,0)
                this.disappearCircle(this.circle2,0)
                this.disappearCircle(this.circle3,0)
                this.disappearCircle(this.circle4,0)
               
                
            if (
                inDropZoneAnimal
                ){
                this.appearTick(this.tick)
                // move the gloves around
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
        }


            if(gameObject.equipment=='xray'){

                if (
                    inDropZoneAnimal
                    ){
                    console.log("animal xrayed")
                    //display an x-rayed animal
                    this.animal.setDepth(3).setTexture('spritesheet-diag', this.animalsXrayArray[this.animalNumber])                    //hold the xray screen up only if the target is hit
                    gameObject.x = this.animalX
                    gameObject.y = this.animalY
                   
                    if(!this.animalNumber==1){this.appearTick(this.tick)}
                    if(this.animalNumber==1){this.appearHex(this.hex2)}
                    // if(this.animalNumber==1){ this.animal.setDepth(3).setTexture('spritesheet-diag', this.animalsXrayArray[this.animalNumber])}
                }


            }
            if(gameObject.equipment=='mag'){
                if ((x < this.currentAnimalX+marginX && x > this.currentAnimalX-marginX) && (y < this.currentAnimalY+marginY && y > this.currentAnimalY-marginY)){

                    gameObject.setScale(1)
                    gameObject.setTexture('spritesheet-diag2', this.animalsMagArray[this.animalNumber])
                    gameObject.x = this.animalX
                    gameObject.y = this.animalY
                    if(this.animalNumber==0){this.appearHex(this.hex1)}
                    else(this.appearTick(this.tick))
                }
            }

            if(gameObject.tool=='flea'){
                this.disappearCircle(this.circleBigFleas)
                if (gameObject.tool == this.animal.correctTool){
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
                } else {
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

            if(gameObject.tool=='bandage'){
                if (gameObject.tool == this.animal.correctTool){
                    this.disappearCircle(this.circleBigBandage)
                    gameObject.setTexture('spritesheet-diag', 'treatment_bandage_hand_02.png')

                    
                    this.tweens.chain({
                        targets: [gameObject],
                        tweens: [
                            {
                                x: x-100,
                                ease: 'Sine.easeInOut',
                                duration: 400
                            },
                            {
        
                                x: x+100,
                                ease: 'Sine.easeInOut',
                                duration: 1000
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
                        ]
                    })

                } else {
                    this.tweens.chain({
                        targets: gameObject,
                        tweens: [
                            {
                                x: x-100,
                                ease: 'Sine.easeInOut',
                                duration: 400
                            },
                            {
        
                                x: x+100,
                                ease: 'Sine.easeInOut',
                                duration: 1000
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
                            }
                        ]
                    })
                }
            }

            if(gameObject.tool=='tweezers'){
                this.disappearCircle(this.circleBigTweezers)
            }

            // If any draggable is dropped outside of the drop zone..

            // for the MAGNIFYING GLASS and the XRAY
            if ((gameObject.equipment=='mag' || gameObject.equipment=='xray')
                && !(x < this.currentAnimalX+marginX && x > this.currentAnimalX-marginX) || !(y < this.currentAnimalY+marginY && y > this.currentAnimalY-marginY))
                
                {
                // remove the icon from the page 
                this.disappear(gameObject)
                }

            // for the TWEEZERS

            if((!inDropZoneTweezers) && (gameObject.tool=='tweezers')) {
                console.log("tweezers")
                this.disappear(gameObject)
            }

            if((inDropZoneTweezers) && (gameObject.tool=='tweezers') && (this.animalNumber==2)) {
                console.log("fleas")
                this.handleDropZone()
                this.disappear(this.thorn)
            }

            // for the FLEAS

            if((!inDropZoneFleas) && (gameObject.tool=='flea')) {
                console.log("fleas")
                this.disappear(gameObject)
                
            }

            if((inDropZoneFleas) && (gameObject.tool=='flea') && (this.animalNumber==0)) {
                console.log("fleas")
                this.handleDropZone()
                
            }

            // for the BANDAGE

            if((!inDropZoneBandage) && (gameObject.tool=='bandage')) {
                console.log("bandage")
                this.disappear(gameObject)
            }

            if((inDropZoneBandage) && (gameObject.tool=='bandage') && (this.animalNumber==1)) {
                console.log("bandage")
                this.bandageAppear()
                this.handleDropZone()
            }

            // for the GLOVES

            // if((!inDropZoneRabbit) && (gameObject.equipment=='exam')) {
            //     console.log("exam")
            //     this.disappear(gameObject)
            // }

            // if( ((inDropZoneRabbit) && gameObject.equipment=='exam') && (this.animalNumber==2)) {
            //     console.log("exam")
            //     this.handleDropZone()
            // }

            // If the correct draggable is dropped in the drop zone...

            if ((x < this.currentAnimalX+marginX && x > this.currentAnimalX-marginX) && (y < this.currentAnimalY+marginY && y > this.currentAnimalY-marginY)
                && (gameObject.equipment == this.animal.correctDiagnostic || gameObject.tool == this.animal.correctTool)
                && (gameObject.equipment=='mag' || gameObject.equipment=='xray')
                )
            {
                
                this.handleDropZone()
                
                
                gameObject.disableInteractive()


            } 
            else {

                this.sound.play('incorrect')


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