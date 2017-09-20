import React from 'react';
import PropTypes from 'prop-types';


const SelectedDate = props => (
  <div>
    <p>{props.date}</p>
  </div>

);

SelectedDate.propTypes = {
  date: PropTypes.string.isRequired,
};

export default SelectedDate;
