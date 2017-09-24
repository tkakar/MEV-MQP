import React from 'react';
import './App.css';
import VisualizationContainer from './VisualizationContainer';
import SideBarContainer from './SideBarContainer';


export default function App() {
  return (
    <div className="App">
      <SideBarContainer />
      <VisualizationContainer />
    </div>
  );
}
