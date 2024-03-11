package main.java.visualizer.algorithms.sorting;

import main.java.visualizer.core.BarGraphPanel;

public class MergeSort {
    private BarGraphPanel barGraphPanel;
    private int delay;

    public MergeSort(BarGraphPanel barGraphPanel, int timeDelay) {
        this.barGraphPanel = barGraphPanel;
        this.delay = (11 - timeDelay) * 100;
    }

    public void sort() {
        int[] array = barGraphPanel.getValues();
        mergeSort(array, 0, array.length - 1);
        barGraphPanel.markAsSorted();
    }

    private void mergeSort(int[] array, int left, int right) {
        if (left < right) {
            // Find the middle point
            int middle = (left + right) / 2;

            // Sort first and second halves
            mergeSort(array, left, middle);
            mergeSort(array, middle + 1, right);

            // Merge the sorted halves
            merge(array, left, middle, right);
        }
    }

    private void merge(int[] array, int left, int middle, int right) {
        // Find sizes of two subarrays to be merged
        int n1 = middle - left + 1;
        int n2 = right - middle;

        /* Create temp arrays */
        int[] L = new int[n1];
        int[] R = new int[n2];

        /*Copy data to temp arrays*/
        System.arraycopy(array, left, L, 0, n1);
        System.arraycopy(array, middle + 1, R, 0, n2);

        /* Merge the temp arrays */

        // Initial indexes of first and second subarrays
        int i = 0, j = 0;

        // Initial index of merged subarray array
        int k = left;
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                array[k] = L[i];
                i++;
            } else {
                array[k] = R[j];
                j++;
            }
            barGraphPanel.setComparingIndices(k, -1); // Highlight current index
            barGraphPanel.repaint();
            sleepForAnimation();
            k++;
        }

        /* Copy remaining elements of L[] if any */
        while (i < n1) {
            array[k] = L[i];
            i++;
            k++;
            barGraphPanel.repaint();
            sleepForAnimation();
        }

        /* Copy remaining elements of R[] if any */
        while (j < n2) {
            array[k] = R[j];
            j++;
            k++;
            barGraphPanel.repaint();
            sleepForAnimation();
        }

        barGraphPanel.setComparingIndices(-1, -1); // Reset comparison indices
    }

    private void sleepForAnimation() {
        try {
            Thread.sleep(delay); // Small delay for visualization
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
