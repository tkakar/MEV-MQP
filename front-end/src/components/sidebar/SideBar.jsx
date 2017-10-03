import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Demograpics from './Demographics';
import SelectedDate from './SelectedDate';
import './SideBar.css';

class SideBar extends Component {
  static propTypes = {
    selectedDates: PropTypes.shape({
      startDate: PropTypes.number.isRequired,
      endDate: PropTypes.number.isRequired,
    }).isRequired,
  }

  asd = () => 2;

  render = () => (
    <div id="heading" className="col-sm-12">
      <SelectedDate
        startDate={this.props.selectedDates.startDate}
        endDate={this.props.selectedDates.endDate}
      />
      <Demograpics />
    </div>
  )
}

const mapStateToProps = state => ({
  selectedDates: state.demographic.selectedDates,
});

export default connect(
  mapStateToProps,
  null,
)(SideBar);
