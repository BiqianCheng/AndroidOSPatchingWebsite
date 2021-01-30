import "./App.css";
import ButtonTable from "../src/components/Table.js";
import PhoneTable from "../src/components/PhoneTable.js";
import Grid from "@material-ui/core/Grid";
import { Container, Typography } from "@material-ui/core";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <Container maxWidth="xl">
        <div className="bigTitle">
          Android OS Kernel Patch Propagation Graphic Visualization
        </div>
        <Grid container spacing={3} className="pagedTable">
          <Grid item xs={3}>
            <Typography variant="h5" component="h2">
              Choose one of the CVEs below:
            </Typography>
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={3}>
            <Typography variant="h6" component="h2">
              Choose one of the Phone modules below:
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <ButtonTable></ButtonTable>
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={3}>
            <PhoneTable></PhoneTable>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
