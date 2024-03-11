package main.java.visualizer.algorithms.sorting;

import main.java.visualizer.core.BarGraphPanel;

public class BubbleSort {
    private BarGraphPanel barGraphPanel;

    public BubbleSort(BarGraphPanel barGraphPanel) {
        this.barGraphPanel = barGraphPanel;
    }

    public void sort() {
        int[] arr = barGraphPanel.getValues();
        boolean swapped;
        for (int i = 0; i < arr.length - 1; i++) {
            swapped = false;
            for (int j = 0; j < arr.length - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    // Swap
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                    barGraphPanel.setComparingIndices(j, j + 1);
                    barGraphPanel.repaint();
                    sleep();
                }
            }
            if (!swapped)
                break;
        }
        barGraphPanel.markAsSorted();
    }

    private void sleep() {
        try {
            Thread.sleep(100);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
