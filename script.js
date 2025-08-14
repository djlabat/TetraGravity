const container = document. querySelector(".container")
const cells = document. querySelectorAll(".cell")

const boradWidth = 5
const boardHight = 5

let rndNum = rnd(7)

/*
██╗   ██╗████████╗██╗██╗     ███████╗
██║   ██║╚══██╔══╝██║██║     ██╔════╝
██║   ██║   ██║   ██║██║     ███████╗
██║   ██║   ██║   ██║██║     ╚════██║
╚██████╔╝   ██║   ██║███████╗███████║
 ╚═════╝    ╚═╝   ╚═╝╚══════╝╚══════╝
 */
function rnd (n) {return Math.floor(Math.random()*n)}
function clearClass (clas) {
	for (let t of tetraminoPosition) cells[t].classList.remove(clas)
}

function addClass (clas) {
	for (let t of tetraminoPosition) {
		if (typeof t === "number") {
			cells[t].classList.add(clas)
		}
	}	
}

function changePosition (num) { 
	for (let i in tetraminoPosition) {
		(typeof tetraminoPosition[i]) === "number" ? 
		tetraminoPosition[i] -= -num :
		tetraminoPosition[i] = String(tetraminoPosition[i] -= -num )
	}
	console.log(tetraminoPosition)
}

// diferncijal pocetnog i trenutnog tetsa[0] pre rotacije
function calcDifferencePosition () {
	return  tetraminoPosition[0] - tetraminoStartingPosition[rndNum][currentTetRotState][0]
}

// LST Kick Off
function sideKickOff_LST (diff) {
	let res = diff

	// Upper side
	if (tetraminoPosition.at(0) < boradWidth && currentTetRotState === 2) {res += boradWidth} 
	// Right side
	if ((tetraminoPosition.at(-1)- -1) % boradWidth == 0 && currentTetRotState === 3) {res -= 1} 
	// Down
	if (tetraminoPosition.at(-1) > (boradWidth*boardHight - boradWidth) && currentTetRotState === 0) {res -= boradWidth}
	// Left
	if ((tetraminoPosition.at(0) % boradWidth) == 0 && currentTetRotState === 1) {res += 1} 

	return res
}

function sideKickOff_I (diff) {
	let res = diff

	if (currentTetRotState === 0) {
		if (tetraminoPosition.at(0) == 15 || tetraminoPosition.at(0) == 16) {res -= 5}		
		if (tetraminoPosition.at(0) == 20 || tetraminoPosition.at(0) == 21) {res -= 10}
		if (tetraminoPosition.at(0) == 0 || tetraminoPosition.at(0) == 1) {res += 5}
		return res
	}
	
	if (currentTetRotState === 1) {
		if (tetraminoPosition.at(0) == 4 || tetraminoPosition.at(0) == 9) {res -= 1}		
		if (tetraminoPosition.at(0) == 1 || tetraminoPosition.at(0) == 6) {res += 1}
		if (tetraminoPosition.at(0) == 0 || tetraminoPosition.at(0) == 5) {res += 2}
		return res
	}

	if (currentTetRotState === 2) {
		if (tetraminoPosition.at(-1) == 23 || tetraminoPosition.at(-1) == 24) {res -= 5}		
		if (tetraminoPosition.at(-1) == 8 || tetraminoPosition.at(-1) == 9) {res += 5}
		if (tetraminoPosition.at(-1) == 3 || tetraminoPosition.at(-1) == 4) {res += 10}
		return res
	}

	if (currentTetRotState === 3) {
		if (tetraminoPosition.at(-1) == 15 || tetraminoPosition.at(-1) == 20) {res += 1}		
		if (tetraminoPosition.at(-1) == 18 || tetraminoPosition.at(-1) == 23) {res -= 1}
		if (tetraminoPosition.at(-1) == 19 || tetraminoPosition.at(-1) == 24) {res -= 2}
 		return res
 	}
 }
// rotiranje tetramine uz promenu pozcije
function rotateToState (nextState, diffPos) {
	tetraminoPosition = [...tetraminoStartingPosition[rndNum][nextState]].map(v => 
		(typeof v) === 'number' ? 
		v + diffPos : 
		String(v - -diffPos)
	)	
}


////////////////////////////////////////////////////////////
// Svaka tetramina je definisana sa pravougaonikom u koji //
// staje. Brojevi su pocetne pozicije. Ako je broj tipa   //
// `number` onda ce biti obojen tj. dodace mu se klasa    //
// .tetromino, inace (ako je broj tipa `string`) nece.    //
////////////////////////////////////////////////////////////
const tetraminoStartingPosition = 
[ // pocetne pozicije tetsa
	[	
		[ 6, 7, 
		 11,12] // O0
	],[ 
		[5,6,7,8], // I0
		
		[2,7,12,17],	// I1

		[10,11,12,13], // I2

		[1,6,11,16],	// I3
	],[ 
		[ 6 , 7,'8',
		'11',12,13], // Z0

		['7',  8,
		 12 , 13,
		 17 ,'18'],	 // Z1

		[11 ,12,'13',
		'16',17, 18], // Z2

		['6',  7,
		 11 , 12,
		 16 ,'17'],	 // Z3
	],[	
		['6', 7, '8',
		 11 ,12, 13], // T0

		[ 7, '8',
		 12, 13 , 
		 17,'18'], // T1

		 [11 ,12, 13,
		 '16',17,'18'], // T2

		['6', 7,
		 11 ,12, 
		'16',17] // T3
	],[
		['6', 7 ,  8,
		 11 ,12 ,'13'], // S0

		[ 7 , '8',
		 12 , 13 ,
		'17', 18], // S1

		['11', 12 , 13,
		  16 , 17 ,'18'], // S2

		[ 6 , '7',
		 11 , 12 ,
		'16', 17] // S3
	],[	
		['6','7', 8,
		 11, 12, 13], // L0

		[ 7, '8',
		 12,'13',
		 17, 18], // L1

		[11, 12,  13,
		 16,'17','18'], // L2

		[ 6 , 7,
		'11',12,
		'16',17] // L3

	],[	
		[ 6,'7','8',
		 11, 12,13], // J0

		[ 7,  8,
		 12,'13',
		 17,'18'], // J1

		[ 11 , 12 ,13,
		 '16','17',18], // J2

		['6', 7,
		'11',12,
		 16 ,17], // J3
	]
]

// ovo je startna pozicija koja ce se menjati pomeranjem ili rotiranjem
let tetraminoPosition = [...tetraminoStartingPosition[rndNum][0] ]
// let differencePosition = 0
// Dodavanje klase .ghost na svaki box od Tetromine
for (let t of tetraminoPosition) {
	if (typeof t === "number") {
		cells[t].classList.add("ghost") // add .ghost
	}
}



/*
███╗   ███╗ ██████╗ ██╗   ██╗███████╗
████╗ ████║██╔═══██╗██║   ██║██╔════╝
██╔████╔██║██║   ██║██║   ██║█████╗  
██║╚██╔╝██║██║   ██║╚██╗ ██╔╝██╔══╝  
██║ ╚═╝ ██║╚██████╔╝ ╚████╔╝ ███████╗
╚═╝     ╚═╝ ╚═════╝   ╚═══╝  ╚══════╝*/

// _DOWN_                      
addEventListener("keydown", (e) => {
if (e.key === "ArrowDown" && tetraminoPosition.at(-1) < (boradWidth*boardHight - boradWidth) ) { 
		clearClass("ghost")
		changePosition(boradWidth)
		addClass("ghost")
		console.log("calcDifferencePosition:", calcDifferencePosition())
	}
})

// ^UP^
addEventListener("keydown", (e) => { 
	if (e.key === "ArrowUp" && tetraminoPosition.at(0) > (boradWidth-1)) {
		clearClass("ghost")
		changePosition(-boradWidth)
		addClass("ghost")
		console.log("calcDifferencePosition:", calcDifferencePosition())
	}
})

// <LEFT
addEventListener("keydown", (e) => { 
	if (e.key === "ArrowLeft" && tetraminoPosition.at(0) > 0 && tetraminoPosition.at(0) % boradWidth != 0) {
		clearClass("ghost")
		changePosition(-1)
		addClass("ghost")
		console.log("calcDifferencePosition:", calcDifferencePosition())
	}
})

// RIGHT>
addEventListener("keydown", (e) => { 
	if (e.key === "ArrowRight" && tetraminoPosition.at(-1) < 24 && tetraminoPosition.at(-1) % boradWidth != 4) {
		clearClass("ghost")
		changePosition(1)
		addClass("ghost")
		console.log("calcDifferencePosition:", calcDifferencePosition())
	}
})




/*
██████╗  ██████╗ ████████╗ █████╗ ████████╗███████╗
██╔══██╗██╔═══██╗╚══██╔══╝██╔══██╗╚══██╔══╝██╔════╝
██████╔╝██║   ██║   ██║   ███████║   ██║   █████╗  
██╔══██╗██║   ██║   ██║   ██╔══██║   ██║   ██╔══╝  
██║  ██║╚██████╔╝   ██║   ██║  ██║   ██║   ███████╗
╚═╝  ╚═╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝   ╚═╝   ╚══════╝*/

let currentTetRotState = 0 // it can be 0, 1, 2, 3 => up, right, down, left 


// source.js 
// meta.function.js 
// meta.block.js


/*          ██╗     ███████╗████████╗          ██╗  
            ██║     ██╔════╝╚══██╔══╝          ╚██╗ 
            ██║     ███████╗   ██║       █████╗ ╚██╗
            ██║     ╚════██║   ██║       ╚════╝ ██╔╝
            ███████╗███████║   ██║             ██╔╝ 
            ╚══════╝╚══════╝   ╚═╝             ╚═╝  */
function rotation_LST_CW (e) {

	if (e.key === "x" && rndNum !== 0 && rndNum !==1) { 

		if (currentTetRotState === 0){
			clearClass("ghost")
			let differencePosition = sideKickOff_LST(calcDifferencePosition())
			console.log("differencePosition:", differencePosition)
			rotateToState(1, differencePosition)
			addClass("ghost")
			currentTetRotState = 1

		} else if (currentTetRotState === 1){
			clearClass("ghost")
			let differencePosition = sideKickOff_LST(calcDifferencePosition())
			console.log("differencePosition:", differencePosition)
			rotateToState(2, differencePosition)
			addClass("ghost")
			currentTetRotState = 2

		} else if (currentTetRotState === 2){
			clearClass("ghost")
			let differencePosition = sideKickOff_LST(calcDifferencePosition())
			console.log("differencePosition:", differencePosition)
			rotateToState(3, differencePosition)
			addClass("ghost")
			currentTetRotState = 3

		} else if (currentTetRotState === 3){
			clearClass("ghost")
			let differencePosition = sideKickOff_LST(calcDifferencePosition())
			console.log("differencePosition:", differencePosition)
			rotateToState(0, differencePosition)
			addClass("ghost")
			currentTetRotState = 0

		}

	}	

}
addEventListener("keydown", rotation_LST_CW)




/*██╗          ██╗     ███████╗████████╗
 ██╔╝          ██║     ██╔════╝╚══██╔══╝
██╔╝ █████╗    ██║     ███████╗   ██║   
╚██╗ ╚════╝    ██║     ╚════██║   ██║   
 ╚██╗          ███████╗███████║   ██║   
  ╚═╝          ╚══════╝╚══════╝   ╚═╝   */
function rotation_LST_CCW (e) { 

	if (e.key === "z" && rndNum !== 0 && rndNum !==1) {

		if (currentTetRotState === 0){
			clearClass("ghost")
			let differencePosition = sideKickOff_LST(calcDifferencePosition())
			console.log("differencePosition:", differencePosition)
			rotateToState(3, differencePosition)
			addClass("ghost")
			currentTetRotState = 3
			
		} else if (currentTetRotState === 3){
			clearClass("ghost")
			let differencePosition = sideKickOff_LST(calcDifferencePosition())
			console.log("differencePosition:", differencePosition)
			rotateToState(2, differencePosition)	
			addClass("ghost")
			currentTetRotState = 2

		} else if (currentTetRotState === 2){
			clearClass("ghost")
			let differencePosition = sideKickOff_LST(calcDifferencePosition())
			console.log("differencePosition:", differencePosition)
			rotateToState(1, differencePosition)
			addClass("ghost")
			currentTetRotState = 1

		} else if (currentTetRotState === 1){
			clearClass("ghost")
			let differencePosition = sideKickOff_LST(calcDifferencePosition())
			console.log("differencePosition:", differencePosition)
			rotateToState(0, differencePosition)
			addClass("ghost")
			currentTetRotState = 0
			
		}

	}	

}
addEventListener("keydown", rotation_LST_CCW)





/*      	    ██╗          ██╗  
        	    ██║          ╚██╗ 
        	    ██║    █████╗ ╚██╗
        	    ██║    ╚════╝ ██╔╝
        	    ██║          ██╔╝ 
        	    ╚═╝          ╚═╝  */
function rotation_I_CW (e) {

	if (e.key === "x" && rndNum == 1) {

		if (currentTetRotState === 0){
			clearClass("ghost")
			console.log("differencePosition:", calcDifferencePosition())
			let differencePosition = sideKickOff_I(calcDifferencePosition())
			console.log("differencePosition:", differencePosition)
			rotateToState(1, differencePosition)
			addClass("ghost")
			currentTetRotState = 1

		} else if (currentTetRotState === 1){
			clearClass("ghost")
			console.log("differencePosition:", calcDifferencePosition())
			let differencePosition = sideKickOff_I(calcDifferencePosition())
			console.log("differencePosition:", differencePosition)
			rotateToState(2, differencePosition)
			addClass("ghost")
			currentTetRotState = 2

		} else if (currentTetRotState === 2){
			clearClass("ghost")
			console.log("differencePosition:", calcDifferencePosition())
			let differencePosition = sideKickOff_I(calcDifferencePosition())
			console.log("differencePosition:", differencePosition)
			rotateToState(3, differencePosition)
			addClass("ghost")
			currentTetRotState = 3

		} else if (currentTetRotState === 3){
			clearClass("ghost")
			console.log("differencePosition:", calcDifferencePosition())
			let differencePosition = sideKickOff_I(calcDifferencePosition())
			console.log("differencePosition:", differencePosition)
			rotateToState(0, differencePosition)
			addClass("ghost")
			currentTetRotState = 0

		}

	}

}
addEventListener("keydown", rotation_I_CW)






/*██╗          ██╗
 ██╔╝          ██║
██╔╝ █████╗    ██║
╚██╗ ╚════╝    ██║
 ╚██╗          ██║
  ╚═╝          ╚═╝*/
function rotation_I_CCW (e) {

	if (e.key === "z" && rndNum == 1) {

		if (currentTetRotState === 0){
			clearClass("ghost")
			console.log("differencePosition:", calcDifferencePosition())
			let differencePosition = sideKickOff_I(calcDifferencePosition())
			console.log("differencePosition:", differencePosition)
			rotateToState(3, differencePosition)
			addClass("ghost")
			currentTetRotState = 3

		} else if (currentTetRotState === 3){
			clearClass("ghost")
			console.log("differencePosition:", calcDifferencePosition())
			let differencePosition = sideKickOff_I(calcDifferencePosition())
			console.log("differencePosition:", differencePosition)
			rotateToState(2, differencePosition)
			addClass("ghost")
			currentTetRotState = 2

		} else if (currentTetRotState === 2){
			clearClass("ghost")
			console.log("differencePosition:", calcDifferencePosition())
			let differencePosition = sideKickOff_I(calcDifferencePosition())
			console.log("differencePosition:", differencePosition)
			rotateToState(1, differencePosition)
			addClass("ghost")
			currentTetRotState = 1

		} else if (currentTetRotState === 1){
			clearClass("ghost")
			console.log("differencePosition:", calcDifferencePosition())
			let differencePosition = sideKickOff_I(calcDifferencePosition())
			console.log("differencePosition:", differencePosition)
			rotateToState(0, differencePosition)
			addClass("ghost")
			currentTetRotState = 0

		}

	}

}
addEventListener("keydown", rotation_I_CCW)


/*
███╗   ██╗███████╗██╗  ██╗████████╗
████╗  ██║██╔════╝╚██╗██╔╝╚══██╔══╝
██╔██╗ ██║█████╗   ╚███╔╝    ██║   
██║╚██╗██║██╔══╝   ██╔██╗    ██║   
██║ ╚████║███████╗██╔╝ ██╗   ██║   
╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝   ╚═╝   
 */
function nextTet (e) {

	if (e.key === " ") {
		addClass("droped")
		clearClass("ghost")
		rndNum = rnd(7)
		tetraminoPosition = tetraminoStartingPosition[rndNum][0]
		currentTetRotState	= 0
		addClass("ghost")
	}

}
addEventListener("keydown", nextTet)







/* TO DO:
BUG kada se okrece box sa klasom .ghost na ivici (kick-off) 
gde je postaavljena klasa .droped poremeti se diferencijal i
ghost iskace iz borda.

	- add event [spc] => nextTetramino()
		=> Drop on board class .droped
			[. . . . .
			 . . . . .
			 . . x . .
			 . . x x .
			 . x x x x]
boxovima koji su na tetPozicijama addovati klasu .droped
	- fn clearLine()
*/