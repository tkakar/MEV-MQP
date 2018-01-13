import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { XAxis, YAxis, CartesianGrid, Tooltip, Bar, ResponsiveContainer } from 'recharts';
import { withStyles } from 'material-ui/styles';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import CustomTooltip from './components/CustomTooltip';
import BarChartImpl from './components/BarChartImpl';
import ClearFilterIcon from '../../../../../resources/clearFilterIcon.svg';
import MEVColors from '../../../../../theme';

const styles = {
  labelFont: {
    'text-align': 'center',
    'font-size': '20pt',
    'pointer-events': 'none',
    'padding-left': '45px',
  },
  responsiveContainer: {
    'margin-left': '-15px',
    'font-size': '10pt',
  },
  maxHeight: {
    height: '100%',
  },
  noOverflow: {
    overflow: 'hidden',
  },
  clearFilterChip: {
    'font-size': '9pt',
    height: '14pt',
    float: 'right',
    transform: 'translateY(8px) translateX(-5px)',
  },
  chipAvatar: {
    height: '11pt',
    width: '11pt',
    transform: 'translateX(3px)',
  },
  '@media (max-width: 970px)': {
    labelFont: {
      'padding-left': '0px',
    },
  },
};

/**
 * This is the component that displays the Age Demographic visualization
 */
class Age extends Component {
  static propTypes = {
    age: PropTypes.arrayOf(PropTypes.object).isRequired,
    toggleFilter: PropTypes.func.isRequired,
    classes: PropTypes.shape({
      labelFont: PropTypes.string,
      clearFilterChip: PropTypes.string,
      chipAvatar: PropTypes.string,
      responsiveContainer: PropTypes.string,
      maxHeight: PropTypes.string,
      noOverflow: PropTypes.string,
    }).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      graphHeight: '85%',
      stillResizingTimer: '',
    };

    // Listen for window resize, but wait till they have stopped to do the size calculations.
    window.addEventListener('resize', this.resizeTimer);
  }

  componentDidMount() {
    this.resizeGraph();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeTimer);
  }

  /**
   * After 250ms of not resizing, we will then resize the graph (this improves performance)
   */
  resizeTimer = () => {
    clearTimeout(this.state.stillResizingTimer);
    this.state.stillResizingTimer = setTimeout(this.resizeGraph, 250);
  }

  /**
   * Clears all of the currently selected filters for this component
   */
  clearFilter = () => {
    this.props.toggleFilter('CLEAR');
  }

  /**
   * Toggles the filter in Redux State for the bar clicked on in the chart
   */
  handleFilterClickToggle = (e) => {
    // this.getCursorRectangle();
    if (e && e.activeLabel) {
      this.props.toggleFilter(e.activeLabel);
    }
  }

  /**
   * Calculates the best size for the visualization for better scalability
   */
  resizeGraph = () => {
    const container = document.getElementById('age-container');
    const containerHeight = window.getComputedStyle(container, null).getPropertyValue('height');
    const graphTitle = document.getElementById('age-graph-title');
    const graphTitleHeight = window.getComputedStyle(graphTitle, null).getPropertyValue('height');
    this.setState({
      graphHeight: (parseInt(containerHeight, 10) - parseInt(graphTitleHeight, 10)) + 10,
    });
  }

  render() {
    return (
      <div id="age-container" className={this.props.classes.maxHeight} >
        <div id="age-header" className={this.props.classes.noOverflow} >
          <Chip
            avatar={<Avatar src={ClearFilterIcon} alt="Clear Filters" className={this.props.classes.chipAvatar} />}
            label="Clear Filter"
            onClick={this.clearFilter}
            className={this.props.classes.clearFilterChip}
          />
          <Typography id="age-graph-title" className={this.props.classes.labelFont} type="title" component="h1">
            Age
          </Typography>
        </div>
        <ResponsiveContainer className={this.props.classes.responsiveContainer} width="100%" height={this.state.graphHeight}>
          <BarChartImpl
            data={this.props.age}
            onClick={this.handleFilterClickToggle}
          >
            <XAxis dataKey="age" tickCount={13} />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip
              content={<CustomTooltip />}
              offset={15}
              cursor={{ stroke: '#424242', strokeWidth: 1 }}
              wrapperStyle={{ padding: '4px', zIndex: 1000 }}
              demographic="age"
            />
            <Bar dataKey="serious" stroke={MEVColors.severeStroke} stackId="a" fill="url(#colorSevere)" />
            <Bar dataKey="UNK" stroke={MEVColors.notSevereStroke} stackId="a" fill="url(#colorNotSerious)" />
            {/* <ReferenceArea
              x1="0-5"
              x2="0-5"
              stroke="red"
              strokeOpacity={0.3}
              xAxisId={0}
            />
            <ReferenceArea
              viewBox={{
                width: 40,
              }}
              x1="40-49"
              x2="50-59"
              stroke="red"
              strokeOpacity={0.3}
              xAxisId={0}
            /> */}
          </BarChartImpl>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default withStyles(styles)(Age);