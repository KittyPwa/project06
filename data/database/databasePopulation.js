function populateDatabase() {
	populateSkills()
	populateItems()
	populateAuras()
	populateCharacters()
	populateDeck()
	populateCards()
	populateHands()
}

function populateDeck() {
	let deck = new Deck()
	deck.updateDeck()
}

function populateCards() {
	updateCards()
}

function populateHands() {
	let hand = new Hand()
}

function populateCharacters() {
	var me = new Character(characterVars.HERO, 10, 10, 8, 5, {
		spriteName:null,
		spriteSheet: 'tilesets',
		spriteNumber:129
	}, characterVars.ALLIED)
	var foe = new Character(characterVars.EVIL, 12, 5, 2, 4, {
		spriteName:null,
		spriteSheet: 'tilesets',
		spriteNumber:128
	}, characterVars.ENNEMY)
}

function populateAuras() {
	new Aura(skillNames.DIAMOND_SKIN_AURA,
	function(infos) {
		let character = infos.character;
		let intelligence = character.stats.intelligence
		character.armor = character.armor + 1 + Math.ceil(intelligence/10)
	}, 
	1, 
	function(infos) {
		let character = infos.character;
		let intelligence = character.stats.intelligence
		let increase = 1 + Math.ceil(intelligence/10)
		let description = 'Increase your armor by: ' + increase 
	})

new Aura(skillNames.GOLDEN_MIND_AURA,
	function(infos) {
		let character = infos.character;
		let intelligence = character.stats.intelligence
		character.magicArmor = character.magicArmor + 1 + Math.ceil(intelligence/10)
	}, 
	1, 
	function(infos) {
		let character = infos.character;
		let intelligence = character.stats.intelligence
		let increase = 1 + Math.ceil(intelligence/10)
		let description = 'Increase your magic armor by: ' + increase 
	})
}

function populateItems() {
	new Item('Crossbow',
	{
		spriteName:null,
		spriteSheet: 'tileset3',
		spriteNumber:12
	},
	['mainhand'],
	itemVars.WEAPON,
	{
		damageMin: 5,
		damageMax: 7,
		range: 4,
		price: 10,
		type: typeVars.PHYSICAL,
		rangeType: itemRangeVars.RANGE,
	}, 
	[skillNames.STRIKE]
)

new Item('Diamond Ring',
	{
		spriteName:null,
		spriteSheet: 'tileset3',
		spriteNumber:40
	},
	['rightRing', 'leftRing'],
	itemVars.ARMOR,
	{
		armor: 1,
		effects: {

		},
		price: 25
	},
	[skillNames.DIAMOND_SKIN_AURA]
)

new Item('Gold Ring',
	{
		spriteName:null,
		spriteSheet: 'tileset3',
		spriteNumber:39
	},
	['rightRing', 'leftRing'],
	itemVars.ARMOR,
	{
		armor: 1,
		effects: {

		},
		price: 20
	},
	[skillNames.FOCUS_BLAST]
)

new Item('Hand Axe',
	{
		spriteName:null,
		spriteSheet: 'tileset3',
		spriteNumber:15
	},
	['mainhand', 'offhand'],
	itemVars.WEAPON,
	{
		damageMin: 2,
		damageMax: 5,
		price: 10,
		type: typeVars.PHYSICAL,
		rangeType: itemRangeVars.MELEE,
	}, 
	[skillNames.STRIKE]
)

new Item('Dagger',
	{
		spriteName:null,
		spriteSheet: 'tileset3',
		spriteNumber:14
	},
	['mainhand', 'offhand'],
	itemVars.WEAPON,
	{
		damageMin: 1,
		damageMax: 3,
		price: 10,
		type: typeVars.PHYSICAL,
		rangeType: itemRangeVars.MELEE,
	}, 
	[skillNames.STRIKE]
)	
}
function populateSkills() {
	new Skill(skillNames.STRIKE,
	function(infos){
		let itemInfos = {
			modifier: 1 + infos.character.stats.strength / 100,
			character: infos.character,
			foe: infos.foe
		}
		let equipementWithSkill = infos.character.getEquipement().checkEquipementForSkill(this.id)
		for(let itemId of equipementWithSkill) {
			let item = database.getItem(itemId);
			itemInfos['item'] = item
			this.damage(itemInfos)
		}
	},
	false,
	function(infos) {
		let itemInfos = {
			modifier: 1 + infos.character.stats.strength / 100,
			item: database.getItem(infos.character.getEquipement().getEquipement(equipementVars.MAINHAND)),
			character: infos.character,
			foe: infos.foe
		}
		if(itemInfos.item) {
			this.checkAndDescribe(itemInfos)
		}
		itemInfos.item = database.getItem(infos.character.getEquipement().getEquipement(equipementVars.OFFHAND))
		if(itemInfos.item) {
			this.checkAndDescribe(itemInfos)
		}
	}, 
	rankNames.BASIC,
	skillBases.ITEM);
	createBaseAuraSkill(skillNames.DIAMOND_SKIN_AURA, rankNames.RARE)
	createBaseAuraSkill(skillNames.GOLDEN_MIND_AURA, rankNames.EPIC)
	new Skill(skillNames.FOCUS_BLAST,
		function(infos) {
			let skillInfos = {
				damage: 1 + infos.character.stats.intelligence,
				character: infos.character,
				foe: infos.foe
			}
			this.damage(skillInfos)
		},
		false,
		function(infos) {
			let skillInfos = {
				damage: 1 + infos.character.stats.intelligence,
				character: infos.character,
				foe: infos.foe,
			}
			let ret = 'Blast ' + infos.foe.name + ' for ' + skillInfos.damage + ' damage' 
			return ret
		},
		rankNames.COMMON,
		skillBases.OTHER)
	console.log(database.data.skills)
}

populateDatabase()
