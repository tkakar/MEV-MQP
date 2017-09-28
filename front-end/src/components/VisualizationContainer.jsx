import React, { Component } from 'react';
import StackedBarVisualization from './visualizations/StackedBarVisualization';

class VisualizationContainer extends Component {
  static visualizationPreference = 'STACKED_BAR';

  renderVisualization = () => {
    switch (this.visualizationPreference) {
      case 'STACKED_BAR':
        return (
          <StackedBarVisualization />
        );
      default:
        return (
          <StackedBarVisualization />
        );
    }
  }

  render = () => (
    <div id="main-visualization-container" className="col-xs-10 card card-outline-primary" >
      {this.renderVisualization()}
    </div>
  )
}

export default VisualizationContainer;

