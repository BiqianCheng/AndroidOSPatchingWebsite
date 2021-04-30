import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useState,
} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Pagination from "@material-ui/lab/Pagination";
import { Button, Chip, Container, Typography } from "@material-ui/core";
import { ToggleButton } from "@material-ui/lab";
import jsonData from "../json/biqiandate.json";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        // height: theme.spacing(70),
        textAlign: "center",
        color: theme.palette.text.secondary,
    },
    button: {
        width: theme.spacing(15),
        fontSize: "10px",
        fontWeight: "bold",
        backgroundColor: "#FFFFFF",
        "&.Mui-selected": {
            // boxShadow: "none",
            backgroundColor: "#e6ce00",
            // borderColor: "#005cbf",
            "&:hover": {
                backgroundColor: "#ffef62",
            },
        },
        "&:hover": {
            backgroundColor: "#ffef62",
        },
    },
    chips: {
        margin: theme.spacing(0.2),
    },
    pagination: {
        padding: theme.spacing(6, 0, 3, 1),
    },
}));

const CenteredGrid = forwardRef(({ data }, ref) => {
    const classes = useStyles();
    const [CVElist, setCVElist] = useState({});
    const [page, setPage] = useState(1);
    useEffect(() => {
        var cvearray = {};
        jsonData.map((item) => {
            cvearray[item.CVEID] = false;
        });
        setCVElist(cvearray);
    }, []);
    useImperativeHandle(ref, () => ({
        getCVElist: getCVElist,
    }));
    const getCVElist = () => {
        return Object.keys(CVElist).filter((key) => CVElist[key] === true);
    };

    return (
        <Paper>
            <Container maxWidth="xl">
                <Grid container className={classes.paper} spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="body1" component="h6">
                            Selected CVEs:
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {getCVElist().map((item) => (
                            <Chip className={classes.chips} label={item} />
                        ))}
                    </Grid>
                    <Grid item container spacing={2} xs={12}>
                        {CVElist ? (
                            Object.keys(CVElist)
                                .slice((page - 1) * 8, page * 8)
                                .map((item) => {
                                    return (
                                        <Grid item xs={6}>
                                            <ToggleButton
                                                value={item}
                                                selected={CVElist[item]}
                                                size="large"
                                                className={classes.button}
                                                onClick={() => {
                                                    // console.log(CVElist);
                                                    setCVElist({
                                                        ...CVElist,
                                                        [item]: !CVElist[item],
                                                    });
                                                }}
                                            >
                                                {item}
                                            </ToggleButton>
                                        </Grid>
                                    );
                                })
                        ) : (
                            <></>
                        )}
                    </Grid>
                </Grid>
                <Pagination
                    size="small"
                    className={classes.pagination}
                    count={
                        CVElist ? Math.ceil(Object.keys(CVElist).length / 8) : 1
                    }
                    page={page}
                    onChange={(e, v) => {
                        setPage(v);
                    }}
                    color="primary"
                />
            </Container>
        </Paper>
    );
});

export default CenteredGrid;
