import React from 'react';
import PropTypes from 'prop-types';


const Sex = props => (
  <div>
    <h2>Sex</h2>
    <div className="card card-outline-primary" >
      <p>Male: { props.sex.M }</p>
      <p>Female: { props.sex.F }</p>
      <p>Unknown: { props.sex.UNK }</p>
    </div>
  </div>
);

Sex.propTypes = {
  sex: PropTypes.shape({
    M: PropTypes.number.isRequired,
    F: PropTypes.number.isRequired,
    UNK: PropTypes.number.isRequired,
  }).isRequired,
};

export default Sex;
