import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormGroup, InputGroup, FormControl } from 'react-bootstrap';
import { Area, CartesianGrid, XAxis, Tooltip, ResponsiveContainer, ReferenceArea } from 'recharts';
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
        init_fda_dt: PropTypes.string.isRequired,
        serious: PropTypes.number.isRequired,
        not_serious: PropTypes.number.isRequired,
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

      currentlySelecting: false,
      mouseMovePosition: 0,
      mouseZoomLocation: 0,
    };
  }

  componentDidMount() {
    this.props.setSelectedTimeline();
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
  }

  getmouseZoomLocation = () => this.state.mouseZoomLocation;

  updateSelectedDate = () => {
    const startDate = document.getElementById('start_date').value;
    const endDate = document.getElementById('end_date').value;
    this.props.setSelectedTime({
      startDate,
      endDate,
    });
  };

  recordMouseMove = (e) => {
    // console.log(e)
    if (e && e.activeLabel) {
      if (this.state.mouseMovePosition !== e.activeLabel) {
        this.setState({ mouseMovePosition: e.activeLabel, mouseZoomLocation: e.chartX });
      }
    }
  }

  data = () => this.props.entireTimelineData;

  renderLoading = () => (
    <p>we are loading the data</p>
  )

  renderTimeline = () => (
    <ResponsiveContainer width="100%" height="100%" >
      <AreaChartImpl
        data={this.data()}
        margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
        onMouseMove={this.recordMouseMove}
      >
        <defs>
          <linearGradient id="colorGrey" x1="0" y1="0" x2="0" y2="1">
            <stop offset="15%" stopColor="#757575" stopOpacity={0.8} />
            <stop offset="99%" stopColor="#757575" stopOpacity={0.2} />
          </linearGradient>
          <linearGradient id="colorRed" x1="0" y1="0" x2="0" y2="1">
            <stop offset="15%" stopColor="#283593" stopOpacity={0.8} />
            <stop offset="99%" stopColor="#283593" stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <XAxis dataKey="init_fda_dt" />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip
          animationDuration={0}
        />
        <Area
          type="monotone"
          dataKey="serious"
          stroke="#1A237E"
          fillOpacity={1}
          stackId="1"
          fill="url(#colorRed)"
          animationDuration={700}
          connectNulls={false}
        />
        <Area
          type="monotone"
          dataKey="not_serious"
          stroke="#424242"
          fillOpacity={1}
          stackId="1"
          fill="url(#colorGrey)"
          animationDuration={700}
          connectNulls={false}
        />
        <BrushImpl
          dataKey="init_fda_dt"
          stroke="#8884d8"
          height={1}
          travellerWidth={10}
          startIndex={this.data().length - 30}
          endIndex={this.data().length - 1}
          getmouseZoomLocation={this.getmouseZoomLocation}
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
  )

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
        {(this.data().length > 1) ? this.renderTimeline() : this.renderLoading()}
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
