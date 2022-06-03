function Aura(name, effect, range, description) {
	this.id = uuidv4();

	this.name = name;

	this.effect = effect

	this.range = range

	this.description = description

	this.getAuraDescription = function() {
		return this.description
	}

	database.addAura(this);
}

new Aura(skillNames.DIAMOND_SKIN_AURA,
	function(infos) {
		let character = infos.character;
		let intelligence = character.stats.intelligence
		character.armor = character.armor + 1 + Math.ceil(intelligence/10)
	}, 
	1, 
	function(infos) {
		let character = infos.character;
		let intelligence = character.stats.intelligence
		let increase = 1 + Math.ceil(intelligence/10)
		let description = 'Increase your armor by: ' + increase 
	})

new Aura(skillNames.GOLDEN_MIND_AURA,
	function(infos) {
		let character = infos.character;
		let intelligence = character.stats.intelligence
		character.magicArmor = character.magicArmor + 1 + Math.ceil(intelligence/10)
	}, 
	1, 
	function(infos) {
		let character = infos.character;
		let intelligence = character.stats.intelligence
		let increase = 1 + Math.ceil(intelligence/10)
		let description = 'Increase your magic armor by: ' + increase 
	})
