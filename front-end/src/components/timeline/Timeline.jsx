import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { getData } from '../../actions/visualizationAction';
import './Timeline.css';

class SideBar extends Component {
  static propTypes = {
    getData: PropTypes.func.isRequired,
  }

  asd = () => 2;

  render = () => (
    <div id="timeline" className="col-md-12" >
      <Button bsStyle="primary" onClick={this.props.getData}>Set Date!</Button>
    </div>
  )
}

export default connect(
  null,
  { getData },
)(SideBar);
