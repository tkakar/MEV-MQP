import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Sex from './demographics/Sex';
import Age from './demographics/Age';
import Location from './demographics/Location';
import './Demographics.css';

const styles = {
  gridContainer: {
    padding: '0px 2px',
    width: '100%',
    margin: '0px',
  },
};

class Demographics extends Component {
  static propTypes = {
    sex: PropTypes.arrayOf(PropTypes.object).isRequired,
    age: PropTypes.arrayOf(PropTypes.object).isRequired,
    location: PropTypes.arrayOf(PropTypes.object).isRequired,
    classes: PropTypes.shape({
      gridContainer: PropTypes.string,
    }).isRequired,
  }

  filter = () => true;

  render() {
    return (
      <Grid container spacing={8} className={this.props.classes.gridContainer} >
        <Grid item xs={2}>
          <Paper className="" elevation={4}>
            <Sex sex={this.props.sex} />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className="" elevation={4}>
            <Age age={this.props.age} />
          </Paper>
        </Grid>
        <Grid item xs={7}>
          <Paper className="" elevation={4}>
            <Location
              location={this.props.location}
            />
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  sex: state.demographic.sex,
  age: state.demographic.age,
  location: state.demographic.location,
});

export default connect(
  mapStateToProps,
  null,
)(withStyles(styles)(Demographics));
