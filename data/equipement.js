function Equipement() {
	this.id = uuidv4()

	this.equipement = {
		mainhand: null,
		offhand: null,
		head: null,
		torso: null,
		legs: null,
		feet: null,
		amulet: null,
		rightRing: null,
		leftRing: null
	}

	database.addEquipementToDatabase(this);

	this.addItemToEquipement = function(item, slot) {
		this.equipement[slot] = item.id
	}

	this.checkItemForSlot = function(item, slot) {
		return item.slot.filter(e => e == slot).length > 0
	}

	this.removeEquipement =  function(item) {
		let slot = this.getSlotFromEquipement(item)
		this.removeEquipementFromSlot(slot);
	}

	this.removeEquipementFromSlot = function(slot) {
		if(this.getEquipement(slot)) {
			let item = database.data.items[this.equipement[slot]]
			this.equipement[slot] = null;
			item.inInventory = false;
		}
	}

	this.getEquipement = function(slot) {
		return this.equipement[slot];
	}

	this.getAllEquipement = function() {
		return this.equipement;
	}

	this.getSlotFromEquipement = function(item) {
		let asArray = Object.entries(this.equipement)
		let arraySlot = asArray.filter(([key, value]) => value == item.id)[0]
		let slot = undefined
		if(arraySlot) {
			slot = arraySlot[0]
		}
		return slot;
	}
}

new Equipement();