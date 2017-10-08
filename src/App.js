import React from 'react';
import { Route } from 'react-router-dom';

import './App.css';
import Category from './features/category';
import Main from './features/main';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Route path={'/'} exact render={() => <Main />} />
        <Route path={'/category'} exact render={() => <Category />} />
      </div>
    );
  }
}

export default App;
