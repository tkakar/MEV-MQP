import React, { Component } from 'react';
import StackedBarVisualization from './visualizations/StackedBarVisualization';

class VisualizationContainer extends Component {
  visualizationPreference = 'STACKED_BAR';

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
    <div>
      {this.renderVisualization()}
    </div>
  )
}

export default VisualizationContainer;

