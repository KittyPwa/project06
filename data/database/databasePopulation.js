function populateDatabase() {
	populateSkills()
	populateItems()
	populateAuras()
	populateCharacters()
	populateCards()
	populateHands()
}

function populateCards() {
	updateCards()
}

function populateHands() {
	let cards = database.getCards()
	let basicHand = new Hand(rankNames.COMMON)
	let rareHand = new Hand(rankNames.RARE)
	updateHands()
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
		type: typeVars.PHYSICAL
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
	[skillNames.GOLDEN_MIND_AURA]
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
	}, 
	[skillNames.STRIKE]
)	
}
function populateSkills() {
	new Skill(skillNames.STRIKE,
	function(infos){
		let character = infos.character;
		let mainhand = database.getItem(character.getEquipement().getEquipement(equipementVars.MAINHAND))
		let offhand = database.getItem(character.getEquipement().getEquipement(equipementVars.OFFHAND))
		let strength = character.stats.strength
		let agility = character.stats.agility
		let damageMain = getRandomInt(mainhand.damageMin, mainhand.damageMax) * (1 + strength / 100)
		console.log(damageMain) 
		let foe = infos.foe
		foe.recieveDamage(damageMain, this.name)
		if(offhand && offhand.type == itemVars.WEAPON) {
			let damageOff = getRandomInt(offhand.damageMin, offhand.damageMax) * (1 + strength / 100)
			foe.recieveDamage(damageOff, this.name)
		}
},
	false,
	function(infos) {
		let character = infos.character;
		let mainhand = character.getEquipement().mainhand
		let offhand = character.getEquipement().offhand
		let strength = character.stats.strength
		let agility = character.stats.agility
		let minDamage = mainhand.damageMin * (1 + strength / 100) ;
		let maxDamage = mainhand.damageMan * (1 + strength / 100);
		let ret = 'Strike foe for ' + minDamage + '-' + maxDamage + 'with ' + mainhand.name
		if(offhand && offhand.type == itemVars.WEAPON) {
			let minDamage = offhand.damageMin * (1 + strength / 100) 
			let maxDamage = offhand.damageMan * (1 + strength / 100)
			ret += ' and for ' + minDamage + '-' + maxDamage + 'with ' + offhand.name 
		}
}, rankNames.COMMON);
	createBaseAuraSkill(skillNames.DIAMOND_SKIN_AURA, rankNames.RARE)
	createBaseAuraSkill(skillNames.GOLDEN_MIND_AURA, rankNames.EPIC)
}

populateDatabase()
