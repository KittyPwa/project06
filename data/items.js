function Item(name, sprite, type) {
	this.id = uuidv4();

	this.name = name;

	this.associatedSprite = sprite

	this.type = type;

	database.addItemToDatabase(this)
}
new Item('crossbow',
	{
		spriteName:null,
		spriteSheet: 'tileset3',
		spriteNumber:12
	},
	['mainhand']
)

new Item('diamond ring',
	{
		spriteName:null,
		spriteSheet: 'tileset3',
		spriteNumber:40
	},
	['rightRing', 'leftRing']
)

new Item('gold ring',
	{
		spriteName:null,
		spriteSheet: 'tileset3',
		spriteNumber:39
	},
	['rightRing', 'leftRing']
)

new Item('hand axe',
	{
		spriteName:null,
		spriteSheet: 'tileset3',
		spriteNumber:15
	},
	['mainhand', 'offhand']
)

new Item('dagger',
	{
		spriteName:null,
		spriteSheet: 'tileset3',
		spriteNumber:14
	},
	['mainhand', 'offhand']
)