import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { getAllCategories, getCategory } from '../../dux/categories';
import { getAllPosts, postVote } from '../../dux/posts';
import { formatDate } from '../../utils/numbers';

class Main extends Component {
  componentDidMount() {
    const { getAllCategories, getAllPosts, getCategory } = this.props;
    setTimeout(() => {
      getAllCategories();
      getAllPosts();
      getCategory(null);
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
    const { allCategories, allPosts } = this.props;

    const posts = this.props.allPosts
      .sortBy(item => item.get('voteScore'))
      .reverse()
      .toJS();

    const data = this.props.allPosts.toJS();

    const columns = [
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Body',
        accessor: 'body',
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
        Header: 'UP',
        accessor: 'id',
        Cell: props => (
          <span className="number">
            <Button
              bsStyle="primary"
              onClick={() => this.props.postVote(props.original, 'upVote')}
            >
              UP
            </Button>
          </span>
        ),
      },
      {
        Header: 'DOWN',
        accessor: 'id',
        Cell: props => (
          <span className="number">
            <Button
              bsStyle="primary"
              onClick={() => this.props.postVote(props.original, 'downVote')}
            >
              DOWN
            </Button>
          </span>
        ),
      },
      {
        Header: 'Created',
        accessor: 'timestamp',
        Cell: props => (
          <span className="number">{formatDate(props.value)}</span>
        ),
      },
      {
        Header: '',
        accessor: '',
        Cell: props => (
          <Link
            to={{
              pathname: `/postDetail/${props.original.id}`,
              state: { post: props.original },
            }}
          >
            <Button bsStyle="primary">GO</Button>
          </Link>
        ),
      },
    ];

    if (allCategories.size === 0) {
      return <h1>Loading...</h1>;
    }

    return (
      <div>
        <Link to={'/createPost/'}>
          <Button bsStyle="primary">Create new post</Button>
        </Link>
        <h3>Categories</h3>
        {this.renderCategories()}
        <ReactTable
          data={data}
          columns={columns}
          defaultPageSize={20}
          minRows={2}
        />
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
  getCategory,
  postVote,
})(Main);
