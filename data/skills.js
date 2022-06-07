function Skill(name, effect, isAura, effectDescription, rank) {
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

	this.rank = rank
}



function createBaseAuraSkill(name, rank) {
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