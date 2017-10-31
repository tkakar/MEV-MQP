import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Bar, ResponsiveContainer } from 'recharts';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = {
  labelFont: {
    'font-size': '20pt',
  },
  responsiveContainer: {
    'margin-left': '-15px',
  },
};

class Age extends Component {
  static propTypes = {
    age: PropTypes.arrayOf(PropTypes.object).isRequired,
    classes: PropTypes.shape({
      labelFont: PropTypes.string,
      responsiveContainer: PropTypes.string,
    }).isRequired,
  }

  filter = () => true;

  render() {
    return (
      <div>
        {/* <h2>Age</h2> */}
        <Typography className={this.props.classes.labelFont} type="title" align="center" component="h1">
          Age
        </Typography>
        <ResponsiveContainer className={this.props.classes.responsiveContainer} width="100%" height={150}>
          <BarChart data={this.props.age}>
            <defs>
              <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="15%" stopColor="#283593" stopOpacity={0.8} />
                <stop offset="99%" stopColor="#283593" stopOpacity={0.4} />
              </linearGradient>
            </defs>
            <XAxis dataKey="age" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Bar dataKey="count" stroke="#1A237E" fill="url(#colorBlue)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default withStyles(styles)(Age);
