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
        height: theme.spacing(60),
        textAlign: "center",
        color: theme.palette.text.secondary,
    },
    button: {
        width: theme.spacing(12),
        fontSize: "13px",
        fontWeight: "bold",
        backgroundColor: "#FFFFFF",
        // '&:active': {
        //   boxShadow: 'none',
        //   backgroundColor: '#0062cc',
        //   borderColor: '#005cbf',
        // },
        "&:hover": {
            backgroundColor: "#ffef62",
        },
    },
    pagination: {
        padding: theme.spacing(6, 0, 3, 1),
    },
}));

const PhoneTable = forwardRef(({ data }, ref) => {
    const classes = useStyles();
    const [PhoneData, setPhoneData] = useState({
        Sony: false,
        Mi: false,
        Huawei: false,
        Oneplus: false,
        Oppo: false,
        Samsung: false,
        Vivo: false,
        Pixel: false,
        Coolpad: false,
    });

    const [page, setPage] = useState(1);
    useImperativeHandle(ref, () => ({
        getPhoneData() {
            return PhoneData;
        },
    }));

    const togglePhoneData = (index) => {};

    return (
        <Paper>
            <Container maxWidth="xl">
                <Grid container className={classes.paper} spacing={5}>
                    {PhoneData ? (
                        Object.keys(PhoneData)
                            .slice((page - 1) * 8, page * 8)
                            .map((item, index) => {
                                return (
                                    <Grid item xs={6}>
                                        <ToggleButton
                                            value={item}
                                            selected={PhoneData[item]}
                                            size="large"
                                            className={classes.button}
                                            onClick={() => {
                                                setPhoneData({
                                                    ...PhoneData,
                                                    [item]: !PhoneData[item],
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
                <Pagination
                    className={classes.pagination}
                    count={
                        PhoneData
                            ? Math.ceil(Object.keys(PhoneData).length / 8)
                            : 1
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

export default PhoneTable;
