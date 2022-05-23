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
    for(let elem of Object.values(database.data.items)) {
        let sprite = this.add.image(config.width/2, config.height/2, elem.associatedSprite);
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
    let backgroundRect = this.add.rectangle(config.width/4 + constants.rectSize, config.height/4 + constants.rectSpacing, constants.rectSize*(constants.columnAmount + 2), constants.rectSize*(constants.lineAmount + 2))
    backgroundRect.setStrokeStyle(constants.rectLineThickness, constants.rectLineColor)
    rectContainer.push(backgroundRect)
    for(let i = 0; i < constants.columnAmount; i++ ) {
        for(let j = 0; j < constants.lineAmount; j++) {
            let width = config.width/4 + constants.rectSpacing * i
            let height = config.height/4 + constants.rectSpacing * j
            var rect = this.add.rectangle(width, height, constants.rectSize, constants.rectSize);
            variables.rectangles[i + '_' + j] = {
                obj: rect,
                x: width,
                y: height,
                isFilled : false,
                i:i,
                j:j,
            }
            rectContainer.push(rect)
            counter++;
            rect.setStrokeStyle(constants.rectLineThickness, constants.rectLineColor)
        }
    }
    console.log(backgroundRect)
    let inventoryScreen = this.add.container(0, 0, rectContainer);
    inventoryScreen.setSize(rectContainer.width, rectContainer.height)
    inventoryScreen.setInteractive()

    inventoryScreen.on('drag', function (pointer, dragX, dragY) {
            this.x = dragX;
            this.y = dragY;

        });

    inventoryScreen.on('pointerover', function() {
        console.log('hi')
    })

    sky.setScale(2)

    
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
    }

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        gameObject.x = dragX;
        gameObject.y = dragY;
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
                    if(gameObject.occupies[placement.id]) {
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

    this.input.on('dragend', function(pointer, gameObject) {
        for(let key of Object.keys(variables.rectangles)) {
            let rect = variables.rectangles[key]
            if(rect.isFilled) {
                let keys = key.split('_')
                let i = keys[0]
                let j = keys[1]
                let slot = parseInt(j) * constants.columnAmount + parseInt(i)
                let item = database.getItem(gameObject.item_id);
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
            } 
            rect.isFilled = false;
            rect.obj.isFilled = false;
        }
        for(let sprite of Object.values(variables.sprites)) {
            assignSpriteToSlot(sprite)
        }
    })
    
    

    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis

    //  Collide the player and the stars with the platforms
    //this.physics.add.collider(player.sprite, walls);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
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

