import { makeStyles } from '@mui/styles';
import { Controller } from './Controller';
import { useData, useControls } from "../common/store"
import { NavBar } from "./Navbar";
import { Footer } from "./Footer"
import styled from "styled-components";

const Container = styled.div`
  margin: 0 10px;
  min-height: calc(100vh - 50px);
  position: relative;
  margin-bottom: 50px;
`;

export function SortingVisulizer() {
    const data = useData();
    const controls = useControls();
    const [
        algorithm,
        setAlgorithm
    ] = [data.algorithm, data.setAlgorithm]

    return (
        <>
            <Container>
                <NavBar algorithm={algorithm} setAlgorithm={setAlgorithm} resetSorting={controls.resetSorting} />
                <Controller key={algorithm} data={data} controls={controls} />
                <Footer />
            </Container>
        </>
    )
}