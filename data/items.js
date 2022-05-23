function Item(name, sprite) {
	this.id = uuidv4();

	this.name = name;

	this.inInventory = false;

	this.inEquipement = false;

	this.associatedSprite = sprite

	database.addItemToDatabase(this)
}
new Item('star', 'star')
new Item('bomb', 'bomb')