import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { getAllCategories, getCategory } from '../../dux/categories';
import { getAllPosts, postVote } from '../../dux/posts';
import { formatDate } from '../../utils/numbers';
import NavigationMenu from '../../components/navigationMenu';

class Main extends Component {
  componentDidMount() {
    const { getAllCategories, getAllPosts, getCategory } = this.props;
    setTimeout(() => {
      getAllCategories();
      getAllPosts();
      getCategory(null);
    });
  }

  render() {
    const { allCategories } = this.props;

    const data = this.props.allPosts.toJS();

    const columns = [
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Author',
        accessor: 'author',
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
        Header: 'UP',
        accessor: 'id',
        Cell: props => {
          <span className="number">
            <Link
              to={{
                pathname: `/editPost/`,
              }}
            >
              <Button bsStyle="primary">Edit Post</Button>
            </Link>
            );
          </span>;
        },
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
        <NavigationMenu />
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
