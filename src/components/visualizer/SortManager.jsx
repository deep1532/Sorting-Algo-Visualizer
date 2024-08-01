import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { ArrayContainer } from "./ArrayContainer";
import { MergeContainer } from "./MergeContainer"
import { delay } from "../../common/config";
import Card from '@mui/material/Card';
import { Timer } from "./Timer";
import { InfoFooter } from "./InfoFooter copy";
import { sortingAlgorithms } from "../../common/config"

const Container = styled(Card)`
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.15);
`;

const AlgoHeaderBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 20px;
`;

const TimerDiv = styled.div`
  display: flex;
  column-gap: 5px;
  min-width: 8rem;
  justify-content: flex-end;
`;

export function SortManager(props) {
  const data = props.data
  const isall = props.isall
  const controls = props.controls
  const resetSorting = controls.resetSorting
  const array = data.sortingArray
  const sortFunction = props.sortFunction
  const sortingAlgorithmName = props.sortingAlgorithmName
  const algoIdx = props.algoIdx
  const [swapIndices, setSwapIndices] = useState([-1, -1]);
  const [hightlightedIndices, setHightlightedIndices] = useState([-1, -1]);
  const algoArray = useRef([]);
  const sortedIndices = useRef([]);
  const pivot = useRef(-1);
  const swapCount = useRef(0);
  const comparisionCount = useRef(0);
  const isAlgoExecutionOver = useRef(false);
  const isComponentUnMounted = useRef(false);
  const isAlgorithmRunning = useRef(true);
  const progress = useRef("");
  const sortProgressIterator = useRef(null);
  const swapTimeRef = useRef(controls.swapTime); // Add these refs
  const compareTimeRef = useRef(controls.compareTime);
  
  // useEffect(() => {
  //   console.log("##mounted...", props.data.algorithm);
  //   return ()=>{
  //     console.log("##unmounted..",props.data.algorithm);
  //   }
  // },[])
  useEffect(() => { 
    progress.current = controls.progress;
    if (progress.current === "start") runAlgo();
    if (progress.current === "reset") reset();
    return () => {
      isComponentUnMounted.current = true;
    };
  }, [controls.progress]);

 
  useEffect(() => {
    swapTimeRef.current = controls.swapTime; // Update refs when controls change
    compareTimeRef.current = controls.compareTime;
  }, [controls.swapTime, controls.compareTime]);

  useEffect(() => {
    reset();
  }, [array]);

  function markSortngDone() {
    if (isall) {
      if (controls.doneCount === sortingAlgorithms.length - 1) {
        controls.setDoneCount(0);
        controls.doneSorting();
      } else {
        controls.setDoneCount((prevDoneCount) => prevDoneCount + 1);
      }
    } else {
      controls.doneSorting();
    }
  }

  async function swap(i, j) {
    let tmp = algoArray.current[i];
    algoArray.current[i] = algoArray.current[j];
    algoArray.current[j] = tmp;
    setSwapIndices([i, j]);
    swapCount.current += 1;
    // console.log("swap...", swapTimeRef.current)
    await delay(swapTimeRef.current);
  }

  async function highlight(indices, p) {
    setSwapIndices([-1, -1]);
    comparisionCount.current += 1;
    setHightlightedIndices(indices);
    // console.log("highlight compare...", compareTimeRef.current)
    await delay(compareTimeRef.current);
  }

  function markSort(...indices) {
    sortedIndices.current.push(...indices);
  }
  async function combine(source, destination) {
    if (source !== destination) {
      swapCount.current += 1;
      setHightlightedIndices([-1, -1]);
      setSwapIndices([source, destination]);
      await delay(swapTimeRef.current);
    }
  }

  async function reset() {
    algoArray.current = [...array];;
    sortedIndices.current = [];
    pivot.current = -1;
    swapCount.current = 0;
    comparisionCount.current = 0;
    isAlgoExecutionOver.current = false;
    setSwapIndices([-1, -1]);
    setHightlightedIndices([-1, -1]);

    sortProgressIterator.current =
      sortingAlgorithmName === "MergeSort"
        ? await sortFunction(algoArray.current, combine, highlight, markSort)
        : await sortFunction(algoArray.current, swap, highlight, markSort);

  }

  async function runAlgo() {
    let completion = { done: false };
    while (
      !completion?.done &&
      progress.current === "start" //&&
      // !isComponentUnMounted.current
    ) {
      completion = await sortProgressIterator.current?.next();
    }
    // if (isComponentUnMounted.current) {
    //   return;
    // }
    if (!isAlgoExecutionOver.current && completion?.done) {
      isAlgoExecutionOver.current = true;
      pivot.current = -1;
      setSwapIndices([-1, -1]);
      setHightlightedIndices([-1, -1]);
      markSortngDone();
    }
  }

  const mergeContainer = (
    <MergeContainer
      array={algoArray.current}
      source={swapIndices[0]}
      destination={swapIndices[1]}
      hightlightedIndices={hightlightedIndices}
      sortedIndices={sortedIndices.current}
      swapTime={swapTimeRef.current}
    />
  );

  const arrayContainer = (
    <ArrayContainer
      array={algoArray.current}
      source={swapIndices[0]}
      destination={swapIndices[1]}
      pivot={pivot.current}
      highlightIndices={hightlightedIndices}
      sortedIndices={sortedIndices.current}
      swapTime={swapTimeRef.current}
    />
  );

  return (
    <>
      <Container>
        <AlgoHeaderBar>
          <strong>{sortingAlgorithmName}</strong>
          <TimerDiv>
            <span>Time:</span>
            <strong>
              <Timer
                isAlgoExecutionOver={isAlgoExecutionOver.current}
                controls={controls}
              />
            </strong>
          </TimerDiv>
        </AlgoHeaderBar>
        {sortingAlgorithmName === "MergeSort" ? mergeContainer : arrayContainer}
        <InfoFooter
          swapCount={swapCount.current}
          comparisionCount={comparisionCount.current}
        ></InfoFooter>
      </Container>
    </>
  );
};
