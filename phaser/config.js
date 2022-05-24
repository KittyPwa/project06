var config = {
    type: Phaser.AUTO,
    width: constants.screenWidth,
    height: constants.screenHeight,
    backgroundColor: '#010101',
    parent: 'phaser-example',
    scene: {
        preload: preload,
        create: create
    }
};


var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('sky', 'phaser/assets/sky.png');
    this.load.image('ground', 'phaser/assets/platform.png');
    this.load.image('star', 'phaser/assets/star.png');
    this.load.image('bomb', 'phaser/assets/bomb.png');
}



constants.lineAmount = database.data.inventory.inventorySize / constants.columnAmount;

function create ()
{
    var sky = this.add.image(0, 0, 'sky');
    let i = 0;
    for(let elem of Object.values(database.data.items)) {
        let widthPlacement = constants.spriteBaseWidthPlacement + i * constants.spriteOffset
        let sprite = this.add.image(widthPlacement, constants.spriteBaseHeightPlacement, elem.associatedSprite);
        i++;
        sprite.item_id = elem.id
        variables.sprites[elem.associatedSprite + '_' + elem.id] = {
            id: elem.id,
            obj: sprite,
            occupies: [placements.center],
        }    
        sprite['occupies'] = {
            9: true
        }
    }
    let counter = 0;
    let rectContainer = []

    let baseWidth = (config.width / constants.widthDivider) + constants.widthOffset
    let baseHeight = (config.height / constants.heightDivider) + constants.heightOffset

    let middleWidth = (baseWidth * 2 + constants.rectSpacing * (constants.columnAmount - 1) )/ 2
    let middleHeight = (baseHeight * 2 + constants.rectSpacing * (constants.lineAmount - 1)) /2 - constants.backgroundHeightOffset/2
    let rectWidth =  constants.rectSize*(constants.columnAmount + 2) +constants.backgroundWidthOffset
    let rectHeight =  constants.rectSize*(constants.lineAmount + 2) + constants.backgroundHeightOffset
    let backgroundRect = this.add.rectangle(0 , 0 ,rectWidth, rectHeight)
    backgroundRect.setStrokeStyle(constants.rectLineThickness, constants.rectLineColor)

    rectContainer.push(backgroundRect)
    for(let i = 0; i < constants.columnAmount; i++ ) {
        for(let j = 0; j < constants.lineAmount; j++) {
            let width = baseWidth + constants.rectSpacing * i 
            let height = baseHeight + constants.rectSpacing * j 
            var rect = this.add.rectangle(width - middleWidth, height - middleHeight, constants.rectSize, constants.rectSize);
            variables.rectangles[i + '_' + j] = {
                obj: rect,
                x: width,
                y: height,
                initialx: width,
                initialy: height,
                isFilled : false,
                i:i,
                j:j,
            }
            rectContainer.push(rect)
            counter++;
            rect.setStrokeStyle(constants.rectLineThickness, constants.rectLineColor)
        }
    }

    let inventoryScreen = this.add.container(middleWidth, middleHeight, rectContainer);
    inventoryScreen.setSize(backgroundRect.width, backgroundRect.height)
    inventoryScreen.setInteractive()
    this.input.setDraggable(inventoryScreen)

    let dragOffset = {
        dragX:0,
        dragY:0
    }

    inventoryScreen.on('dragstart', function(pointer, dragX, dragY){
        dragOffset.dragX = pointer.x;
        dragOffset.dragY = pointer.y;
    })

    inventoryScreen.on('drag', function(pointer, dragX, dragY) {
        inventoryScreen.x = dragX;
        inventoryScreen.y = dragY;
        let dragOffsetX = pointer.x - dragOffset.dragX
        let dragOffsetY = pointer.y - dragOffset.dragY
        for(let rect of Object.values(variables.rectangles)) {
            rect.x = rect.initialx + dragOffsetX
            rect.y = rect.initialy + dragOffsetY
        }
        updateAllSprites()
    })

    inventoryScreen.on('dragend', function(pointer, dragX, dragY) {
        for(let rect of Object.values(variables.rectangles)) {
            rect.initialx = rect.x
            rect.initialy = rect.y
        }
    })

    sky.setScale(2)
    sky.setInteractive()

    
    for(let sprite of Object.values(variables.sprites)) {
        sprite = sprite.obj
        sprite.setInteractive();
        sprite.setDepth(1)

        this.input.setDraggable(sprite);

        sprite.on('pointerover', function () {

            sprite.setTint(0x44ff44);

        });

        sprite.on('pointerout', function () {

            sprite.clearTint();

        });

        sprite.on('drag', function (pointer, dragX, dragY) {
            sprite.x = dragX;
            sprite.y = dragY;
            for(let rect of Object.values(variables.rectangles)) {
                if(rect.isFilled) {
                    rect.isFilled = false;
                    rect.obj.isFilled = false;
                }
            }
            for(let key of Object.keys(variables.rectangles)) {
                let rect = variables.rectangles[key]
                let obj = rect.obj
                if((dragX >= rect.x - constants.rectSize / 2 
                        && dragX <= rect.x + constants.rectSize / 2)
                    &&
                    (dragY >= rect.y - constants.rectSize /2
                        && dragY <= rect.y + constants.rectSize / 2)) {
                    let keys = key.split('_')
                    let i = keys[0]
                    let j = keys[1]
                    let toFill = []
                    let goodFill = true;
                    let fillStyle = 0x44ff44
                    for(let placement of Object.values(placements)) {
                        if(sprite.occupies[placement.id]) {
                            let newI = parseInt(i) + parseInt(placement.i)
                            let newJ = parseInt(j) + parseInt(placement.j)
                            let rect = variables.rectangles[newI + '_' + newJ]
                            if(rect) {
                                rect.isFilled = true;
                                toFill.push(rect)
                            } else {
                                goodFill = false;
                            }
                        }
                    }   
                    if(!goodFill) {
                        fillStyle = 0xFF0000
                    }
                    for(let obj of toFill) {
                        obj.obj.setFillStyle(fillStyle);
                    }
                    break;
                }
            }
        });

        sprite.on('dragend', function(pointer) {
            let totalRects = Object.keys(variables.rectangles).length
            let i = 0
            let item = database.getItem(sprite.item_id);
            for(let key of Object.keys(variables.rectangles)) {
                let rect = variables.rectangles[key]
                if(rect.isFilled) {
                    let keys = key.split('_')
                    let i = keys[0]
                    let j = keys[1]
                    let slot = parseInt(j) * constants.columnAmount + parseInt(i)
                    if(database.data.inventory.getItem(slot)) {
                        database.data.inventory.swapItems({
                            itemOne: database.data.inventory.getItem(slot),
                            itemTwo: item,
                            slotOne: slot,
                            slotTwo: database.data.inventory.getSlotFromItem(item)
                        })
                    } else {
                        database.data.inventory.removeItem(item)
                        database.data.inventory.addItemToInventory(item, slot)
                    }
                } else {
                    i++;
                }
                rect.isFilled = false;
                rect.obj.isFilled = false;
            }
            if(totalRects == i) {
                database.data.inventory.removeItem(item)
            }
            updateAllSprites()
        })
    }



    
    
    

    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis

    //  Collide the player and the stars with the platforms
    //this.physics.add.collider(player.sprite, walls);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
}

function updateAllSprites() {
    for(let sprite of Object.values(variables.sprites)) {
        assignSpriteToSlot(sprite)
    }
}

function assignSpriteToSlot(sprite) {
    let item = database.getItem(sprite.id);
    if(item && item.inInventory) {
        let slot = database.getInventory().getSlotFromItem(item);
        let j = Math.floor(slot / constants.columnAmount)
        let i = slot - j * constants.columnAmount;
        let rect = variables.rectangles[i + '_' + j]
        sprite.obj.x = rect.x
        sprite.obj.y = rect.y
    }
    
}

