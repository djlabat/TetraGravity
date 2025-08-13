const container = document. querySelector(".container")
const cells = document. querySelectorAll(".cell")

const boradWidth = 5
const boardHight = 5

let rndNum = 3//rnd(7)

////////////////////
// UTIL FUNCTIONS //
////////////////////
const rnd = (n) => Math.floor(Math.random()*n)
const clearClass = (clas) => {
	for (let t of tetraminoPosition) cells[t].classList.remove(clas)
}
const addClass = (clas) => {
	for (let t of tetraminoPosition) {
		if (typeof t === "number") {
			cells[t].classList.add(clas)
		}
	}	
}
const changePosition = (num) => { 
	for (let i in tetraminoPosition) {
		(typeof tetraminoPosition[i]) === "number" ? 
		tetraminoPosition[i] -= -num :
		tetraminoPosition[i] = String(tetraminoPosition[i] -= -num )
	}
	console.log(tetraminoPosition)
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
		[10,11,12,13], // I0
		
		[2,7,12,17]	// I1
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
		 17,'14'], // J1

		[ 11 , 12 ,13,
		 '16','17',18], // J2

		['6', 7,
		'11',12,
		 16 ,17], // J3
	]
]

// ovo je startna pozicija koja ce se menjati pomeranjem ili rotiranjem
let tetraminoPosition = [...tetraminoStartingPosition[rndNum][0] ]

// Dodavanje klase .monomino na svaki box od (ghost) Tetromine
for (let t of tetraminoPosition) {
	if (typeof t === "number") {
		cells[t].classList.add("monomino") // add .monomino
	}
}



/////////////////////////////////
// TETROMINO MOVEMENT IN BOARD //
/////////////////////////////////

// _DOWN_                      
addEventListener("keydown", (e) => {
	if (e.key === "ArrowDown" && tetraminoPosition.at(-1) < (boradWidth*boardHight - boradWidth) ) { 
		clearClass("monomino")
		changePosition(boradWidth)
		addClass("monomino")
	}
})

// ^UP^
addEventListener("keydown", (e) => { 
	if (e.key === "ArrowUp" && tetraminoPosition.at(0) > (boradWidth-1)) {
		clearClass("monomino")
		changePosition(-boradWidth)
		addClass("monomino")
	}
})

// <LEFT
addEventListener("keydown", (e) => { 
	if (e.key === "ArrowLeft" && tetraminoPosition.at(0) > 0 && tetraminoPosition.at(0) % boradWidth != 0) {
		clearClass("monomino")
		changePosition(-1)
		addClass("monomino")
	}
})

// RIGHT>
addEventListener("keydown", (e) => { 
	if (e.key === "ArrowRight" && tetraminoPosition.at(-1) < 24 && tetraminoPosition.at(-1) % boradWidth != 4) {
		clearClass("monomino")
		changePosition(1)
		addClass("monomino")
	}
})




//////////////
// ROTACIJE //
//////////////

const tetrominoRotationState = [0,1,2,3] // up, right, down, left 
let currentTetRotState = tetrominoRotationState[0]

const tetraminoCenterStarting = [
	undefined, // O
	undefined, // I
	12, // Z .at(-2)
	12, // T
	12, // S
	12, // L
	12, // J
]

let tetraminoCenter = 12
	// Pri svakom pomeranju menja se i `tetraminoCenter`

/////// RAZLIKE
/// centar 	0 	-7	-12	
/// prvi 	1	-6	-11	
/// drugi	4	-3	-8	
/// treci 	3	-4	-9	
// rotationLST_Up
addEventListener("keydown", (e) => { 
	if (e.key === "w" && currentTetRotState !== 0) {
		
		clearClass("monomino")

		// razlika pocetnog i trenutnog tetsa[0] pre rotacije
		let differencePosition = tetraminoPosition[0] - tetraminoStartingPosition[rndNum][currentTetRotState][0]

		// Upper Side kick-off
		if (tetraminoPosition.at(0) < 5 && currentTetRotState === 2) {
			differencePosition += 5
		} 
		// Right side
		if ((tetraminoPosition.at(-1)+1) % 5 == 0 && currentTetRotState === 3) {
			differencePosition -= 1
		} 
		// Down
		if (tetraminoPosition.at(-1) > 20 && currentTetRotState === 0) {
			differencePosition -= 5
		}
		// Left
		if ((tetraminoPosition.at(0) % 5) == 0 && currentTetRotState === 1) {
			differencePosition += 1
		} 

		console.log("differencePosition:", differencePosition)

		// nova pozcija rotirane tetramine koja je uvecana/smanjna za razliku
		tetraminoPosition = [...tetraminoStartingPosition[rndNum][0]].map(v => { // [0] konst za rotaciju na dole
			if (currentTetRotState !== 0) {
				return (typeof v) === 'number' ? 
					v + differencePosition : String(v - -differencePosition)
			}
		})	

		console.log("tetraminoPosition:", tetraminoPosition)

		addClass("monomino")

		currentTetRotState = 0
	}
})


// rotationLST_Right
addEventListener("keydown", (e) => { 
	if (e.key === "d" && currentTetRotState !== 1) {
		clearClass("monomino")

		// razlika pocetnog i trenutnog tetsa[0] pre rotacije
		let differencePosition = tetraminoPosition[0] - tetraminoStartingPosition[rndNum][currentTetRotState][0]

		// Upper Side kick-off
		if (tetraminoPosition.at(0) < 5 && currentTetRotState === 2) {
			differencePosition += 5
		} 
		// Right side
		if ((tetraminoPosition.at(-1)+1) % 5 == 0 && currentTetRotState === 3) {
			differencePosition -= 1
		} 
		// Down
		if (tetraminoPosition.at(-1) > 20 && currentTetRotState === 0) {
			differencePosition -= 5
		}
		// Left
		if ((tetraminoPosition.at(0) % 5) == 0 && currentTetRotState === 1) {
			differencePosition += 1
		} 

		// // Right Side kixk-off
		// if ((tetraminoPosition.at(-1)+1) % 5 === 0) {
		// 	differencePosition -= 1
		// }
		// // Down Side kick-of
		// if (tetraminoPosition.at(-1) > 20 && currentTetRotState === 0) {
		// 	differencePosition -= 5
		// }

		console.log("differencePosition:", differencePosition)

		// nova pozcija rotirane tetramine koja je uvecana/smanjna za razliku
		tetraminoPosition = [...tetraminoStartingPosition[rndNum][1]].map(v => { // [1] konst za rotaciju na desno
			if (currentTetRotState !== 1) {
				return (typeof v) === 'number' ? 
					v + differencePosition : String(v - -differencePosition)
			}
		})	

		console.log("tetraminoPosition:", tetraminoPosition)

		addClass("monomino")

		currentTetRotState = 1
	}
})

// rotationLST_Down
addEventListener("keydown", (e) => {
	if (e.key === "s" && currentTetRotState !== 2) {
		clearClass("monomino")

		// razlika pocetnog i trenutnog tetsa[0] pre rotacije
		let differencePosition = tetraminoPosition[0] - tetraminoStartingPosition[rndNum][currentTetRotState][0] //!!! zar ne bi trebalo da umesto 1. [0] da stoji [currentTetRotState]

		// diff ne moze biti veci od 6 za S tet
		// differencePosition = differencePosition > 6 ? differencePosition-5 : differencePosition
		console.log("differencePosition:", differencePosition)

		// Upper Side kick-off
		if (tetraminoPosition.at(0) < 5 && currentTetRotState === 2) {
			differencePosition += 5
		} 
		// Right side
		if ((tetraminoPosition.at(-1)+1) % 5 == 0 && currentTetRotState === 3) {
			differencePosition -= 1
		} 
		// Down
		if (tetraminoPosition.at(-1) > 20 && currentTetRotState === 0) {
			differencePosition -= 5
		}
		// Left
		if ((tetraminoPosition.at(0) % 5) == 0 && currentTetRotState === 1) {
			differencePosition += 1
		} 

		// // Side kick-off
		// if (tetraminoPosition.at(-1) > 20) {
		// 	differencePosition -= 5
		// }

		// nova pozcija rotirane tetramine koja je uvecana za razliku
		tetraminoPosition = [...tetraminoStartingPosition[rndNum][2]].map(v => { // [2] konst za rotaciju na dole
			if (currentTetRotState !== 2) {
				return (typeof v) === 'number' ? 
					v + differencePosition : String(v - -differencePosition)
			}
		})	

		console.log("tetraminoPosition:", tetraminoPosition)

		addClass("monomino")

		currentTetRotState = 2
	}
})

// rotationLST_Left
addEventListener("keydown", (e) => { //debugger
	if (e.key === "a" && currentTetRotState !== 3) {
		clearClass("monomino")

		// razlika pocetnog i trenutnog tetsa[0] pre rotacije
		let differencePosition = tetraminoPosition[0] - tetraminoStartingPosition[rndNum][currentTetRotState][0]

		// diff ne moze biti veci od 6 za S tet
		// differencePosition = differencePosition > 6 ? differencePosition-5 : differencePosition	//!!! DAFINISATI PROMENJIVU ZA 6 i 5
		console.log("differencePosition:", differencePosition)

		// Upper Side kick-off
		if (tetraminoPosition.at(0) < 5 && currentTetRotState === 2) {
			differencePosition += 5
		} 
		// Right side
		if ((tetraminoPosition.at(-1)+1) % 5 == 0 && currentTetRotState === 3) {
			differencePosition -= 1
		} 
		// Down
		if (tetraminoPosition.at(-1) > 20 && currentTetRotState === 0) {
			differencePosition -= 5
		}
		// Left
		if ((tetraminoPosition.at(0) % 5) == 0 && currentTetRotState === 1) {
			differencePosition += 1
		} 

		// nova pozcija rotirane tetramine koja je uvecana za razliku
		tetraminoPosition = [...tetraminoStartingPosition[rndNum][3]].map(v => { // [3] konst za rotaciju na levo
			if (currentTetRotState !== 3) {
				return (typeof v) === 'number' ? 
					v + differencePosition : String(v - -differencePosition)
			}
		})	

		console.log("tetraminoPosition:", tetraminoPosition)

		addClass("monomino")

		currentTetRotState = 3
	}
})



function rotationI_Left () {
	// 1. i poslednji se krecu kao konj u sahu
	// 2. i 3. se vrte u krug
	// nema centra
}

function rotationI_Right () {}

/* TO DO:
	Rotacija kao u tetrisu, sa 3 dugmeta
*/

// git commit -m "Doradio kod i zavrsio Side kick-off"
