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
import {
  postVote,
  getAllPostsOfCurrentCategory,
  deletePost,
  setCurrentPost,
} from '../../dux/posts';
import NavigationMenu from '../../components/navigationMenu';

class Category extends Component {
  componentDidMount() {
    const { params } = this.props.match;
    setTimeout(() => {
      this.props.getCategory(params.category);
    });
  }

  deletePost = post => {
    this.props.deletePost(post.id, () => {
      alert(`Post ${post.title} deleted.`);
    });
  };

  editPost = post => {
    this.props.setCurrentPost(post);
  };

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
      return (
        <div>
          <NavigationMenu category={this.props.match.params.category} />
          <h1>No post for this category ...</h1>
        </div>
      );
    }

    const data = postsOfCurrentCategory.toJS();
    console.log('currentCategory ', this.props.currentCategory);
    console.log('DATA ', data);
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
      {
        Header: '',
        accessor: '',
        Cell: props => (
          <Link
            to={{
              pathname: `/editPost/`,
            }}
          >
            <Button
              bsStyle="primary"
              onClick={() => this.editPost(props.original)}
            >
              Edit Post
            </Button>
          </Link>
        ),
      },
      {
        Header: '',
        accessor: '',
        Cell: props => (
          <Button
            bsStyle="danger"
            onClick={() => this.deletePost(props.original)}
          >
            Delete post
          </Button>
        ),
      },
    ];

    return (
      <div>
        <NavigationMenu category={this.props.match.params.category} />
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
  deletePost,
  setCurrentPost,
})(Category);
