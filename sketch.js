function make2dArray(cols, rows) {
	let array = new Array(cols)
	for (let i = 0; i < array.length; i++) {
		array[i] = new Array(rows)
	}
	return array
}

function countNeighbors(grid, x, y) {
	let sum = 0

	for (let i = -1; i < 2; i++) {
		for (let j = -1; j < 2; j++) {

			let col = (x + i + cols) % cols
			let row = (y + j + rows) % rows

			sum += grid[col][row]
		}
	}

	// Remove self at the end (dont count self as neighbor)
	sum -= grid[x][y]
	return sum
}

let grid
let cols
let rows
let resolution = 10

// p5 setup
function setup() {
	createCanvas(1200, 800)

	cols = width / resolution
	rows = height / resolution
	
	grid = make2dArray(cols, rows)
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			grid[i][j] = floor(random(2))
		}
	}
}

// p5 draw loop
function draw() {
	background(0)

	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			let x = i * resolution
			let y = j * resolution
			if (grid[i][j] == 1) {
				fill(255)
				stroke(0)
				rect(x, y, resolution - 1, resolution - 1)
			}
		}
	}

	let next = make2dArray(cols, rows)

	// Compute next based on grid
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			let state = grid[i][j]
			
			// Count live neigbors
			let sum = 0
			let neighbors = countNeighbors(grid, i, j)

			// Ruleset
			if (state == 0 && neighbors == 3) {
				next[i][j] = 1
			}
			else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
				next[i][j] = 0
			}
			else {
				next[i][j] = state
			}
		}
	}
	grid = next
}