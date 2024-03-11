package main.java.visualizer.algorithms.sorting;
import main.java.visualizer.core.BarGraphPanel;

public class QuickSort {
    private BarGraphPanel barGraphPanel;
    private int delay;

    public QuickSort(BarGraphPanel barGraphPanel, int timeDelay) {
        this.barGraphPanel = barGraphPanel;
        this.delay = (11 - timeDelay) * 100;
    }

    public void sort() {
        int[] arr = barGraphPanel.getValues();
        quickSort(arr, 0, arr.length - 1);
        barGraphPanel.markAsSorted();
    }

    private void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pivotIndex = partition(arr, low, high);
            quickSort(arr, low, pivotIndex - 1);
            quickSort(arr, pivotIndex + 1, high);
        }
    }

    private int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = (low - 1);
        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                // Swap arr[i] and arr[j]
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
                barGraphPanel.setComparingIndices(i, j);
                updateAndSleep();
            }
        }
        // Swap arr[i+1] and arr[high] (or pivot)
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        barGraphPanel.setComparingIndices(i + 1, high);
        updateAndSleep();
        return i + 1;
    }

    private void updateAndSleep() {
        barGraphPanel.repaint();
        try {
            Thread.sleep(delay); // Adjust this delay to control the visualization speed
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}