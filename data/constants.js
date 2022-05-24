//---- global constants ----------

var visualVars= {
    columnAmount : 8,
    lineAmount: null,

    screenWidth: 800,
    screenHeight: 600,

    rectLineColor: 0x1a65ac, 
    rectLineThickness: 2,
    rectSpacing : 30,
    rectSize : 30,

    rectBackgroundValidColor: 0x44ff44,
    rectBackgroundInvalidColor: 0xFF0000,

    backgroundHeightOffset: 250,
    backgroundWidthOffset: 0,

    widthDivider: 4,
    heightDivider: 4,
    widthOffset: 100,
    heightOffset: 200,

    spriteBaseWidthPlacement: 100,
    spriteOffset: 30,
    spriteBaseHeightPlacement: 100,
    transparency: 0.7,
    mainhand: {
        widthOffset: -75,
        heightOffset: -50,
        spriteFrame: 14
    },
    offhand: {
        widthOffset: 75,
        heightOffset: -50,
        spriteFrame: 15
    },
    head: {
        widthOffset: 0,
        heightOffset: -100,
        spriteFrame: 30
    },
    torso: {
        widthOffset: 0,
        heightOffset: -50,
        spriteFrame: 31
    },
    legs: {
        widthOffset: 0,
        heightOffset: 0,
        spriteFrame: 18
    },
    feet: {
        widthOffset: 0,
        heightOffset: 50,
        spriteFrame: 35
    },
    arms: {
        widthOffset: 50,
        heightOffset: -50,
        spriteFrame: 33
    },  
    amulet: {
        widthOffset: -50,
        heightOffset: -100,
        spriteFrame: 8
    },
    rightRing: {
        widthOffset: 100,
        heightOffset: -100,
        spriteFrame: 38
    },
    leftRing: {
        widthOffset: 50,
        heightOffset: -100,
        spriteFrame: 39
    }
}

var constants = {
    inventorySize: 12,
}

//------- config utility constants ------

var variables = {
    inventoryRectangles : {},
    equipementRectangles : {},
    sprites : {}
}

var placements = {
    north: {
        id: 1,
        i: 0,
        j: -1
    },
    south: {
        id:2,
        i: 0,
        j: 1,
    },
    est: {
        id:3,
        i:1,
        j: 0
    },
    west : {
        id:4,
        i:-1,
        j: 0
    },
    northEst: {
        id:5,
        i: 1,
        j: -1
    },
    northWest: {
        id:6,
        i: -1,
        j: -1,
    },
    southEst: {
        id:7,
        i: 1,
        j: 1,
    },
    southWest: {
        id:8,
        i: -1,
        j: 1,
    },
    center: {
        id:9,
        i:0,
        j:0,
    }
}