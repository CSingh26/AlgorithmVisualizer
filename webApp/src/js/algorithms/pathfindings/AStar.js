export async function Astar(starNode, endNode, grid) {
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
            return reconstructPath(endNode);
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
    }
    return [];

}

function dotH(node, endNode) {
    return Math.abs(node.x - endNode.x) + Math.abs(node.y - endNode.y)
}

function reconstructPath(endNode) {
    let path = [];
    let current = endNode;
    while (current != null) {
        path.unshift(current);
        current = current.previous;
    }

    for (let cell of path) {
        cell.highlightColor('green');
    }

    return path;
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}