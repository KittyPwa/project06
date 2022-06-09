function Character(name, hpMax, strength, agility, intelligence, spriteInfos, faction) {
	this.id = uuidv4();

	this.name = name

	this.faction = faction

	this.baseHpMax = getRandomInt(hpMax/4, hpMax)

	this.hpMax = this.baseHpMax

	this.currentHp = this.hpMax

	this.stats = new Stats(strength, agility, intelligence)

	this.equipement = new Equipement();

	this.getEquipement = function() {
		return this.equipement;
	}

	this.getInventory = function() {
		return this.inventory;
	}

	this.getDescription = function() {
		let description = '';
		if(this.armor) {
			let bonusArmor = this.armor - this.baseArmor
			description += 'Armor : ' + this.baseArmor + ' + (' + bonusArmor + ') \n'
		}
		if(this.magicArmor) {
			let bonusMagicArmor = this.magicArmor - this.baseMagicArmor
			description += 'Magic Armor : ' + this.baseMagicArmor + ' + (' + bonusMagicArmor + ') \n'
		}
		if(this.stats) {
			description += this.stats.getDescription()
		}
		if(this.skills) {
			description += 'Skills : \n'
			for(let skillName of Object.values(this.skills)) {
				description += skillName + '\n'
			}
		}
		return description;
	}

	this.addItemToInventory = function(item) {
		this.inventory.addItemToInventory(item);
	}

	this.removeItemFromInventory = function(item) {
		this.inventory.removeItemFromInventory(item);
	}

	this.addItemToEquipement = function(item, slot) {
		this.equipement.addItemToEquipement(item, slot)
		this.updateCharacterInfos()
	}

	this.removeItemFromEquipement = function(item) {
		this.equipement.removeEquipement(item)
		let skillNames = item.skills
		let skills = []
		for(let skillName of skillNames) {
			this.removeSkill(database.getSkillByName(skillName))
		}
	}

	this.getActiveSkills = function() {
		let ret = []
		for(let skillId of Object.keys(this.skills)) {
			let skill = database.getSkill(skillId);
			if(!skill.aura) {
				ret.push(skill.id)
			}
		}
		return ret
	}

	this.removeSkill = function(skill) {
		if(skill.aura) {
			this.removeAura(database.getAuraByName(skill.name))
		}
		delete this.skills[skill.id];
		this.updateCharacterInfos()
	}

	this.recieveDamage = function(damage, source) {
		damage = Math.ceil(damage)
		let description =this.name + ' takes ' + damage + ' damage from ' + source
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

	this.baseArmor = 0 + Math.ceil(this.stats.agility/4);

	this.armor = this.baseArmor;

	this.baseMagicArmor = 0 + Math.ceil(this.stats.intelligence/4);

	this.magicArmor = this.baseMagicArmor;

	this.auras = {}

	this.updateAuras = function() {
		for(let skillId of Object.keys(this.skills)) {
			let skill = database.getSkill(skillId);
			if(skill.aura) {
				let aura = database.getAuraByName(skill.name);
				this.auras[aura.id] = aura.name;
			}
		}
	}

	this.updateCharacterInfos = function() {
		this.cleanCharacter()
		this.updateCharacterWithItem()
		this.applyItemStats()
		this.updateSkills()
		this.updateDeck()
		this.updateAuras()
		this.applyAuras()
	}

	this.applyItemStats = function() {

	}

	this.cleanCharacter = function() {
		this.hpMax = this.baseHpMax
		this.stats.cleanStats()
	 	this.armor = this.baseArmor
	 	this.magicArmor = this.baseMagicArmor
	}

	this.applyAuras = function() {
		for(let auraId of Object.keys(this.auras)) {
			let aura = database.getAura(auraId);
			let infos = {
				character: this,
			}
			aura.effect(infos)
		}
	}

	this.updateCharacterWithItem = function() {
		for(let equipementId of Object.values(this.equipement.getAllEquipement())) {
			if(equipementId != null) {
				let item = database.getItem(equipementId);
				if(item.armor) {
					this.armor += item.armor
				}
				if(item.magicArmor) {
					this.magicArmor += item.magicArmor
				}
			}
		}
	}

	this.removeAura = function(aura) {
		delete this.auras[aura.id];
	}

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

	this.deck

	this.assignDeck = function(deck) {
		this.deck = deck.id
	}

	this.getDeck = function() {
		return this.deck
	}

	this.updateDeck = function() {
		let deck = database.getDeck(this.getDeck());
		deck.updateDeck()
	}

	this.discard

	this.assignDiscard = function(discard) {
		this.discard = discard.id
	}

	this.getDiscard = function() {
		return this.discard
	}

	this.movementSpeed = 1 + Math.floor(this.stats.agility / 5)

	this.availableMovementSpeed = this.movementSpeed

	//------VISUALS-----------

	this.position

	this.sprite = spriteInfos
}

