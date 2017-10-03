import React from 'react';
import PropTypes from 'prop-types';


const Location = props => (
  <div className="col-sm-3">
    <h2>Location</h2>
    <div className="card card-outline-primary" >
      <p>{ JSON.stringify(props.location) }</p>
    </div>
  </div>
);

Location.propTypes = {
  location: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default Location;
