// In src/App.js
import React from 'react';
import Header from './components/Header';
import AlgorithmSelector from './components/AlgorithmSelector';
import Visualizer from './components/Visualizer';
import Controls from './components/Controls';

function App() {
  return (
    <div className="App">
      <Header />
      <AlgorithmSelector />
      <Visualizer />
      <Controls />
    </div>
  );
}

export default App;
