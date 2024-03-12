package main.java.visualizer.core;

import javax.swing.*;
import java.awt.*;

public class MazePanel extends JPanel {
    private Cell[][] maze;
    private int cellSize;

    public MazePanel(Cell[][] maze) {
        this.maze = maze;
        int panelSize = calculatePanelSize(maze);
        setPreferredSize(new Dimension(panelSize, panelSize)); // Dynamic size based on the maze
        this.cellSize = panelSize / maze.length; // Assuming a square maze
    }

    private int calculatePanelSize(Cell[][] maze) {
        // You can set this to be more dynamic or to fit a certain aspect of your UI
        int maxSize = 800; // Maximum size of the panel
        int maxCells = Math.max(maze.length, maze[0].length); // Maximum number of cells in a row/column
        return Math.min(maxSize / maxCells * maxCells, maxSize); // Calculate size to fit the cells perfectly
    }

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);
        for (int i = 0; i < maze.length; i++) {
            for (int j = 0; j < maze[i].length; j++) {
                if (maze[i][j].isWall()) {
                    g.setColor(Color.BLACK);
                } else {
                    g.setColor(Color.WHITE);
                }
                g.fillRect(i * cellSize, j * cellSize, cellSize, cellSize); 
            }
        }
    }

    public void setMaze(Cell[][] newMaze) {
        this.maze = newMaze;
        this.repaint(); 
    }
}