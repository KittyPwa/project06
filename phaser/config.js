visualVars.lineAmount = Math.ceil(database.data.inventory.inventorySize / visualVars.columnAmount);
var width =  visualVars.rectSize*(visualVars.columnAmount + 2) +visualVars.backgroundWidthOffset
var height =  visualVars.rectSize*(visualVars.lineAmount + 2) + visualVars.backgroundHeightOffset

class Controller extends Phaser.Scene {

    constructor ()
    {
        super();

        this.inventoryOpen = false;
        this.pathfindOpen = false;

        this.keyI = null;
    }

    preload () {
        this.load.image('sky', 'phaser/assets/sky.png');
        this.load.image('ground', 'phaser/assets/platform.png');
        this.load.image('star', 'phaser/assets/star.png');
        this.load.image('bomb', 'phaser/assets/bomb.png');
        this.load.spritesheet('tilesets', 'phaser/assets/tilesets.png', { frameWidth: 32, frameHeight:32});
        this.load.spritesheet('tileset3', 'phaser/assets/tileset3.jpg', { frameWidth: 25, frameHeight: 25 });
    }

    create() {
        this.keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
        this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        this.keyTest = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
        var sky = this.add.image(0, 0, 'sky');
        sky.setScale(2)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.keyI)) {
            if(!this.inventoryOpen) {
                this.inventoryOpen = true;
                this.createWindow(InventoryScreen, 'inventoryScreen')
            } else {
                this.inventoryOpen = false;
                this.scene.remove('inventoryScreen')
            }
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyP)) {
            if(!this.pathfindOpen) {
                this.pathfindOpen = true;
                this.createWindow(TerrainScreen, 'terrainScreen')
            } else {
                this.pathfindOpen = false;
                this.scene.remove('terrainScreen')
            }
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyTest)) {
            let player = database.getCharacterByName('Hero');
            let foe = database.getCharacterByName('Evil');
            for(let skillId of Object.keys(player.skills)) {
                let skill = database.getSkill(skillId)
                let infos = {
                    character: player,
                    foe: foe,
                }
                skill.launchEffect(infos)
            }
        }
    }

    createWindow (func, handle) {
        var x = 250
        var y = 100
        var win = this.add.zone(x, y, width, height+32).setInteractive().setOrigin(0);

        var screen = new func(handle, win);

        this.input.setDraggable(win);

        win.on('drag', function (pointer, dragX, dragY) {
            this.setPosition(dragX, dragY)
            //win.x = dragX
            //win.y = dragY
            screen.refresh()
        });

        win.on('pointover', function() {
            console.log('pointed win')
        })

        this.scene.add(handle, screen, true);
    }
}

    var config = {
        type: Phaser.AUTO,
        width: visualVars.screenWidth,
        height: visualVars.screenHeight,
        backgroundColor: '#010101',
        parent: 'phaser-example',
        scene: [Controller],
        physics: {
            default: 'arcade',
            arcade: {
                debug: false,
                gravity: { y: 0 }
            }
        }
    };

    var game = new Phaser.Game(config);

