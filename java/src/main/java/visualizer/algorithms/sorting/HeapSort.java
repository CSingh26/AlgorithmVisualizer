package main.java.visualizer.algorithms.sorting;

import main.java.visualizer.core.BarGraphPanel;

public class HeapSort {
    private BarGraphPanel barGraphPanel;

    public HeapSort(BarGraphPanel barGraphPanel) {
        this.barGraphPanel = barGraphPanel;
    }

    private void heapify(int n, int i) {
        int largest = i;
        int left = 2 * i + 1;
        int right = 2 * i + 2;

        if (left < n && barGraphPanel.getValues()[left] > barGraphPanel.getValues()[largest])
            largest = left;

        if (right < n && barGraphPanel.getValues()[right] > barGraphPanel.getValues()[largest])
            largest = right;

        if (largest != i) {
            swap(i, largest);
            heapify(n, largest);
        }
    }

    private void swap(int i, int j) {
        int[] arr = barGraphPanel.getValues();
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        barGraphPanel.setComparingIndices(i, j); 
        barGraphPanel.setValues(arr); 
        barGraphPanel.repaint(); 
        try {
            Thread.sleep(100); 
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        barGraphPanel.setComparingIndices(-1, -1); 
    }
    

    public void sort() {
        int n = barGraphPanel.getValues().length;

        for (int i = n / 2 - 1; i >= 0; i--)
            heapify(n, i);

        for (int i = n - 1; i > 0; i--) {
            swap(0, i);
            heapify(i, 0);
        }

        barGraphPanel.markAsSorted();
    }
}
