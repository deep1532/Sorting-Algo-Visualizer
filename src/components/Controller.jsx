import styled from "styled-components";
import Button from '@mui/material/Button';
import { Slider, TextField } from "@mui/material";
import { VscDebugStart } from "react-icons/vsc";
import { VscDebugRestart } from "react-icons/vsc";
import { ImPause } from "react-icons/im";
import { useEffect, useState } from "react";
import { useData, useControls } from "../common/store";
import { AlgoDisplay } from "./AlgoDisplay";
import {
    convertInputToArrayString,
    convertArrayStringToArray,
    getRandomArray,
    delay
} from "../common/helper";


const ControlBar = styled.div`
  font-size: 2rem;
  display: flex;
  align-items: center;
  margin: 15px 0;
  flex-wrap: wrap;
`;

const ArrayBar = styled.div`
  display: flex;
  align-items: center;
  flex-basis: 60%;
  flex-grow: 1;
  min-width: 300px;
`;

const ExecutionBar = styled.div`
  display: flex;
  align-items: center;
  flex-basis: 40%;
  flex-grow: 1;
`;


export function Controller(props) {
    const [isPausing, setIsPausing] = useState(false);
    const data = props.data
    const controls = props.controls
    const [
        algorithm,
        sortingArray,
        setAlgorithm,
        setSortingArray
    ] = [data.algorithm, data.sortingArray, data.setAlgorithm, data.setSortingArray]
    const [
        progress,
        speed,
        startSorting,
        pauseSorting,
        resetSorting,
        setSpeed,
    ] = [controls.progress, controls.speed, controls.startSorting, controls.pauseSorting, controls.resetSorting, controls.setSpeed]

    const [arrayInput, setArrayInput] = useState(sortingArray);
        
    const startElement = <VscDebugStart onClick={startSorting} />;
    const pauseElement = <ImPause onClick={pauseAndDelaySorting} />;
    const resetElement = <VscDebugRestart onClick={resetSorting} />;
    const disabledPauseElement = <ImPause style={{ color: "#e5e5e5" }} />;

    async function pauseAndDelaySorting() {
        pauseSorting();
        setIsPausing(true);
        await delay(controls.swapTime);
        setIsPausing(false);
    }

    function getProgressButton() {
        if (isPausing)
            return disabledPauseElement;

        switch (progress) {
            case "reset":
                return startElement;
            case "start":
                return pauseElement;
            case "pause":
                return startElement;
            case "done":
                return disabledPauseElement;
        }
    }

    function arrayDataChangeHandler(value) {
        const arrayString = convertInputToArrayString(value);
        setArrayInput(arrayString);

        const array = convertArrayStringToArray(arrayString);
        setSortingArray(array);
        resetSorting();
    }

    function generate() {
        const randomArray = getRandomArray();
        setArrayInput(randomArray);
        setSortingArray(randomArray);
        resetSorting();
    }
    return (
        <div>
            <ControlBar>
                <ArrayBar>
                    <Button
                        variant="contained"
                        onClick={generate}
                    >
                        Generate
                    </Button>
                    <TextField
                        id="outlined-basic"
                        label="Input"
                        variant="outlined"
                        onChange={(event) => arrayDataChangeHandler(event.target.value)}
                        value={arrayInput}
                        size="small"
                        width="100px"
                        style={{ flexGrow: 1, margin: '0 10px' }}
                    />
                </ArrayBar>
                <ExecutionBar>
                    <Slider
                        key={`slider-${speed}`}
                        defaultValue={speed}
                        onChange={(event, value) => setSpeed(value)}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        min={1}
                        max={10}
                        style={{ flexGrow: 1, flexBasis: "100%" }}
                    />

                    <div style={{ display: "flex", marginLeft: '20px', columnGap: '5px' }}>
                        {getProgressButton()}
                        {resetElement}
                    </div>
                </ExecutionBar>
            </ControlBar>

            <AlgoDisplay
                key={algorithm} 
                algoIdx={algorithm}
                controls={controls}
                data={data}
            />

        </div>
    )
}