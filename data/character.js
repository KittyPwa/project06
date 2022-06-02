function Character(name, hpMax, strength, agility, intelligence) {
	this.id = uuidv4();

	this.name = name

	this.hpMax = getRandomInt(hpMax/4, hpMax)

	this.currentHp = this.hpMax

	this.stats = new Stats(strength, agility, intelligence)

	this.equipement = new Equipement();

	this.getEquipement = function() {
		return this.equipement;
	}

	this.getInventory = function() {
		return this.inventory;
	}

	this.addItemToInventory = function(item) {
		this.inventory.addItemToInventory(item);
	}

	this.removeItemFromInventory = function(item) {
		this.inventory.removeItemFromInventory(item);
	}

	this.addItemToEquipement = function(item, slot) {
		this.equipement.addItemToEquipement(item, slot)
		this.updateSkills()
	}

	this.removeItemFromEquipement = function(item) {
		this.equipement.removeEquipement(item)
		this.updateSkills()
	}

	this.recieveDamage = function(foe, damage, item, skill) {
		damage = Math.ceil(damage)
		let description = foe.name + ' attacks ' + this.name + '. '+ this.name + ' takes ' + damage + ' from ' + skill.name + ' with ' + item.name
		console.log(description)
		this.currentHp -= damage - this.armor
		if(this.currentHp < 0) {
			this.killThis()
		}
	}

	this.killThis = function() {
		let description = this.name + ' dies'
		console.log(description)
	}

	this.inventory = new Inventory(constants.inventorySize);

	this.race = {}

	this.skills = {};

	this.armor = 0;

	this.magicArmor = 0;

	database.addCharacter(this)

	this.updateSkills = function() {
		for(let equipementId of Object.values(this.equipement.getAllEquipement())) {
			if(equipementId != null){
				let item = database.getItem(equipementId)
				let skills = item.skills
				for(let skillId of skills) {
					let skill = database.getSkillByName(skillId)
					this.skills[skill.id] = skill.name;
				}
			}
		}
	}
}

var me = new Character('Hero', 10, 10, 8, 5)
var foe = new Character('Evil', 12, 5, 2, 4)