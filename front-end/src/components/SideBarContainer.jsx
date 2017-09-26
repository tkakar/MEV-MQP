import React, { Component } from 'react';
import SideBar from './sidebar/SideBar';

class SideBarContainer extends Component {
  render = () => (
    <div id="sidebar-container" className="col-md-2" >
      <SideBar />
    </div>
  )
}

export default SideBarContainer;
