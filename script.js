const container = document. querySelector(".container")
const cells = document. querySelectorAll(".cell")

const boradWidth = 5
const boardHight = 5

const rnd = (n) => Math.floor(Math.random()*n)

let rndNum = rnd(7)



////////////////////////////////////////////////////////////
// Svaka tetramina je definisana sa pravougaonikom u koji //
// staje. Brojevi su pocetne pozicije. Ako je broj tipa   //
// `number` onda ce biti obojen tj. dodace mu se klasa    //
// .tetromino, inace (ako je broj tipa `string`) nece.    //
////////////////////////////////////////////////////////////
const tetraminoStartingPosition = [ // pocetne pozicije tetsa
	[ 6, 7 ,
	 11,12], // O

	[10,11,12,13], // I

	[ 6 , 7,'8',
	'11',12,13], // Z

	['6', 7, '8',
	 11 ,12, 13], // T

	['6', 7 ,  8,
	 11 ,12 ,'13'], // S

	['6','7', 8,
	 11, 12, 13], // L

	[ 6,'7','8',
	 11, 12,13], // J

	['6',  7,
	 11 , 12,
	 16 ,'17'],

	[ 7, '8',
	 12, 13 , 
	 17,'18'],

	 [11 ,12, 13,
	 '16',17,'18'],

	['6', 7,
	 11 ,12, 
	'16',17],

	[ 6 , '7',
	 11 , 12 ,
	'16', 17],

	[ 7, '8',
	 12,'13',
	 17, 18], // L1

	[11, 12,  13,
	 16,'17','18'], // L2

	[ 6 , 7,
	'11',12,
	'16',17], // L3

	[ 7,  8,
	 12,'13',
	 17,'14'], // J1 |`

	[ 11 , 12 ,13,
	 '16','17',18], // J2 --,

	['6', 7,
	'11',12,
	 16 ,17], // J3 ,|
 // rotacione pozicije
]

// ovo je startna pozicija ali ce se menjati pomeranjem ili rotiranjem
let tetraminoPosition = tetraminoStartingPosition[rndNum] 

// Dodavanje klase .monomino na svaki box od (ghost) Tetromine
for (let t of tetraminoPosition) {
	if (typeof t === "number") {
		cells[t].classList.add("monomino") // add .monomino
	}
}

// TETROMINO MOVEMENT IN BOARD
// _DOWN_
addEventListener("keydown", (e) => {
	if (e.key === "ArrowDown" && tetraminoPosition.at(-1) < (boradWidth*boardHight - boradWidth) ) { 
		for (let t of tetraminoPosition) cells[t].classList.remove("monomino") // remove .monomino
		for (let i in tetraminoPosition) { // change position...
			(typeof tetraminoPosition[i]) === "number" ? // ...and keep typeof
			tetraminoPosition[i] += boradWidth :
			tetraminoPosition[i] = String(tetraminoPosition[i] -= -boradWidth )
		}
		for (let t of tetraminoPosition) {
			if (typeof t === "number") {
				cells[t].classList.add("monomino") // add .monomino
			}
		}
	}
})
// ^UP^
addEventListener("keydown", (e) => {
	if (e.key === "ArrowUp" && tetraminoPosition.at(0) > (boradWidth-1)) {
		for (let t of tetraminoPosition) cells[t].classList.remove("monomino")
		for (let i in tetraminoPosition) { // change position...
			(typeof tetraminoPosition[i]) === "number" ? // ...and keep typeof
			tetraminoPosition[i] -= boradWidth :
			tetraminoPosition[i] = String(tetraminoPosition[i] -= boradWidth )
		}	
		for (let t of tetraminoPosition) {
			if (typeof t === "number") {
				cells[t].classList.add("monomino") // add .monomino
			}
		}
	}
})
// <LEFT
addEventListener("keydown", (e) => { 
	if (e.key === "ArrowLeft" && tetraminoPosition.at(0) > 0 && tetraminoPosition.at(0) % boradWidth != 0) {
		for (let t of tetraminoPosition) cells[t].classList.remove("monomino")
		for (let i in tetraminoPosition) { // change position...
			(typeof tetraminoPosition[i]) === "number" ? // ...and keep typeof
			tetraminoPosition[i] -= 1 :
			tetraminoPosition[i] = String(tetraminoPosition[i] -= 1 )
		}	
		for (let t of tetraminoPosition) {
			if (typeof t === "number") {
				cells[t].classList.add("monomino") // add .monomino
			}
		}		
	}
})
// RIGHT>
addEventListener("keydown", (e) => { 
	if (e.key === "ArrowRight" && tetraminoPosition.at(-1) < 24 && tetraminoPosition.at(-1) % boradWidth != 4) {
		for (let t of tetraminoPosition) cells[t].classList.remove("monomino")
		for (let i in tetraminoPosition) { // change position...
			(typeof tetraminoPosition[i]) === "number" ? // ...and keep typeof
			tetraminoPosition[i] += 1 :
			tetraminoPosition[i] = String(tetraminoPosition[i] -= -1 )
		}	
		for (let t of tetraminoPosition) {
			if (typeof t === "number") {
				cells[t].classList.add("monomino") // add .monomino
			}
		}
	}
})


// git commit -m "Zavrsio kretanje tetromina. Redefinisao tetromine i eventListener-e za kretanje da budu univerzalni za sve oblike tetramina."