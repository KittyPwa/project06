class CombatScreen extends Phaser.Scene {

    constructor (handle, parent)
    {
        super(handle);

        this.parent = parent;
        this.terrain
        this.backgroundRect
    }
    
    tempCreateTerrain() {
		this.terrain = new Terrain(10)	    
    }

    create() {

	    let that = this
	    if(!database.getTerrain()) {
	    	this.tempCreateTerrain()
	    }

	    let terrain = this.terrain

	    let backgroundRect = this.add.rectangle(0,0 ,terrain.width*terrainVars.tileSize, terrain.length*terrainVars.tileSize)
	    this.backgroundRect = backgroundRect
	    backgroundRect.setStrokeStyle(visualVars.rectLineThickness, visualVars.rectLineColor)
	    let spriteContainer = []
	    spriteContainer.push(backgroundRect)
	    let spotsObj = {}
	    for(let i = 0; i < terrain.width; i++) {
	    	for(let j = 0; j < terrain.length; j++) {
	    		let spot = database.getSpot(i,j);
				let widthPlacement = terrainVars.tileSize * i + terrainVars.tileSize/2 - backgroundRect.width/2
				let heightPlacement = terrainVars.tileSize * j + terrainVars.tileSize/2 - backgroundRect.height/2
				let tile = terrainVars.tile
	    		if(!spot.accessible) {
	    			tile = terrainVars.wall
	    		}
	    		var text = i + ','+j;
			    var style = { font: "10px Arial", fill: "#000000", align: "center" };

			    var t = this.add.text(widthPlacement, heightPlacement, text, style);
	    		let sprite = this.add.sprite(widthPlacement, heightPlacement, 'tilesets', tile);
	    		spriteContainer.push(sprite)
	    		spriteContainer.push(t)
	    		spotsObj[spot.id] = {
	    			spot: spot,
	    			obj: sprite,
	    		}
	    	}
	    }
	    

	    let characters = []
	    characters.push(database.getCharacterByName('Hero'))
	    characters.push(database.getCharacterByName('Evil'))
	    let goodSpot = database.getSpot(0,0)
	    let badSpot = database.getSpot(9,9)
	    characters[0].position = goodSpot.id
	    characters[1].position = badSpot.id

	    let characterContainer = []
	    let  characterObj = {}

	    for(let character of characters) {
	    	let spot = database.getSpotById(character.position);
	    	let widthPlacement = terrainVars.tileSize * spot.i + terrainVars.tileSize/2 - backgroundRect.width/2
			let heightPlacement = terrainVars.tileSize * spot.j + terrainVars.tileSize/2 - backgroundRect.height/2
	    	let sprite = this.add.sprite(widthPlacement, heightPlacement, character.sprite.spriteSheet, character.sprite.spriteNumber);
	    	characterContainer.push(sprite)
    		characterObj[spot.id] = {
    			character: character,
    			obj: sprite,
    		}
	    }

	    let terrainScreen = this.add.container(backgroundRect.width/2, backgroundRect.height/2, [...spriteContainer, ...characterContainer]);
	    terrainScreen.setSize(backgroundRect.width, backgroundRect.height)
	    
	    let oldSpot = database.getSpotById('0_0')
	    let newSpot = database.getSpotById('0_2')
	    this.updateSpritePosition(characterObj[oldSpot.id].obj, newSpot, that)
	    this.terrain.getSpotsInRange(oldSpot, 3)

	    this.cameras.main.setViewport(this.parent.x, this.parent.y+visualVars.windowGrabOffset, terrainScreen.width, terrainScreen.height);
	}

	updateSpritePosition(sprite, newSpot, that) {
	    let widthPlacement = terrainVars.tileSize * newSpot.i + terrainVars.tileSize/2 - that.backgroundRect.width/2
		let heightPlacement = terrainVars.tileSize * newSpot.j + terrainVars.tileSize/2 - that.backgroundRect.height/2
		sprite.x = widthPlacement
		sprite.y = heightPlacement
	}

	refresh() {

        this.cameras.main.setPosition(this.parent.x, this.parent.y+visualVars.windowGrabOffset);

        this.scene.bringToTop()
    }

}