package main.java.visualizer.core;

import java.util.ArrayList;
import java.util.Stack;

public class MazeGenerator {
    private final int width, height;
    private final Cell[][] maze;

    public MazeGenerator(int width, int height) {
        this.width = width;
        this.height = height;
        this.maze = new Cell[width][height];
        initializeMaze();
        generateMaze(0, 0);
    }

    private void initializeMaze() {
        for (int x = 0; x < width; x++) {
            for (int y = 0; y < height; y++) {
                maze[x][y] = new Cell(x, y);
            }
        }
    }

    public void generateMaze(int startX, int startY) {
        Stack<Cell> stack = new Stack<>();
        Cell start = maze[startX][startY];
        start.setVisited(true);
        start.setWall(false);
        stack.push(start);

        while (!stack.isEmpty()) {
            Cell current = stack.peek();
            ArrayList<Cell> neighbors = getUnvisitedNeighbors(current);

            if (neighbors.isEmpty()) {
                stack.pop();
            } else {
                Cell next = neighbors.get((int) (Math.random() * neighbors.size()));
                removeWalls(current, next);
                next.setVisited(true);
                stack.push(next);
            }
        }
    }

    private ArrayList<Cell> getUnvisitedNeighbors(Cell cell) {
        ArrayList<Cell> neighbors = new ArrayList<>();
        int[][] directions = {{0, -1}, {1, 0}, {0, 1}, {-1, 0}};

        for (int[] direction : directions) {
            int x = cell.getX() + direction[0];
            int y = cell.getY() + direction[1];

            if (x >= 0 && y >= 0 && x < width && y < height && !maze[x][y].isVisited()) {
                neighbors.add(maze[x][y]);
            }
        }

        return neighbors;
    }

    private void removeWalls(Cell current, Cell next) {
        int dx = next.getX() - current.getX();
        int dy = next.getY() - current.getY();

        if (dx == 1) {
            current.setRightWall(false);
            next.setLeftWall(false);
        } else if (dx == -1) {
            current.setLeftWall(false);
            next.setRightWall(false);
        } else if (dy == 1) {
            current.setBottomWall(false);
            next.setTopWall(false);
        } else if (dy == -1) {
            current.setTopWall(false);
            next.setBottomWall(false);
        }
    }

    public Cell[][] getMaze() {
        return maze;
    }
}
