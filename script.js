const container = document. querySelector(".container")
const cells = document. querySelectorAll(".cell")

const rnd = (n) => Math.floor(Math.random()*n)

let monominoPosition = 12

let rndNum = rnd(7)

const tetraminoShapes = [ // pocetne pozicije
	[0,1,5,6], // 0
	[0,1,2,3], // I
	[0,1,6,7], // Z
	[1,5,6,7], // T
	[1,2,5,6], // S
	[2,5,6,7], // L
	[0,5,6,7], // J
]

let tetraminoCellPositions = tetraminoShapes[rndNum]

for (let t of tetraminoCellPositions) {
		cells[t].classList.add("monomino")
}

// KRETANJE MONOMINO-a U BOARD-u
addEventListener("keydown", (e)=>{ 

	if (e.key === "ArrowDown" && monominoPosition < 20 ) {

		// remove .monomino | change position | add .monomino
		for (let t of tetraminoCellPositions) cells[t].classList.remove("monomino")
		for (let i in tetraminoCellPositions) tetraminoCellPositions[i] += 5
		for (let t of tetraminoCellPositions) cells[t].classList.add("monomino")
	}
})

addEventListener("keydown", (e)=>{
	if (e.key === "ArrowUp" && monominoPosition > 4) {

		for (let t of tetraminoCellPositions) cells[t].classList.remove("monomino")
		for (let i in tetraminoCellPositions) tetraminoCellPositions[i] -= 5
		for (let t of tetraminoCellPositions) cells[t].classList.add("monomino")
	}
})

addEventListener("keydown", (e)=>{
	if (e.key === "ArrowLeft" && monominoPosition > 0 && monominoPosition % 5 != 0) {		// remove .monomino | change position | add .monomino

		for (let t of tetraminoCellPositions) cells[t].classList.remove("monomino")
		for (let i in tetraminoCellPositions) tetraminoCellPositions[i] -= 1
		for (let t of tetraminoCellPositions) cells[t].classList.add("monomino")
	}
})

addEventListener("keydown", (e)=>{
	if (e.key === "ArrowRight" && monominoPosition < 24 && monominoPosition % 5 != 4) {

		for (let t of tetraminoCellPositions) cells[t].classList.remove("monomino")
		for (let i in tetraminoCellPositions) tetraminoCellPositions[i] += 1
		for (let t of tetraminoCellPositions) cells[t].classList.add("monomino")
	}
})
