import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Sex from './demographics/Sex';
import Age from './demographics/Age';
import Location from './demographics/Location';
import './Demographics.css';


class Demographics extends Component {
  static propTypes = {
    sex: PropTypes.arrayOf(PropTypes.object).isRequired,
    age: PropTypes.arrayOf(PropTypes.object).isRequired,
    location: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  componentDidUpdate() {
    console.log('this is the sex', this.props.sex);
  }

  filter = () => true;
  render() {
    return (
      <div className="col-sm-12">
        <div>
          <Sex sex={this.props.sex} />
          <Age age={this.props.age} />
          <Location
            location={this.props.location}
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
