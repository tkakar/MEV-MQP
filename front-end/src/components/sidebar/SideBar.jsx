import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Demograpics from './Demographics';
import { getData } from '../../actions/visualizationActions';
import './SideBar.css';

class SideBar extends Component {
  static propTypes = {
    getData: PropTypes.func.isRequired,
  }

  asd = () => 2;

  render = () => (
    <div id="sidebar" >
      {/* <SelectedDate /> */}
      <button className="btn btn-primary" onClick={this.props.getData}>CLICK ME</button>
      <Demograpics />
    </div>
  )
}

export default connect(
  null,
  { getData },
)(SideBar);
