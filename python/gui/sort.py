import tkinter as tk
from tkinter import ttk
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg

class Sort:

    def __init__(self,root, show_main_callback):
        self.root = root
        self.root.title("Sorting Visualizer")
        self.show_main_callback = show_main_callback

        self.root.configure(background='sky blue')

        self.root.attributes('-fullscreen', True)

        self.array_size = 50  # Default array size
        self.data = np.random.randint(1, 100, self.array_size)

        self.headingLabel = ttk.Label(root, text="Welcome to Sorting Visualizer", background="sky blue")
        self.headingLabel.place(x=775, y=75)

        self.bubbleSort = ttk.Button(root, text="Bubble Sort")
        self.bubbleSort.place(x=525, y=125)

        self.mergeSort = ttk.Button(root, text="Merge Sort")
        self.mergeSort.place(x=650, y=125)

        self.quickSort = ttk.Button(root, text="Quick Sort")
        self.quickSort.place(x=775, y=125)

        self.heapSort = ttk.Button(root, text="Heap Sort")
        self.heapSort.place(x=900, y=125)

        self.insertionSort = ttk.Button(root, text="Insertion Sort")
        self.insertionSort.place(x=1025, y=125)

        self.selectionSort = ttk.Button(root, text="Selection Sort")
        self.selectionSort.place(x=1150, y=125)

        self.arrSizeLabel = ttk.Label(root, text="Array Size", background="sky blue")
        self.arrSizeLabel.place(x=600, y=186)

        self.arrSize = ttk.Scale(root, orient="horizontal", from_=5, to=200, command=self.on_slider_change)
        self.arrSize.place(x=675, y=190)

        self.timeInputLabel = ttk.Label(root, text="Speed", background="sky blue")
        self.timeInputLabel.place(x=825, y=186)

        self.timeInput = ttk.Scale(root, orient="horizontal", from_=0, to=5)
        self.timeInput.place(x=880, y=190)

        self.genArrButton = ttk.Button(root, text="Generate New Array", command=self.generate_new_array)
        self.genArrButton.place(x=1025, y=180)

        self.fig, self.ax = plt.subplots(figsize=(6, 3))
        self.canvas = FigureCanvasTkAgg(self.fig, master=root) 
        self.canvas.get_tk_widget().place(x=300, y=300)
        self.plot_graph(self.data)

        self.homeButton = ttk.Button(root, text="BackHome", command=self.homeWindow)
        self.homeButton.place(x=825, y=1000)

        style = ttk.Style()
        style.theme_use('clam')
        style.configure('TButton', background='sky blue')

    def homeWindow(self):
        self.root.destroy()
        self.show_main_callback()

    def plot_graph(self, data):
        self.ax.clear()
        self.ax.bar(range(len(data)), data)
        self.canvas.draw()

    def on_slider_change(self, event=None):
        self.array_size = int(self.arrSize.get())
        self.generate_new_array()

    def generate_new_array(self):
        self.data = np.random.randint(1, 100, self.array_size)
        self.plot_graph(self.data)

def main():
    root = tk.Tk()
    app = Sort(root)
    root.mainloop()

if __name__ == "__main__":
    main()