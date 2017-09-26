import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { setGender } from '../../actions/demographicAction';
import Gender from './demographics/Gender';

class Demographics extends Component {
  static propTypes = {
    gender: PropTypes.shape({
      male: PropTypes.number,
      female: PropTypes.number,
      unknown: PropTypes.number,
    }),
    setGender: PropTypes.func.isRequired,
  }

  static defaultProps = {
    gender: {
      male: 0,
      female: 0,
      unknown: 0,
    },
  }

  filter = () => true;

  render() {
    return (
      <div>
        <Button onClick={this.props.setGender} >ADD STUFF</Button>
        <Gender gender={this.props.gender} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  gender: state.demographic.gender,
});

export default connect(
  mapStateToProps,
  { setGender },
)(Demographics);
