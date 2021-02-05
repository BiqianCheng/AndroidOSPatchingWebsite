import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Pagination from "@material-ui/lab/Pagination";
import { Button, Container } from "@material-ui/core";
import { ToggleButton } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  button: {
    padding: theme.spacing(2, 4, 2, 4),
    // '&:active': {
    //   boxShadow: 'none',
    //   backgroundColor: '#0062cc',
    //   borderColor: '#005cbf',
    // },
    // '&:focus': {
    //   boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    // },
  },
  pagination: {
    padding: theme.spacing(6, 0, 3, 1),
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();
  const [CVEdata, setCVEdata] = useState([
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ]);

  return (
    <Paper>
      <Container maxWidth="xl">
        <Grid container className={classes.paper} spacing={5}>
          {CVEdata.map((item, index) => {
            return (
              <Grid item xs={6}>
                <ToggleButton
                  selected={item}
                  size="large"
                  className={classes.button}
                  onChange={() => {
                    let newCVEdata = CVEdata;
                    newCVEdata[index] = !(newCVEdata[index])
                    setCVEdata(newCVEdata);
                  }}
                >
                  CVE {index + 1}
                </ToggleButton>
              </Grid>
            );
          })}
        </Grid>
        <Pagination className={classes.pagination} count={10} color="primary" />
      </Container>
    </Paper>
  );
}
