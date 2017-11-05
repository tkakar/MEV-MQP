import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { filterData } from '../../actions/filterActions';
import { toggleSexFilter, toggleAgeFilter, toggleLocationFilter } from '../../actions/demographicActions';
import Sex from './demographics/Sex';
import Age from './demographics/Age';
import Location from './demographics/Location';
import styles from './DemographicsStyles';

class Demographics extends Component {
  static propTypes = {
    filterData: PropTypes.func.isRequired,    
    toggleSexFilter: PropTypes.func.isRequired,    
    toggleAgeFilter: PropTypes.func.isRequired,    
    toggleLocationFilter: PropTypes.func.isRequired,    
    sex: PropTypes.arrayOf(PropTypes.object).isRequired,
    age: PropTypes.arrayOf(PropTypes.object).isRequired,
    location: PropTypes.arrayOf(PropTypes.object).isRequired,
    filters: PropTypes.shape({
      occr_country: PropTypes.array,
      sex: PropTypes.array,
    }).isRequired,
    classes: PropTypes.shape({
      gridContainer: PropTypes.string,
      maxHeight: PropTypes.string,
    }).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      sexFilter: [],
      ageFilter: [],
      locationFilter: [],
    };
  }

  // If state changes, we want to re-query the database
  componentDidUpdate() {
    // console.log(this.props.filters);
    // this.props.filterData({
    //   ...this.props.filters,
    // });
  }

  render() {
    return (
      <Grid container spacing={8} className={this.props.classes.gridContainer} >
        <Grid item xs={2}>
          <Paper className={this.props.classes.maxHeight} elevation={4} >
            <Sex
              sex={this.props.sex}
              toggleFilter={this.props.toggleSexFilter}
            />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={this.props.classes.maxHeight} elevation={4}>
            <Age
              age={this.props.age}
              toggleFilter={this.props.toggleAgeFilter}
            />
          </Paper>
        </Grid>
        <Grid item xs={7}>
          <Paper className={this.props.classes.maxHeight} elevation={4}>
            <Location
              location={this.props.location}
              toggleFilter={this.props.toggleLocationFilter}
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
  filters: {
    occr_country: state.filters.occr_country,
    sex: state.filters.sex,
  },
});

export default connect(
  mapStateToProps,
  { filterData, toggleSexFilter, toggleAgeFilter, toggleLocationFilter },
)(withStyles(styles)(Demographics));
