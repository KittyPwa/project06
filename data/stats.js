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


}