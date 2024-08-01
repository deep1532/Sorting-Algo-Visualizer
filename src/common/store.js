import { useState, useCallback } from "react";

export const useControls = () => {
    const [progress, setProgress] = useState("reset");
    const [speed, setSpeed] = useState(3);
    const [doneCount, setDoneCount] = useState(0);
    const [swapTime, setSwapTime] = useState(3000 / speed);
    const [compareTime, setCompareTime] = useState(1500 / speed);

    const startSorting = useCallback(() => setProgress("start"), []);
    const pauseSorting = useCallback(() => setProgress("pause"), []);
    const doneSorting = useCallback(() => setProgress("done"), []);
    const resetSorting = useCallback(() => {
        setProgress("reset");
        setDoneCount(0);
    }, []);
    // const markSortngDone = useCallback(() => {
    //     if (useData.getState().algorithm === sortingAlgorithms.length) {
    //         // if (4 === sortingAlgorithms.length) {  // harded code for making this condition false
    //         if (doneCount === sortingAlgorithms.length - 1) {
    //             setDoneCount(0);
    //             setProgress("done");
    //         } else {
    //             setDoneCount((prevDoneCount) => prevDoneCount + 1);
    //         }
    //     } else {
    //         setProgress("done");
    //     }
    // }, [doneCount]);

    const setSpeedHandler = useCallback(
        (newSpeed) => {
            setSpeed(newSpeed);
            setSwapTime(3000 / newSpeed);
            setCompareTime(1500 / newSpeed);
        },
        [setSpeed]
    );

    return {
        progress,
        speed,
        compareTime,
        swapTime,
        doneCount,
        startSorting,
        pauseSorting,
        doneSorting,
        resetSorting,
        setDoneCount,
        setSpeed: setSpeedHandler,
    };
};


export const useData = () => {
    const [algorithm, setAlgorithm] = useState(0);
    const [sortingArray, setSortingArray] = useState(initArrayForScreenSize());

    return {
        algorithm,
        sortingArray,
        setAlgorithm,
        setSortingArray,
    };
};

function initArrayForScreenSize() {
    const screenSize = window.innerWidth;
    if (screenSize < 460) return [4, 3, 2, 1];
    else if (screenSize < 720) return [8, 7, 6, 5, 4, 3, 2, 1];
    return [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
  }