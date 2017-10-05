import React from 'react';
import PropTypes from 'prop-types';


const Sex = props => (
  <div className="col-sm-4">
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
    M: PropTypes.number,
    F: PropTypes.number,
    UNK: PropTypes.number,
  }).isRequired,
};

export default Sex;
