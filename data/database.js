function Database() {
	this.data = {
		items: {},
		player: {},
		inventory: null,
		equipement: null,
		spots: {},
		terrain: null,
	};

	//--------ITEMS-----------------

	this.addItemToDatabase = function(toAdd) {
		this.data.items[toAdd.id] = toAdd;
	}

	this.getItem = function(id) {
		return this.data.items[id];
	}

	this.getItems = function() {
		return this.data.items;
	}

	//--------INVENTORY-------------

	this.addInventoryToDatabase = function(inventory) {
		this.data.inventory = inventory;
	}

	this.getInventory = function() {
		return this.data.inventory;
	}

	//------EQUIPEMENT------------

	this.addEquipementToDatabase = function(equipement) {
		this.data.equipement = equipement
	}

	this.getEquipement = function() {
		return this.data.equipement;
	}

	//-------TERRAIN--------------

	this.addTerrain = function(terrain) {
		this.data.terrain = terrain
	}

	this.getTerrain = function() {
		return this.data.terrain;
	}

	//-------SPOT----------------

	this.addSpot = function(spot) {
		this.data.spots[spot.id] = spot
	}	

	this.getSpot = function(i,j) {
		return this.data.spots[i+'_'+j]
	}
}

let database = new Database();