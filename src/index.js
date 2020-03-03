import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/MainView';

function App() {
  return (
    <div className="App">
      <MainView folder="_Swift" />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
