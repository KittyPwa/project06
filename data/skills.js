function Skill(name, effect, isAura, effectDescription) {
	this.id = uuidv4();

	this.name = name;

	this.effect = effect;

	this.launchEffect = function(infos) {
		this.effect(infos);
	}

	this.aura = isAura;

	this.effectDescription = effectDescription;

	this.getEffectDescription = function(infos) {
		this.effectDescription(infos)
	}

	database.addSkill(this)
}

new Skill(skillNames.STRIKE,
	function(infos){
		let character = infos.character;
		let mainhand = database.getItem(character.getEquipement().getEquipement(equipementVars.MAINHAND))
		let offhand = database.getItem(character.getEquipement().getEquipement(equipementVars.OFFHAND))
		let strength = character.stats.strength
		let agility = character.stats.agility
		let damageMain = getRandomInt(mainhand.damageMin, mainhand.damageMax) * (1 + strength / 100)
		console.log(damageMain) 
		let foe = infos.foe
		foe.recieveDamage(damageMain, this.name)
		if(offhand && offhand.type == itemVars.WEAPON) {
			let damageOff = getRandomInt(offhand.damageMin, offhand.damageMax) * (1 + strength / 100)
			foe.recieveDamage(damageOff, this.name)
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
		let ret = 'Strike foe for ' + minDamage + '-' + maxDamage + 'with ' + mainhand.name
		if(offhand && offhand.type == itemVars.WEAPON) {
			let minDamage = offhand.damageMin * (1 + strength / 100) 
			let maxDamage = offhand.damageMan * (1 + strength / 100)
			ret += ' and for ' + minDamage + '-' + maxDamage + 'with ' + offhand.name 
		}
});

function createBaseAuraSkill(name) {
	new Skill(name,
		function(infos){

		}, 
		true,
		function(infos) {
			let aura = database.getAuraByName(name);
			let description = aura.getDescription()
			return description(infos)
		})
}

createBaseAuraSkill(skillNames.DIAMOND_SKIN_AURA)
createBaseAuraSkill(skillNames.GOLDEN_MIND_AURA)