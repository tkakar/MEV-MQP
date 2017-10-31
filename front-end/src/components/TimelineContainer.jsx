import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Timeline from './timeline/Timeline';

const styles = {
  timeline: {
    width: '100%',
    height: 'calc(15vh-10px)',
    padding: '0px',
    top: '-1px',
    border: 'none',
  },
};

class TimelineContainer extends Component {
  static TimelinePreference = 'SLIDING_TIMELINE';

  static propTypes = {
    classes: PropTypes.shape({
      timeline: PropTypes.string,
    }).isRequired,
  }

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

  render = () => this.renderTimeline()
}

export default withStyles(styles)(TimelineContainer);

