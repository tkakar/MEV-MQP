import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles';
import { blue, green, red } from 'material-ui/colors';
import VisualizationContainer from './VisualizationContainer';
import SideBarContainer from './SideBarContainer';
import TimelineContainer from './TimelineContainer';
import './App.css';

const blueTheme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: {
      ...green,
      A400: '#00e677',
    },
    error: red,
  },
});

const styles = theme => ({});

class App extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  asd = () => 123;

  render() {
    return (
      <MuiThemeProvider theme={blueTheme} >
        <div className="App">
          <SideBarContainer />
          <VisualizationContainer />
          <TimelineContainer />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
