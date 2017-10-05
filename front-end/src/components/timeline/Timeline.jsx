import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormGroup, InputGroup, FormControl } from 'react-bootstrap';
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceArea, Brush } from 'recharts';
import { setSelectedTime } from '../../actions/timelineActions';
import './Timeline.css';

class SideBar extends Component {
  static propTypes = {
    setSelectedTime: PropTypes.func.isRequired,
  }
  constructor() {
    super();
    this.state = {
      setStart: true,
      selectedStartX: 0,
      selectedEndX: 0,
      previewStartX: 5,
      previewEndX: 10,

      currentlySelecting: false,
      mouseMovePosition: 0,
    };
  }


  componentDidMount() {
    document.getElementById('timeline-chart').addEventListener('mousedown', (e) => {
      this.setState({ currentlySelecting: true });
      this.setState({ selectedStartX: this.state.mouseMovePosition });
      this.setState({ previewStartX: this.state.mouseMovePosition });

      // Clear  the Other end to start a new selection
      this.setState({ selectedEndX: 0 });
      this.setState({ previewEndX: 0 });
    }, false);

    document.getElementById('timeline-chart').addEventListener('mouseup', (e) => {
      this.setState({ currentlySelecting: false });
      this.setState({ selectedEndX: this.state.mouseMovePosition });
      this.setState({ previewEndX: this.state.mouseMovePosition });
    }, false);

    document.getElementById('timeline-chart').addEventListener('mousemove', (e) => {
      if (this.state.currentlySelecting) {
        this.setState({ previewEndX: this.state.mouseMovePosition });
      }
    }, true);
  }

  // handleZoom(domain) {
  //   this.setState({selectedDomain: domain});
  // }

  // handleBrush(domain) {
  //   this.setState({zoomDomain: domain});
  // }

  clickAreaChart = (e) => {
    console.log(e);
    // if (e && e.activeLabel) {
    //   if (this.state.setStart) {
    //     this.setState({ selectedStartX: (e.activeLabel), setStart: false });
    //     this.setState({ previewStartX: (e.activeLabel), setStart: false });
    //   } else {
    //     this.setState({ selectedEndX: (e.activeLabel), setStart: true });
    //     this.setState({ previewdEndX: (e.activeLabel), setStart: true });
    //   }
    //   console.log(this.state.selectedStartX);
    //   console.log(this.state.selectedEndX);
    // }
  }

  updateSelectedDate = () => {
    const startDate = document.getElementById('start_date').value;
    const endDate = document.getElementById('end_date').value;
    this.props.setSelectedTime({
      startDate,
      endDate,
    });
  };

  recordMouseMove = (e) => {
    if (e && e.activeLabel) {
      this.setState({ mouseMovePosition: (e.activeLabel) });
    }
  }

  data = [
    { d: 150, date: 20170401 },
    { d: 200, date: 20170402 },
    { d: 175, date: 20170403 },
    { d: 225, date: 20170404 },
    { d: 230, date: 20170405 },
    { d: 235, date: 20170406 },
    { d: 150, date: 20170407 },
    { d: 200, date: 20170408 },
    { d: 175, date: 20170409 },
    { d: 225, date: 20170410 },
    { d: 230, date: 20170411 },
    { d: 235, date: 20170412 },
    { d: 150, date: 20170413 },
    { d: 200, date: 20170414 },
    { d: 175, date: 20170415 },
    { d: 225, date: 20170416 },
    { d: 400, date: 20170417 },
    { d: 735, date: 20170418 },
    { d: 450, date: 20170419 },
    { d: 200, date: 20170420 },
    { d: 175, date: 20170421 },
    { d: 225, date: 20170422 },
    { d: 230, date: 20170423 },
    { d: 235, date: 20170424 },
    { d: 150, date: 20170425 },
    { d: 200, date: 20170426 },
    { d: 175, date: 20170427 },
    { d: 225, date: 20170428 },
    { d: 230, date: 20170429 },
    { d: 235, date: 20170430 },
  ];

  render = () => (
    <div>
      <div id="timeline" >
        {/* <button className="btn btn-outline-secondary" onClick={this.updateSelectedDate}>Set Date!</button> */}
      </div>
      <div id="timeline-chart">
        <ResponsiveContainer width="100%" height={145}>
          <AreaChart
            data={this.data}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            onClick={this.clickAreaChart}
            onMouseMove={this.recordMouseMove}
          >
            <defs>
              <linearGradient id="colorGreen" x1="0" y1="0" x2="0.5" y2="1">
                <stop offset="15%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="99%" stopColor="#82ca9d" stopOpacity={0.2} />
              </linearGradient>
              <linearGradient id="colorYellow" x1="0" y1="0" x2="0.5" y2="1">
                <stop offset="15%" stopColor="#FFEE58" stopOpacity={0.8} />
                <stop offset="99%" stopColor="#FFEE58" stopOpacity={0.2} />
              </linearGradient>
              <linearGradient id="colorRed" x1="0" y1="0" x2="0.5" y2="1">
                <stop offset="15%" stopColor="#E53935" stopOpacity={0.8} />
                <stop offset="99%" stopColor="#E53935" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" />
            <CartesianGrid strokeDasharray="3 3" />
            {/* <Tooltip /> */}
            <Area
              type="monotone"
              dataKey="d"
              stroke="#8884d8"
              fillOpacity={1}
              stackId="1"
              fill="url(#colorGreen)"
              animationDuration={700}
              connectNulls={false}
            />
            <Area
              type="monotone"
              dataKey="d"
              stroke="#FDD835"
              fillOpacity={1}
              stackId="1"
              fill="url(#colorYellow)"
              animationDuration={700}
              connectNulls={false}
            />
            <Area
              type="monotone"
              dataKey="d"
              stroke="#E53935"
              fillOpacity={1}
              stackId="1"
              fill="url(#colorRed)"
              animationDuration={700}
              connectNulls={false}
            />
            <Brush
              dataKey="date"
              stroke="#8884d8"
              height={20}
              travellerWidth={10}
              startIndex={2}
              endIndex={15}
            />
            <ReferenceArea
              x1={this.state.previewStartX}
              x2={this.state.previewEndX}
              stroke="red"
              strokeOpacity={0.3}
              xAxisId={0}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default connect(
  null,
  { setSelectedTime },
)(SideBar);
