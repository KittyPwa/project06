function Item(name, sprite, slot, type, stat, skills, rank) {
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

	this.rank = rank

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
