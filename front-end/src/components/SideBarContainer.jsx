import React, { Component } from 'react';
import SideBar from './sidebar/SideBar';

class SideBarContainer extends Component {
  render = () => (
    <div id="sidebar-container" className="col-xs-2 card card-outline-primary" >
      <SideBar />
    </div>
  )
}

export default SideBarContainer;
