def bubbleSort(data):
    size = len(data)
    for i in range(size):
        for j in range(size - i - 1):
            if data[j] > data[j + 1]:
                data[j], data[j + 1] = data[j + 1], data[j]
                yield data, [j, j + 1]
                yield data
    yield data, 'done'


def insertionSort(data):
    for i in range(1, len(data)):
        key = data[i]
        j = i - 1
        while j >= 0 and key < data[j]:
            data[j+1] = data[j]
            j -= 1
            yield data, [j+1, j] 
        data[j+1] = key
        yield data, [j+1]  
    yield data, 'done'  


def selectionSort(data):
    for i in range(len(data)):
        min_idx = i
        for j in range(i+1, len(data)):
            if data[min_idx] > data[j]:
                min_idx = j
                yield data, [min_idx, j]  
        data[i], data[min_idx] = data[min_idx], data[i]
        yield data, [i, min_idx]  
    yield data, 'done'  


def mergeSort(data, start, end, depth=0):
    if end - start > 1:
        middle = (start + end) // 2
        yield from mergeSort(data, start, middle, depth + 1)
        yield from mergeSort(data, middle, end, depth + 1)
        
        left, right = data[start:middle], data[middle:end]
        i = j = 0
        k = start
        
        while start + i < middle and middle + j < end:
            if left[i] <= right[j]:
                data[k] = left[i]
                i += 1
            else:
                data[k] = right[j]
                j += 1
            if depth == 0:  
                yield data, (start, end - 1)  
            k += 1
            
        while start + i < middle:
            data[k] = left[i]
            i += 1
            k += 1
            if depth == 0:
                yield data, (start, end - 1)
                
        while middle + j < end:
            data[k] = right[j]
            j += 1
            k += 1
            if depth == 0:
                yield data, (start, end - 1)
                
        if depth == 0:
            yield data, 'done'

def startMergeSort(data):
    yield from mergeSort(data, 0, len(data))

def heapify(data, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2
    
    if left < n and data[largest] < data[left]:
        largest = left
    
    if right < n and data[largest] < data[right]:
        largest = right

    if largest != i:
        data[i], data[largest] = data[largest], data[i]
        yield data, [i, largest]  
        yield from heapify(data, n, largest)

def heapSort(data):
    n = len(data)
    
    for i in range(n // 2 - 1, -1, -1):
        yield from heapify(data, n, i)
    
    for i in range(n-1, 0, -1):
        data[i], data[0] = data[0], data[i]
        yield data, [0, i]  
        yield from heapify(data, i, 0)

    yield data, 'done'  

def quickSort(data, low, high):
    if low < high:
        pi, pivIndices = yield from partition(data, low, high)
        yield data, pivIndices 
        yield from quickSort(data, low, pi-1)
        yield from quickSort(data, pi+1, high)

def partition(data, low, high):
    pivot = data[high]
    i = low - 1
    for j in range(low, high):
        if data[j] < pivot:
            i += 1
            data[i], data[j] = data[j], data[i]
            yield data, [i,j]
    data[i+1], data[high] = data[high], data[i+1]
    yield data, [i+1, high]
    return i+1, [i+1, high]

def startQuickSort(data):
    yield from quickSort(data, 0, len(data) - 1)
    yield data, 'done'

