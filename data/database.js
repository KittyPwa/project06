function Database() {
	this.data = {
		items: {},
		player: {},
		inventory: null,
		equipement: null,
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
}

let database = new Database();