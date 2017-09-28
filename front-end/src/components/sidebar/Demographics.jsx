import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Sex from './demographics/Sex';
import Age from './demographics/Age';
import Location from './demographics/Location';
import SelectedDate from './SelectedDate';
import './Demographics.css';


class Demographics extends Component {
  static propTypes = {
    sex: PropTypes.shape({
      M: PropTypes.number,
      F: PropTypes.number,
      UNK: PropTypes.number,
    }).isRequired,
    age: PropTypes.objectOf(PropTypes.number).isRequired,
    location: PropTypes.objectOf(PropTypes.number).isRequired,
    selectedDates: PropTypes.shape({
      startDate: PropTypes.instanceOf(Date).isRequired,
      endDate: PropTypes.instanceOf(Date).isRequired,
    }).isRequired,
  }

  static defaultProps = {
    gender: {
      male: 0,
      female: 0,
      unknown: 0,
    },
    age: {},
    location: {},
    selectedDates: {
      startDate: new Date(2017, 0, 1, 0, 0, 0, 0),
      endDate: new Date(),
    },
  }

  filter = () => true;

  render() {
    return (
      <div>
        <br />
        <h1>Demographics</h1>
        <div className="card card-outline-primary demographics-card" >
          <Sex sex={this.props.sex} />
          <Age age={this.props.age} />
          <Location location={this.props.location} />
          <SelectedDate
            startDate={this.props.selectedDates.startDate}
            endDate={this.props.selectedDates.endDate}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sex: state.demographic.sex,
  age: state.demographic.age,
  location: state.demographic.location,
  selectedDates: state.demographic.selectedDates,
});

export default connect(
  mapStateToProps,
  null,
)(Demographics);
