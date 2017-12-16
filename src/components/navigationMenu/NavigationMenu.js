import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { setCurrentCategory } from '../../dux/categories';

class NavigationMenu extends Component {
  renderCategories = () => {
    return this.props.allCategories.map((category, index) => {
      if (this.props.category) {
        return (
          <div key={index}>
            <Link to={`${category.get('path')}`}>
              <Button
                bsStyle="primary"
                onClick={() =>
                  this.props.setCurrentCategory(category.get('name'))}
              >
                hey {category.get('name')}
              </Button>
            </Link>

            <br />
          </div>
        );
      }

      return (
        <div key={index}>
          <Link to={`category/${category.get('path')}`}>
            <Button
              bsStyle="primary"
              onClick={() =>
                this.props.setCurrentCategory(category.get('name'))}
            >
              hey {category.get('name')}
            </Button>
          </Link>
          <br />
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        <p>Menu</p>
        <Link
          to={`/createPost/${this.props.category ? this.props.category : ''}`}
        >
          <Button bsStyle="primary">Create new post</Button>
        </Link>
        <h3>Categories</h3>
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
  setCurrentCategory,
})(NavigationMenu);
