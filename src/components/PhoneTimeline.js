import React from "react";
import $ from "jquery";
import "jq-timeline/dist/jquery.timeline.min.js";
import "jq-timeline/dist/jquery.timeline.min.css";
import { Button } from "@material-ui/core";
import jsonData from "../json/biqiandate.json";

class PhoneTimeline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Loaded: false,
            eventData: [],
            phoneList: [],
        };
    }

    componentDidMount() {
        this.$el = $(this.el);

        this.generateTimeline = this.generateTimeline.bind(this);
        this.addMonths = this.addMonths.bind(this);
        this.addEvent = this.addEvent.bind(this);
        this.alignment = this.alignment.bind(this);
        this.dateback = this.dateback.bind(this);
        this.dateforth = this.dateforth.bind(this);
        this.hide = this.hide.bind(this);
        this.initizalized = this.initizalized.bind(this);
        this.openEvent = this.openEvent.bind(this);
        this.reload = this.reload.bind(this);
        this.removeEvent = this.removeEvent.bind(this);
        this.show = this.show.bind(this);
        this.showLoader = this.showLoader.bind(this);
        this.updateEvent = this.updateEvent.bind(this);

        // this.convertDataPoint = this.convertDataPoin.bind(this);
        // this.getMinDate = this.getMaxDate.bind(this);
        // this.getMaxDate = this.getMaxDate.bind(this);
    }

    convertDataPoint(cveData) {
        console.log(cveData);
        // console.log(jsonData);
        var resultData = jsonData.filter((item) =>
            cveData.includes(item.CVEID)
        );
        var dataNode = [];
        resultData.map((item) => {
            dataNode = dataNode.concat(item.data);
        });

        console.log(dataNode);
        var phoneModels = {};

        var resultEventData = dataNode
            .map((item, index) => {
                if (!phoneModels.hasOwnProperty(item.version)) {
                    phoneModels[item.version] = index;
                }
                if (
                    item.patchdate === "None" ||
                    item.patchdate === "notpatched"
                ) {
                    return;
                } else {
                    console.log(item.patchdate);
                    return {
                        row: phoneModels[item.version] + 1,
                        start: new Date(item.patchdate),
                        type: "point",
                        content: item.version,
                    };
                }
            })
            .filter((item) => item !== undefined);

        console.log(phoneModels);
        this.setState(
            {
                eventData: resultEventData,
                phoneList: [...Object.keys(phoneModels)],
            },
            () => {
                console.log(this.state.eventData, this.state.phoneList);
                this.generateTimeline(
                    this.state.eventData,
                    this.state.phoneList
                );
            }
        );
    }

    generateTimeline(data, phoneList) {
        this.$el.Timeline({
            // "bar" or "point"
            type: "mixed",

            // "years" or "months" or "days"
            scale: "months",

            // start <a href="https://www.jqueryscript.net/time-clock/">date</a> time
            startDatetime: this.addMonths(this.getMinDate(), -2),

            // end date time
            endDatetime: this.addMonths(this.getMaxDate(), 2),

            // displays headline
            headline: {
                display: true,
                title: "Patch Graph",
                range: true,
                locale: "en-US",
                format: { hour12: false },
            },

            // displays sidebar
            sidebar: {
                sticky: true,
                overlay: false,
                list: phoneList, //  an array of items
            },

            // displays ruler
            ruler: {
                top: {
                    lines: ["year", "month"],
                    height: 75,
                    fontSize: 14,
                    color: "#777777",
                    background: "#FFFFFF",
                    locale: "en-US",
                    format: {
                        hour12: false,
                        year: "long",
                        month: "numeric",
                    },
                },
            },

            // displays footer
            footer: {
                display: true,
                content: "",
                range: false,
                locale: "en-US",
                format: { hour12: false },
            },

            // displays event meta
            eventMeta: {
                display: false,
                scale: "day",
                locale: "en-US",
                format: { hour12: false },
                content: "",
            },

            // event data
            eventData: data,

            // enables/disables effects
            effects: {
                presentTime: true,
                hoverEvent: true,
                stripedGridRow: true,
                horizontalGridStyle: "dotted",
                verticalGridStyle: "solid",
            },

            colorScheme: {
                // Added new option since v2.0.0
                event: {
                    text: "#343A40",
                    border: "#6C757D",
                    background: "#E7E7E7",
                },
                hookEventColors: () => null, // Added instead of merging setColorEvent of PR#37 since v2.0.0
            },

            // default view range
            range: 12,

            // numer of timeline rows
            rows: phoneList.length,

            // height of row
            rowHeight: 50,

            // width of timeline
            width: "auto",

            // height of timeline
            height: "auto",

            // min size of <a href="https://www.jqueryscript.net/tags.php?/grid/">grid</a>
            minGridSize: 50,

            // margin size
            marginHeight: 2,

            // "left", "center", "right", "current", "latest" or specific event id
            rangeAlign: "latest",

            // "default", false and selector
            loader: "default",

            // loading message
            loadingMessage: "Loading",

            // hides scrollbar
            hideScrollbar: false,

            // "session" or "local"
            storage: "session",

            // loads cached events during reloading
            reloadCacheKeep: true,

            // zooms the scale of the timeline by double clicking
            zoom: true,

            // wraps new scale in the timeline container when zooming
            wrapScale: true,

            // 0: Sunday, 1: Monday, ... 6: Saturday
            firstDayOfWeek: 0,

            // "canvas" or "d3.js"
            engine: "canvas",

            // avoid validation of the maximum of the scale grids
            disableLimitter: false,

            // debug mode
            debug: false,
        });
    }

    componentWillUnmount() {
        this.$el.Timeline("destroy");
    }

    getMinDate() {
        return new Date(
            Math.min(...this.state.eventData.map((e) => new Date(e.start)))
        );
    }

    getMaxDate() {
        return new Date(
            Math.max(...this.state.eventData.map((e) => new Date(e.start)))
        );
    }

    // Helper function to get date and add months
    addMonths(date, months) {
        var d = date.getDate();
        date.setMonth(date.getMonth() + +months);
        if (date.getDate() !== d) {
            date.setDate(0);
        }
        return date;
    }

    // Jquery timeline plugin function as React function
    addEvent(eventdata, callback = null, userdata = null) {
        this.$el.Timeline("addEvent", [eventdata], callback, userdata);
    }

    alignment(position, duration = null) {
        this.$el.Timeline("alignment", position, duration);
    }

    dateback(options, callback = null, userdata = null) {
        this.$el.Timeline("dateback", options, callback, userdata);
    }

    dateforth(options, callback = null, userdata = null) {
        this.$el.Timeline("dateforth", options, callback, userdata);
    }

    hide() {
        this.$el.Timeline("hide");
    }

    initizalized(callback = null, userdata = null) {
        this.$el.Timeline("initialized", callback, userdata);
    }

    openEvent(callback = null) {
        this.$el.Timeline("openEvent", callback);
    }

    reload(options, callback = null, userdata = null) {
        this.$el.Timeline("reload", options, callback, userdata);
    }

    removeEvent(condition, callback = null, userdata = null) {
        this.$el.Timeline("removeEvent", condition, callback, userdata);
    }

    show() {
        this.$el.Timeline("show");
    }

    showLoader() {
        this.$el.Timeline("showLoader");
    }

    updateEvent(eventdata, callback = null, userdata = null) {
        this.$el.Timeline("updateEvent", [eventdata], callback, userdata);
    }

    render() {
        return (
            <>
                <div ref={(el) => (this.el = el)} />
                {!this.state.Loaded ? (
                    <Button
                        variant="contained"
                        onClick={() => {
                            this.convertDataPoint(this.props.selectedCVE);
                            // console.log(this.state.eventData);
                            // console.log(this.state.phoneList);
                            // this.generateTimeline(
                            //     this.state.eventData,
                            //     this.state.phoneList
                            // );
                            // this.hide({
                            //     eventId: 58,
                            //     row: 4,
                            //     start: "2017-5-27 10:30",
                            //     type: "point",
                            //     relation: { before: 50, curve: "lb" },
                            //     bgColor: "#a3d6cc",
                            //     content:
                            //         "<p>In this way, you can include <em>HTML tags</em> in the event body.<br><i class='fa fa-ellipsis-v'></i><br><i class='fa fa-ellipsis-v'></i></p>",
                            // });
                            this.setState({ Loaded: true });
                        }}
                    >
                        Generate
                    </Button>
                ) : (
                    <></>
                )}
                {this.state.Loaded ? (
                    <React.Fragment>
                        <Button
                            variant="contained"
                            onClick={() => {
                                this.show();
                                // this.hide({
                                //     eventId: 58,
                                //     row: 4,
                                //     start: "2017-5-27 10:30",
                                //     type: "point",
                                //     relation: { before: 50, curve: "lb" },
                                //     bgColor: "#a3d6cc",
                                //     content:
                                //         "<p>In this way, you can include <em>HTML tags</em> in the event body.<br><i class='fa fa-ellipsis-v'></i><br><i class='fa fa-ellipsis-v'></i></p>",
                                // });
                            }}
                        >
                            Show
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => {
                                this.hide();
                                // this.hide({
                                //     eventId: 58,
                                //     row: 4,
                                //     start: "2017-5-27 10:30",
                                //     type: "point",
                                //     relation: { before: 50, curve: "lb" },
                                //     bgColor: "#a3d6cc",
                                //     content:
                                //         "<p>In this way, you can include <em>HTML tags</em> in the event body.<br><i class='fa fa-ellipsis-v'></i><br><i class='fa fa-ellipsis-v'></i></p>",
                                // });
                            }}
                        >
                            Hide
                        </Button>
                        {/* <Button
                            variant="contained"
                            onClick={() => {
                                this.addEvent({
                                    eventId: 58,
                                    row: 4,
                                    start: "2017-5-27 10:30",
                                    type: "point",
                                    relation: { before: 50, curve: "lb" },
                                    bgColor: "#a3d6cc",
                                    content:
                                        "<p>In this way, you can include <em>HTML tags</em> in the event body.<br><i class='fa fa-ellipsis-v'></i><br><i class='fa fa-ellipsis-v'></i></p>",
                                });
                            }}
                        >
                            addEvent
                        </Button> */}
                    </React.Fragment>
                ) : (
                    <></>
                )}
            </>
        );
    }
}

export default PhoneTimeline;
