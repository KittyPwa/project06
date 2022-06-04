function Stats(strength,agility,intelligence) {
	this.baseStrength = strength

	this.baseAgility = agility

	this.baseIntelligence = intelligence

	this.strength = this.baseStrength;

	this.agility = this.baseAgility;

	this.intelligence = this.baseIntelligence;

	this.cleanStats = function() {
		this.strength = this.baseStrength;
		this.agility = this.baseAgility;
		this.intelligence = this.baseIntelligence;
	}

	this.getDescription = function() {
		let description = ''
		if(this.strength) {
			description += 'Strength : ' + this.strength + '\n'
		}
		if(this.agility) {
			description += 'Agility : ' + this.agility + '\n'
		}
		if(this.intelligence) {
			description += 'Intelligence : ' + this.intelligence + '\n'
		}
		return description
	}

}