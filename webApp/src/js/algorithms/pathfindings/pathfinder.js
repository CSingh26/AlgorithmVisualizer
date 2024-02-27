import {
    Astar
} from './AStar.js'

document.querySelectorAll(".pathfinder-sel button").forEach(button => {
    button.addEventListener('click', function () {
        document.querySelectorAll(".pathfinder-sel button").forEach(btn => btn.classList.remove('active'));
        this.classList.add('active-path');
    });
});

let maze = document.querySelector(".maze");
let ctx = maze.getContext("2d");
let generationComplete = false;

let current;
let goal;
var maze1;

class Maze {
    constructor(size, rows, columns) {
        this.size = size;
        this.columns = columns;
        this.rows = rows;
        this.grid = [];
        this.stack = [];
    }

    setup() {
        for (let r = 0; r < this.rows; r++) {
            let row = [];
            for (let c = 0; c < this.columns; c++) {

                let cell = new Cell(r, c, this.grid, this.size);
                row.push(cell);
            }
            this.grid.push(row);
        }

        current = this.grid[0][0];
        this.grid[this.rows - 1][this.columns - 1].goal = true;
    }


    draw() {
        maze.width = this.size;
        maze.height = this.size;
        maze.style.background = "black";
        current.visited = true;
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.columns; c++) {
                let grid = this.grid;
                grid[r][c].show(this.size, this.rows, this.columns);
            }
        }

        let next = current.checkNeighbours();

        if (next) {
            next.visited = true;

            this.stack.push(current);
            current.highlight(this.columns);
            current.removeWalls(current, next);
            current = next;
        } else if (this.stack.length > 0) {
            let cell = this.stack.pop();
            current = cell;
            current.highlight(this.columns);
        }

        if (this.stack.length === 0) {
            generationComplete = true;
            return;
        }

        window.requestAnimationFrame(() => {
            this.draw();
        });
    }
}

class Cell {
    constructor(rowNum, colNum, parentGrid, parentSize) {
        this.rowNum = rowNum;
        this.colNum = colNum;
        this.visited = false;
        this.walls = {
            topWall: true,
            rightWall: true,
            bottomWall: true,
            leftWall: true,
        };
        this.goal = false;
        this.parentGrid = parentGrid;
        this.parentSize = parentSize;
    }

    checkNeighbours() {
        let grid = this.parentGrid;
        let row = this.rowNum;
        let col = this.colNum;
        let neighbours = [];

        let top = row !== 0 ? grid[row - 1][col] : undefined;
        let right = col !== grid.length - 1 ? grid[row][col + 1] : undefined;
        let bottom = row !== grid.length - 1 ? grid[row + 1][col] : undefined;
        let left = col !== 0 ? grid[row][col - 1] : undefined;

        if (top && !top.visited) neighbours.push(top);
        if (right && !right.visited) neighbours.push(right);
        if (bottom && !bottom.visited) neighbours.push(bottom);
        if (left && !left.visited) neighbours.push(left);

        if (neighbours.length !== 0) {
            let random = Math.floor(Math.random() * neighbours.length);
            return neighbours[random];
        } else {
            return undefined;
        }
    }


    drawTopWall(x, y, size, columns, rows) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + size / columns, y);
        ctx.stroke();
    }

    drawRightWall(x, y, size, columns, rows) {
        ctx.beginPath();
        ctx.moveTo(x + size / columns, y);
        ctx.lineTo(x + size / columns, y + size / rows);
        ctx.stroke();
    }

    drawBottomWall(x, y, size, columns, rows) {
        ctx.beginPath();
        ctx.moveTo(x, y + size / rows);
        ctx.lineTo(x + size / columns, y + size / rows);
        ctx.stroke();
    }

    drawLeftWall(x, y, size, columns, rows) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + size / rows);
        ctx.stroke();
    }


    highlight(columns) {

        let x = (this.colNum * this.parentSize) / columns + 1;
        let y = (this.rowNum * this.parentSize) / columns + 1;
        ctx.fillStyle = "purple";
        ctx.fillRect(
            x,
            y,
            this.parentSize / columns - 3,
            this.parentSize / columns - 3
        );
    }

    removeWalls(cell1, cell2) {

        let x = cell1.colNum - cell2.colNum;

        if (x === 1) {
            cell1.walls.leftWall = false;
            cell2.walls.rightWall = false;
        } else if (x === -1) {
            cell1.walls.rightWall = false;
            cell2.walls.leftWall = false;
        }

        let y = cell1.rowNum - cell2.rowNum;

        if (y === 1) {
            cell1.walls.topWall = false;
            cell2.walls.bottomWall = false;
        } else if (y === -1) {
            cell1.walls.bottomWall = false;
            cell2.walls.topWall = false;
        }
    }

    show(size, rows, columns) {
        let x = (this.colNum * size) / columns;
        let y = (this.rowNum * size) / rows;

        ctx.strokeStyle = "#ffffff";
        ctx.fillStyle = "black";
        ctx.lineWidth = 2;
        if (this.walls.topWall) this.drawTopWall(x, y, size, columns, rows);
        if (this.walls.rightWall) this.drawRightWall(x, y, size, columns, rows);
        if (this.walls.bottomWall) this.drawBottomWall(x, y, size, columns, rows);
        if (this.walls.leftWall) this.drawLeftWall(x, y, size, columns, rows);
        if (this.visited) {
            ctx.fillRect(x + 1, y + 1, size / columns - 2, size / rows - 2);
        }
        if (this.goal) {
            ctx.fillStyle = "rgb(83, 247, 43)";
            ctx.fillRect(x + 1, y + 1, size / columns - 2, size / rows - 2);
        }
    }

    getNeighborsWithoutWalls() {
        let neighbors = [];
        let {
            rowNum,
            colNum,
            parentGrid
        } = this;

        let directions = [{
                r: -1,
                c: 0
            },
            {
                r: 0,
                c: 1
            },
            {
                r: 1,
                c: 0
            },
            {
                r: 0,
                c: -1
            }
        ];

        directions.forEach(({
            r,
            c
        }) => {
            let newRow = rowNum + r,
                newCol = colNum + c;
            if (newRow >= 0 && newRow < parentGrid.length && newCol >= 0 && newCol < parentGrid[0].length) {
                let neighbor = parentGrid[newRow][newCol];
                if (!this.wallsBlocked(this, neighbor)) {
                    neighbors.push(neighbor);
                }
            }
        });

        return neighbors;
    }

    wallsBlocked(cell1, cell2) {
        let dx = cell2.colNum - cell1.colNum;
        let dy = cell2.rowNum - cell1.rowNum;

        if (dx === 1) return cell1.walls.rightWall || cell2.walls.leftWall;
        if (dx === -1) return cell1.walls.leftWall || cell2.walls.rightWall;
        if (dy === 1) return cell1.walls.bottomWall || cell2.walls.topWall;
        if (dy === -1) return cell1.walls.topWall || cell2.walls.bottomWall;
        return false;
    }

    highlightColor(color) {
        let x = (this.colNum * this.parentSize) / this.parentGrid[0].length;
        let y = (this.rowNum * this.parentSize) / this.parentGrid.length;
        ctx.fillStyle = color;
        ctx.fillRect(x + 1, y + 1, this.parentSize / this.parentGrid[0].length - 3, this.parentSize / this.parentGrid.length - 3);
    }

    centerX() {
        return (this.colNum + 0.5) * (this.parentSize / this.parentGrid[0].length);
    }

    centerY() {
        return (this.rowNum + 0.5) * (this.parentSize / this.parentGrid.length);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    function generateMaze() {
        maze1 = new Maze(250, 25, 25);
        maze1.setup();
        maze1.draw();
    }

    document.getElementById('maze').addEventListener('click', generateMaze);
})

document.addEventListener('DOMContentLoaded', function () {
    const pathButton = document.getElementById('path');
    const mazeCanvas = document.querySelector('.maze');

    pathButton.addEventListener('click', async function () {

        if (isCanvasFilled(mazeCanvas)) {
            const selectedButton = document.querySelector('.pathfinder-sel button.active-path');
            if (selectedButton) {
                const algo = selectedButton.getAttribute('data-algo');
                const startNode = maze1.grid[0][0];
                const endNode = maze1.grid[maze1.rows - 1][maze1.columns - 1];
                switch (algo) {
                    case 'Astar':
                        console.log('A* algorithm selected');
                        await Astar(startNode, endNode, maze1.grid, maze1)
                        break;
                    case 'dijkstra':
                        console.log('Dijkstra algorithm selected');
                        break;
                    default:
                        console.log('No algorithm selected');
                }
            } else {
                console.log('No algorithm selected');
            }
        } else {
            console.log('Maze has not been drawn');
        }
    });
});

function isCanvasFilled(canvas) {
    const context = canvas.getContext('2d');
    const pixelData = context.getImageData(0, 0, canvas.width, canvas.height).data;
    for (let i = 3; i < pixelData.length; i += 4) {
        if (pixelData[i] > 0) {
            return true;
        }
    }
    return false;
}