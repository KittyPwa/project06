class TerrainScreen extends Phaser.Scene {

    constructor (handle, parent)
    {
        super(handle);

        this.parent = parent;
    }
    
    tempCreateTerrain() {
		new Terrain(10)

    	let spots = Object.values(database.data.spots);
		let terrain = database.getTerrain();
		spots = shuffleArray(spots);
		for(let i = 0; i < (terrain.width**2)/3; i++) {
			spots[i].accessible = false
		}

	    
    }

    create() {

	    let that = this
	    if(!database.getTerrain()) {
	    	this.tempCreateTerrain()
	    }
	    	let spotA = database.getSpot(9,9)
		    let spotB = database.getSpot(0,0)
		    spotA.accessible = true
		    spotB.accessible = true

	    let terrain = database.getTerrain();

	    let backgroundRect = this.add.rectangle(0,0 ,terrain.width*terrainVars.tileSize, terrain.length*terrainVars.tileSize)
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
	    let terrainScreen = this.add.container(backgroundRect.width/2, backgroundRect.height/2, spriteContainer);
	    terrainScreen.setSize(backgroundRect.width, backgroundRect.height)
	    
	    let path = pathfind(spotA, spotB)
	    for(let spot of path) {
	    	spotsObj[spot.id].obj.setTint(visualVars.validColor)
	    }
	    this.cameras.main.setViewport(this.parent.x, this.parent.y+visualVars.windowGrabOffset, terrainScreen.width, terrainScreen.height);
	}

	refresh() {

        this.cameras.main.setPosition(this.parent.x, this.parent.y+visualVars.windowGrabOffset);

        this.scene.bringToTop()
    }

}