import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllCategories } from '../../actions';

class Category extends Component {
  componentDidMount() {
    const { getAllCategories } = this.props;
    setTimeout(() => {
      getAllCategories();
    });
  }

  renderCategories = () => {
    return this.props.allCategories.map((category, index) => {
      return <p key={index}>{category.get('name')}</p>;
    });
  };

  render() {
    const { allCategories } = this.props;
    if (allCategories.size === 0) {
      return <h1>Loading...</h1>;
    }

    return (
      <div>
        <h1>Category Componentss</h1>
        {this.renderCategories()}
      </div>
    );
  }
}

function mapStateToProps({ categories }) {
  return {
    allCategories: categories.get('allCategories'),
  };
}

export default connect(mapStateToProps, {
  getAllCategories,
})(Category);
