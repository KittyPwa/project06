//---- global constants ----------

var constants = {
    columnAmount : 6,
    lineAmount: null,
    rectSpacing : 30,
    rectSize : 30,
    inventorySize: 12,
    screenWidth: 800,
    screenHeight: 600,
    rectLineColor: 0x1a65ac, 
    rectLineThickness: 2  
}

//------- config utility constants ------

var variables = {
    rectangles : {},
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