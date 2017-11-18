import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

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

  formatDate = timestamp => {
    return moment(new Date(timestamp)).format('MMM Do YY');
  };

  render() {
    const { allCategories, allPosts } = this.props;

    const posts = this.props.allPosts
      .sortBy(item => item.get('voteScore'))
      .reverse()
      .toJS();

    if (allCategories.size === 0) {
      return <h1>Loading...</h1>;
    }

    const data = this.props.allPosts.toJS();

    const columns = [
      {
        Header: 'Title',
        accessor: 'title', // String-based value accessors!
      },
      {
        Header: 'Author',
        accessor: 'author',
      },
      {
        Header: 'Category',
        accessor: 'category',
      },
      {
        Header: 'Vote',
        accessor: 'voteScore',
      },
      {
        Header: 'Created',
        accessor: 'timestamp',
        Cell: props => (
          <span className="number">{this.formatDate(props.value)}</span>
        ),
      },
      {
        Header: '',
        accessor: '',
        Cell: props => (
          <Link to={'/createPost/'}>
            <Button bsStyle="primary">GO</Button>
          </Link>
        ),
      },
    ];

    return (
      <div>
        <Link to={'/createPost/'}>
          <Button bsStyle="primary">Create new post</Button>
        </Link>
        <ReactTable data={data} columns={columns} />

        <h3>Categories</h3>
        {this.renderCategories()}
        <h3>Votes</h3>
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
