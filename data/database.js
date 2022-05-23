function Database() {
	this.data = {
		items: {},
		player: {},
		inventory: null,
	};

	//--------ITEMS-----------------

	this.addItemToDatabase = function(toAdd) {
		this.data.items[toAdd.id] = toAdd;
	}

	this.getItem = function(id) {
		return this.data.items[id];
	}

	//--------INVENTORY-------------

	this.addInventoryToDatabase = function(inventory) {
		this.data.inventory = inventory;
	}

	this.getInventory = function() {
		return this.data.inventory;
	}
}

let database = new Database();