var config = {
    type: Phaser.AUTO,
    width: visualVars.screenWidth,
    height: visualVars.screenHeight,
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
    this.load.spritesheet('tileset3', 'phaser/assets/tileset3.jpg', { frameWidth: 25, frameHeight: 25 });
}



visualVars.lineAmount = Math.ceil(database.data.inventory.inventorySize / visualVars.columnAmount);

function create ()
{
    var sky = this.add.image(0, 0, 'sky');
    
    let i = 0;
    for(let elem of Object.values(database.data.items)) {
        let widthPlacement = visualVars.spriteBaseWidthPlacement + i * visualVars.spriteOffset
        let sprite = this.add.image(widthPlacement, visualVars.spriteBaseHeightPlacement, elem.associatedSprite);
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
    let rectContainer = []

    let baseWidth = (config.width / visualVars.widthDivider) + visualVars.widthOffset
    let baseHeight = (config.height / visualVars.heightDivider) + visualVars.heightOffset

    let middleWidth = (baseWidth * 2 + visualVars.rectSpacing * (visualVars.columnAmount - 1) )/ 2
    let middleHeight = (baseHeight * 2 + visualVars.rectSpacing * (visualVars.lineAmount - 1)) /2 - visualVars.backgroundHeightOffset/2
    let rectWidth =  visualVars.rectSize*(visualVars.columnAmount + 2) +visualVars.backgroundWidthOffset
    let rectHeight =  visualVars.rectSize*(visualVars.lineAmount + 2) + visualVars.backgroundHeightOffset
    let backgroundRect = this.add.rectangle(0 , 0 ,rectWidth, rectHeight)
    backgroundRect.setStrokeStyle(visualVars.rectLineThickness, visualVars.rectLineColor)

    rectContainer.push(backgroundRect)
    
    for(let i = 0; i < visualVars.lineAmount; i++ ) {
        for(let j = 0; j < visualVars.columnAmount; j++) {
            let rectAmount = i*visualVars.columnAmount + j;
            if(rectAmount < constants.inventorySize){
                let width = baseWidth + visualVars.rectSpacing * j 
                let height = baseHeight + visualVars.rectSpacing * i 
                var rect = this.add.rectangle(width - middleWidth, height - middleHeight, visualVars.rectSize, visualVars.rectSize);
                variables.inventoryRectangles[i + '_' + j] = {
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
                rect.setStrokeStyle(visualVars.rectLineThickness, visualVars.rectLineColor)
            }
        }
    }
    let equipementSlots = Object.keys(database.getEquipement().equipement);
    for(let key of equipementSlots) {
        let slotSprite = this.add.sprite(visualVars[key].widthOffset,visualVars[key].heightOffset, 'tileset3');
        slotSprite.setDepth(1)
        slotSprite.setFrame(visualVars[key].spriteFrame)
        slotSprite.alpha = visualVars.transparency
        variables.equipementRectangles[key] = {
            obj: slotSprite,
            isFilled: false,
            x: visualVars[key].widthOffset + middleWidth,
            y: visualVars[key].heightOffset + middleHeight,
            initialx: visualVars[key].widthOffset + middleWidth,
            initialy: visualVars[key].heightOffset + middleHeight,
        }
        rectContainer.push(slotSprite)
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
        for(let rect of [...Object.values(variables.inventoryRectangles), ...Object.values(variables.equipementRectangles)]) {
            rect.x = rect.initialx + dragOffsetX
            rect.y = rect.initialy + dragOffsetY
        }
        updateAllSprites()
    })

    inventoryScreen.on('dragend', function(pointer, dragX, dragY) {
        for(let rect of [...Object.values(variables.inventoryRectangles), ...Object.values(variables.equipementRectangles)]) {
            rect.initialx = rect.x
            rect.initialy = rect.y
        }
    })

    sky.setScale(2)
    sky.setInteractive()

    
    for(let sprite of Object.values(variables.sprites)) {
        sprite = sprite.obj
        sprite.setInteractive();
        sprite.setDepth(2)

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
            for(let rect of Object.values(variables.inventoryRectangles)) {
                if(rect.isFilled) {
                    rect.isFilled = false;
                    rect.obj.isFilled = false;
                }
            }
            for(let rect of Object.values(variables.equipementRectangles)) {
                if(rect.isFilled) {
                    rect.isFilled = false;
                    rect.obj.clearTint()
                }
            }
            for(let key of Object.keys(variables.inventoryRectangles)) {
                let rect = variables.inventoryRectangles[key]
                let obj = rect.obj
                if((dragX >= rect.x - visualVars.rectSize / 2 
                        && dragX <= rect.x + visualVars.rectSize / 2)
                    &&
                    (dragY >= rect.y - visualVars.rectSize /2
                        && dragY <= rect.y + visualVars.rectSize / 2)) {
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
                            let rect = variables.inventoryRectangles[newI + '_' + newJ]
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
            for(let key of Object.keys(variables.equipementRectangles)) {
                let rect = variables.equipementRectangles[key]
                let obj = rect.obj
                if((dragX >= rect.x - visualVars.rectSize / 2 
                        && dragX <= rect.x + visualVars.rectSize / 2)
                    &&
                    (dragY >= rect.y - visualVars.rectSize /2
                        && dragY <= rect.y + visualVars.rectSize / 2)) {
                    let fillStyle = 0x44ff44
                    obj.tint = fillStyle
                    rect.isFilled = true;
                }
            }
        });

        sprite.on('dragend', function(pointer) {

            let totalRects = Object.keys(variables.inventoryRectangles).length
            totalRects += Object.keys(variables.equipementRectangles).length
            let i = 0
            let item = database.getItem(sprite.item_id);
            for(let key of Object.keys(variables.inventoryRectangles)) {
                let rect = variables.inventoryRectangles[key]
                if(rect.isFilled) {
                    let keys = key.split('_')
                    let i = keys[0]
                    let j = keys[1]
                    let slot = parseInt(j) * visualVars.columnAmount + parseInt(i)
                    if(database.getEquipement().getEquipement(database.getEquipement().getSlotFromEquipement(item))) {
                        database.getEquipement().removeEquipement(database.getEquipement().getSlotFromEquipement(item))
                    }
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
            for(let key of Object.keys(variables.equipementRectangles)) {
                let rect = variables.equipementRectangles[key]
                if(rect.isFilled) {
                    if(database.data.inventory.getItem(item)) {
                        database.data.inventory.removeItem(database.data.equipement.getItem(key))
                    }
                    if(database.data.equipement.getEquipement(key)) {
                        if(database.data.equipement.getEquipement(key) != database.getItem(item.id)) {
                            database.data.inventory.addItemToInventory(item)
                        }
                    } 
                    database.data.equipement.addItemToEquipement(item, key)
                } else {
                    i++;
                }
                rect.isFilled = false;
                rect.obj.clearTint()
            }
            if(totalRects == i) {
                database.data.inventory.removeItem(item)
                database.data.equipement.removeEquipement(item)
            }
            console.log(database.getEquipement())
            console.log(database.getInventory())
            updateAllSprites()
        })
    }
}

function updateAllSprites() {
    for(let sprite of Object.values(variables.sprites)) {
        assignSpriteToInventorySlot(sprite)
        assignSpriteToEquipementSlot(sprite)
    }
}

function assignSpriteToInventorySlot(sprite) {
    let item = database.getItem(sprite.id);
    if(item) {
        let slot = database.getInventory().getSlotFromItem(item);
        if(slot != undefined && slot != NaN) {
            let j = Math.floor(slot / visualVars.columnAmount)
            let i = slot - j * visualVars.columnAmount;
            let rect = variables.inventoryRectangles[i + '_' + j]
            sprite.obj.x = rect.x
            sprite.obj.y = rect.y
        }
    }
}

function assignSpriteToEquipementSlot(sprite) {
    let item = database.getItem(sprite.id);
    if(item) {
        let slot = database.getEquipement().getSlotFromEquipement(item);
        if(slot != undefined && slot != NaN) {
            let rect = variables.equipementRectangles[slot]
            sprite.obj.x = rect.x
            sprite.obj.y = rect.y
        }
    }
}

