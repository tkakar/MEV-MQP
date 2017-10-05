import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Sex from './demographics/Sex';
import Age from './demographics/Age';
import Location from './demographics/Location';
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
  }

  getValues = (data) => {
    const countries = Object.keys(data);
    const countryValues = Object.values(data);
    const newData = { countries, countryValues };
    return newData;
  }

  filter = () => true;
  render() {
    return (
      <div className="col-sm-9">
        <div>
          <Sex sex={this.props.sex} />
          <Age age={this.props.age} />
          <Location
            location={this.getValues(this.props.location)}
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
});

export default connect(
  mapStateToProps,
  null,
)(Demographics);
