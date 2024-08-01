import { BubbleSort } from "../sortFunctions/BubbleSort";
import { SelectionSort } from "../sortFunctions/SelectionSort";
import { InsertionSort } from "../sortFunctions/InsertionSort";
import { QuickSort } from "../sortFunctions/QuickSort";
import { HeapSort } from "../sortFunctions/HeapSort.js";
import { MergeSort } from "../sortFunctions/MergeSort";

export function getScreenWidth() {
    return window.innerWidth;
}

export function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

export const comparisionColor = "pink";
export const swapColor = "yellow";
export const sortedColor = "springgreen";
export const pivotColor = "sandybrown";

// time setting
// export let swapTime = 1000;
// export let compareTime = 500;

export const sortingAlgorithms = [
    { component: BubbleSort, title: "Bubble", name: "BubbleSort" },
    { component: SelectionSort, title: "Selection", name: "SelectionSort" },
    { component: InsertionSort, title: "Insertion", name: "InsertionSort" },
    { component: HeapSort, title: "Heap", name: "HeapSort" },
    { component: MergeSort, title: "Merge", name: "MergeSort" },
    { component: QuickSort, title: "Quick", name: "QuickSort" },
];
