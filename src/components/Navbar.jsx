import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { sortingAlgorithms } from '../common/config';
import { useCallback } from 'react';

export function NavBar({algorithm, setAlgorithm, resetSorting}) {
    // const [algorithm, setAlgorithm] = useData();
    const handleChange = useCallback((event, id) => {
        setAlgorithm(id);
        resetSorting();
    },[]) 
    return (
        <>
            <h2>Sorting Algorithms Visualizer</h2>
            <AppBar position="static" color="default">
                <Tabs
                    value={algorithm}
                    onChange={handleChange}
                    justifyContent="center"
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    {sortingAlgorithms.map((algorithm, index) => (
                        <Tab
                            key={algorithm.name}
                            label={algorithm.title}
                        />
                    ))}
                    <Tab key='AllSort' label="All" />
                </Tabs>
            </AppBar>
        </>
    )
}