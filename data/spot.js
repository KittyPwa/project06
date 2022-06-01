function Spot(i,j) {
	this.i = i;

	this.j = j;

	this.id = i + '_' + j

	this.accessible = true

	database.addSpot(this)
}