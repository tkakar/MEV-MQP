import React from 'react';
import VisualizationContainer from './VisualizationContainer';
import SideBarContainer from './SideBarContainer';
import TimelineContainer from './TimelineContainer';
import './App.css';


export default function App() {
  return (
    <div className="App">
      <SideBarContainer />
      <VisualizationContainer />
      <TimelineContainer />
    </div>
  );
}
