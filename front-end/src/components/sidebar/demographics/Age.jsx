import React from 'react';
import PropTypes from 'prop-types';


const Age = props => (
  <div>
    <h2>Age</h2>
    <div className="card card-outline-primary" >
      <p>{ JSON.stringify(props.age) }</p>
    </div>
  </div>
);

Age.propTypes = {
  age: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default Age;
