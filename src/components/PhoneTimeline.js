import React from "react";
import $ from "jquery";
import "jq-timeline/dist/jquery.timeline.min.js";
import "jq-timeline/dist/jquery.timeline.min.css";
import { Button } from "@material-ui/core";

class PhoneTimeline extends React.Component {
    constructor({ data, phoneList }) {
        super({ data, phoneList });
        this.state = {
            data: [
                {
                    eventId: 1,
                    row: 1,
                    start: new Date("2017-5-1"),
                    type: "point",
                    content:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis luctus tortor nec bibendum malesuada. Etiam sed libero cursus, placerat est at, fermentum quam. In sed fringilla mauris. Fusce auctor turpis ac imperdiet porttitor. Duis vel pharetra magna, ut mollis libero. Etiam cursus in leo et viverra. Praesent egestas dui a magna eleifend, id elementum felis maximus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum sed elit gravida, euismod nunc id, ullamcorper tellus. Morbi elementum urna faucibus tempor lacinia. Quisque pharetra purus at risus tempor hendrerit. Nam dui justo, molestie quis tincidunt sit amet, eleifend porttitor mauris. Maecenas sit amet ex vitae mi finibus pharetra. Donec vulputate leo eu vestibulum gravida. Ut in facilisis dolor, vitae iaculis dui.",
                },
                {
                    eventId: 2,
                    row: 2,
                    start: new Date("2017-5-18"),
                    relation: { after: 1, curve: "lb" },
                    type: "point",
                    content:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis luctus tortor nec bibendum malesuada. Etiam sed libero cursus, placerat est at, fermentum quam. In sed fringilla mauris. Fusce auctor turpis ac imperdiet porttitor. Duis vel pharetra magna, ut mollis libero. Etiam cursus in leo et viverra. Praesent egestas dui a magna eleifend, id elementum felis maximus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum sed elit gravida, euismod nunc id, ullamcorper tellus. Morbi elementum urna faucibus tempor lacinia. Quisque pharetra purus at risus tempor hendrerit. Nam dui justo, molestie quis tincidunt sit amet, eleifend porttitor mauris. Maecenas sit amet ex vitae mi finibus pharetra. Donec vulputate leo eu vestibulum gravida. Ut in facilisis dolor, vitae iaculis dui.",
                },
                {
                    eventId: 3,
                    row: 3,
                    start: new Date("2017-6-1"),
                    relation: { after: 2, curve: "lb" },
                    type: "point",
                    content:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis luctus tortor nec bibendum malesuada. Etiam sed libero cursus, placerat est at, fermentum quam. In sed fringilla mauris. Fusce auctor turpis ac imperdiet porttitor. Duis vel pharetra magna, ut mollis libero. Etiam cursus in leo et viverra. Praesent egestas dui a magna eleifend, id elementum felis maximus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum sed elit gravida, euismod nunc id, ullamcorper tellus. Morbi elementum urna faucibus tempor lacinia. Quisque pharetra purus at risus tempor hendrerit. Nam dui justo, molestie quis tincidunt sit amet, eleifend porttitor mauris. Maecenas sit amet ex vitae mi finibus pharetra. Donec vulputate leo eu vestibulum gravida. Ut in facilisis dolor, vitae iaculis dui.",
                },
                {
                    eventId: 4,
                    row: 4,
                    start: new Date("2017-7-2"),
                    type: "point",
                    relation: { after: 3, curve: "lb" },
                    bgColor: "#a3d6cc",
                    content:
                        "<p>In this way, you can include <em>HTML tags</em> in the event body.<br><i class='fa fa-ellipsis-v'></i><br><i class='fa fa-ellipsis-v'></i></p>",
                },
                {
                    eventId: 5,
                    start: new Date("2018-3-5"),
                    row: 5,
                    type: "point",
                    bgColor: "#89c997",
                    relation: { after: 4, curve: "lb" },
                    content: "Show modal window via bootstrap",
                },
                {
                    eventId: 6,
                    start: new Date("2018-4-1"),
                    row: 6,
                    type: "point",
                    bgColor: "#89c997",
                    relation: { after: 5, curve: "lb" },
                    content: "Show modal window via bootstrap",
                },
            ],
            phoneList: [
                "Linux Mainline",
                "Linux LTS",
                "Android",
                "Qualcomm Mainline",
                "Qualcomm Stable",
                "Mi6",
            ],
        };
    }

    componentDidMount() {
        this.$el = $(this.el);

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
                list: this.state.phoneList, //  an array of items
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
                    format: { hour12: false, year: "long", month: "numeric" },
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
            eventData: this.state.data,

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
            rows: 6,

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
            debug: true,
        });

        this.getMinDate = this.getMaxDate.bind(this);
        this.getMaxDate = this.getMaxDate.bind(this);
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
    }

    componentWillUnmount() {
        this.$el.Timeline("destroy");
    }

    // Helper function to get date and add months
    getMinDate() {
        return new Date(
            Math.min(...this.state.data.map((e) => new Date(e.start)))
        );
    }

    getMaxDate() {
        return new Date(
            Math.max(...this.state.data.map((e) => new Date(e.start)))
        );
    }

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
                <Button
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
                </Button>
            </>
        );
    }
}

export default PhoneTimeline;
