import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormGroup, InputGroup, FormControl } from 'react-bootstrap';
import { setSelectedTime } from '../../actions/timelineActions';
import './Timeline.css';

class SideBar extends Component {
  static propTypes = {
    setSelectedTime: PropTypes.func.isRequired,
  }

  updateSelectedDate = () => {
    const startDate = document.getElementById('start_date').value;
    const endDate = document.getElementById('end_date').value;
    this.props.setSelectedTime({
      startDate,
      endDate,
    });
  };

  render = () => (
    <div id="timeline" >
      <button className="btn btn-outline-secondary" onClick={this.updateSelectedDate}>Set Date!</button>
      <FormGroup>
        <InputGroup>
          <FormControl type="text" placeholder="Start Date" id="start_date" defaultValue="20160329" />
          <InputGroup.Addon>To</InputGroup.Addon>
          <FormControl type="text" placeholder="End Date" id="end_date" defaultValue="20160512" />
        </InputGroup>
      </FormGroup>
    </div>
  )
}

export default connect(
  null,
  { setSelectedTime },
)(SideBar);
