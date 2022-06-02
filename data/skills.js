function Skill(name, effect, isPassive, effectDescription) {
	this.id = uuidv4();

	this.name = name;

	this.effect = effect;

	this.launchEffect = function(infos) {
		this.effect(infos);
	}

	this.passive = isPassive;

	this.effectDescription = effectDescription;

	this.getEffectDescription = function(infos) {
		this.effectDescription(infos)
	}

	database.addSkill(this)
}

new Skill('Strike',
	function(infos){
		let character = infos.character;
		let mainhand = database.getItem(character.getEquipement().getEquipement(equipementVars.MAINHAND))
		let offhand = database.getItem(character.getEquipement().getEquipement(equipementVars.OFFHAND))
		let strength = character.stats.strength
		let agility = character.stats.agility
		let damageMain = getRandomInt(mainhand.damageMin, mainhand.damageMax) * (1 + strength / 100) 
		let foe = infos.foe
		foe.recieveDamage(character, damageMain, mainhand, this)
		if(offhand && offhand.type == itemVars.WEAPON) {
			let damageOff = getRandomInt(offhand.damageMin, offhand.damageMax) * (1 + strength / 100)
			foe.recieveDamage(character, damageOff, offhand, this)
		}
},
	false,
	function(infos) {
		let character = infos.character;
		let mainhand = character.getEquipement().mainhand
		let offhand = character.getEquipement().offhand
		let strength = character.stats.strength
		let agility = character.stats.agility
		let minDamage = mainhand.damageMin * (1 + strength / 100) ;
		let maxDamage = mainhand.damageMan * (1 + strength / 100);
		let ret = 'Strike foe with for ' + minDamage + '-' + maxDamage + 'with ' + mainhand.name
		if(offhand && offhand.type == itemVars.WEAPON) {
			let minDamage = offhand.damageMin * (1 + strength / 100) 
			let maxDamage = offhand.damageMan * (1 + strength / 100)
			ret += ' and for ' + minDamage + '-' + maxDamage + 'with ' + offhand.name 
		}
})