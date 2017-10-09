import React from 'react';
import { Route } from 'react-router-dom';

import './App.css';
import Category from './features/category';
import Main from './features/main';
import CreatePost from './features/createPost';
import PostDetail from './features/postDetail';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Route path={'/'} exact render={() => <Main />} />
        <Route
          path={'/:category'}
          exact
          render={props => <Category {...props} />}
        />
        <Route path={'/postDetail'} exact render={() => <PostDetail />} />
        <Route path={'/createPost'} exact render={() => <CreatePost />} />
      </div>
    );
  }
}

export default App;
