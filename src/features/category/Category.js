import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCategory } from '../../actions';

import ListItem from './components/listItem';

class Category extends Component {
  componentDidMount() {
    const { params } = this.props.match;
    setTimeout(() => {
      this.props.getCategory(params.category);
    });
  }

  renderPosts = () => {
    const { postsOfCurrentCategory } = this.props;
    return (
      <div>
        {postsOfCurrentCategory.map(post => {
          return (
            <Link
              to={{
                pathname: `/postDetail/${post.get('id')}`,
                state: { post: post },
              }}
            >
              <ListItem post={post} key={post.get('id')} />
            </Link>
          );
        })}
      </div>
    );
  };

  render() {
    return (
      <div>
        <h1>Category {this.props.match.params.category}</h1>
        <Link to={`/createPost/${this.props.match.params.category}`}>
          Add post
        </Link>
        {this.renderPosts()}
      </div>
    );
  }
}

function mapStateToProps({ categories, posts }) {
  return {
    currentCategory: categories.get('currentCategory'),
    postsOfCurrentCategory: posts.get('postsOfCurrentCategory'),
  };
}

export default connect(mapStateToProps, {
  getCategory,
})(Category);
