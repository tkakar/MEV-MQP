import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import SideBar from './sidebar/SideBar';

const styles = {
  sideBar: {
    width: '100%',
    height: '20vh',
    padding: '0px',
  },
};

class SideBarContainer extends Component {
  static propTypes = {
    classes: PropTypes.shape({
      sideBar: PropTypes.string,
    }).isRequired,
  }

  render = () => (
    // <Paper id="sidebar-container" className={this.props.classes.sideBar} elevation={4}>
      <SideBar />
    // </Paper>
  )
}

export default withStyles(styles)(SideBarContainer);
