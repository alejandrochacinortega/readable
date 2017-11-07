import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllCategories } from '../../actions';
import { getAllPosts } from '../../dux/posts';

class Main extends Component {
  componentDidMount() {
    const { getAllCategories, getAllPosts } = this.props;
    setTimeout(() => {
      getAllCategories();
      getAllPosts();
    });
  }

  renderCategories = () => {
    return this.props.allCategories.map((category, index) => {
      return (
        <div key={index}>
          <Link to={`category/${category.get('path')}`}>
            {category.get('name')}
          </Link>
          <br />
        </div>
      );
    });
  };

  renderPosts = () => {
    // Fix link to posts details
    console.log('====================================');
    console.log(this.props.allPosts.toJS());
    console.log('====================================');
    return this.props.allPosts
      .sortBy(item => item.get('voteScore'))
      .reverse()
      .map((post, index) => {
        return (
          <div key={index}>
            <Link to={`category/${post.get('path')}`}>
              {post.get('title')} - votes:
              {post.get('voteScore')}
            </Link>
            <br />
          </div>
        );
      });
  };

  render() {
    const { allCategories, allPosts } = this.props;
    if (allCategories.size === 0) {
      return <h1>Loading...</h1>;
    }

    return (
      <div>
        <h1>Test Componentss</h1>
        <Link to={'/createPost'}>Create new post</Link>
        {this.renderCategories()}
        ///////////////
        {this.renderPosts()}
      </div>
    );
  }
}

function mapStateToProps({ categories, posts }) {
  return {
    allCategories: categories.get('allCategories'),
    allPosts: posts.get('allPosts'),
  };
}

export default connect(mapStateToProps, {
  getAllCategories,
  getAllPosts,
})(Main);
