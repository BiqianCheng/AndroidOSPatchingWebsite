import "./App.css";
import CVETable from "./components/CVETable.js";
import PhoneTable from "../src/components/PhoneTable.js";
import PhoneTimeline from "../src/components/PhoneTimeline.js";
import Grid from "@material-ui/core/Grid";
import { Button, Typography } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";

function App() {
    const refC = useRef();
    const refP = useRef();
    const [CVE, setCVE] = useState();
    const [Phone, setPhone] = useState();
    return (
        <div className="App">
            <header className="App-header"></header>
            {/* <Container maxWidth="xl"> */}
            <div className="bigTitle">
                Android OS Kernel Patch Propagation Graphic Visualization
            </div>
            <Grid container spacing={2} className="pagedTable">
                <Grid item xs={3}>
                    <Typography variant="h6" component="h6">
                        Choose one of the CVEs below:
                    </Typography>
                </Grid>
                <Grid item xs={6}></Grid>
                <Grid item xs={3}>
                    <Typography variant="h6" component="h6">
                        Choose one of the Phone modules below:
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <CVETable ref={refC}></CVETable>
                </Grid>
                <Grid item xs={6}>
                    <PhoneTimeline selectedCVE={CVE} selectedPhone={Phone} />
                </Grid>
                <Grid item xs={3}>
                    <PhoneTable ref={refP}></PhoneTable>
                </Grid>
                <Grid item xs={5}></Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={5}></Grid>
            </Grid>
            <Button
                onClick={() => {
                    console.log(refC.current.getCVElist());
                    // console.log(refP.current.getPhoneData());
                    var resultCVE = refC.current.getCVElist();
                    var resultPhone = refP.current.getPhoneData();
                    setCVE(resultCVE);
                    setPhone(resultPhone);
                }}
            >
                Test
            </Button>
            {/* </Container> */}
        </div>
    );
}

export default App;
