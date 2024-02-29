import tkinter as tk
from tkinter import ttk

class Sort:
    def __init__(self,root, show_main_callback):
        self.root = root
        self.show_main_callback = show_main_callback
        self.root.title("Sorting Visualizer")
        self.root.geometry("1000x700")

        self.root.configure(background='sky blue')

        self.homeButton = ttk.Button(root, text="BackHome", command=self.homeWindow)
        self.homeButton.grid(row=0, column=0)

        style = ttk.Style()
        style.theme_use('clam')
        style.configure('TButton', background='sky blue')



    def homeWindow(self):
        self.root.destroy()
        self.show_main_callback()
