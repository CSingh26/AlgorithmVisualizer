import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
import numpy as np

from sortAlgo import bubbleSort, insertionSort, selectionSort, startMergeSort, startQuickSort, heapSort

class SortVisualizer:
    def __init__(self, sort_function, data, timeDelta):
        self.sort_function = sort_function
        self.data = data
        self.fig, self.ax = plt.subplots()
        self.ani = None
        self.timeDelta = timeDelta

    def update(self, step_data):
        data, indices = step_data
        self.ax.clear()
        bars = self.ax.bar(range(len(data)), data, color='blue')
        if indices == 'done':
            for bar in bars:
                bar.set_color('green')
        else:
            for i in indices:
                bars[i].set_color('red')
        self.ax.set_title("Sorting Visualizer")

    def animate_sorting(self):
        self.ani = FuncAnimation(self.fig, self.update, frames=self.sort_function(self.data), interval=(100 * self.timeDelta), repeat=False)
        plt.show()

if __name__ == "__main__":
    data = np.random.randint(1, 100, 50)  
    visualizer = SortVisualizer(startQuickSort, data, 3)  
    visualizer.animate_sorting()


