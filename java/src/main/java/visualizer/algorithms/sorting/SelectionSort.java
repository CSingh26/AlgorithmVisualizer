package main.java.visualizer.algorithms.sorting;
import main.java.visualizer.core.BarGraphPanel;

public class SelectionSort {
    private BarGraphPanel barGraphPanel;

    public SelectionSort(BarGraphPanel barGraphPanel) {
        this.barGraphPanel = barGraphPanel;
    }

    public void sort() {
        int[] arr = barGraphPanel.getValues();
        for (int i = 0; i < arr.length - 1; i++) {
            int min_idx = i;
            for (int j = i + 1; j < arr.length; j++)
                if (arr[j] < arr[min_idx])
                    min_idx = j;

            int temp = arr[min_idx];
            arr[min_idx] = arr[i];
            arr[i] = temp;
            barGraphPanel.setComparingIndices(i, min_idx);
            barGraphPanel.repaint();
            sleep();
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

