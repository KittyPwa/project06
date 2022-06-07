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


