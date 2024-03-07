package main.java.visualizer.core;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class SortingVisualizer extends JFrame{

    private JPanel rightPanel, leftPanel;
    private JSlider arrSize, timeReq;
    private JButton bubbleSort, mergeSort, insertionSort, selectionSort, heapSort, quickSort;
    private JButton genArr, backHome;
    private JLabel heading1, arrSizeLabel, timeLabel;

    public SortingVisualizer() {
        initializeUI();
    }

    private void initializeUI() {
        setTitle("Sorting Vissualizer");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setExtendedState(JFrame.MAXIMIZED_BOTH); 

        leftPanel = new JPanel();
        leftPanel.setLayout(new BoxLayout(leftPanel, BoxLayout.Y_AXIS));

        bubbleSort = new JButton("Bubble Sort");
        mergeSort = new JButton("Merge Sort");
        quickSort = new JButton("Quick Sort");
        heapSort = new JButton("Heap Sort");
        insertionSort = new JButton("Insertion Sort");
        selectionSort = new JButton("Selection Sort");
        genArr = new JButton("Generate New Array");

        arrSize = new JSlider(10, 200, 175);
        timeReq = new JSlider(1, 5);

        arrSizeLabel = new JLabel("Array Size");
        timeLabel = new JLabel("Speed");

        leftPanel.add(arrSizeLabel);
        leftPanel.add(arrSize);
        leftPanel.add(timeLabel);
        leftPanel.add(timeReq);
        leftPanel.add(genArr);
        leftPanel.add(bubbleSort);
        leftPanel.add(mergeSort);
        leftPanel.add(selectionSort);
        leftPanel.add(insertionSort);
        leftPanel.add(heapSort);
        leftPanel.add(quickSort);

        heading1 = new JLabel("Welcome to Sorting Visualizer", SwingConstants.CENTER);
        add(heading1, BorderLayout.NORTH);

        add(leftPanel, BorderLayout.WEST);

        backHome = new JButton("Back to Home");
        backHome.setAlignmentX(Component.CENTER_ALIGNMENT);
        add(backHome, BorderLayout.SOUTH);

        setVisible(true);

    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            new SortingVisualizer();
        });
    }
    
}
