import React from "react";
import $ from "jquery";
import "jq-timeline/dist/jquery.timeline.js"
import "jq-timeline/dist/jquery.timeline.min.css"

class PhoneTimeline extends React.Component {
    componentDidMount() {
        this.$el = $(this.el);
        this.$el.Timeline()
    }

    componentWillUnmount() {
        this.$el.Timeline("destroy");
    }

    render() {
        return <div ref={(el) => (this.el = el)} />;
    }
}

export default PhoneTimeline;
