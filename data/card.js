function Card(skill) {
	this.id = uuidv4()

	database.addCard(this)

	this.skill = skill.id;

	this.getDescription = function(infos) {
		let skill = database.getSkill(this.skill);
		return skill.getEffectDescription(infos)
	}

	this.name = skill.name

	this.rank = skill.rank
}

function updateCards() {
	let activeSkills = database.getActiveSkills();
	for(let activeSkill of activeSkills) {
		let card = new Card(activeSkill)
	}
	console.log(database.data.cards)
}