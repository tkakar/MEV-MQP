import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts';


class Sex extends Component {
  static propTypes = {
    sex: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  filter = () => true;

  render() {
    return (
      <div className="col-sm-4">

        <div>
          <h2>Sex
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={this.props.sex}>
                <XAxis dataKey="sex" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer></h2>
        </div>
      </div>
    );
  }
}

export default Sex;
