import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'react-bootstrap';


const SelectedDate = props => (
  <div>
    <h2>Selected Date</h2>
    <div className="card card-outline-primary" >
      <p><Label bsStyle="default">{props.startDate.toDateString()}</Label> to <Label bsStyle="default">{props.endDate.toDateString()}</Label></p>
    </div>
  </div>
);

SelectedDate.propTypes = {
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date).isRequired,
};

export default SelectedDate;
