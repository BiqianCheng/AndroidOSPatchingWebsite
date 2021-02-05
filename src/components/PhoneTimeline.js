import React from "react";
import $ from "jquery";
import "jq-timeline/dist/jquery.timeline.js";
import "jq-timeline/dist/jquery.timeline.min.css";

class PhoneTimeline extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.$el = $(this.el);
        this.$el.Timeline({
            type: "bar",
            startDatetime: "2018-11-04 00:00",
            scale: "hours",
            zoom: true,
            rows: 5,
            eventData: [
                {
                    id: 1,
                    start: "2019-11-16 00:00",
                    end: "2019-11-20 02:00",
                    row: 1,
                    label: "Add Event",
                    content: "test test test...",
                },
                {
                    id: 2,
                    start: "2019-11-18 12:00",
                    end: "2019-11-22 12:00",
                    row: 3,
                    label: "Add Event 2",
                    content: "test2 test2 test2...",
                },
            ],
            sidebar: {
                sticky: true,
                overlay: true,
                list: [
                    "<label>Row Item 1</label>",
                    "<label>Row Item 2</label>",
                    "<label>Row Item 3</label>",
                ],
            },
        });
        this.$el.Timeline("addEvent", [
            {
                id: 1,
                start: "2019-11-16 00:00",
                end: "2019-11-20 02:00",
                row: 1,
                label: "Add Event",
                content: "test test test...",
            },
            {
                id: 2,
                start: "2019-11-18 12:00",
                end: "2019-11-22 12:00",
                row: 3,
                label: "Add Event 2",
                content: "test2 test2 test2...",
            },
        ]);
    }

    componentWillUnmount() {
        this.$el.Timeline("destroy");
    }

    render() {
        return <div ref={(el) => (this.el = el)} />;
    }
}

export default PhoneTimeline;
