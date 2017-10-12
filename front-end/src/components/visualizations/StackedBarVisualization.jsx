import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Treemap, Tooltip } from 'recharts';
import './StackedBarVisualization.css';
import CustomizedContent from './CustomizedContent';

class StackedBarVisualization extends Component {
  static propTypes = {
    things: PropTypes.string,
  }

  static defaultProps = {
    things: '',
  }

  getRandomInt = (min, max) =>
    (Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.ceil(min));

  data = () => ([
    {
      name: 'temp1',
      children: [
        { name: 'Axes', size: this.getRandomInt(10, 4000) },
        { name: 'Axis', size: this.getRandomInt(10, 4000) },
        { name: 'AxisGridLine', size: this.getRandomInt(10, 4000) },
        { name: 'AxisLabel', size: this.getRandomInt(10, 4000) },
        { name: 'CartesianAxes', size: this.getRandomInt(10, 4000) },
      ],
    },
    {
      name: 'temp2',
      children: [
        { name: 'AnchorControl', size: this.getRandomInt(10, 1500) },
        { name: 'ClickControl', size: this.getRandomInt(10, 1500) },
        { name: 'Control', size: this.getRandomInt(10, 1500) },
        { name: 'ControlList', size: this.getRandomInt(10, 1500) },
        { name: 'DragControl', size: this.getRandomInt(10, 1500) },
        { name: 'ExpandControl', size: this.getRandomInt(10, 1500) },
        { name: 'HoverControl', size: this.getRandomInt(10, 1500) },
        { name: 'IControl', size: this.getRandomInt(10, 1500) },
        { name: 'PanZoomControl', size: this.getRandomInt(10, 1500) },
        { name: 'SelectionControl', size: this.getRandomInt(10, 1500) },
        { name: 'TooltipControl', size: this.getRandomInt(10, 1500) },
      ],
    },
    {
      name: 'temp3',
      children: [
        { name: 'Data', size: this.getRandomInt(10, 1000) },
        { name: 'DataList', size: this.getRandomInt(10, 1000) },
        { name: 'DataSprite', size: this.getRandomInt(10, 1000) },
        { name: 'EdgeSprite', size: this.getRandomInt(10, 1000) },
        { name: 'NodeSprite', size: this.getRandomInt(10, 1000) },
        {
          name: 'render',
          children: [
            { name: 'ArrowType', size: this.getRandomInt(10, 1000) },
            { name: 'EdgeRenderer', size: this.getRandomInt(10, 1000) },
            { name: 'IRenderer', size: this.getRandomInt(10, 1000) },
            { name: 'ShapeRenderer', size: this.getRandomInt(10, 1000) },
          ],
        },
        { name: 'ScaleBinding', size: this.getRandomInt(10, 1000) },
        { name: 'Tree', size: this.getRandomInt(10, 1000) },
        { name: 'TreeBuilder', size: this.getRandomInt(10, 1000) },
      ],
    },
    {
      name: 'temp4',
      children: [
        { name: 'DataEvent', size: this.getRandomInt(10, 1000) },
        { name: 'SelectionEvent', size: this.getRandomInt(10, 1000) },
        { name: 'TooltipEvent', size: this.getRandomInt(10, 1000) },
        { name: 'VisualizationEvent', size: this.getRandomInt(10, 1000) },
      ],
    },
    {
      name: 'temp5',
      children: [
        { name: 'Legend', size: this.getRandomInt(10, 5000) },
        { name: 'LegendItem', size: this.getRandomInt(10, 5000) },
        { name: 'LegendRange', size: this.getRandomInt(10, 5000) },
      ],
    },
    {
      name: 'temp6',
      children: [
        {
          name: 'distortion',
          children: [
            { name: 'BifocalDistortion', size: this.getRandomInt(10, 1000) },
            { name: 'Distortion', size: this.getRandomInt(10, 1000) },
            { name: 'FisheyeDistortion', size: this.getRandomInt(10, 1000) },
          ],
        },
        {
          name: 'encoder',
          children: [
            { name: 'ColorEncoder', size: this.getRandomInt(10, 1000) },
            { name: 'Encoder', size: this.getRandomInt(10, 1000) },
            { name: 'PropertyEncoder', size: this.getRandomInt(10, 1000) },
            { name: 'ShapeEncoder', size: this.getRandomInt(10, 1000) },
            { name: 'SizeEncoder', size: this.getRandomInt(10, 1000) },
          ],
        },
        {
          name: 'filter',
          children: [
            { name: 'FisheyeTreeFilter', size: this.getRandomInt(10, 1000) },
            { name: 'GraphDistanceFilter', size: this.getRandomInt(10, 1000) },
            { name: 'VisibilityFilter', size: this.getRandomInt(10, 1000) },
          ],
        },
        { name: 'IOperator', size: this.getRandomInt(10, 1000) },
        {
          name: 'label',
          children: [
            { name: 'Labeler', size: this.getRandomInt(10, 1000) },
            { name: 'RadialLabeler', size: this.getRandomInt(10, 1000) },
            { name: 'StackedAreaLabeler', size: this.getRandomInt(10, 1000) },
          ],
        },
        {
          name: 'layout',
          children: [
            { name: 'AxisLayout', size: this.getRandomInt(10, 100) },
            { name: 'BundledEdgeRouter', size: this.getRandomInt(10, 100) },
            { name: 'CircleLayout', size: this.getRandomInt(10, 100) },
            { name: 'CirclePackingLayout', size: this.getRandomInt(10, 100) },
            { name: 'DendrogramLayout', size: this.getRandomInt(10, 100) },
            { name: 'ForceDirectedLayout', size: this.getRandomInt(10, 100) },
            { name: 'IcicleTreeLayout', size: this.getRandomInt(10, 100) },
            { name: 'IndentedTreeLayout', size: this.getRandomInt(10, 100) },
            { name: 'Layout', size: this.getRandomInt(10, 100) },
            { name: 'NodeLinkTreeLayout', size: this.getRandomInt(10, 100) },
            { name: 'PieLayout', size: this.getRandomInt(10, 100) },
            { name: 'RadialTreeLayout', size: this.getRandomInt(10, 100) },
            { name: 'RandomLayout', size: this.getRandomInt(10, 100) },
            { name: 'StackedAreaLayout', size: this.getRandomInt(10, 100) },
            { name: 'TreeMapLayout', size: this.getRandomInt(10, 100) },
          ],
        },
        { name: 'Operator', size: this.getRandomInt(10, 1000) },
        { name: 'OperatorList', size: this.getRandomInt(10, 1000) },
        { name: 'OperatorSequence', size: this.getRandomInt(10, 1000) },
        { name: 'OperatorSwitch', size: this.getRandomInt(10, 1000) },
        { name: 'SortOperator', size: this.getRandomInt(10, 1000) },
      ],
    },
  ]);

  COLORS = (['#d53e4f', '#f0027f', '#fbb4ae', '#beaed4', '#67a9cf', '#3288bd']);

  render = () => (
    <div id="main-visualization">
      <div id="treemap-visualization">
        <Treemap
          width={1500}
          height={155}
          data={this.data()}
          dataKey="size"
          ratio={4 / 3}
          stroke="#fff"
          fill="#8884d8"
          content={<CustomizedContent colors={this.COLORS} />}
        >
          <Tooltip />
        </Treemap>
      </div>
      <div id="treemap-visualization">
        <Treemap
          width={1500}
          height={155}
          data={this.data()}
          dataKey="size"
          ratio={4 / 3}
          stroke="#fff"
          fill="#8884d8"
          content={<CustomizedContent colors={this.COLORS} />}
        >
          <Tooltip />
        </Treemap>
      </div><div id="treemap-visualization">
        <Treemap
          width={1500}
          height={155}
          data={this.data()}
          dataKey="size"
          ratio={4 / 3}
          stroke="#fff"
          fill="#8884d8"
          content={<CustomizedContent colors={this.COLORS} />}
        >
          <Tooltip />
        </Treemap>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  things: state.data.things,
});

export default connect(
  mapStateToProps,
  null,
)(StackedBarVisualization);
