import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/MainView';
// import 'material-components-web/dist/material-components-web.css';

function App() {
  return (
    <div className="App">
      <MainView folder="_Swift" />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
