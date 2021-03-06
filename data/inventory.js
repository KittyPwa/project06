function Inventory(inventorySize) {
	this.id = uuidv4()

	this.items = {}

	this.inventorySize = inventorySize;

	database.addInventoryToDatabase(this);

	this.addItemToInventory = function(item, slot) {
		if(!slot) {
			slot = 0;
			while(this.getItem(slot) && slot < this.inventorySize) {
				slot++
			}
		}
		this.items[slot] = item.id;
	}

	this.getItem = function(slot) {
		return database.getItem(this.items[slot])
	}

	this.getInventory = function() {
		return this.items
	}

	this.getSlotFromItem = function(item) {
		let asArray = Object.entries(this.items)
		let arraySlot = asArray.filter(([key, value]) => value == item.id)[0]
		let slot = undefined
		if(arraySlot) {
			slot = parseInt(arraySlot[0])
		}
		return slot;
	}

	this.swapItems = function(itemsObj) {
		this.removeItemFromSlot(itemsObj.slotOne)
		this.removeItemFromSlot(itemsObj.slotTwo)
		this.addItemToInventory(itemsObj.itemOne, itemsObj.slotTwo)
		this.addItemToInventory(itemsObj.itemTwo, itemsObj.slotOne)
	}

	this.removeItemFromSlot = function(slot) {
		if(this.items[slot]) {
			let item = database.data.items[this.items[slot]]
			delete this.items[slot];
		}
	}

	this.removeItem = function(item) {
		let slot = this.getSlotFromItem(item)
		this.removeItemFromSlot(slot);
	}
}

