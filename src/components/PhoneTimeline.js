import React from 'react';
import $ from 'jquery';
import 'jq-timeline/dist/jquery.timeline.min.js';
import 'jq-timeline/dist/jquery.timeline.min.css';
import { Button } from '@material-ui/core';

class PhoneTimeline extends React.Component {
    constructor({ data, phoneList }) {
        super({ data, phoneList });
        this.state = {
            data: [
                {
                    eventId: 50,
                    row: 1,
                    start: '2017-5-20 8:00',
                    type: 'point',
                    content:
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis luctus tortor nec bibendum malesuada. Etiam sed libero cursus, placerat est at, fermentum quam. In sed fringilla mauris. Fusce auctor turpis ac imperdiet porttitor. Duis vel pharetra magna, ut mollis libero. Etiam cursus in leo et viverra. Praesent egestas dui a magna eleifend, id elementum felis maximus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum sed elit gravida, euismod nunc id, ullamcorper tellus. Morbi elementum urna faucibus tempor lacinia. Quisque pharetra purus at risus tempor hendrerit. Nam dui justo, molestie quis tincidunt sit amet, eleifend porttitor mauris. Maecenas sit amet ex vitae mi finibus pharetra. Donec vulputate leo eu vestibulum gravida. Ut in facilisis dolor, vitae iaculis dui.',
                },
                {
                    eventId: 57,
                    row: 3,
                    start: '2017-5-22 8:00',
                    type: 'point',
                    content:
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis luctus tortor nec bibendum malesuada. Etiam sed libero cursus, placerat est at, fermentum quam. In sed fringilla mauris. Fusce auctor turpis ac imperdiet porttitor. Duis vel pharetra magna, ut mollis libero. Etiam cursus in leo et viverra. Praesent egestas dui a magna eleifend, id elementum felis maximus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum sed elit gravida, euismod nunc id, ullamcorper tellus. Morbi elementum urna faucibus tempor lacinia. Quisque pharetra purus at risus tempor hendrerit. Nam dui justo, molestie quis tincidunt sit amet, eleifend porttitor mauris. Maecenas sit amet ex vitae mi finibus pharetra. Donec vulputate leo eu vestibulum gravida. Ut in facilisis dolor, vitae iaculis dui.',
                },
                {
                    eventId: 56,
                    row: 3,
                    start: '2017-5-26 8:00',
                    relation: { after: 50, curve: 'lb' },
                    type: 'point',
                    content:
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis luctus tortor nec bibendum malesuada. Etiam sed libero cursus, placerat est at, fermentum quam. In sed fringilla mauris. Fusce auctor turpis ac imperdiet porttitor. Duis vel pharetra magna, ut mollis libero. Etiam cursus in leo et viverra. Praesent egestas dui a magna eleifend, id elementum felis maximus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum sed elit gravida, euismod nunc id, ullamcorper tellus. Morbi elementum urna faucibus tempor lacinia. Quisque pharetra purus at risus tempor hendrerit. Nam dui justo, molestie quis tincidunt sit amet, eleifend porttitor mauris. Maecenas sit amet ex vitae mi finibus pharetra. Donec vulputate leo eu vestibulum gravida. Ut in facilisis dolor, vitae iaculis dui.',
                },
                {
                    eventId: 51,
                    row: 2,
                    start: '2017-5-22 10:30',
                    type: 'point',
                    relation: { before: 50, curve: 'lb' },
                    bgColor: '#a3d6cc',
                    content:
                        "<p>In this way, you can include <em>HTML tags</em> in the event body.<br><i class='fa fa-ellipsis-v'></i><br><i class='fa fa-ellipsis-v'></i></p>",
                },
                {
                    eventId: 52,
                    start: '2017-5-23 12:45',
                    row: 3,
                    type: 'point',
                    bgColor: '#89c997',
                    relation: { before: 50, curve: 'lb' },
                    color: '#ffffff',
                    callback: "$('#myModal').modal()",
                    content: 'Show modal window via bootstrap',
                },
                {
                    eventId: 53,
                    start: '2017-5-24 12:45',
                    row: 4,
                    type: 'point',
                    bgColor: '#89c997',
                    relation: { before: 52, curve: 'lb' },
                    color: '#ffffff',
                    callback: "$('#myModal').modal()",
                    content: 'Show modal window via bootstrap',
                },
                {
                    eventId: 54,
                    start: '2017-5-25 12:45',
                    row: 5,
                    type: 'point',
                    bgColor: '#89c997',
                    relation: { before: 53, curve: 'lb' },
                    color: '#ffffff',
                    callback: "$('#myModal').modal()",
                    content: 'Show modal window via bootstrap',
                },
            ],
            phoneList: [
                'Linux Mainline',
                'Android 4.4 LTS',
                'Android 4.4',
                'Qualcomm 4.4 Mainline',
                'Qualcomm 4.4 Stable',
                'Mi6',
            ],
        };
    }

    componentDidMount() {
        this.$el = $(this.el);
        this.$el.Timeline({
            // "bar" or "point"
            type: 'mixed',

            // "years" or "months" or "days"
            scale: 'days',

            // start <a href="https://www.jqueryscript.net/time-clock/">date</a> time
            startDatetime: '2017-05-10',

            // end date time
            endDatetime: 'auto',

            // displays headline
            headline: {
                display: true,
                title: 'Patch Graph',
                range: true,
                locale: 'en-US',
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
                    lines: ['year', 'month', 'days'],
                    height: 75,
                    fontSize: 14,
                    color: '#777777',
                    background: '#FFFFFF',
                    locale: 'en-US',
                    format: { hour12: false, day: 'short' },
                },
            },

            // displays footer
            footer: {
                display: true,
                content: '',
                range: false,
                locale: 'en-US',
                format: { hour12: false },
            },

            // displays event meta
            eventMeta: {
                display: false,
                scale: 'day',
                locale: 'en-US',
                format: { hour12: false },
                content: '',
            },

            // event data
            eventData: this.state.data,

            // enables/disables effects
            effects: {
                presentTime: true,
                hoverEvent: true,
                stripedGridRow: true,
                horizontalGridStyle: 'dotted',
                verticalGridStyle: 'solid',
            },

            colorScheme: {
                // Added new option since v2.0.0
                event: {
                    text: '#343A40',
                    border: '#6C757D',
                    background: '#E7E7E7',
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
            width: 'auto',

            // height of timeline
            height: 'auto',

            // min size of <a href="https://www.jqueryscript.net/tags.php?/grid/">grid</a>
            minGridSize: 100,

            // margin size
            marginHeight: 2,

            // "left", "center", "right", "current", "latest" or specific event id
            rangeAlign: 'latest',

            // "default", false and selector
            loader: 'default',

            // loading message
            loadingMessage: 'Loading',

            // hides scrollbar
            hideScrollbar: false,

            // "session" or "local"
            storage: 'session',

            // loads cached events during reloading
            reloadCacheKeep: true,

            // zooms the scale of the timeline by double clicking
            zoom: true,

            // wraps new scale in the timeline container when zooming
            wrapScale: true,

            // 0: Sunday, 1: Monday, ... 6: Saturday
            firstDayOfWeek: 0,

            // "canvas" or "d3.js"
            engine: 'canvas',

            // avoid validation of the maximum of the scale grids
            disableLimitter: false,

            // debug mode
            debug: true,
        });
        this.addEvent = this.addEvent.bind(this);
        this.$el.Timeline('addEvent', this.addEvent);
    }

    componentWillUnmount() {
        this.$el.Timeline('destroy');
    }

    updateTime(newData) {
        this.$el.Timeline('addEvent', [newData]);
    }

    addEvent(eventdata) {
        this.updateTime(eventdata);
    }

    render() {
        return (
            <>
                <div ref={(el) => (this.el = el)} />
                <Button
                    variant="contained"
                    onClick={() => {
                        this.addEvent({
                            eventId: 58,
                            row: 4,
                            start: '2017-5-27 10:30',
                            type: 'point',
                            relation: { before: 50, curve: 'lb' },
                            bgColor: '#a3d6cc',
                            content:
                                "<p>In this way, you can include <em>HTML tags</em> in the event body.<br><i class='fa fa-ellipsis-v'></i><br><i class='fa fa-ellipsis-v'></i></p>",
                        });
                    }}
                >
                    Add Event
                </Button>
            </>
        );
    }
}

export default PhoneTimeline;
