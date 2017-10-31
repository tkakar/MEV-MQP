import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Demograpics from './Demographics';
import SelectedDate from './SelectedDate';
import './SideBar.css';

const styles = {
  sideBar: {
    width: '100%',
    height: '100%',
  },
};

class SideBar extends Component {
  static propTypes = {
    selectedDates: PropTypes.shape({
      startDate: PropTypes.number.isRequired,
      endDate: PropTypes.number.isRequired,
    }).isRequired,
    classes: PropTypes.shape({
      sideBar: PropTypes.string,
    }).isRequired,
  }

  asd = () => 2;

  render = () => (
    <div id="heading" className={this.props.classes.sideBar}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <SelectedDate
            startDate={this.props.selectedDates.startDate}
            endDate={this.props.selectedDates.endDate}
          />
        </Grid>
        <Grid item xs={12}>
          <Demograpics />
        </Grid>
      </Grid>
    </div>
  )
}

const mapStateToProps = state => ({
  selectedDates: state.demographic.selectedDates,
});

export default connect(
  mapStateToProps,
  null,
)(withStyles(styles)(SideBar));
