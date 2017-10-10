import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategory } from '../../actions';

class Category extends Component {
  componentDidMount() {
    const { params } = this.props.match;
    setTimeout(() => {
      this.props.getCategory(params.category);
    });
  }

  render() {
    return (
      <div>
        <h1>Category {this.props.match.params.category}</h1>
        <p>{JSON.stringify(this.props.postsOfCurrentCategory)}</p>
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
