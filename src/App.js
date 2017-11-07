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
          path={'/category/:category'}
          render={props => <Category {...props} />}
        />
        <Route path={'/postDetail'} render={() => <PostDetail />} />
        <Route
          path={'/createPost/'}
          render={props => <CreatePost {...props} />}
        />
        <Route
          path={'/createPost/:category'}
          render={props => <CreatePost {...props} />}
        />
        <Route
          path={'/postDetail/:post'}
          render={props => <PostDetail {...props} />}
        />
      </div>
    );
  }
}

export default App;
