import React, { Component } from 'react';
import Demograpics from './Demographics';
import './SideBar.css';

class SideBar extends Component {
  asd = () => 2;

  render = () => (
    <div id="sidebar" >
      {/* <SelectedDate /> */}
      <Demograpics />
    </div>
  )
}

export default SideBar;
