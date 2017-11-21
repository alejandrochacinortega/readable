import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCategory } from '../../dux/categories';
import { Button } from 'react-bootstrap';

import ListItem from './components/listItem';
import { formatDate } from '../../utils/numbers';
import { getCommentsByPost } from '../../dux/comments';
import { postVote, getAllPostsOfCurrentCategory } from '../../dux/posts';

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
    const { postsOfCurrentCategory } = this.props;

    if (postsOfCurrentCategory.size === 0) {
      return <h1>No post for this category ...</h1>;
    }

    const data = postsOfCurrentCategory.toJS();
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
              onClick={() => this.props.postVote(props.value, 'upVote')}
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
              onClick={() => this.props.postVote(props.value, 'downVote')}
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

    return (
      <div>
        <Link to={`/createPost/${this.props.match.params.category}`}>
          Add post
        </Link>
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
    currentCategory: categories.get('currentCategory'),
    postsOfCurrentCategory: posts.get('postsOfCurrentCategory'),
  };
}

export default connect(mapStateToProps, {
  getCategory,
  getCommentsByPost,
  postVote,
  getAllPostsOfCurrentCategory,
})(Category);
