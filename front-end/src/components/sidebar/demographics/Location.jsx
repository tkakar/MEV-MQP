import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';


class Location extends Component {
  static propTypes = {
    location: PropTypes.shape({
      countries: PropTypes.array,
      values: PropTypes.array,
    }).isRequired,
  }

  filter = () => true;

  render() {
    const data = {
      labels: this.props.location.countries,
      datasets: [
        {
          data: this.props.location.values,
          backgroundColor: '#FF6384',
        },
      ],
    };
    const options = {
      scales: {
        yAxes: [
          {
            ticks: {
              callback(label, index, labels) {
                return `${  label}`;
              },
            },
          },
        ],
      },
    };
    return (
      <div className="col-sm-4">
        <h2>Location</h2>
        <div className="card card-outline-primary" >
          <Bar
            data={data}
            options={options}
            redraw
          />
        </div>
      </div>
    );
  }
}

export default Location;
