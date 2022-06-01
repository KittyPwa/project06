var pathfindingSpots = {}

function pathfind(spotA, spotB) {
	let pSpotA = new pathfindingSpot(spotA);
	pSpotA.spotBDist = getDistanceBetweenSpots(pSpotA, spotB)
	pathfindingSpots[pSpotA.spotId] = pSpotA
	let toExplore = [pSpotA]
	let res
	end = []
	let i = 0
	do {
		res = pathfindStep(toExplore, spotA, spotB)
		toExplore = res.toExplore
		end = res.end
		i++;
	} while(end.length < 1 && i < 1000)
	let path = retraceSteps(end[0])
	return path
}

function retraceSteps(end) {
	let res = [database.getSpot(end.i, end.j)];
	let spot = end
	let i = 0
	do {
		spot = pathfindingSpots[spot.originSpot]
		res.push(database.getSpot(spot.i, spot.j))
	} while(spot.originSpot != undefined)
	return res.reverse()
}

function pathfindStep(toExplore, spotA, spotB) {
	let spot = shuffleArray(toExplore)[0]
	spot.explored = true;
	let adjSpots = getAdjacentSpots(spot);
	for(let pSpot of Object.values(adjSpots)) {
		if(!pSpot.explored) {
			let newSpotADist = getDistanceBetweenSpots(pSpot, spot) + spot.spotADist
			pSpot.spotBDist = getDistanceBetweenSpots(pSpot, spotB)
			if (pSpot.spotADist < 0 || pSpot.spotADist > newSpotADist) {
				pSpot.spotADist = newSpotADist
				pSpot.originSpot = spot.spotId
			}
			pSpot.cumul = pSpot.spotADist + pSpot.spotBDist
		}
	}
	updateSmallest(pathfindingSpots)
	toExplore = Object.values(pathfindingSpots).filter(e => e.smallest)
	let end = Object.values(pathfindingSpots).filter(e => e.spotBDist == 0)
	return {
		toExplore: toExplore,
		end: end,
	}
}

function updateSmallest(spots) {
	let smaller = -1
	for(let spot of Object.values(spots)) {
		if(!spot.explored) {
			if(smaller < 0) {
				smaller = spot.cumul
			}
			if(smaller > spot.cumul) {
				smaller = spot.cumul
			}
		}
	}
	let smallerBDist = -1
	for(let spot of Object.values(spots)) {
		if(!spot.explored && spot.cumul == smaller) {
			if( smallerBDist < 0) {
				smallerBDist = spot.spotBDist

			}
			if(smallerBDist > spot.spotBDist) {
				smallerBDist = spot.spotBDist
			}
		} 
	}
	for(let spot of Object.values(spots)) {
		if(!spot.explored && spot.cumul == smaller && spot.spotBDist == smallerBDist) {
			spot.smallest = true;
		} else {
			spot.smallest = false;
		}
	}	
}

function getAdjacentSpots(spot) {
	let res = {}
	let is = [spot.i - 1, spot.i, spot.i + 1];
	let js = [spot.j - 1, spot.j, spot.j + 1];
	for(let i of is) {
		for(let j of js) {
			if (i != spot.i || j != spot.j) {
				adjSpot = database.getSpot(i,j)
				if(adjSpot && adjSpot.accessible && !adjSpot.explored) {
					let pAdjSpot = pathfindingSpots[adjSpot.id]
					if(!pAdjSpot) {
						pAdjSpot = new pathfindingSpot(adjSpot)
					}
					pathfindingSpots[pAdjSpot.spotId] = pAdjSpot
					res[pAdjSpot.spotId] = pAdjSpot
				}
			}
		}
	}
	return res
}

function pathfindingSpot(spot) {
	this.i = spot.i

	this.j = spot.j

	this.originSpot = undefined;

	this.spotADist = -1

	this.spotBDist = -1

	this.cumul = 0

	this.spotId = spot.id

	this.smallest = false;

	this.explored = false;
}


/*database.getSpot(0,0).accessible = false
database.getSpot(0,1).accessible = false
database.getSpot(1,1).accessible = false
database.getSpot(2,1).accessible = false
database.getSpot(3,1).accessible = false
database.getSpot(4,1).accessible = false
database.getSpot(1,4).accessible = false
database.getSpot(2,4).accessible = false
database.getSpot(3,4).accessible = false
database.getSpot(4,4).accessible = false
database.getSpot(5,4).accessible = false*/


function getDistanceBetweenSpots(spotA, spotB) {
	return Math.sqrt((spotA.i - spotB.i)**2 + (spotA.j - spotB.j)**2)
}