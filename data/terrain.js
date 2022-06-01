function Terrain(size) {
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
}

