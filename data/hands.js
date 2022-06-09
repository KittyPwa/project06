function Hand() {
	this.id = uuidv4()

	database.addHand(this)

	this.handSize = handVars.handSize

	this.cards = {}

	this.addCard = function(card, slot) {
		if(!slot) {
			let cards = Object.values(this.cards)
			slot = cards.length
		}
		if(!this.getCardById(card.id)) {
			this.cards[slot] = card.id
		}
	}

	this.removeCard = function(slot) {
		delete this.cards[slot]
	}

	this.getCard = function(slot) {
		return this.hand[slot] 
	}

	this.getCardById = function(id) {
		return Object.values(this.cards).filter(e => e == id)[0]
	}

	this.removeCardById = function(card) {
		let cardKeys = Object.keys(this.hand);
		let toRemove = cardKeys.filter(e => this.getCard(e) == card.id)
		for(let cardToR of toRemove) {
			this.removeCard(cardToR)
		}
	}

	this.drawFull = function() {
		let hero = database.getHero()
		let cardsAmountInHand = Object.values(this.cards).length
		console.log(hero.getDeck())
		let deck = database.getDeck(hero.getDeck())
		let topCards = deck.getTopCards(this.handSize - cardsAmountInHand)
		let discard = database.getDiscard(hero.getDiscard())
		for(let topCard of topCards) {
			let card = database.getCard(topCard)
			this.addCard(card)
		}
	}

}