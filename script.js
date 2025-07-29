const container = document. querySelector(".container")
const cells = document. querySelectorAll(".cell")

const monominoStyle = `gray`
const emptyCellStyle = `#111`

let monominoPosition = 12

// POCEO SAM DA ZAMENJUJEM MONOMINO ZA TERAMINO
// const tetraminoShapes = [ // pocetne pozicije
// 	[12,13,17,18], // 0
// 	[2,5,6,7] // L
// ]



// KRETANJE MONOMINO-a U BOARD-u
addEventListener("keydown", (e)=>{
	if (e.key === "ArrowDown" && monominoPosition < 20) {
		cells[monominoPosition].classList.remove("monomino")
		cells[monominoPosition += 5].classList.add("monomino")

		// for (posMn of currentTetramino) {
		// 	cells[posMn].classList.remove("monomino")
		// 	cells[posMn + 5].classList.add("monomino")
		// 	tetraminoPosition[posMn] += 5
		// }

	}
})

addEventListener("keydown", (e)=>{
	if (e.key === "ArrowUp" && monominoPosition > 4) {
		cells[monominoPosition].classList.remove("monomino")
		cells[monominoPosition -= 5].classList.add("monomino")
	}
})

addEventListener("keydown", (e)=>{
	if (e.key === "ArrowLeft" && monominoPosition > 0 && monominoPosition % 5 != 0) {
		cells[monominoPosition].classList.remove("monomino")
		cells[monominoPosition -= 1].classList.add("monomino")
	}
})

addEventListener("keydown", (e)=>{
	if (e.key === "ArrowRight" && monominoPosition < 24 && monominoPosition % 5 != 4) {
		cells[monominoPosition].classList.remove("monomino")
		cells[monominoPosition += 1].classList.add("monomino")
	}
})
