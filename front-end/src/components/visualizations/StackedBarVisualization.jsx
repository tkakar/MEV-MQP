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
    meType: [{ name: 'meType', size: 1 }],
    products: [{ name: 'products', size: 1 }],
    stage: [{ name: 'stage', size: 1 }],
    cause: [{ name: 'cause', size: 1 }],
  }

  constructor(props) {
    super(props);
    this.state = {
      mainWidth: 1,
      treeMapHeight: 155,
    };

    //let stillResizingTimer;
    //window.addEventListener('resize', () => {
      //clearTimeout(stillResizingTimer);
      //stillResizingTimer = setTimeout(this.resizeTreeMap, 250);
    //});
  }

  //componentDidMount() {
    // this.resizeTreeMap();
  //}

  getRandomInt = (min, max) =>
    (Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.ceil(min));

  resizeTreeMap = () => {
    const firstTreeMap = document.getElementById('firstTreeMap');
    const firstTreeMapHeight = window.getComputedStyle(firstTreeMap, null).getPropertyValue('height');
    this.setState({ treeMapHeight: parseInt(firstTreeMapHeight, 10) - 10 });
    this.setState({ mainWidth: document.getElementById('main-visualization').getBoundingClientRect().width - 20 });
  }

  COLORS = (['#d53e4f', '#f0027f', '#fbb4ae', '#beaed4', '#67a9cf', '#3288bd']);

  render = () => (
    <div className={this.props.classes.mainVisualization} id="main-visualization" >
      <div className={this.props.classes.treemapVisualization}>
        <div className={this.props.classes.treePaper}>
          <Paper elevation={16}>
            <Treemap
              width={700}
              height={100}
              data={this.props.meType}
              dataKey="size"
              ratio={4 / 3}
              stroke="#ddd"
              fill="url(#colorBlue)"
              isAnimationActive={false}
              animationDuration={0}
            >
              <Tooltip
                isAnimationActive={false}
              />
            </Treemap>
          </Paper>
        </div>
      </div>
      {console.log(this.props.meType)}
      <div className={this.props.classes.treemapVisualization}>
        <div className={this.props.classes.treePaper}>
          <Paper elevation={16}>
            <Treemap
              width={700}
              height={100}
              data={this.props.stage}
              dataKey="size"
              ratio={4 / 3}
              stroke="#ddd"
              fill="url(#colorBlue)"
              isAnimationActive={false}
              animationDuration={0}
            >
              <Tooltip
                isAnimationActive={false}
              />
            </Treemap>
          </Paper>
        </div>
      </div>
      <div className={this.props.classes.treemapVisualization}>
        <div className={this.props.classes.treePaper}>
          <Paper elevation={16}>
            <Treemap
              width={700}
              height={100}
              data={this.props.cause}
              dataKey="size"
              ratio={4 / 3}
              stroke="#ddd"
              fill="url(#colorBlue)"
              isAnimationActive={false}
              animationDuration={0}
            >
              <Tooltip
                isAnimationActive={false}
              />
            </Treemap>
          </Paper>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  meType: state.mainVisualization.meType,
  stage: state.mainVisualization.stage,
  cause: state.mainVisualization.cause,
});

export default connect(
  mapStateToProps,
  null,
)(withStyles(styles)(StackedBarVisualization));
