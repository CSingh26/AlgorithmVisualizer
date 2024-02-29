import tkinter as tk
from tkinter import ttk

class SortingVisualizerApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Sorting Visualizer")
        self.root.geometry("800x600") 

        
        self.algorithm_var = tk.StringVar()
        algorithms = ["Bubble Sort", "Quick Sort", "Merge Sort"]
        self.algorithm_dropdown = ttk.Combobox(root, textvariable=self.algorithm_var, values=algorithms)
        self.algorithm_dropdown.grid(row=0, column=0, padx=10, pady=10)
        self.algorithm_dropdown.current(0)

        self.start_button = ttk.Button(root, text="Start", command=self.start_sorting)
        self.start_button.grid(row=0, column=1, padx=10, pady=10)

    def start_sorting(self):
        print(f"Starting {self.algorithm_var.get()}...")

def main():
    root = tk.Tk()
    app = SortingVisualizerApp(root)
    root.mainloop()

if __name__ == "__main__":
    main()
