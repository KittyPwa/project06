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
						spots.push(spot)						
					}
				}
			}
		}
		console.log(spots)
		return spots
	}
}

