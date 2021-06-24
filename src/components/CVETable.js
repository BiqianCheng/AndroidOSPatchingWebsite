import React, { forwardRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Pagination from "@material-ui/lab/Pagination";
import { Chip, Container, TextField, Tooltip, Typography } from "@material-ui/core";
import { Autocomplete, ToggleButton } from "@material-ui/lab";
import { getPhoneModelByCVE, getSelectedList } from "../utils/utils";
import cveData from "../json/data.json";

const useStyles = makeStyles((theme) => ({
    popoverPaper: {
        padding: theme.spacing(1),
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
    },
    button: {
        width: theme.spacing(15),
        fontSize: "10px",
        fontWeight: "bold",
        backgroundColor: "#FFFFFF",
        "&.Mui-selected": {
            backgroundColor: "#e6ce00",
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
    popover: {
        pointerEvents: "none",
    },
}));

const CVETable = forwardRef(({ CVElist, setCVElist, selectedPhone }) => {
    const classes = useStyles();
    const [page, setPage] = useState(1);
    const [selectedCVE, setSelectedCVE] = useState(undefined);
    const [searchInput, setSearchInput] = useState();
    const [searchValue, setSearchValue] = useState();

    return (
        <Paper>
            <Container maxWidth="xl">
                <Grid container className={classes.paper} spacing={2}>
                    <Grid item xs={12}>
                        <Autocomplete
                            id="search-cve-autocomplete"
                            options={Object.keys(CVElist)}
                            getOptionDisabled={(option) =>
                                selectedCVE
                                    ? option !== selectedCVE
                                    : cveData.filter((item) => {
                                          item.phoneModels.some((e) => e.phoneModel === selectedPhone);
                                      })
                            }
                            style={{ width: 300 }}
                            value={searchValue}
                            onChange={(event, newValue) => {
                                if (newValue) {
                                    if (newValue !== selectedCVE) {
                                        if (CVElist[newValue]) {
                                            setCVElist({
                                                ...CVElist,
                                                [newValue]: false,
                                            });
                                            setSelectedCVE(undefined);
                                        } else {
                                            setCVElist({
                                                ...CVElist,
                                                [newValue]: true,
                                            });
                                            setSelectedCVE(newValue);
                                        }
                                    }
                                } else {
                                    setCVElist({
                                        ...CVElist,
                                        [searchValue]: false,
                                    });
                                    setSelectedCVE(undefined);
                                }
                                setSearchValue(newValue);
                            }}
                            inputValue={searchInput}
                            onInputChange={(event, newInputValue) => {
                                setSearchInput(newInputValue);
                            }}
                            renderInput={(params) => <TextField {...params} placeholder="Search CVE" variant="outlined" />}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" component="h6">
                            Selected CVEs:
                            {console.log(selectedPhone)}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {getSelectedList(CVElist).map((item) => (
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
                                            <Tooltip
                                                placement="right-start"
                                                title={
                                                    <React.Fragment>
                                                        <Typography variant="body2">Patch Date:</Typography>
                                                        <Typography variant="body1">
                                                            {cveData.filter((single) => single.CVEID === item)[0].startdate}
                                                        </Typography>
                                                    </React.Fragment>
                                                }
                                            >
                                                <ToggleButton
                                                    value={item}
                                                    disabled={
                                                        selectedCVE ? item !== selectedCVE : !getPhoneModelByCVE(item).includes(selectedPhone[0])
                                                    }
                                                    selected={CVElist[item]}
                                                    size="large"
                                                    className={classes.button}
                                                    onClick={() => {
                                                        if (CVElist[item]) {
                                                            setCVElist({
                                                                ...CVElist,
                                                                [item]: false,
                                                            });
                                                            setSelectedCVE(undefined);
                                                        } else {
                                                            setCVElist({
                                                                ...CVElist,
                                                                [item]: true,
                                                            });
                                                            setSelectedCVE(item);
                                                        }
                                                        // console.log(CVElist);
                                                    }}
                                                >
                                                    {item}
                                                </ToggleButton>
                                            </Tooltip>
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
                    count={CVElist ? Math.ceil(Object.keys(CVElist).length / 8) : 1}
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
export default CVETable;
