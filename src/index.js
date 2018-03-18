import React from 'react';
import ReactDOM from 'react-dom';
import Bookmarks from './components/Bookmarks';
import MainView from './components/MainView';
import 'material-components-web/dist/material-components-web.css';

function App() {
  return (
    <div className="App">
      <Bookmarks
        folder="_Swift"
        render={({ bookmarks }, folder) => (
          <MainView bookmarks={bookmarks} folder={folder} />
        )}
      />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
