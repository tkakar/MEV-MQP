import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormGroup, InputGroup, FormControl } from 'react-bootstrap';
import { setSelectedTime } from '../../actions/timelineActions';
import './Timeline.css';
import { VictoryAxis, VictoryBrushContainer, VictoryLine, VictoryChart } from 'victory';

class SideBar extends Component {
  static propTypes = {
    setSelectedTime: PropTypes.func.isRequired,
  }
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    document.getElementById('timeline-chart').addEventListener('mouseup', (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
    }, true);
  }

  handleZoom(domain) {
    this.setState({selectedDomain: domain});
  }

  handleBrush(domain) {
    this.setState({zoomDomain: domain});
  }

  updateSelectedDate = () => {
    const startDate = document.getElementById('start_date').value;
    const endDate = document.getElementById('end_date').value;
    this.props.setSelectedTime({
      startDate,
      endDate,
    });
  };

  chartStyle = { parent: {minWidth: "100%", marginLeft: "10%"}};    
  
  render = () => (
    <div>
      <div id="timeline" >
        <button className="btn btn-outline-secondary" onClick={this.updateSelectedDate}>Set Date!</button>
        <FormGroup>
          <InputGroup>
            <FormControl type="text" placeholder="Start Date" id="start_date" defaultValue="20160329" />
            <InputGroup.Addon>To</InputGroup.Addon>
            <FormControl type="text" placeholder="End Date" id="end_date" defaultValue="20160512" />
          </InputGroup>
        </FormGroup>
      </div>
      <div id="timeline-chart">
        <VictoryChart
          padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
          width={800} height={100} scale={{ x: "time" }}
          containerComponent={
            <VictoryBrushContainer responsive={false}
              brushDomain={this.state.zoomDomain}
              brushDimension="x"
              onBrushDomainChange={this.handleZoom.bind(this)}
            />
          }
        >
          <VictoryAxis
            tickValues={[
              new Date(1985, 1, 1),
              new Date(1990, 1, 1),
              new Date(1995, 1, 1),
              new Date(2000, 1, 1),
              new Date(2005, 1, 1),
              new Date(2010, 1, 1)
            ]}
            tickFormat={(x) => new Date(x).getFullYear()}
          />
          <VictoryLine
            style={{
              data: { stroke: "tomato" }
            }}
            data={[
              { x: new Date(1982, 1, 1), y: 125 },
              { x: new Date(1987, 1, 1), y: 257 },
              { x: new Date(1993, 1, 1), y: 345 },
              { x: new Date(1997, 1, 1), y: 515 },
              { x: new Date(2001, 1, 1), y: 132 },
              { x: new Date(2005, 1, 1), y: 305 },
              { x: new Date(2011, 1, 1), y: 270 },
              { x: new Date(2015, 1, 1), y: 470 }
            ]}
          />

        </VictoryChart>
      </div>
    </div>
  )
}

export default connect(
  null,
  { setSelectedTime },
)(SideBar);
