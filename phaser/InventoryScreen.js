class InventoryScreen extends Phaser.Scene {

    constructor (handle, parent)
    {
        super(handle);

        this.parent = parent;
        this.player = database.getCharacterByName('Hero')
        this.inventory = this.player.getInventory()
        this.equipement = this.player.getEquipement()

        this.middleWidth
        this.middleHeight
        this.infoBox
    }
    

    create() {

    let that = this

    
    let i = 0;

    let items = database.getItems();
    if(Object.values(this.inventory.getInventory()).length == 0){
        for(let item of Object.values(items)) {
            this.player.addItemToInventory(item)
        }
    }


    for(let elem of [...Object.values(this.inventory.getInventory()), ...Object.values(this.equipement.getAllEquipement())]) {
        if(elem != null) {
            elem = database.getItem(elem)
            let widthPlacement = visualVars.spriteBaseWidthPlacement + i * visualVars.spriteOffset
            let sprite = that.add.sprite(widthPlacement, visualVars.spriteBaseHeightPlacement, elem.associatedSprite.spriteSheet);
            sprite.setFrame(elem.associatedSprite.spriteNumber)
            i++;
            sprite.item_id = elem.id
            variables.sprites[elem.id] = {
                id: elem.id,
                obj: sprite,
                occupies: [placements.center],
            }    
            sprite['occupies'] = {
                9: true
            }
        }
    }
    let rectContainer = []

    let baseWidth = (config.width / visualVars.widthDivider) + visualVars.widthOffset
    let baseHeight = (config.height / visualVars.heightDivider) + visualVars.heightOffset

    let middleWidth = (baseWidth * 2 + visualVars.rectSpacing * (visualVars.columnAmount - 1) )/ 2
    let middleHeight = (baseHeight * 2 + visualVars.rectSpacing * (visualVars.lineAmount - 1)) /2 - visualVars.backgroundHeightOffset/2
    this.middleWidth = middleWidth
    this.middleHeight = middleHeight
    let rectWidth =  visualVars.rectSize*(visualVars.columnAmount + 2) +visualVars.backgroundWidthOffset
    let rectHeight =  visualVars.rectSize*(visualVars.lineAmount + 2) + visualVars.backgroundHeightOffset
    let backgroundRect = this.add.rectangle(0 , 0 ,rectWidth, rectHeight)
    backgroundRect.setStrokeStyle(visualVars.rectLineThickness, visualVars.rectLineColor)
    this.width = backgroundRect.width
    this.height = backgroundRect.height
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
                    x: width-middleWidth + this.width/2,
                    y: height-middleHeight + this.height/2,
                    isFilled : false,
                    i:i,
                    j:j,
                }
                rectContainer.push(rect)
                rect.setStrokeStyle(visualVars.rectLineThickness, visualVars.rectLineColor)
            }
        }
    }

    let equipementSlots = Object.keys(this.equipement.getAllEquipement());
    for(let key of equipementSlots) {
        let slotSprite = this.add.sprite(visualVars[key].widthOffset,visualVars[key].heightOffset, 'tileset3');
        slotSprite.setDepth(1)
        slotSprite.setFrame(visualVars[key].spriteFrame)
        slotSprite.alpha = visualVars.transparency
        variables.equipementRectangles[key] = {
            obj: slotSprite,
            isFilled: false,
            x: visualVars[key].widthOffset + this.width/2,
            y: visualVars[key].heightOffset + this.height/2,
        }
        rectContainer.push(slotSprite)
    }

    let inventoryScreen = this.add.container(backgroundRect.width/2, backgroundRect.height/2, rectContainer);
    inventoryScreen.setSize(backgroundRect.width, backgroundRect.height)

    this.updateAllSprites()

    for(let sprite of Object.values(variables.sprites)) {
        sprite = sprite.obj
        sprite.setInteractive()
        sprite.setDepth(2)

        this.input.setDraggable(sprite);

        sprite.on('pointerover', function(pointer, pointerX, pointerY) {
            let itemCounter = 0
            let item = database.getItem(sprite.item_id)
            let placement = {
                x: pointer.x,
                y: pointer.y,
                pointerX: pointerX,
                pointerY: pointerY
            }
            that.infoBox = that.createInfoBox(item, placement, that)
        })


        sprite.on('pointerout', function () {
            sprite.clearTint();
            that.infoBox.destroy()
        });

        sprite.on('drag', function (pointer, dragX, dragY) {
            that.infoBox.destroy()
            sprite.x = dragX;
            sprite.y = dragY;
            for(let rect of Object.values(variables.inventoryRectangles)) {
                if(rect.isFilled) {
                    rect.isFilled = false;
                }
                rect.obj.isFilled = false;
            }
            for(let rect of Object.values(variables.equipementRectangles)) {
                if(rect.isFilled) {
                    rect.isFilled = false;
                }
                rect.obj.clearTint()

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
                    let fillStyle = visualVars.validColor;
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
                        fillStyle = visualVars.invalidColor;
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
                    let fillStyle = visualVars.validColor;
                    let item = database.getItem(sprite.item_id);
                    if(!that.equipement.checkItemForSlot(item, key)) {
                        let targetItem = that.equipement.getEquipement(key)
                        if(targetItem) {
                            variables.sprites[targetItem].obj.tint = visualVars.invalidColor 
                        }
                        fillStyle = visualVars.invalidColor
                    } else {
                        let targetItem = that.equipement.getEquipement(key)
                        if(targetItem) {
                            variables.sprites[targetItem].obj.tint = visualVars.validColor 
                        }
                        rect.isFilled = true;
                    }
                    obj.tint = fillStyle
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
                    let slot = parseInt(i) * visualVars.columnAmount + parseInt(j)
                    if(that.equipement.getEquipement(that.equipement.getSlotFromEquipement(item))) {
                        console.log(1)
                        that.player.removeItemFromEquipement(item)
                        if(that.inventory.getItem(slot)) {
                            slot = undefined
                        }
                        that.inventory.addItemToInventory(item, slot)
                    } else {
                        console.log('swap')
                        if(that.inventory.getItem(slot)) {
                            console.log(slot, that.inventory.getSlotFromItem(item))

                            that.inventory.swapItems({
                                itemOne: that.inventory.getItem(slot),
                                itemTwo: item,
                                slotOne: slot,
                                slotTwo: that.inventory.getSlotFromItem(item)
                            })
                        } else {
                            console.log('remove')
                            that.inventory.removeItem(item)
                            that.inventory.addItemToInventory(item, slot)
                        }
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
                    //that.player.removeItemFromEquipement(item)
                    let inventoryItem = that.inventory.getItem(that.inventory.getSlotFromItem(item))
                    if(inventoryItem) {
                        that.inventory.removeItem(inventoryItem)
                    }
                    if(that.equipement.getEquipement(key)) {
                        let equipementItem = database.getItem(that.equipement.getEquipement(key))
                        that.inventory.addItemToInventory(equipementItem)
                    } 
                    that.player.addItemToEquipement(item, key)
                } else {
                    i++;
                }
                rect.isFilled = false;
                rect.obj.clearTint()
            }
            that.updateAllSprites()
            that.player.updateCharacterInfos()
            console.log(that.player)
        })
    }
    this.updateAllSprites()

    this.cameras.main.setViewport(this.parent.x, this.parent.y+visualVars.windowGrabOffset, inventoryScreen.width, inventoryScreen.height);

}

    updateAllSprites() {
        for(let sprite of Object.values(variables.sprites)) {
            this.assignSpriteToInventorySlot(sprite)
            this.assignSpriteToEquipementSlot(sprite)
        }
    }

    assignSpriteToInventorySlot(sprite) {
        let item = database.getItem(sprite.id);
        if(item) {
            let slot = this.inventory.getSlotFromItem(item);
            if(slot != undefined && slot != NaN) {
                let j = Math.floor(slot / visualVars.columnAmount)
                let i = slot - j * visualVars.columnAmount;
                let rect = variables.inventoryRectangles[j + '_' + i]
                sprite.obj.x = rect.x
                sprite.obj.y = rect.y
            }
        }
    }

    assignSpriteToEquipementSlot(sprite) {
        let item = database.getItem(sprite.id);
        if(item) {
            let slot = this.equipement.getSlotFromEquipement(item);
            if(slot != undefined && slot != NaN) {
                let rect = variables.equipementRectangles[slot]
                sprite.obj.x = rect.x
                sprite.obj.y = rect.y
            }
        }
    }

    createInfoBox(item, placement, that) {
         let x = placement.x - that.middleWidth / 2
        let y = placement.y - that.middleHeight /2
        let text = item.getDescription();
        let heightOffset = 5
        var style = { font: "10px Arial", fill: "#000000", align: "center" };3
        var t = that.add.text(x,y, text, style);
        t.x = x - t.width/2 - placement.pointerX -visualVars.rectSpacing
        t.y = y -t.height - placement.pointerY - heightOffset
        t.setDepth(4)
        return t
    }

    refresh() {

        this.cameras.main.setPosition(this.parent.x, this.parent.y+visualVars.windowGrabOffset);

        this.scene.bringToTop()
    }
}