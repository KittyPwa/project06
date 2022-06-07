function Terrain(size) {
	this.id = uuidv4();
	
	this.width = size;

	this.length = size;

	this.terrain = []

	database.addTerrain(this)

	for(let i = 0; i < this.width; i++) {
		this.terrain[i] = []
		for(let j = 0; j < this.length; j++) {
			this.terrain[i][j] = new Spot(i,j)
		}
	}

	this.getDistanceBetweenSpots = function(spotA, spotB) {
	return Math.sqrt((spotA.i - spotB.i)**2 + (spotA.j - spotB.j)**2)
}

	this.getSpotsInRange = function(spotOrigin, range) {
		let newI
		let newJ
		let spots = []
		let spot
		for(let i = -1 * range; i <= range; i++) {
			newI = i + spotOrigin.i
			for(let j = -1 * range; j <= range; j++) {
				newJ = j + spotOrigin.j
				if(i != 0 || j != 0) {
					spot = database.getSpot(newI, newJ)
					if(spot) {
						if(this.getDistanceBetweenSpots(spotOrigin, spot) <= range)
							spots.push(spot)						
					}
				}
			}
		}
		return spots
	}
}

