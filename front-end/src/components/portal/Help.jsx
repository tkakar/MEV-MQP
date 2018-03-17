import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles';
import { blue, green, red } from 'material-ui/colors';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import imageOne from '../../resources/images/image1.png';
import imageTwo from '../../resources/images/image2.png';
import imageThree from '../../resources/images/image3.png';
import imageFour from '../../resources/images/image4.png';
import imageFive from '../../resources/images/image5.png';
import imageSix from '../../resources/images/image6.png';
import imageSeven from '../../resources/images/image7.png';
import imageEight from '../../resources/images/image8.png';
import imageNine from '../../resources/images/image9.png';
import imageTen from '../../resources/images/image10.png';
import imageEleven from '../../resources/images/image11.png';
import imageTwelve from '../../resources/images/image12.png';
import imageThirteen from '../../resources/images/image13.png';
import imageFourteen from '../../resources/images/image14.png';
import imageFifteen from '../../resources/images/image15.png';
import imageSixteen from '../../resources/images/image16.png';
import imageSeventeen from '../../resources/images/image17.png';
import imageEightteen from '../../resources/images/image18.png';
import imageNineteen from '../../resources/images/image19.png';
import imageTwenty from '../../resources/images/image20.png';
import MEVColors from '../../theme';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

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
class Help extends Component {
  static propTypes = {
    classes: PropTypes.shape({
    }).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    return (
      <MuiThemeProvider theme={defaultTheme} >
        <div className="About container">
          <div className="row">
            <div className="col-sm-12">
              <h2>Help Page</h2>
            </div>
            <div className="col-sm-12">
              <AppBar position="static" color="default">
                <Tabs
                  value={this.state.value}
                  onChange={this.handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  scrollable
                  scrollButtons="auto"
                >
                  <Tab label="Sign In" />
                  <Tab label="User Dashboard" />
                  <Tab label="Visualization" />
                  <Tab label="Reports Listing" />
                </Tabs>
              </AppBar>
              {this.state.value === 0 &&
              <TabContainer>
                <h2>Sign In:</h2>
                <img alt="" src={imageFour} style={{ border: '1px solid #000', maxWidth: '550px', marginBottom: '10px' }}className={'img-responsive'} title="" />
                <p style={{ fontSize: '16px', lineHeight: '20px' }}>This is the sign-in interface. Here the user will enter a username that they will use to analyze the FDA data. </p>
                <p style={{ fontSize: '16px', lineHeight: '20px' }}>If there is no user already in the system with the user input, a new user will be created with two predefined cases (Read and Trash).</p>
              </TabContainer>
        }
              {this.state.value === 1 &&
              <TabContainer>
                <h2>User Dashboard:</h2>
                <img alt="" src={imageSix} style={{ border: '1px solid #000', maxWidth: '550px', marginBottom: '10px' }}className={'img-responsive'} title="" />
                <p style={{ fontSize: '16px', lineHeight: '20px' }}>This is the user dashboard interface. This is where you will be directed after you have logged in. From here you will see the two predefined cases <strong>Read</strong> and <strong>Trash</strong>. These are two cases that will come in handy for sorting through the reports your have narrowed down to build your cases. </p>
                <img alt="" src={imageEleven} style={{ border: '1px solid #000', marginBottom: '10px' }}className={'img-fluid'} title="" />
                <p style={{ fontSize: '16px', lineHeight: '20px' }}><strong>Read: </strong>This is a pre-generated case to store the reports that you want to mark as being already read. Reports in this case will display as grey on the report listing page
                </p>
                <img alt="" src={imageTwelve} style={{ border: '1px solid #000', marginBottom: '10px' }}className={'img-responsive'} title="" />
                <p style={{ fontSize: '16px', lineHeight: '20px' }}><strong>Trash: </strong>This is a pre-generated case to store the reports that you do not want to show up the report listing page</p>
                <img alt="" src={imageThirteen} style={{ border: '1px solid #000', marginBottom: '10px' }}className={'img-responsive'} title="" />
                <p style={{ fontSize: '16px', lineHeight: '20px' }}><strong>Go To Visualization: </strong>This button will bring the user to the visualization page. The visualization is where you will work to narrow down reports and analyze trends.</p>
                <img alt="" src={imageFourteen} style={{ border: '1px solid #000', marginBottom: '10px' }}className={'img-responsive'} title="" />
                <p style={{ fontSize: '16px', lineHeight: '20px' }}><strong>Go To Reports Listing: </strong>This button will bring the user to the reports listing page where the user will be presented with either a broad list of reports or if you have already visited and used the visualization page, it will presented with a list of reports that show with your applied filters.</p>
              </TabContainer>
        }
              {this.state.value === 2 &&
              <TabContainer>
                <h2>Visualization:</h2>
                <img alt="" src={imageThree} style={{ border: '1px solid #000', maxWidth: '550px', marginBottom: '10px' }}className={'img-responsive'} title="" />
                <p style={{ fontSize: '16px', lineHeight: '20px' }}>This is the data visualization interface. Here you will find the most recent two weeks of data in the database. This will default load 48,050 reports which can be filtered down using any of the visible filters in the interface. Below you will find the components explained further.</p>
                <img alt="" src={imageFifteen} style={{ border: '1px solid #000', marginBottom: '10px' }}className={'img-responsive'} title="" />
                <p style={{ fontSize: '16px', lineHeight: '20px' }}><strong>Go To Reports Listing: </strong>This button will bring the user to the reports listing page. Which will list all the queried reports which attributes are being displayed in the visualization interface.</p>
                <div className="col-sm-12">
                  <h2>Components:</h2>
                  <div className="col-sm-12">
                    <div className="col-sm-6">
                      <h3>Timeline</h3>
                      <hr />
                      <img alt="" src={imageSixteen} style={{ border: '1px solid #000', marginBottom: '10px' }}className={'img-responsive'} title="" />
                      <p style={{ fontSize: '16px', lineHeight: '20px' }}>The timeline will show the number of reports in frequency as well as the correct severity percentage based on the number of severe to non-severe reports.</p>
                      <p style={{ fontSize: '16px', lineHeight: '20px' }}><strong>Controls</strong></p>
                      <ul>
                        <li style={{ fontSize: '14px', lineHeight: '18px' }}><strong>Ctrl + Scroll: </strong>Using these two inputs will allow you zoom in and out on the timeline to decrease or increase the date range from which you can select from.</li>
                      </ul>
                    </div>
                    <div className="col-sm-6">
                      <h3>Demographic</h3>
                      <hr />
                      <img alt="" src={imageEightteen} style={{ border: '1px solid #000', marginBottom: '10px' }}className={'img-responsive'} title="" />
                      <p style={{ fontSize: '16px', lineHeight: '20px' }}>This section of the interface will show the queried reports demographic data. These graphs will also show the severe to non-severe reports that are appearing in your reports query.</p>
                      <p style={{ fontSize: '16px', lineHeight: '20px' }}><strong>Controls</strong></p>
                      <ul>
                        <li style={{ fontSize: '14px', lineHeight: '18px' }}><strong>Shift + Click: </strong>Holding shift and clicking will allow you to select multiple elements</li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <h3>Treemap</h3>
                    <hr />
                    <img alt="" src={imageSeventeen} style={{ border: '1px solid #000', marginBottom: '10px' }} className={'img-responsive'} title="" />
                    <p style={{ fontSize: '16px', lineHeight: '20px' }}>Here you can see the treemap section of the visualization interface. This is separated into five sections, the legend, medication error treemap, drug name treemap, stage treemap and the cause treemap. The four treemaps are all selectable by each of the present report attributes in its categories. These treemaps will be the fastest way to narrow down your report search. The boxes that display with no text, can still be read if you hover your mouse over the treemap, and it will display a tooltip as such:</p>
                    <img alt="" src={imageTen} style={{ float: 'right', border: '1px solid #000', marginBottom: '10px' }} className={'img-responsive'} title="" />
                    <p style={{ fontSize: '16px', lineHeight: '20px' }}><strong>Controls</strong></p>
                    <ul>
                      <li style={{ fontSize: '14px', lineHeight: '18px' }}><strong>Shift + Click: </strong>Holding shift and clicking will allow you to select multiple elements</li>
                    </ul>
                  </div>
                </div>
              </TabContainer>
        }
              {this.state.value === 3 &&
              <TabContainer>
                <h2>Reports Listing:</h2>
                <img alt="" src={imageSeven} style={{ border: '1px solid #000', maxWidth: '550px' }}className={'img-fluid'} title="" />
                <p>&nbsp;</p>
                <p style={{ fontSize: '16px' }}>This is the reports listing interface where all your queried reports will be visible to the user here under <strong>ALL REPORTS</strong>. After the default active tab, you will see the two predefined cases, an option to create a new user defined case, and all other active cases that the user has ownership of.</p>
                <img alt="" src={imageThirteen} style={{ border: '1px solid #000', marginBottom: '10px' }}className={'img-fluid'} title="" />
                <p style={{ fontSize: '16px', lineHeight: '20px' }}><strong>Go To Visualization: </strong>This button will bring the user to the visualization page. The visualization is where you will work to narrow down reports and analyze trends.</p>
                <img alt="" src={imageNineteen} style={{ border: '1px solid #000', marginBottom: '10px' }}className={'img-fluid'} title="" />
                <p style={{ fontSize: '16px', lineHeight: '20px' }}><strong>Open Case Summary: </strong>This button will open a case summary listing which will list all your active cases in a expandable list. It will open a drawer to the right which will look like:</p>
                <div className="col-sm-12">
                  <h2>Components:</h2>
                  <div className="col-sm-6">
                    <h3>Case Summary</h3>
                    <hr />
                    <img alt="" src={imageTwenty} style={{ border: '1px solid #000', marginBottom: '10px' }}className={'img-responsive'} title="" />
                    <p style={{ fontSize: '16px', lineHeight: '20px' }}>In this interface you can click one of the expandable cases to see statistic that will summarize user built cases with all their report annotations. The summaries may appear like so:</p>
                    <img alt="" src={imageTwo} style={{ maxWidth: '250px', border: '1px solid #000', marginBottom: '10px' }} className={'img-responsive'} title="" />
                  </div>
                  <div className="col-sm-6">
                    <h3>Report Item</h3>
                    <hr />
                    <p style={{ fontSize: '16px', lineHeight: '20px' }}>Inside the report listing you can click and expand on the report to add to cases based on <strong>Supportive</strong> or <strong>Primary Evidence</strong>. The expandable menu can be seen below:</p>
                    <img alt="" src={imageEight} style={{ border: '1px solid #000', marginBottom: '10px' }}className={'img-responsive'} title="" />
                    <p style={{ fontSize: '16px', lineHeight: '20px' }}>Here is where you can add a report to a case. Whether you would like to add a report as supportive or primary evidence. Once you have toggled the report to the desired evidence type, you can click which case you would like to add the report too with that specified evidence type.</p>
                    <p style={{ fontSize: '16px', lineHeight: '20px' }}>Inside the report item view, you can see another expandable view which will allow the user to highlight and annotate the report to help build cases which will be displayed in the case summary view. The report annotation is displayed as:</p>
                    <img alt="" src={imageNine} style={{ border: '1px solid #000', marginBottom: '10px' }} className={'img-responsive'} title="" />
                    <p style={{ fontSize: '16px', lineHeight: '20px' }}>You will be able to highlight sections of text and select the attribute that you would like to highlight to show importance throughout the report.</p>
                  </div>
                </div>
              </TabContainer>
        }
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(Help);
