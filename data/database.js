function Database() {
	this.data = {
		items: {},
		player: {},
		inventory: {},
		equipement: {},
		spots: {},
		terrains: {},
		characters: {},
		skills: {},
		auras: {},
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
		this.data.equipement[equipement.id] = equipement
	}

	this.getEquipement = function(id) {
		return this.data.equipement[id];
	}

	//-------TERRAIN--------------

	this.addTerrain = function(terrain) {
		this.data.terrains[terrain.id] = terrain
	}

	this.getTerrain = function(id) {
		return this.data.terrains[id];
	}

	//-------SPOT----------------

	this.addSpot = function(spot) {
		this.data.spots[spot.id] = spot
	}	

	this.getSpot = function(i,j) {
		return this.data.spots[i+'_'+j]
	}

	this.getSpotById = function(id) {
		return this.data.spots[id];
	}

	//------CHARACTER-----------

	this.addCharacter = function(character) {
		this.data.characters[character.id] = character
	}

	this.getCharacter = function(id) {
		return this.data.characters[id];
	}

	this.getCharacterByName = function(name) {
		return Object.values(this.data.characters).filter(e => e.name == name)[0]			
	}

	//------SKILL--------------

	this.addSkill = function(skill) {
		this.data.skills[skill.id] = skill
	}

	this.getSkill = function(id) {
		return this.data.skills[id] 
	}

	this.getSkillByName = function(name) {
		return Object.values(this.data.skills).filter(e => e.name == name)[0]			
	}

	this.getActiveSkills = function() {
		return Object.values(this.data.skills).filter(e => !e.isAura)
	}

	this.getPassiveSkills = function() {
		return Object.values(this.data.skills).filter(e => e.isAura)
	}

	//---------AURA-----------------

	this.addAura = function(aura)  {
		this.data.auras[aura.id] = aura
	}

	this.getAura = function(id) {
		return this.data.auras[id]
	}

	this.getAuraByName = function(name) {
		return Object.values(this.data.auras).filter(e => e.name == name)[0]
	}
}

let database = new Database();