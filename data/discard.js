function Discard() {
	this.id = uuidv4()

	database.addDiscard(this)

	this.pile = []

	this.discard = function(card) {
		this.pile.push(card.id)
	}

	this.emptyDiscard = function() {
		let hero = database.getHero()
		let deck = database.getDeck(hero.getDeck())
		for(let card of this.pile) {
			let card = database.getCard(card)
			deck.addCard(card)
		}
		this.pile =  []
	}
}