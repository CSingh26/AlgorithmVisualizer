package main.java.visualizer.core;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import main.java.visualizer.core.BarGraphPanel;
import main.java.visualizer.algorithms.sorting.BubbleSort;
import main.java.visualizer.algorithms.sorting.HeapSort;
import main.java.visualizer.algorithms.sorting.InsertionSort;
import main.java.visualizer.algorithms.sorting.MergeSort;
import main.java.visualizer.algorithms.sorting.QuickSort;
import main.java.visualizer.algorithms.sorting.SelectionSort;

public class SortingVisualizer extends JFrame {

    private JPanel rightPanel, leftPanel, paddedLeftPanel;
    private JSlider arrSize, timeReq;
    private JButton bubbleSort, mergeSort, insertionSort, selectionSort, heapSort, quickSort;
    private JButton genArr, backHome;
    private JLabel heading1, arrSizeLabel, timeLabel;
    BarGraphPanel bar;

    public SortingVisualizer() {
        initializeUI();
    }

    private void initializeUI() {
        setTitle("Sorting Vissualizer");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setExtendedState(JFrame.MAXIMIZED_BOTH); 

        Container contentPane = getContentPane();
        contentPane.setLayout(new BorderLayout());

        leftPanel = new JPanel();
        leftPanel.setLayout(new BoxLayout(leftPanel, BoxLayout.Y_AXIS));

        rightPanel = new JPanel(new BorderLayout());
        int[] example = {100, 40, 70, 30, 55};
        bar = new BarGraphPanel(example);
        rightPanel.add(bar, BorderLayout.CENTER);
        add(rightPanel, BorderLayout.CENTER);

        bubbleSort = new JButton("Bubble Sort");
        mergeSort = new JButton("Merge Sort");
        quickSort = new JButton("Quick Sort");
        heapSort = new JButton("Heap Sort");
        insertionSort = new JButton("Insertion Sort");
        selectionSort = new JButton("Selection Sort");
        genArr = new JButton("Generate New Array");

        arrSize = new JSlider(10, 200, 190);
        arrSize.setMajorTickSpacing(20);
        arrSize.setMinorTickSpacing(10);
        arrSize.setPaintTicks(true);
        arrSize.setPaintLabels(true);
        
        timeReq = new JSlider(1, 10);
        timeReq.setMajorTickSpacing(2);
        timeReq.setMinorTickSpacing(1);
        timeReq.setPaintTicks(true);
        timeReq.setPaintLabels(true);

        arrSizeLabel = new JLabel("Array Size");
        timeLabel = new JLabel("Speed");

        heading1 = new JLabel("Welcome to Sorting Visualizer", SwingConstants.CENTER);
        contentPane.add(heading1, BorderLayout.NORTH);

        leftPanel.add(Box.createVerticalGlue());

        leftPanel.add(arrSizeLabel);
        leftPanel.add(arrSize);
        addSpacing(leftPanel);
        leftPanel.add(timeLabel);
        leftPanel.add(timeReq);
        addSpacing(leftPanel);
        leftPanel.add(genArr);
        addSpacing(leftPanel);
        leftPanel.add(bubbleSort);
        addSpacing(leftPanel);
        leftPanel.add(mergeSort);
        addSpacing(leftPanel);
        leftPanel.add(selectionSort);
        addSpacing(leftPanel);
        leftPanel.add(insertionSort);
        addSpacing(leftPanel);
        leftPanel.add(heapSort);
        addSpacing(leftPanel);
        leftPanel.add(quickSort);

        leftPanel.add(Box.createVerticalGlue());

        paddedLeftPanel = new JPanel(new BorderLayout());
        paddedLeftPanel.add(leftPanel, BorderLayout.CENTER);
        paddedLeftPanel.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10)); 

        contentPane.add(paddedLeftPanel, BorderLayout.WEST);

        backHome = new JButton("Back to Home");
        backHome.setAlignmentX(Component.CENTER_ALIGNMENT);
        contentPane.add(backHome, BorderLayout.SOUTH);

        setupListeners();

        setVisible(true);
    }
    
    private void addSpacing(JPanel panel) {
        panel.add(Box.createRigidArea(new Dimension(0, 10)));
    }

    private void setupListeners() {
        backHome.addActionListener(e -> {
            dispose();
            new Main().setVisible(true);
        });

        genArr.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                int size = arrSize.getValue();
                
                int[] newArray = new int[size];
                for (int i = 0; i < size; i++) {
                    newArray[i] = (int) (Math.random() * bar.getHeight()); // Replace 'height' with the max value for the bars
                }
                bar.setValues(newArray);
            }
        });  
        
        heapSort.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                HeapSort heapSorter = new HeapSort(bar, timeReq.getValue()); 
                new Thread(new Runnable() {
                    public void run() {
                        heapSorter.sort();
                    }
                }).start();
            }
        });

        bubbleSort.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                BubbleSort bubbleSorter = new BubbleSort(bar, timeReq.getValue());
                new Thread(new Runnable() {
                    public void run() {
                        bubbleSorter.sort();
                    }
                }).start();
            }
        });

        insertionSort.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                InsertionSort insertionSorter = new InsertionSort(bar, timeReq.getValue());
                new Thread(new Runnable() {
                    public void run() {
                        insertionSorter.sort();
                    }
                }).start();
            }
        });

        selectionSort.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                SelectionSort selectionSorter = new SelectionSort(bar, timeReq.getValue());
                new Thread(new Runnable() {
                    public void run() {
                        selectionSorter.sort();
                    }
                }).start();
            }
        });

        quickSort.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                QuickSort quickSorter = new QuickSort(bar, timeReq.getValue());
                new Thread(new Runnable() {
                    public void run() {
                        quickSorter.sort();
                    }
                }).start();
            }
        });

        mergeSort.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                MergeSort mergeSorter = new MergeSort(bar, timeReq.getValue()); 
                new Thread(new Runnable() {
                    public void run() {
                        mergeSorter.sort();;
                    }
                }).start();
            }
        });

    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            new SortingVisualizer();
        });
    }
    
}
