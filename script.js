////////////////////////////////////////////////////////////
// Svaka tetramina je definisana sa pravougaonikom u koji //
// staje. Brojevi su pocetne pozicije. Ako je broj tipa   //
// `number` onda ce biti obojen tj. dodace mu se klasa    //
// .tetromino, inace (ako je broj tipa `string`) nece.    //
////////////////////////////////////////////////////////////
const tetraminoStartingPosition = 
[ // pocetne pozicije tetsa
	[	
		[ 11 , 12 , 
		  16 , 17 ] // O0
	],[ 
		[ 10 , 11 , 12 , 13 ], // I0
		
		[  7 , 12 , 17 , 22 ],	// I1

		[ 15 , 16 , 17 , 18 ], // I2

		[  6 , 11 , 16 , 21 ],	// I3
	],[ 
		[ 11 , 12 ,'13',
		 '16', 17 , 18 ], // Z0

		['12', 13 ,
		  17 , 18,
		  22 ,'23'],	 // Z1

		[ 16 , 17 ,'18',
		 '21', 22 , 23 ], // Z2

		['11', 12 ,
		  16 , 17 ,
		  21 ,'22'],	 // Z3
	],[	
		['11', 12 ,'13',
		  16 , 17 , 18 ], // T0

		[ 12 ,'13',
		  17 , 18 , 
		  22 ,'23'], // T1

		[ 16 , 17 , 18 ,
		 '21', 22 ,'23'], // T2

		['11', 12 ,
		  16 , 17 , 
		 '21', 22 ] // T3 ========== ovde sa stao
	],[
		['11', 12 , 13 ,
		  16 , 17 ,'18'], // S0

		[ 12 ,'13',
		  17 , 18 ,
		 '22', 23], // S1

		['16', 17 , 18,
		  21 , 22 ,'23'], // S2

		[ 11 ,'12',
		  16 , 17 ,
		 '21', 22 ] // S3
	],[	
		['11','12', 13 ,
		  16 , 17 , 18 ], // L0

		[ 12 ,'13',
		  17 ,'18',
		  22 , 23 ], // L1

		[ 16 , 17 , 18 ,
		  21 ,'22','23'], // L2

		[ 11 , 12 ,
		 '16', 17 ,
		 '21', 22 ] // L3

	],[	
		[ 11 ,'12','13',
		  16 , 17 , 18 ], // J0

		[ 12 , 13 ,
		  17 ,'18',
		  22 ,'23'], // J1

		[ 16 , 17 , 18 ,
		 '21','22', 23 ], // J2

		['11', 12 ,
		 '16', 17 ,
		  21 , 22 ], // J3
	]
]


// zamrznuti sa for -> Object.freez(tetraminoStartingPosition)
const tetsOredred = ["██","▄▄▄▄","▀█▄","▄█▄","▄█▀","▄▄█","█▄▄"]
let tets = ["██","▄▄▄▄","▀█▄","▄█▄","▄█▀","▄▄█","█▄▄"]
let _tets = [...shakeBag(tets)] // unvisiable tets
shakeBag(tets)
tets.length = 6
const tBag = document.querySelector("#tetris-bag")
tBag.innerHTML = `\
<div class="next-tet">${tets[1]}</div>
<div class="next-tet">${tets[2]}</div>
<div class="next-tet">${tets[3]}</div>
<div class="next-tet">${tets[4]}</div>
<div class="next-tet">${tets[5]}</div>`
const hold = []

const container = document. querySelector(".container")
const boxes = [...document. querySelectorAll(".box")]
const row0 = [...document.querySelectorAll(".row0")]
const row1 = [...document.querySelectorAll(".row1")]
const row2 = [...document.querySelectorAll(".row2")]
const row3 = [...document.querySelectorAll(".row3")]
const row4 = [...document.querySelectorAll(".row4")]

const col0 = [...document.querySelectorAll(".col0")]
const col1 = [...document.querySelectorAll(".col1")]
const col2 = [...document.querySelectorAll(".col2")]
const col3 = [...document.querySelectorAll(".col3")]
const col4 = [...document.querySelectorAll(".col4")]

const boxes2 = [
	...col0.reverse(), 
	...col1.reverse(), 
	...col2.reverse(), 
	...col3.reverse(), 
	...col4.reverse()
]

const rows = [[...row0], [...row1], [...row2], [...row3], [...row4]]
const cols = [[...col0], [...col1], [...col2], [...col3], [...col4]]

const boradWidth = 5
const boardHight = 5

let indexOfghost = getIndefOfGhost()

// Pozicija tetramina
let tetraminoPosition = [... [...tetraminoStartingPosition[indexOfghost]] [0]]
let differencePosition = 0
let currentTetRotState = 0 // it can be 0, 1, 2, 3 witch means: up, right, down, left 


// Dodavanje klase .ghost na svaki box od Tetromine
for (let t of tetraminoPosition) {
	if (typeof t === "number") {
		boxes[t].classList.add("ghost") // add .ghost
	}
}


/*
██╗   ██╗████████╗██╗██╗     ███████╗
██║   ██║╚══██╔══╝██║██║     ██╔════╝
██║   ██║   ██║   ██║██║     ███████╗
██║   ██║   ██║   ██║██║     ╚════██║
╚██████╔╝   ██║   ██║███████╗███████║
 ╚═════╝    ╚═╝   ╚═╝╚══════╝╚══════╝
 font je sa adrese http://patorjk.com/software/taag/#p=display&h=0&v=0&f=ANSI%20Shadow&t=next
 */

function getIndefOfGhost () {return tetsOredred.indexOf(tets[0])}
function clearClass (clas) {
	for (let t of tetraminoPosition) boxes[t].classList.remove(clas)
}

function addClass (clas) {
	for (let t of tetraminoPosition) {
		if (typeof t === "number") {
			boxes[t].classList.add(clas)
		}
	}	
}

function changePosition (num) { 
	for (let i in tetraminoPosition) {
		(typeof tetraminoPosition[i]) === "number" ? 
		tetraminoPosition[i] -= -num :
		tetraminoPosition[i] = String(tetraminoPosition[i] -= -num )
	}
	differencePosition += num
}

// diferncijal TRENUTNOG i POCETNOG tetsa[0], bez rotacije
function calcDifferencePosition () {
	let res = tetraminoPosition[0] - tetraminoStartingPosition[indexOfghost][currentTetRotState][0]
	return res
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
		if (tetraminoPosition.at(0) ==  0 || tetraminoPosition.at(0) ==  1) {res += 5}
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
	tetraminoPosition = [... [...tetraminoStartingPosition[indexOfghost]] [nextState]].map(v => 
		(typeof v) === 'number' ? 
		v + diffPos : 
		String(v - -diffPos)
	)	
}


////////////////////////////////
//          GRAVITY           //
////////////////////////////////

let gravity = "down"

function gravityUp (e) {
	if (e.key == 'w' && gravity != "up") {
		container.style.border = "16px solid #222"
		container.style.borderTop = "16px solid blue"
		
		// pomeranje pocetne pozicije
		if (gravity == "down" || gravity == "left") { 
			for (let t of tetraminoStartingPosition) {
				for (let rot of t) {
					for (let i in rot) {
					    typeof rot[i]=='string' ? rot[i]=String(rot[i] - +4) : rot[i]-=4
					}
				}
			}
		}
		gravity = 'up'
	}
}
addEventListener("keydown", gravityUp)

function gravityRight (e) {
	if (e.key == 'd' && gravity != "right") {
		container.style.border = "16px solid #222"
		container.style.borderRight = "16px solid red"
		
		// pomeranje pocetne pozicije
		if (gravity == "down" || gravity == "left") { 
			for (let t of tetraminoStartingPosition) {
				for (let rot of t) {
					for (let i in rot) {
					    typeof rot[i]=='string' ? rot[i]=String(rot[i] - +4) : rot[i]-=4
					}
				}
			}
		}
		gravity = 'right'
	};
}
addEventListener("keydown", gravityRight)

function gravityDown (e) {
	if (e.key == 's' && gravity != "down") {
		container.style.border = "16px solid #222"
		container.style.borderBottom = "16px solid yellow"

		// pomeranje pocetne pozicije
		if (gravity == "up" || gravity == "right") {
			for (let t of tetraminoStartingPosition) {
				for (let rot of t) {
					for (let i in rot) {
					    typeof rot[i]=='string' ? rot[i]=String(rot[i] - -4) : rot[i]+=4
					}
				}
			}
		}
		gravity = 'down'
	}; 
} 
addEventListener("keydown", gravityDown)

function gravityLeft (e) {
	if (e.key == 'a' && gravity != "left") {
		container.style.border = "16px solid #222"
		container.style.borderLeft = "16px solid green"

		// pomeranje pocetne pozicije
		if (gravity == "up" || gravity == "right") {
			for (let t of tetraminoStartingPosition) {
				for (let rot of t) {
					for (let i in rot) {
					    typeof rot[i]=='string' ? rot[i]=String(rot[i] - -4) : rot[i]+=4
					}
				}
			}
		}
		gravity = 'left'
	}; 
}
addEventListener("keydown", gravityLeft)






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
	}
})

// ^UP^
addEventListener("keydown", (e) => { 
	if (e.key === "ArrowUp" && tetraminoPosition.at(0) > (boradWidth-1)) {
		clearClass("ghost")
		changePosition(-boradWidth)
		addClass("ghost")
	}
})

// <LEFT
addEventListener("keydown", (e) => { 
	if (e.key === "ArrowLeft" && tetraminoPosition.at(0) > 0 && tetraminoPosition.at(0) % boradWidth != 0) {
		clearClass("ghost")
		changePosition(-1)
		addClass("ghost")
	}
})

// RIGHT>
addEventListener("keydown", (e) => { 
	if (e.key === "ArrowRight" && tetraminoPosition.at(-1) < 24 && tetraminoPosition.at(-1) % boradWidth != 4) {
		clearClass("ghost")
		changePosition(1)
		addClass("ghost")
	}
})




/*
██████╗  ██████╗ ████████╗ █████╗ ████████╗███████╗
██╔══██╗██╔═══██╗╚══██╔══╝██╔══██╗╚══██╔══╝██╔════╝
██████╔╝██║   ██║   ██║   ███████║   ██║   █████╗  
██╔══██╗██║   ██║   ██║   ██╔══██║   ██║   ██╔══╝  
██║  ██║╚██████╔╝   ██║   ██║  ██║   ██║   ███████╗
╚═╝  ╚═╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝   ╚═╝   ╚══════╝*/




/*          ██╗     ███████╗████████╗          ██╗  
            ██║     ██╔════╝╚══██╔══╝          ╚██╗ 
            ██║     ███████╗   ██║       █████╗ ╚██╗
            ██║     ╚════██║   ██║       ╚════╝ ██╔╝
            ███████╗███████║   ██║             ██╔╝ 
            ╚══════╝╚══════╝   ╚═╝             ╚═╝  */
function rotation_LST_CW (e) { 

	if (e.key === "x" && indexOfghost !== 0 && indexOfghost !==1) { 

		if (currentTetRotState === 0){
			clearClass("ghost")
			differencePosition = calcDifferencePosition()
			differencePosition = sideKickOff_LST(differencePosition)
			rotateToState(1, differencePosition)
			addClass("ghost")
			currentTetRotState = 1

		} else if (currentTetRotState === 1){
			clearClass("ghost")
			differencePosition = calcDifferencePosition()
			differencePosition = sideKickOff_LST(differencePosition)
			rotateToState(2, differencePosition)
			addClass("ghost")
			currentTetRotState = 2

		} else if (currentTetRotState === 2){
			clearClass("ghost")
			differencePosition = calcDifferencePosition()
			differencePosition = sideKickOff_LST(differencePosition)
			rotateToState(3, differencePosition)
			addClass("ghost")
			currentTetRotState = 3

		} else if (currentTetRotState === 3){
			clearClass("ghost")
			differencePosition = calcDifferencePosition()
			differencePosition = sideKickOff_LST(differencePosition)
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

	if (e.key === "z" && indexOfghost !== 0 && indexOfghost !==1) {

		if (currentTetRotState === 0){
			clearClass("ghost")
			differencePosition = calcDifferencePosition()
			differencePosition = sideKickOff_LST(differencePosition)
			rotateToState(3, differencePosition)
			addClass("ghost")
			currentTetRotState = 3
			
		} else if (currentTetRotState === 3){
			clearClass("ghost")
			differencePosition = calcDifferencePosition()
			differencePosition = sideKickOff_LST(differencePosition)
			rotateToState(2, differencePosition)	
			addClass("ghost")
			currentTetRotState = 2

		} else if (currentTetRotState === 2){
			clearClass("ghost")
			differencePosition = calcDifferencePosition()
			differencePosition = sideKickOff_LST(differencePosition)
			rotateToState(1, differencePosition)
			addClass("ghost")
			currentTetRotState = 1

		} else if (currentTetRotState === 1){
			clearClass("ghost")
			differencePosition = calcDifferencePosition()
			differencePosition = sideKickOff_LST(differencePosition)
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

	if (e.key === "x" && indexOfghost == 1) {

		if (currentTetRotState === 0){
			clearClass("ghost")
			differencePosition = calcDifferencePosition()
			differencePosition = sideKickOff_I(differencePosition)
			rotateToState(1, differencePosition)
			addClass("ghost")
			currentTetRotState = 1

		} else if (currentTetRotState === 1){
			clearClass("ghost")
			differencePosition = calcDifferencePosition()
			differencePosition = sideKickOff_I(differencePosition)
			rotateToState(2, differencePosition)
			addClass("ghost")
			currentTetRotState = 2

		} else if (currentTetRotState === 2){
			clearClass("ghost")
			differencePosition = calcDifferencePosition()
			differencePosition = sideKickOff_I(differencePosition)
			rotateToState(3, differencePosition)
			addClass("ghost")
			currentTetRotState = 3

		} else if (currentTetRotState === 3){
			clearClass("ghost")
			differencePosition = calcDifferencePosition()
			differencePosition = sideKickOff_I(differencePosition)
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

	if (e.key === "z" && indexOfghost == 1) {

		if (currentTetRotState === 0){
			clearClass("ghost")
			differencePosition = calcDifferencePosition()
			differencePosition = sideKickOff_I(differencePosition)
			rotateToState(3, differencePosition)
			addClass("ghost")
			currentTetRotState = 3

		} else if (currentTetRotState === 3){
			clearClass("ghost")
			differencePosition = calcDifferencePosition()
			differencePosition = sideKickOff_I(differencePosition)
			rotateToState(2, differencePosition)
			addClass("ghost")
			currentTetRotState = 2

		} else if (currentTetRotState === 2){
			clearClass("ghost")
			differencePosition = calcDifferencePosition()
			differencePosition = sideKickOff_I(differencePosition)
			rotateToState(1, differencePosition)
			addClass("ghost")
			currentTetRotState = 1

		} else if (currentTetRotState === 1){
			clearClass("ghost")
			differencePosition = calcDifferencePosition()
			differencePosition = sideKickOff_I(differencePosition)
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
function dropTet (e) { 

	if (e.key === " ") {
		addClass("droped")
		clearClass("ghost")
		nextTetramino()
		tetraminoPosition = 
		tets[0] == "██"   ? [... [...tetraminoStartingPosition[0]] [0]] :
		tets[0] == "▄▄▄▄" ? [... [...tetraminoStartingPosition[1]] [0]] :
		tets[0] == "▀█▄"  ? [... [...tetraminoStartingPosition[2]] [0]] :
		tets[0] == "▄█▄"  ? [... [...tetraminoStartingPosition[3]] [0]] :
		tets[0] == "▄█▀"  ? [... [...tetraminoStartingPosition[4]] [0]] :
		tets[0] == "▄▄█"  ? [... [...tetraminoStartingPosition[5]] [0]] :
		tets[0] == "█▄▄"  ? [... [...tetraminoStartingPosition[6]] [0]] :
		"Error: tetraminoPosition"
		currentTetRotState	= 0
		differencePosition = 0
		addClass("ghost")
		clearLine()
		indexOfghost = getIndefOfGhost()
	}

}
addEventListener("keydown", dropTet)










/*
██████╗  █████╗  ██████╗ 
██╔══██╗██╔══██╗██╔════╝ 
██████╔╝███████║██║  ███╗
██╔══██╗██╔══██║██║   ██║
██████╔╝██║  ██║╚██████╔╝
╚═════╝ ╚═╝  ╚═╝ ╚═════╝ */
function nextTetramino () { 
		tets.shift()
		tets.push(_tets.shift()) // tets <- _tets
		tBag.innerHTML = `\
<div class="next-tet">${tets[1]}</div>
<div class="next-tet">${tets[2]}</div>
<div class="next-tet">${tets[3]}</div>
<div class="next-tet">${tets[4]}</div>
<div class="next-tet">${tets[5]}</div>`
		if (_tets.length == 0) {
			_tets = ["██","▄▄▄▄","▀█▄","▄█▄","▄█▀","▄▄█","█▄▄"]
			shakeBag(_tets)    
		}
}

function shakeBag (bag) {
	const leng = bag.length
	for (let i=0; i<leng; i++) {
		bag[i] = bag.splice(Math.floor(Math.random()*5), 1, bag[i])[0]
	}
	return bag
}

function inHold (e) {
	if (e.key == "c") {
		const holdBag = document.querySelector("#hold-bag")
		
		hold.push(tets.shift()) // hold <- tets[0]

		if (hold.length > 1) tets.unshift(hold.shift()) // ako hold vec ima nesto, hold[0] -> tets
			else {tets.push(_tets.shift())} // inace, tets <- _tets

		holdBag.innerHTML = hold
		tBag.innerHTML = `\
		<div class="next-tet">${tets[1]}</div>
		<div class="next-tet">${tets[2]}</div>
		<div class="next-tet">${tets[3]}</div>
		<div class="next-tet">${tets[4]}</div>
		<div class="next-tet">${tets[5]}</div>`

		// ghost se apdejtuje
		clearClass("ghost")
		tetraminoPosition = 
		tets[0] == "██"   ? [... [...tetraminoStartingPosition[0]] [0]] :
		tets[0] == "▄▄▄▄" ? [... [...tetraminoStartingPosition[1]] [0]] :
		tets[0] == "▀█▄"  ? [... [...tetraminoStartingPosition[2]] [0]] :
		tets[0] == "▄█▄"  ? [... [...tetraminoStartingPosition[3]] [0]] :
		tets[0] == "▄█▀"  ? [... [...tetraminoStartingPosition[4]] [0]] :
		tets[0] == "▄▄█"  ? [... [...tetraminoStartingPosition[5]] [0]] :
		tets[0] == "█▄▄"  ? [... [...tetraminoStartingPosition[6]] [0]] :
		"Error: tetraminoPosition"
		addClass("ghost")

		// indexOfGhost se apdejtuje
		indexOfghost = getIndefOfGhost()
	}
}
addEventListener("keydown", inHold)












/* 
 ██████╗██╗     ███████╗ █████╗ ██████╗ ██╗     ██╗███╗   ██╗███████╗
██╔════╝██║     ██╔════╝██╔══██╗██╔══██╗██║     ██║████╗  ██║██╔════╝
██║     ██║     █████╗  ███████║██████╔╝██║     ██║██╔██╗ ██║█████╗  
██║     ██║     ██╔══╝  ██╔══██║██╔══██╗██║     ██║██║╚██╗██║██╔══╝  
╚██████╗███████╗███████╗██║  ██║██║  ██║███████╗██║██║ ╚████║███████╗
 ╚═════╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝╚═╝  ╚═══╝╚══════╝*/
function clearLine () { 

	// FIND DROPED BOXES
	let rowsFilled = rows.filter(r => // exp. [ [(5)], [(5)] ] dve linije za brisanje
						r.every(bx => 
						bx.classList.contains("droped") )  )
	if (rowsFilled.length == 0) rowsFilled = ''

	let colsFilled = cols.filter(c =>
						c.every(bx => 
						bx.classList.contains("droped") )  )
  	if (colsFilled.length == 0) colsFilled = ''



  // RASKRSNICA
  	// CROSS clear
  	if (rowsFilled && colsFilled) {

  		// removeClassDroped
		for (let r of rowsFilled) {
			r.forEach(bx => bx.classList.remove("droped"))
		}
		for (let c of colsFilled) {
			c.forEach(bx => bx.classList.remove("droped"))
		}
		

	// ROW clear
  	} else if (rowsFilled) { 

   		// remove Class Droped from `rowsFilled`
		for (let r of rowsFilled) {
			r.forEach((bx) => {
				// bx.classList.add("fade-out")
				bx.classList.remove("droped")
			})
		}

		//  REDOVI IZNAD (ISPOD) IDU DOLE (GORE)
		for (let i=0; i<rowsFilled.length; i++) { 
			// nadjem idex boxa koji je isti kao prvi iz rowFilled[0][0]
		  	const fallAreaLimit = 
		  		gravity == "down" ? boxes.indexOf(rowsFilled[i][0]) : // 15
 				gravity == "up"   ? boxes.indexOf(rowsFilled.at(-1-i).at(-1)) : "fallAreaLimit: Gravity is left or right"

 			if (fallAreaLimit == "fallAreaLimit: Gravity is left or right") break

			const dropsInFallArea = 
				gravity == "down" ? boxes.slice(0, fallAreaLimit).filter(bx => bx.classList.contains("droped")) :
				gravity ==   "up" ? boxes.slice(fallAreaLimit).filter(bx => bx.classList.contains("droped")) : "dropsInFallArea: Gravity is left or right"
			
			// popise [rednih brojeva] droped boxova iznad obrisane linije
			let indexOfFellDrops = [] 

			for (let d of dropsInFallArea) {
			  indexOfFellDrops.push(boxes.indexOf(d))
			} // [8, 10, 11, 13, 14]

			// remove class `droped` from fallArea
			for (let d of dropsInFallArea) {
			  d.classList.remove("droped")
			}
			
			// [redne brojeve povecam za 5]
			indexOfFellDrops = indexOfFellDrops.map(b => 
				gravity == 'up' ? b-5 :
				gravity == 'down' ? b+5 : "Error: indexOfFellDrops"
			) // [13, 15, 16, 18, 19]
			
			// obojim boxove sa novim [rednim brojevima]
			for (let i of indexOfFellDrops) {
				boxes[i].classList.add("droped")
			}

		}

	} else if (colsFilled) {

		// removeClassDroped
		for (let c of colsFilled) {
			c.forEach(bx => bx.classList.remove("droped"))
		}

		// KOLONE IDU LEVO (DESNO)
		
		for (let i=0; i<colsFilled.length; i++) { 
		  	// nadjem idex boxa koji je isti kao prvi iz rowFilled[0][0]
		  	const fallAreaLimit = 
		  		gravity == "right" ? boxes2.indexOf(colsFilled.at(i).at(0)) : // 15
 				gravity == "left"  ? boxes2.indexOf(colsFilled.at(-1-i).at(-1)) : "fallAreaLimit: Gravity is up or down"

 			if (fallAreaLimit == "fallAreaLimit: Gravity is up or down") break

			const dropsInFallArea = 
				gravity == "right" ? boxes2.slice(0, fallAreaLimit).filter(bx => bx.classList.contains("droped")) :
				gravity ==  "left" ? boxes2.slice(fallAreaLimit).filter(bx => bx.classList.contains("droped")) : "dropsInFallArea: Gravity is up or down"

			// popise [rednih brojeva] droped boxova iznad obrisane linije
			let indexOfFellDrops = [] 

			for (let d of dropsInFallArea) {
			  indexOfFellDrops.push(boxes2.indexOf(d))
			} // [8, 10, 11, 13, 14]

			// remove class `droped` from fallArea
			for (let d of dropsInFallArea) {
			  d.classList.remove("droped")
			}
			
			// [redne brojeve povecam za 5]
			indexOfFellDrops = indexOfFellDrops.map(b => 
				gravity == 'left' ? b-5 :
				gravity == 'right' ? b+5 : "Error: indexOfFellDrops"
			) // [13, 15, 16, 18, 19]
			
			// obojim boxove sa novim [rednim brojevima]
			for (let idDropa of indexOfFellDrops) {
				boxes2[idDropa].classList.add("droped")
			}
		}
	} 
}










/* TO DO:
Dodati gravitaciju.
boxes2 je html colection
a boxes nije
To je problem


*/

// git commit -m "gravity => Pomeranje pocetne pozicije."
// git branch develop
// vratim se na roditeljsku granu master i odatle pozovem `git merge develop`.
// Pre toga za svaki slucaj uraditi COPY-BCKUP