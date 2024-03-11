package main.java.visualizer.algorithms.sorting;
import main.java.visualizer.core.BarGraphPanel;

public class InsertionSort {
    private BarGraphPanel barGraphPanel;
    private int delay;

    public InsertionSort(BarGraphPanel barGraphPanel, int timeDelay) {
        this.barGraphPanel = barGraphPanel;
        this.delay = (11 - timeDelay) * 100;
    }

    public void sort() {
        int[] arr = barGraphPanel.getValues();
        for (int i = 1; i < arr.length; ++i) {
            int key = arr[i];
            int j = i - 1;

            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j = j - 1;
                barGraphPanel.setComparingIndices(j + 1, j);
                barGraphPanel.repaint();
                sleep();
            }
            arr[j + 1] = key;
        }
        barGraphPanel.markAsSorted();
    }

    private void sleep() {
        try {
            Thread.sleep(delay);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}