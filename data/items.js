function Item(name, sprite, slot, type, stat, skills) {
	this.id = uuidv4();

	this.name = name;

	this.associatedSprite = sprite

	this.slot = slot;

	this.type = type;

	this.damageMin = stat.damageMin

	this.damageMax = stat.damageMax

	this.damageType = stat.type

	this.range = stat.range

	this.armor = stat.armor

	this.magicArmor = stat.magicArmor

	this.effects = stat.effects

	this.price = stat.price

	this.skills = skills

	this.getDescription = function() {
		let description = ''
		if(this.name) {
			description += this.name + '\n'
		}
		if(this.slot) {
			for(let slot of this.slot) {
				description += slot + ' '
			}
			description += '\n'
		}
		if(this.damageMin && this.damageMax) {
			description += 'Damage : ' + this.damageMin + '-' + this.damageMax + '\n'
		}
		if(this.range) {
			description += 'Range : ' + this.range + '\n'
		}
		if(this.armor) {
			description += 'Armor : ' + this.armor + '\n'
		}
		if(this.magicArmor) {
			description += 'Magic Armor: ' + this.magicArmor + '\n'
		}
		if(this.effects && Object.values(this.effects).length > 0) {
			description += 'EFFECTS HAVE BEEN ADDED - DESCRIPTION TO BE UPDATED'
		}
		if(skills.length > 0) {
			description += 'Skills : '
			for(let skillName of skills) {
				description += skillName + ' '
			}
			description += '\n'
			/*for(let skillName of skills) {
				let skill = database.getSkillByName(skillName)

			}*/
		}
		if(this.price) {
			description += this.price + 'gp' + '\n'
		} else {
			description += 'No merchant valye \n'
		}
		return description
	}

	database.addItemToDatabase(this)
}
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