package main.java.visualizer.core;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class Main extends JFrame{

    private JPanel mainPanel;
    private JButton sortButton;
    private JButton pathButton;

    public Main() {
        initializeUI();
    }

    private void initializeUI() {
        setTitle("Algorithm Visualizer");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setExtendedState(JFrame.MAXIMIZED_BOTH); 

        mainPanel = new JPanel();
        mainPanel.setLayout(new FlowLayout());

        sortButton = new JButton("Sorting Algorithm Visualizer");
        pathButton = new JButton("Pathfinder Algorithm Visualizer");

        mainPanel.add(sortButton);
        mainPanel.add(pathButton);

        this.getContentPane().add(mainPanel);

        sortButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                dispose();
                new SortingVisualizer().setVisible(true);
            }
        });

        pathButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                dispose();
                new Pathfinding().setVisible(true);
            }
        });
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            Main window = new Main();
            window.setVisible(true);
        });
    }
}
