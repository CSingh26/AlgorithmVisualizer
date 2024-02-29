import tkinter as tk
from tkinter import ttk
from tkinter import Toplevel

from sort import Sort
from path import Path

class MainWindow:
    def __init__(self, root):
        self.root = root
        self.root.title("Algorithm Visualizer")

        self.root.attributes('-fullscreen', True)

        self.root.configure(background='sky blue')

        self.headingLabel = ttk.Label(root, text="Welcome to Algorithm Visualizer")
        self.headingLabel.grid(row = 0, column=0)

        self.sortButton = ttk.Button(root, text="Sorting Visualizer", command=self.openSort)
        self.sortButton.grid(row=1, column=0)

        self.pathButton = ttk.Button(root, text="Pathfinder Visualizer", command=self.openPath)
        self.pathButton.grid(row=2, column=0)

        style = ttk.Style()
        style.theme_use('clam')
        style.configure('TButton', background='sky blue')

    def openSort(self):
        sortWindow = Toplevel(self.root)
        sortWindow = Sort(sortWindow, self.show_main)

    def openPath(self):
        pathWindow = Toplevel(self.root)
        pathWindow = Path(pathWindow, self.show_main)

    def show_main(self):
        self.root.deiconify()

def main():
    root = tk.Tk()
    app = MainWindow(root)
    root.mainloop()

if __name__ == "__main__":
    main()