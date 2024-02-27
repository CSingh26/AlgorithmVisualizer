export async function Astar(starNode, endNode, grid, maze1) {
    let openList = []
    let closedList = new Set()

    starNode.g = 0
    starNode.h = dotH(starNode, endNode)
    starNode.f = starNode.g + starNode.h

    openList.push(starNode)

    while (openList.length > 0) {
        await delay(50);
        openList.sort((a, b) => a.f - b.f);

        let currentNode = openList.shift(); 
        closedList.add(currentNode);

        
        if (currentNode === endNode) {
            return reconstructPath(endNode, ctx); 
        }

        let neighbors = currentNode.getNeighborsWithoutWalls()
        for (let neighbor of neighbors) {
            neighbor.highlightColor('blue')
            if (closedList.has(neighbor)) continue;

            let tentativeGScore = currentNode.g + 1; 
            if (!openList.includes(neighbor)) {
                openList.push(neighbor);
            } else if (tentativeGScore >= neighbor.g) {
                continue; 
            }

            
            neighbor.g = tentativeGScore;
            neighbor.h = dotH(neighbor, endNode);
            neighbor.f = neighbor.g + neighbor.h;
            neighbor
        }
        currentNode.highlightColor('red')
        reconstructPath(maze1, starNode, endNode)
    }
    return [];


}

function dotH(node, endNode) {
    return Math.abs(node.x - endNode.x) + Math.abs(node.y - endNode.y)
}

function reconstructPath(maze1, start, end) {
    let path = [];
    let current = end;
    while (current != null) {
        path.unshift(current);
        current = current.previous; 
    }

    maze1.ctx.clearRect(0, 0, maze1.width, maze1.height); 
    maze1.draw(); 

    maze1.ctx.beginPath();
    maze1.ctx.moveTo(path[0].centerX(), path[0].centerY()); 

    for (let cell of path) {
        ctx.lineTo(cell.centerX(), cell.centerY()); 
    }

    maze1.ctx.strokeStyle = 'green'; 
    maze1.ctx.lineWidth = 3; 
    maze1.ctx.stroke(); 

    return path; 
}


function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
