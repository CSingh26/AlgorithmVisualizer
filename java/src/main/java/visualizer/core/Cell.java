package main.java.visualizer.core;

public class Cell {
    private boolean isWall;
    private boolean visited;
    private final int x, y;
    // Flags for the presence of walls
    private boolean topWall = true;
    private boolean rightWall = true;
    private boolean bottomWall = true;
    private boolean leftWall = true;

    // Constructor for walls by default
    public Cell(int x, int y) {
        this.x = x;
        this.y = y;
        this.isWall = true; // Default state is wall
        this.visited = false;
    }

    // Getters and setters
    public boolean isWall() {
        return isWall;
    }

    public void setWall(boolean isWall) {
        this.isWall = isWall;
    }

    public boolean isVisited() {
        return visited;
    }

    public void setVisited(boolean visited) {
        this.visited = visited;
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }

    // Wall management methods
    public boolean hasTopWall() {
        return topWall;
    }

    public void setTopWall(boolean topWall) {
        this.topWall = topWall;
    }

    public boolean hasRightWall() {
        return rightWall;
    }

    public void setRightWall(boolean rightWall) {
        this.rightWall = rightWall;
    }

    public boolean hasBottomWall() {
        return bottomWall;
    }

    public void setBottomWall(boolean bottomWall) {
        this.bottomWall = bottomWall;
    }

    public boolean hasLeftWall() {
        return leftWall;
    }

    public void setLeftWall(boolean leftWall) {
        this.leftWall = leftWall;
    }
}
