import "./App.css";
import ButtonTable from "./components/ButtonTable.js";
import PhoneTable from "../src/components/PhoneTable.js";
import PhoneTimeline from "../src/components/PhoneTimeline.js";
import Grid from "@material-ui/core/Grid";
import { Button, Container, Typography } from "@material-ui/core";
import { useRef } from "react";

function App() {
    const ref = useRef();
    return (
        <div className="App">
            <header className="App-header"></header>
            {/* <Container maxWidth="xl"> */}
            <div className="bigTitle">
                Android OS Kernel Patch Propagation Graphic Visualization
            </div>
            <Grid container spacing={2} className="pagedTable">
                <Grid item xs={2}>
                    <Typography variant="h6" component="h6">
                        Choose one of the CVEs below:
                    </Typography>
                </Grid>
                <Grid item xs={8}></Grid>
                <Grid item xs={2}>
                    <Typography variant="h6" component="h6">
                        Choose one of the Phone modules below:
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <ButtonTable ref={ref}></ButtonTable>
                </Grid>
                <Grid item xs={8}>
                    <PhoneTimeline ref={ref} />
                </Grid>
                <Grid item xs={2}>
                    <PhoneTable ref={ref}></PhoneTable>
                </Grid>
                <Grid item xs={5}></Grid>
                <Grid item xs={2}>
                    
                </Grid>
                <Grid item xs={5}></Grid>
            </Grid>
            {/* </Container> */}
        </div>
    );
}

export default App;
