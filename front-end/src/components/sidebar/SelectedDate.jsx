import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'react-bootstrap';
import './SelectedDate.css';


const SelectedDate = props => (
  <div id="demographics-selectedDate" >
    <p><span>Selected Date &nbsp;</span><Label bsStyle="default">{props.startDate}</Label> to <Label bsStyle="default">{props.endDate}</Label></p>
  </div>
);

SelectedDate.propTypes = {
  startDate: PropTypes.number.isRequired,
  endDate: PropTypes.number.isRequired,
};

export default SelectedDate;
