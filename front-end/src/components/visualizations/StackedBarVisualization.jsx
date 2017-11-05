import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Treemap, Tooltip } from 'recharts';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import CustomizedContent from './CustomizedContent';
import styles from './StackedBarVisualizationStyles';

class StackedBarVisualization extends Component {
  static propTypes = {
    classes: PropTypes.shape({
      mainVisualization: PropTypes.string,
      treemapVisualization: PropTypes.string,
      treePaper: PropTypes.string,
    }).isRequired,
  }

  static defaultProps = {
    data: '',
    meType: '',
    products: '',
    stage: '',
    cause: '',
  }

  constructor(props) {
    super(props);
    this.state = {
      mainWidth: 1,
      treeMapHeight: 155,
    };

    let stillResizingTimer;
    window.addEventListener('resize', () => {
      clearTimeout(stillResizingTimer);
      stillResizingTimer = setTimeout(this.resizeTreeMap, 250);
    });
  }

  componentDidMount() {
    this.resizeTreeMap();
  }

  getRandomInt = (min, max) =>
    (Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.ceil(min));

  resizeTreeMap = () => {
    const firstTreeMap = document.getElementById('firstTreeMap');
    const firstTreeMapHeight = window.getComputedStyle(firstTreeMap, null).getPropertyValue('height');
    this.setState({ treeMapHeight: parseInt(firstTreeMapHeight, 10) - 10 });
    this.setState({ mainWidth: document.getElementById('main-visualization').getBoundingClientRect().width - 20 });
  }
  meType = () => ([
    { name: '', size: this.getRandomInt(10, 1000) },
  ]);
  products = () => ([
    { name: '', size: this.getRandomInt(10, 1000) },
  ]);
  stage = () => ([
    { name: '', size: this.getRandomInt(10, 1000) },
  ]);
  cause = () => ([
    { name: '', size: this.getRandomInt(10, 1000) },
  ]);
  data = () => ([
    {
      name: 'temp1',
      children: [
        { name: 'Axes', size: this.getRandomInt(10, 4000) },
        { name: 'Axis', size: this.getRandomInt(10, 4000) },
        { name: 'CartesianAxes', size: this.getRandomInt(10, 4000) },
      ],
    },
    {
      name: 'temp2',
      children: [
        { name: 'AnchorControl', size: this.getRandomInt(10, 1500) },
        { name: 'ClickControl', size: this.getRandomInt(10, 1500) },
        { name: 'SelectionControl', size: this.getRandomInt(10, 1500) },
        { name: 'TooltipControl', size: this.getRandomInt(10, 1500) },
      ],
    },
    {
      name: 'temp3',
      children: [
        { name: 'Data', size: this.getRandomInt(10, 1000) },
        { name: 'NodeSprite', size: this.getRandomInt(10, 1000) },
        {
          name: 'render',
          children: [
            { name: 'ArrowType', size: this.getRandomInt(10, 1000) },
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
            { name: 'SizeEncoder', size: this.getRandomInt(10, 1000) },
          ],
        },
        {
          name: 'layout',
          children: [
            { name: 'AxisLayout', size: this.getRandomInt(10, 100) },
          ],
        },
        { name: 'Operator', size: this.getRandomInt(10, 1000) },
        { name: 'OperatorList', size: this.getRandomInt(10, 1000) },
        { name: 'SortOperator', size: this.getRandomInt(10, 1000) },
      ],
    },
  ]);

  COLORS = (['#d53e4f', '#f0027f', '#fbb4ae', '#beaed4', '#67a9cf', '#3288bd']);


  render = () =>  (
    <div>
      {this.props.meType}
    </div>
  )
//   render = () => (
//     <div className={this.props.classes.mainVisualization} id="main-visualization" >
//       <div className={this.props.classes.treemapVisualization} id="firstTreeMap" >
//         <div className={this.props.classes.treePaper} >
//           <defs>
//             <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="15%" stopColor="#283593" stopOpacity={0.8} />
//               <stop offset="99%" stopColor="#283593" stopOpacity={0.4} />
//             </linearGradient>
//           </defs>
//           <Paper elevation={16}>
//             <Treemap
//               width={this.state.mainWidth}
//               height={this.state.treeMapHeight}
//               data={this.data()}
//               dataKey="size"
//               ratio={4 / 3}
//               stroke="#ddd"
//               fill="url(#colorBlue)"
//               isAnimationActive={false}
//               animationDuration={0}
//             >
//               <Tooltip
//                 isAnimationActive={false}
//               />
//             </Treemap>
//           </Paper>
//         </div>
//       </div>
//       <div className={this.props.classes.treemapVisualization}>
//         <div className={this.props.classes.treePaper}>
//           <Paper elevation={16}>
//             <Treemap
//               width={this.state.mainWidth}
//               height={this.state.treeMapHeight}
//               data={this.data()}
//               dataKey="size"
//               ratio={4 / 3}
//               stroke="#ddd"
//               fill="url(#colorBlue)"
//               isAnimationActive={false}
//               animationDuration={0}
//             >
//               <Tooltip
//                 isAnimationActive={false}
//               />
//             </Treemap>
//           </Paper>
//         </div>
//       </div>
//       <div className={this.props.classes.treemapVisualization}>
//         <div className={this.props.classes.treePaper}>
//           <Paper elevation={16}>
//             <Treemap
//               width={this.state.mainWidth}
//               height={this.state.treeMapHeight}
//               data={this.data()}
//               dataKey="size"
//               ratio={4 / 3}
//               stroke="#ddd"
//               fill="url(#colorBlue)"
//               isAnimationActive={false}
//               animationDuration={0}
//             >
//               <Tooltip
//                 isAnimationActive={false}
//               />
//             </Treemap>
//           </Paper>
//         </div>
//       </div>
//       <div className={this.props.classes.treemapVisualization}>
//         <div className={this.props.classes.treePaper}>
//           <Paper elevation={16}>
//             <Treemap
//               width={this.state.mainWidth}
//               height={this.state.treeMapHeight}
//               data={this.data()}
//               dataKey="size"
//               ratio={4 / 3}
//               stroke="#ddd"
//               fill="url(#colorBlue)"
//               isAnimationActive={false}
//               animationDuration={0}
//             >
//               <Tooltip
//                 isAnimationActive={false}
//               />
//             </Treemap>
//           </Paper>
//         </div>
//       </div>
//     </div>
//   )
// }

const mapStateToProps = state => ({
  meType: state.meType,
  stage: state.stage,
  cause: state.cause,
});

export default connect(
  mapStateToProps,
  null,
)(withStyles(styles)(StackedBarVisualization));
