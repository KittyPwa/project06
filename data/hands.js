function Hand(rank) {
	this.id = uuidv4()

	database.addHand(this)

	this.cards = {}

	this.addCard = function(card, slot) {
		if(!slot) {
			let cards = Object.values(this.cards)
			slot = cards.length
		}
		if(!this.getCardById(card.id)) {
			this.cards[slot] = card.id
		}
		console.log(card)
		console.log(this.cards)
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

	this.updateHand = function() {
		let cards = database.getCards()
		for(let card of cards) {
			if(this.rank == rankNames.COMMON) {
				if(card.rank == rankNames.COMMON) {
					this.addCard(card)
				}
			} else {
				if(card.rank != rankNames.COMMON) {
					this.addCard(card)
				}
			}
		}
	}

	this.rank = rank
}

function updateHands() {
	let hands = database.getHands()
	console.log(hands)
	for(let hand of hands) {
		hand.updateHand()
	}
	console.log(hands)
}