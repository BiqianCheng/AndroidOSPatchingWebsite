import React, { forwardRef, useState, useImperativeHandle } from "react";
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

const PhoneTable = forwardRef(({ data }, ref) => {
    const classes = useStyles();
    const [PhoneData, setPhoneData] = useState([
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
    ]);
    const [page, setPage] = useState(1);
    useImperativeHandle(ref, () => ({
        getPhoneData,
    }));

    const getPhoneData = () => {
        return PhoneData;
    };

    return (
        <Paper>
            <Container maxWidth="xl">
                <Grid container className={classes.paper} spacing={5}>
                    {PhoneData ? (
                        PhoneData.slice((page - 1) * 8, page * 8).map(
                            (item, index) => {
                                return (
                                    <Grid item xs={6}>
                                        <ToggleButton
                                            selected={item}
                                            size="large"
                                            className={classes.button}
                                            onChange={() => {
                                                let newPhoneData = PhoneData;
                                                newPhoneData[
                                                    index + (page - 1) * 8
                                                ] = !newPhoneData[
                                                    index + (page - 1) * 8
                                                ];
                                                setPhoneData(newPhoneData);
                                            }}
                                        >
                                            Phone {index + 1 + (page - 1) * 8}
                                        </ToggleButton>
                                    </Grid>
                                );
                            }
                        )
                    ) : (
                        <></>
                    )}
                </Grid>
                <Pagination
                    className={classes.pagination}
                    count={PhoneData ? (PhoneData.length + 1) / 8 : 1}
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

export default PhoneTable;
