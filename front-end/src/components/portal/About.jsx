import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles';
import { blue, green, red } from 'material-ui/colors';
import MEVColors from '../../theme';

const defaultTheme = createMuiTheme({
  palette: {
    primary: {
      ...blue,
      500: MEVColors.buttonLight,
      700: MEVColors.buttonHover,
    },
    secondary: {
      ...green,
    },
    ...MEVColors,
    error: red,
  },
});

const styles = theme => ({});

/**
 * This is the component for the About Page
 */
class About extends Component {
  static propTypes = {
    classes: PropTypes.shape({
    }).isRequired,
  }

  asd = () => 123;

  render() {
    return (
      <MuiThemeProvider theme={defaultTheme} >
        <div className="About container">
          <div className="row">
            <div className="col-sm-12">
              <h3>Medication Error and Adverse Reaction Trend Visualizer</h3>
              <h5>This is a system to view, analyze and classify reports from the FDA Adverse Event Reporting System (FAERS).</h5>
            </div>
            <div className="col-sm-4">
              <h4>Developers</h4>
              <ul>
                <li>Derek Murphy - Computer Science 2018</li>
                <li>Oliver Spring - Computer Science 2018</li>
                <li>Cory Tapply - Computer Science 2018</li>
                <li>Daniel Yun - Computer Science 2018</li>
              </ul>
            </div>
            <div className="col-sm-4">
              <h4>Faculty Advisor</h4>
              <ul>
                <li>Professor Elke Rundensteiner</li>
              </ul>
            </div>
            <div className="col-sm-4">
              <h4>Graduate Student Mentors</h4>
              <ul>
                <li>Tabassum Kakar</li>
                <li>Xiao Qin</li>
              </ul>
            </div>
            <div className="col-sm-12">
              <h4>FDA Contacts</h4>
              <div style={{ marginLeft: '10px' }}>
                <p><strong>Suranjan De</strong>, MS, MBA.</p>
                <p>Deputy Director, Regulatory Science Staff (RSS), Office of Surveillance & Epidemiology, CDER, FDA</p>
                <p><strong>Sanjay K. Sahoo</strong>, MS, MBA.</p>
                <p>Team Lead (Acting) Regulatory Science Staff (RSS), Office of Surveillance & Epidemiology, CDER, FDA</p>
                <h4>FDA Safety Evaluators:</h4>
                <ul>
                  <li>Christian Cao</li>
                  <li>Monica Munoz</li>
                  <li>Tingting Gao</li>
                  <li>Jo Wyeth</li>
                  <li>Oanh Dang</li>
                  <li>Cathy Miller</li>
                  <li>Madhuri Patel</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(About);
