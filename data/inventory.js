function Inventory(inventorySize) {
	this.items = {}

	this.inventorySize = inventorySize;

	database.addInventoryToDatabase(this);

	this.addItemToInventory = function(item, slot) {
		console.log(slot)
		console.log(item)
		this.items[slot] = item.id;
		item.inInventory = true;
		item.inEquipement = false;
	}

	this.getItem = function(slot) {
		return database.getItem(this.items[slot])
	}

	this.getSlotFromItem = function(item) {
		let asArray = Object.entries(this.items)
		let arraySlot = asArray.filter(([key, value]) => value == item.id)[0]
		let slot = undefined
		if(arraySlot) {
			slot = arraySlot[0]
		}
		return parseInt(slot);
	}

	this.swapItems = function(itemsObj) {
		this.addItemToInventory(itemsObj.itemOne, itemsObj.slotTwo)
		this.addItemToInventory(itemsObj.itemTwo, itemsObj.slotOne)
	}

	this.removeItemFromSlot = function(slot) {
		if(this.items[slot]) {
			let item = database.data.items[this.items[slot]]
			delete this.items[slot];
			item.inInventory = false;
		}
	}

	this.removeItem = function(item) {
		let slot = this.getSlotFromItem(item)
		this.removeItemFromSlot(slot);
	}
}

function Equipement() {

}

new Inventory(12);
