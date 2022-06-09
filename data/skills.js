function Skill(name, effect, isAura, effectDescription, rank, base) {
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

	this.base = base

	this.checkAndDamage = function(infos) {
		if(infos.item) {
			let skillIsPresent = infos.item.hasSkill(this.id)
			if(skillIsPresent) {
				this.damage(infos)
			}
		}
	}

	this.damage = function(infos) {
		let damage = 0
		switch(this.base) {
			case skillBases.ITEM:
				if(infos.item) {
					if(!infos.itemModifier) {
						infos['itemModifier'] = 1
					}
					damage = infos.damage.getDamageWithModifier(infos.itemModifier)
				}
				break;
			case skillBases.OTHER:
				if(infos.damage) {
					damage = infos.damage
				}
				break;
			default:
				break;
		}
		infos.character.dealDamage(damage, infos.foe, this)
	}

	this.checkAndDescribe = function(infos) {
		if(infos.item) {
			let skillIsPresent = infos.item.hasSkill(this.id)
			if(skillIsPresent) {
				let damageMain = infos.item.getDamageWithModifier(infos.modifier)
				let minDamage = infos.item.damageMin * infos.modifier;
				let maxDamage = infos.item.damageMan * infos.modifier;
				return 'Strike foe for ' + minDamage + '-' + maxDamage + 'with ' + infos.item.name
			}
		}
	}

	this.describe = function(infos) {
		
	}
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
		},
		rank,
		skillBases.OTHER)
}