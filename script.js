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

const rows = [[...row0], [...row1], [...row2], [...row3], [...row4]]
const cols = [[...col0], [...col1], [...col2], [...col3], [...col4]]

const boradWidth = 5
const boardHight = 5

let rndNum = rnd(7)

// ovo je startna pozicija koja ce se menjati pomeranjem ili rotiranjem
let tetraminoPosition = [... [...tetraminoStartingPosition[rndNum]] [0]]
let differencePosition = 0
let currentTetRotState = 0 // it can be 0, 1, 2, 3 => up, right, down, left 




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
function rnd (n) {return Math.floor(Math.random()*n)}
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
	console.log(tetraminoPosition)
}

// diferncijal TRENUTNOG i POCETNOG tetsa[0], bez rotacije
function calcDifferencePosition () {
	let res = tetraminoPosition[0] - tetraminoStartingPosition[rndNum][currentTetRotState][0]
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
	tetraminoPosition = [... [...tetraminoStartingPosition[rndNum]] [nextState]].map(v => 
		(typeof v) === 'number' ? 
		v + diffPos : 
		String(v - -diffPos)
	)	
}




/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//                               TEST AREA                                 //
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
let res = undefined
const $_tetraminoStartingPosition = 
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

function areArraysEqualJSON() {
  res = ( JSON.stringify(tetraminoStartingPosition) === JSON.stringify($_tetraminoStartingPosition) )
  console.log("res: ", res)	
}
addEventListener("keydown", areArraysEqualJSON)


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
		console.log("differencePosition:", differencePosition)
	}
})

// ^UP^
addEventListener("keydown", (e) => { 
	if (e.key === "ArrowUp" && tetraminoPosition.at(0) > (boradWidth-1)) {
		clearClass("ghost")
		changePosition(-boradWidth)
		addClass("ghost")
		console.log("differencePosition:", differencePosition)
	}
})

// <LEFT
addEventListener("keydown", (e) => { 
	if (e.key === "ArrowLeft" && tetraminoPosition.at(0) > 0 && tetraminoPosition.at(0) % boradWidth != 0) {
		clearClass("ghost")
		changePosition(-1)
		addClass("ghost")
		console.log("differencePosition:", differencePosition)
	}
})

// RIGHT>
addEventListener("keydown", (e) => { 
	if (e.key === "ArrowRight" && tetraminoPosition.at(-1) < 24 && tetraminoPosition.at(-1) % boradWidth != 4) {
		clearClass("ghost")
		changePosition(1)
		addClass("ghost")
		console.log("differencePosition:", differencePosition)
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

	if (e.key === "x" && rndNum !== 0 && rndNum !==1) { 

		if (currentTetRotState === 0){
			clearClass("ghost")
			differencePosition = calcDifferencePosition()
			differencePosition = sideKickOff_LST(differencePosition)
			console.log("differencePosition:", differencePosition)
			rotateToState(1, differencePosition)
			addClass("ghost")
			currentTetRotState = 1

		} else if (currentTetRotState === 1){
			clearClass("ghost")
			differencePosition = calcDifferencePosition()
			differencePosition = sideKickOff_LST(differencePosition)
			console.log("differencePosition:", differencePosition)
			rotateToState(2, differencePosition)
			addClass("ghost")
			currentTetRotState = 2

		} else if (currentTetRotState === 2){
			clearClass("ghost")
			differencePosition = calcDifferencePosition()
			differencePosition = sideKickOff_LST(differencePosition)
			console.log("differencePosition:", differencePosition)
			rotateToState(3, differencePosition)
			addClass("ghost")
			currentTetRotState = 3

		} else if (currentTetRotState === 3){
			clearClass("ghost")
			differencePosition = calcDifferencePosition()
			differencePosition = sideKickOff_LST(differencePosition)
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
			differencePosition = calcDifferencePosition()
			differencePosition = sideKickOff_LST(differencePosition)
			console.log("differencePosition:", differencePosition)
			rotateToState(3, differencePosition)
			addClass("ghost")
			currentTetRotState = 3
			
		} else if (currentTetRotState === 3){
			clearClass("ghost")
			differencePosition = calcDifferencePosition()
			differencePosition = sideKickOff_LST(differencePosition)
			console.log("differencePosition:", differencePosition)
			rotateToState(2, differencePosition)	
			addClass("ghost")
			currentTetRotState = 2

		} else if (currentTetRotState === 2){
			clearClass("ghost")
			differencePosition = calcDifferencePosition()
			differencePosition = sideKickOff_LST(differencePosition)
			console.log("differencePosition:", differencePosition)
			rotateToState(1, differencePosition)
			addClass("ghost")
			currentTetRotState = 1

		} else if (currentTetRotState === 1){
			clearClass("ghost")
			differencePosition = calcDifferencePosition()
			differencePosition = sideKickOff_LST(differencePosition)
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
			differencePosition = calcDifferencePosition()
			differencePosition = sideKickOff_I(differencePosition)
			console.log("differencePosition:", differencePosition)
			rotateToState(1, differencePosition)
			addClass("ghost")
			currentTetRotState = 1

		} else if (currentTetRotState === 1){
			clearClass("ghost")
			console.log("differencePosition:", calcDifferencePosition())
			differencePosition = calcDifferencePosition()
			differencePosition = sideKickOff_I(differencePosition)
			console.log("differencePosition:", differencePosition)
			rotateToState(2, differencePosition)
			addClass("ghost")
			currentTetRotState = 2

		} else if (currentTetRotState === 2){
			clearClass("ghost")
			console.log("differencePosition:", calcDifferencePosition())
			differencePosition = calcDifferencePosition()
			differencePosition = sideKickOff_I(differencePosition)
			console.log("differencePosition:", differencePosition)
			rotateToState(3, differencePosition)
			addClass("ghost")
			currentTetRotState = 3

		} else if (currentTetRotState === 3){
			clearClass("ghost")
			console.log("differencePosition:", calcDifferencePosition())
			differencePosition = calcDifferencePosition()
			differencePosition = sideKickOff_I(differencePosition)
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
			differencePosition = calcDifferencePosition()
			differencePosition = sideKickOff_I(differencePosition)
			console.log("differencePosition:", differencePosition)
			rotateToState(3, differencePosition)
			addClass("ghost")
			currentTetRotState = 3

		} else if (currentTetRotState === 3){
			clearClass("ghost")
			console.log("differencePosition:", calcDifferencePosition())
			differencePosition = calcDifferencePosition()
			differencePosition = sideKickOff_I(differencePosition)
			console.log("differencePosition:", differencePosition)
			rotateToState(2, differencePosition)
			addClass("ghost")
			currentTetRotState = 2

		} else if (currentTetRotState === 2){
			clearClass("ghost")
			console.log("differencePosition:", calcDifferencePosition())
			differencePosition = calcDifferencePosition()
			differencePosition = sideKickOff_I(differencePosition)
			console.log("differencePosition:", differencePosition)
			rotateToState(1, differencePosition)
			addClass("ghost")
			currentTetRotState = 1

		} else if (currentTetRotState === 1){
			clearClass("ghost")
			console.log("differencePosition:", calcDifferencePosition())
			differencePosition = calcDifferencePosition()
			differencePosition = sideKickOff_I(differencePosition)
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
		tetraminoPosition = [... [...tetraminoStartingPosition[rndNum]] [0]]
		currentTetRotState	= 0
		differencePosition = 0
		addClass("ghost")
		console.log("differencePosition:", differencePosition)
		clearLine()
	}

}
addEventListener("keydown", nextTet)

function clearLine () { 

	// FIND DROPED BOXES
	let rowsFilled = rows.filter(r => // [ [(5)], [(5)] ] dve linije za brisanje
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
		for (let c of colsFilled) (
			c.forEach(bx => bx.classList.remove("droped"))
		)

	// ROW clear
  	} else if (rowsFilled) {

   		// remove Class Droped from `rowsFilled`
		for (let r of rowsFilled) (
			r.forEach(bx => bx.classList.remove("droped"))
		)

		// A SVI REDOVI IZNAD IDU DOLE
		
		for (let i=0; i<rowsFilled.length; i++) { 
			// nadjem idex boxa koji je isti kao prvi iz rowFilled[0][0]
		  	const fallAreaLimit = boxes.indexOf(rowsFilled[i][0])
			const dropsInFallArea = boxes.slice(0, fallAreaLimit).filter(bx => bx.classList.contains("droped"))
			
			// popise [rednih brojeva] droped boxova iznad obrisane linije
			let indexOfFallingDrops = []

			for (let d of dropsInFallArea) {
			  indexOfFallingDrops.push(boxes.indexOf(d))
			}

			// remove class `droped` from fallArea
			for (let d of dropsInFallArea) {
			  d.classList.remove("droped")
			}
			
			// [redne brojeve povecam za 5]
			indexOfFallingDrops = indexOfFallingDrops.map(b => b+5)
			
			// obojim boxove sa novim [rednim brojevima]
			for (let idDropa of indexOfFallingDrops) {
				boxes[idDropa].classList.add("droped")
			}
		}
  	// Ako je vise redova od jednom za ciscenje
  	// krenemm od najviseg reda: obrisem 1. liniju, spustim boxove iznad
  	// pa ponovim proceduru za redove ispod.






	    if (gravity = "down") {
	    	//boxovi iznad linije Position +5 
	    	// svi boxovi kojima je index iz boxes < od filledRows[0][0]
	    	// 
	    }
	    // if (G up) boxovi ispod linije Pos -5 
	    // if (G left) boxovi desno od linije Pos -1
	    // if (G right) boxovi left od linije Pos +1 

  } else if (colsFilled) {

  		// removeClassDroped
		for (let c of colsFilled) (
			c.forEach(bx => bx.classList.remove("droped"))
		)

  } else {
  		console.log("do nothing")
    // [boxova koji su za clear line]
  }
}






////////////////////////////////
//          GRAVITY           //
////////////////////////////////

let gravity = "down"

function gravityUp (e) {
	if (e.key == 'w') {
		gravity = 'up'
	}
}
addEventListener("keydown", gravityUp)

function gravityRight (e) {
	if (e.key == 'd') {
		gravity = 'right'
	}
}
addEventListener("keydown", gravityRight)

function gravityDown (e) {
	if (e.key == 's') {
		gravity = 'down'
	}
} 
addEventListener("keydown", gravityDown)

function gravityLeft (e) {
	if (e.key == 'a') {
		gravity = 'left'
	}
}
addEventListener("keydown", gravityLeft)




/* TO DO:
BUG Brisanje vise linija od jednom radi ako brisanje jedne linije

Dodati gravitaciju.


*/

// git commit -m "Prodisao mikro Tetris! Radi samo normal Clearline sa gravity na dole."
// git branch develop