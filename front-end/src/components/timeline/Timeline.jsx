import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormGroup, InputGroup, FormControl } from 'react-bootstrap';
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceArea, Brush } from 'recharts';
import AreaChartImpl from './components/AreaChartImpl';
import BrushImpl from './components/BrushImpl';
import { setSelectedTime, setSelectedTimeline } from '../../actions/timelineActions';
import './Timeline.css';

class Timeline extends Component {
  static propTypes = {
    setSelectedTime: PropTypes.func.isRequired,
    setSelectedTimeline: PropTypes.func.isRequired,
    entireTimelineData: PropTypes.arrayOf(
      PropTypes.shape({
        congenital_anomalies: PropTypes.number.isRequired,
        deaths: PropTypes.number.isRequired,
        disablilities: PropTypes.number.isRequired,
        hospitalizations: PropTypes.number.isRequired,
        init_fda: PropTypes.number.isRequired,
        life_threatenings: PropTypes.number.isRequired,
        other_serious: PropTypes.number.isRequired,
        required_interventions: PropTypes.number.isRequired,
      }),
    ).isRequired,
  }

  constructor() {
    super();
    this.state = {
      setStart: true,
      selectedStartX: 0,
      selectedEndX: 0,
      previewStartX: 0,
      previewEndX: 0,

      brushStartIndex: 0,
      brushEndIndex: 14, // Two Weeks

      currentlySelecting: false,
      mouseMovePosition: 0,
    };
  }

  componentDidMount() {
    document.getElementById('timeline-chart').addEventListener('mousedown', (e) => {
      console.log(e)
      this.setState({ currentlySelecting: true });
      this.setState({ selectedStartX: this.state.mouseMovePosition });
      this.setState({ previewStartX: this.state.mouseMovePosition });

      document.getElementById('start_date').value = this.state.selectedStartX;
      // Clear  the Other end to start a new selection
      this.setState({ selectedEndX: 0 });
      this.setState({ previewEndX: 0 });
    }, false);

    document.getElementById('timeline-chart').addEventListener('mouseup', (e) => {
      this.setState({ currentlySelecting: false });
      this.setState({ selectedEndX: this.state.mouseMovePosition });
      this.setState({ previewEndX: this.state.mouseMovePosition });
      document.getElementById('end_date').value = this.state.selectedEndX;
    }, false);

    document.getElementById('timeline-chart').addEventListener('mousemove', (e) => {
      if (this.state.currentlySelecting) {
        if (this.state.previewEndX !== this.state.mouseMovePosition) {
          this.setState({ previewEndX: this.state.mouseMovePosition });
        }
      }
    }, true);
    
    // document.getElementById('timeline-chart').addEventListener('wheel', (e) => {
    //   // console.log(e)
    //   if (e.deltaY > 0) {
    //     this.setState({ brushStartIndex: this.state.brushStartIndex + 1 });
    //     this.setState({ brushStartIndex: this.state.brushEndIndex + 1 });
    //   } else if (e.deltaY < 0) {
    //     if (this.brushStartIndex > 0) {
    //       this.setState({ brushStartIndex: this.state.brushStartIndex - 1 });
    //       this.setState({ brushStartIndex: this.state.brushEndIndex - 1 });
    //     }
    //   } else {
    //     console.log('Delta is 0');
    //   }
    //   e.preventDefault();
    // }, true);
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

  brushChange = (a, b, c, d) => {
    // super(a, b, c, d);
    console.log(a, b, c, d)
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
      if (this.state.mouseMovePosition !== e.activeLabel) {
        this.setState({ mouseMovePosition: e.activeLabel });
      }
    }
  }

  data = () => this.props.entireTimelineData;
  // data = [
  //   { d: 150, date: 20170401 },
  //   { d: 200, date: 20170402 },
  //   { d: 175, date: 20170403 },
  //   { d: 225, date: 20170404 },
  //   { d: 230, date: 20170405 },
  //   { d: 235, date: 20170406 },
  //   { d: 150, date: 20170407 },
  //   { d: 200, date: 20170408 },
  //   { d: 175, date: 20170409 },
  //   { d: 225, date: 20170410 },
  //   { d: 230, date: 20170411 },
  //   { d: 235, date: 20170412 },
  //   { d: 150, date: 20170413 },
  //   { d: 200, date: 20170414 },
  //   { d: 175, date: 20170415 },
  //   { d: 225, date: 20170416 },
  //   { d: 400, date: 20170417 },
  //   { d: 735, date: 20170418 },
  //   { d: 450, date: 20170419 },
  //   { d: 200, date: 20170420 },
  //   { d: 175, date: 20170421 },
  //   { d: 225, date: 20170422 },
  //   { d: 230, date: 20170423 },
  //   { d: 235, date: 20170424 },
  //   { d: 150, date: 20170425 },
  //   { d: 200, date: 20170426 },
  //   { d: 175, date: 20170427 },
  //   { d: 225, date: 20170428 },
  //   { d: 230, date: 20170429 },
  //   { d: 235, date: 20170430 },
  // ];

  render = () => (
    <div id="timeline-selector">
      <div id="timeline" className="col col-xs-2" >
        <button className="btn btn-outline-secondary" onClick={this.updateSelectedDate}>Set Date!</button>
        <button className="btn btn-outline-secondary" onClick={this.props.setSelectedTimeline}>Set Timeline!</button>
        <FormGroup>
          <InputGroup>
            <FormControl type="text" placeholder="Start Date" id="start_date" defaultValue="20160329" />
            <InputGroup.Addon>To</InputGroup.Addon>
            <FormControl type="text" placeholder="End Date" id="end_date" defaultValue="20160512" />
          </InputGroup>
        </FormGroup>
      </div>
      <div id="timeline-chart" className="col col-xs-10">
        <ResponsiveContainer width="100%" height="100%" >
          <AreaChartImpl
            data={this.data()}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            onClick={this.clickAreaChart}
            onMouseMove={this.recordMouseMove}
            onScroll={this.scrollHandler}
          >
            <defs>
              <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="15%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="99%" stopColor="#82ca9d" stopOpacity={0.2} />
              </linearGradient>
              <linearGradient id="colorYellow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="15%" stopColor="#FFEE58" stopOpacity={0.8} />
                <stop offset="99%" stopColor="#FFEE58" stopOpacity={0.2} />
              </linearGradient>
              <linearGradient id="colorRed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="15%" stopColor="#E53935" stopOpacity={0.8} />
                <stop offset="99%" stopColor="#E53935" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <XAxis dataKey="init_fda_dt" />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="hospitalizations"
              stroke="#8884d8"
              fillOpacity={1}
              stackId="1"
              fill="url(#colorGreen)"
              animationDuration={700}
              connectNulls={false}
            />
            <Area
              type="monotone"
              dataKey="life_threatenings"
              stroke="#FDD835"
              fillOpacity={1}
              stackId="1"
              fill="url(#colorYellow)"
              animationDuration={700}
              connectNulls={false}
            />
            <Area
              type="monotone"
              dataKey="deaths"
              stroke="#E53935"
              fillOpacity={1}
              stackId="1"
              fill="url(#colorRed)"
              animationDuration={700}
              connectNulls={false}
            />

            {/* COPPIED HERE */}
            <Area
              type="monotone"
              dataKey="required_interventions"
              stroke="#8884d8"
              fillOpacity={1}
              stackId="1"
              fill="url(#colorGreen)"
              animationDuration={700}
              connectNulls={false}
            />
            <Area
              type="monotone"
              dataKey="other_serious"
              stroke="#FDD835"
              fillOpacity={1}
              stackId="1"
              fill="url(#colorYellow)"
              animationDuration={700}
              connectNulls={false}
            />
            <Area
              type="monotone"
              dataKey="disablilities"
              stroke="#E53935"
              fillOpacity={1}
              stackId="1"
              fill="url(#colorRed)"
              animationDuration={700}
              connectNulls={false}
            />
            <Area
              type="monotone"
              dataKey="congenital_anomalies"
              stroke="#8884d8"
              fillOpacity={1}
              stackId="1"
              fill="url(#colorGreen)"
              animationDuration={700}
              connectNulls={false}
            />


            <BrushImpl
              dataKey="init_fda_dt"
              stroke="#8884d8"
              height={1}
              travellerWidth={10}
              startIndex={0}
              endIndex={14}
            />
            <ReferenceArea
              x1={this.state.previewStartX}
              x2={this.state.previewEndX}
              stroke="red"
              strokeOpacity={0.3}
              xAxisId={0}
            />
          </AreaChartImpl>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  entireTimelineData: state.timeline.entireTimelineData,
});

export default connect(
  mapStateToProps,
  { setSelectedTime, setSelectedTimeline },
)(Timeline);
