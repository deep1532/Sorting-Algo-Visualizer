import React, { useEffect } from "react";
import { SortManager } from "./visualizer/SortManager"
import { sortingAlgorithms } from "../common/config"
import styled from "styled-components";

const FlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 100%;
  column-gap: 10px;
  row-gap: 10px;

  & > div {
    max-width: 100%;
    min-width: 375px;
  }
`;

const flexCenter = { display: "flex", justifyContent: "center" };

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
      style={{ maxWidth: "100%" }}
    >
      {value === index && children}
    </div>
  );
}

export function AlgoDisplay(props) {
  return (
    <div style={flexCenter}>
      {sortingAlgorithms.map((algoInfo, idx) => (
        <TabPanel value={props.algoIdx} index={idx} key={algoInfo.name}>
          <SortManager
            isall={false}
            key={props.algoIdx}
            algoIdx={props.algoIdx}
            sortFunction={algoInfo.component}
            sortingAlgorithmName={algoInfo.name}
            controls={props.controls}
            data={props.data}
          />
        </TabPanel>
      ))}
        <TabPanel value={props.algoIdx} index={sortingAlgorithms.length}>
          <FlexWrap>
            {sortingAlgorithms.map((algoInfo, idx) => {
              return (
                <SortManager
                  isall={true}
                  key={algoInfo.name}
                  algoIdx={idx}
                  sortFunction={algoInfo.component}
                  sortingAlgorithmName={algoInfo.name}
                  controls={props.controls}
                  data={props.data}
                />
              );
            })}
          </FlexWrap>
      </TabPanel>
    </div>
  );
}
