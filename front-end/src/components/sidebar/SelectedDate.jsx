import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'react-bootstrap';


const SelectedDate = props => (
  <div className="col-sm-3">
    <h2>Selected Date</h2>
    <div className="card card-outline-primary" >
      <p><Label bsStyle="default">{props.startDate}</Label> to <Label bsStyle="default">{props.endDate}</Label></p>
      {/* <p><Label bsStyle="default">{props.startDate.toDateString()}</Label> to <Label bsStyle="default">{props.endDate.toDateString()}</Label></p> */}
    </div>
  </div>
);

SelectedDate.propTypes = {
  startDate: PropTypes.number.isRequired,
  endDate: PropTypes.number.isRequired,
};

export default SelectedDate;
