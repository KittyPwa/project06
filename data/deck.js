function Deck() {
	this.id = uuidv4()

	database.addDeck(this)

	this.cards = []

	this.addCard = function(card) {
		this.cards.push(card.id)
	}

	this.removeCard = function(card) {
		this.cards = this.cards.filter(e => e.id != card.id)
	}

	this.removeTopCards = function(amount) {
		this.cards = this.cards.slice(0,amount)
	}

	this.getTopCards = function(amount) {
		return this.cards.slice(0, amount);
	}

	this.updateDeck = function() {
		let hero = database.getHero()
		hero.assignDeck(this)
		let skills = hero.getActiveSkills();
		let cards = []
		for(let skillId of skills) {
			cards.push(skillId)
		}
		this.cards = cards;
	}

}