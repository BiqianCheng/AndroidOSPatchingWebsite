import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Pagination from "@material-ui/lab/Pagination";
import { Chip, Container, TextField, Typography } from "@material-ui/core";
import { Autocomplete, ToggleButton } from "@material-ui/lab";
import { getSelectedList } from "../utils/utils";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        // height: theme.spacing(60),
        textAlign: "center",
        color: theme.palette.text.secondary,
    },
    button: {
        // margin: theme.spacing(2)
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

const PhoneTable = ({ phoneList, setPhoneList, selectedCVE }) => {
    const classes = useStyles();
    const [page, setPage] = useState(1);
    const [selectedPhone, setSelectedPhone] = useState(undefined);
    const [searchInput, setSearchInput] = useState();
    const [searchValue, setSearchValue] = useState();
    return (
        <Paper>
            <Container maxWidth="xl">
                <Grid container className={classes.paper} spacing={2}>
                    <Grid item xs={12}>
                        <Autocomplete
                            id="search-phone-autocomplete"
                            options={Object.keys(phoneList)}
                            getOptionDisabled={(option) => (selectedPhone ? option !== selectedPhone : {})}
                            style={{ width: 300 }}
                            value={searchValue}
                            onChange={(event, newValue) => {
                                if (newValue) {
                                    if (newValue !== selectedPhone) {
                                        if (phoneList[newValue]) {
                                            setPhoneList({
                                                ...phoneList,
                                                [newValue]: false,
                                            });
                                            setSelectedPhone(undefined);
                                        } else {
                                            setPhoneList({
                                                ...phoneList,
                                                [newValue]: true,
                                            });
                                            setSelectedPhone(newValue);
                                        }
                                    }
                                } else {
                                    setPhoneList({
                                        ...phoneList,
                                        [searchValue]: false,
                                    });
                                    setSelectedPhone(undefined);
                                }
                                setSearchValue(newValue);
                            }}
                            inputValue={searchInput}
                            onInputChange={(event, newInputValue) => {
                                setSearchInput(newInputValue);
                            }}
                            renderInput={(params) => <TextField {...params} placeholder="Search Phone" variant="outlined" />}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" component="h6">
                            Selected Phone Models:
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {getSelectedList(phoneList).map((item) => (
                            <Chip
                                className={classes.chips}
                                key={item}
                                label={item}
                                onDelete={() => {
                                    setPhoneList({
                                        ...phoneList,
                                        [item]: false,
                                    });
                                    setSelectedPhone(undefined);
                                }}
                            />
                        ))}
                    </Grid>
                    <Grid item container spacing={2} xs={12}>
                        {phoneList ? (
                            Object.keys(phoneList)
                                .slice((page - 1) * 8, page * 8)
                                .map((item, index) => {
                                    return (
                                        <Grid item xs={6}>
                                            <ToggleButton
                                                value={item}
                                                disabled={selectedPhone ? item !== selectedPhone : false}
                                                selected={phoneList[item]}
                                                size="large"
                                                className={classes.button}
                                                onClick={() => {
                                                    if (phoneList[item]) {
                                                        setPhoneList({
                                                            ...phoneList,
                                                            [item]: false,
                                                        });
                                                        setSelectedPhone(undefined);
                                                    } else {
                                                        setPhoneList({
                                                            ...phoneList,
                                                            [item]: true,
                                                        });
                                                        setSelectedPhone(item);
                                                    }
                                                    // console.log(phoneList);
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
                    className={classes.pagination}
                    count={phoneList ? Math.ceil(Object.keys(phoneList).length / 8) : 1}
                    page={page}
                    onChange={(e, v) => {
                        setPage(v);
                    }}
                    color="primary"
                />
            </Container>
        </Paper>
    );
};

export default PhoneTable;
