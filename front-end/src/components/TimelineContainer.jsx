import React, { Component } from 'react';
import Timeline from './timeline/Timeline';

class TimelineContainer extends Component {
  static TimelinePreference = 'SLIDING_TIMELINE';

  renderTimeline = () => {
    switch (this.TimelinePreference) {
      case 'SLIDING_TIMELINE':
        return (
          <Timeline />
        );
      default:
        return (
          <Timeline />
        );
    }
  }

  render = () => (
    <div id="timeline-container" className="col-xs-12 card card-outline-primary" >
      {this.renderTimeline()}
    </div>
  )
}

export default TimelineContainer;

