package main.java.visualizer.core;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class Pathfinding extends JFrame {

    private JPanel rightPanel, leftPanel, paddedLeftPannel;
    private JButton aStarAlgo, dijkstraAlgo;
    private JButton genMaze, backHome;
    private JLabel heading1;
    private Container contentPane;
    private MazeGenerator gen;
    private Cell[][] maze;
    private MazePanel mazePanel;

    public Pathfinding() {
        initializeUI();
    }

    private void initializeUI() {
        setTitle("Pathfinding visualizer");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setExtendedState(JFrame.MAXIMIZED_BOTH);

        contentPane = getContentPane();
        contentPane.setLayout(new BorderLayout());

        heading1 = new JLabel("Welcome to Pathfinding Algorithm Visualizer", SwingConstants.CENTER);
        contentPane.add(heading1, BorderLayout.NORTH);

        leftPanel = new JPanel();
        leftPanel.setLayout(new BoxLayout(leftPanel, BoxLayout.Y_AXIS));

        aStarAlgo = new JButton("AStar Algorithm");
        genMaze = new JButton("Generate New Maze");
        dijkstraAlgo = new JButton("Dijkstra Algorithm");

        leftPanel.add(genMaze);
        addSpacing(leftPanel);
        leftPanel.add(aStarAlgo);
        addSpacing(leftPanel);
        leftPanel.add(dijkstraAlgo);
        addSpacing(leftPanel);

        leftPanel.add(Box.createVerticalGlue());

        paddedLeftPannel = new JPanel(new BorderLayout());
        paddedLeftPannel.add(leftPanel, BorderLayout.CENTER);
        paddedLeftPannel.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));

        contentPane.add(paddedLeftPannel, BorderLayout.WEST);

        backHome = new JButton("Back to Home");
        backHome.setAlignmentX(Component.CENTER_ALIGNMENT);
        contentPane.add(backHome, BorderLayout.SOUTH);

        gen = new MazeGenerator(20, 20);
        maze = gen.getMaze();

        mazePanel = new MazePanel(maze); 
        mazePanel.repaint();
        rightPanel = new JPanel(new BorderLayout());
        rightPanel.add(mazePanel, BorderLayout.CENTER); 
        add(rightPanel, BorderLayout.CENTER);

        setupListners();

        setVisible(true);

    }

    private void addSpacing(JPanel panel) {
        panel.add(Box.createRigidArea(new Dimension(0, 10)));
    }

    private void setupListners() {
        backHome.addActionListener(e -> {
            dispose();
            new Main().setVisible(true);
        });

        genMaze.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                gen = new MazeGenerator(20, 20);
                maze = gen.getMaze();
                mazePanel.setMaze(maze); 
                mazePanel.repaint();
            }
        });
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            new Pathfinding();
        });
    }
}
