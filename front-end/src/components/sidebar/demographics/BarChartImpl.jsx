import React from 'react';
import { BarChart } from 'recharts';
import _ from 'lodash';


class BarChartImpl extends BarChart {
  constructor(props) {
    super(props);
    // console.log(handleClick);
    // this.setState({
    //   handleClick,
    // });
    // handleClick = (e) => {
    //   const { onClick } = this.props;
    //   console.log(e)
    //   console.log("asdasdas")

    //   // if (_.isFunction(onClick)) {
    //   //   const mouse = this.getMouseInfo(e);

    //   //   onClick(mouse, e);
    //   // }
    // };
  }

  componentDidMount() {
    // console.log(this.handleClick);
    // this.getCursorRectangle();
    // this.getCursorRectangle() {
    //   const { layout } = this.props;
    //   const { activeCoordinate, offset, tooltipAxisBandSize } = this.state;
    //   const halfSize = tooltipAxisBandSize / 2;

    //   return {
    //     stroke: 'none',
    //     fill: '#ccc',
    //     x: layout === 'horizontal' ? activeCoordinate.x - halfSize : offset.left + 0.5,
    //     y: layout === 'horizontal' ? offset.top + 0.5 : activeCoordinate.y - halfSize,
    //     width: layout === 'horizontal' ? tooltipAxisBandSize : offset.width - 1,
    //     height: layout === 'horizontal' ? offset.height - 1 : tooltipAxisBandSize,
    //   };
    // }
  }

  handleClick = (e) => {    
    const { BarChart } = this.props;
    console.log(e)
    console.log("asdasdas")

    // if (_.isFunction(onClick)) {
    //   const mouse = this.getMouseInfo(e);

    //   onClick(mouse, e);
    // }
  };
}

export default BarChartImpl;
