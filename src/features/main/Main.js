import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllCategories } from '../../actions';

class Main extends Component {
  componentDidMount() {
    const { getAllCategories } = this.props;
    setTimeout(() => {
      getAllCategories();
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

  render() {
    const { allCategories } = this.props;
    if (allCategories.size === 0) {
      return <h1>Loading...</h1>;
    }

    return (
      <div>
        <h1>Test Componentss</h1>
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
})(Main);
