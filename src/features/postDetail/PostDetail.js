import React, { Component } from 'react';
import { connect } from 'react-redux';

import { formatDate } from '../../utils/numbers';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DisplayError from '../../components/displayError';

import {
  getCommentsByPost,
  deleteComment,
  commentVote,
} from '../../dux/comments';
import { setCurrentPost, deletePost } from '../../dux/posts';

class PostDetail extends Component {
  componentDidMount() {
    if (!this.props.location || !this.props.location.state) {
      return false;
    }

    const { post } = this.props.location.state;
    setTimeout(() => {
      this.props.getCommentsByPost(post.id);
      this.props.setCurrentPost(post);
    });
  }

  renderComments = () => {
    if (this.props.commentsOfCurrentPost.size === 0) {
      return <p>No comments</p>;
    }

    return this.props.commentsOfCurrentPost
      .sortBy(item => item.get('voteScore'))
      .reverse()
      .map(comment => {
        return (
          <div
            style={{
              paddingBottom: 15,

              borderBottomStyle: 'solid',
              borderColor: 'gray',
            }}
            key={comment.get('id)')}
          >
            <h5>
              {comment.get('author')} - {comment.get('voteScore')}
            </h5>
            <h6>{comment.get('body')}</h6>
            <Link
              to={{
                pathname: `/editComment/`,
                params: { comment: comment },
              }}
            >
              <Button bsStyle="primary">Edit comment</Button>
            </Link>
            <Button
              bsStyle="warning"
              onClick={() => this.props.commentVote(comment, 'upVote')}
            >
              UP
            </Button>
            <Button
              bsStyle="warning"
              onClick={() => this.props.commentVote(comment, 'downVote')}
            >
              DOWN
            </Button>
            <Button
              bsStyle="danger"
              onClick={() => this.deleteComment(comment)}
            >
              Delete Comment
            </Button>
          </div>
        );
      });
  };

  deleteComment = comment => {
    this.props.deleteComment(comment, () => {
      alert(`Comment create by ${comment.get('author')} deleted.`);
    });
  };

  deletePost = () => {
    const { post } = this.props.location.state;
    this.props.deletePost(post.id, () => {
      alert(`Post ${post.title} deleted.`);
      this.props.history.push('/');
    });
  };

  renderCreateComment = () => {
    const { post } = this.props.location.state;
    return (
      <Link
        to={{
          pathname: `/createComment/`,
          params: { post: post },
        }}
      >
        <Button bsStyle="primary">Create comment</Button>
      </Link>
    );
  };

  renderEditPost = () => {
    return <Button bsStyle="primary">Edit Post</Button>;
  };

  renderDeletePost = () => {
    return (
      <Button bsStyle="danger" onClick={this.deletePost}>
        Delete post
      </Button>
    );
  };

  render() {
    if (!this.props.location) {
      return false;
    }

    if (!this.props.location.state) {
      return <DisplayError text="Post has been deleted" />;
    }

    const { post } = this.props.location.state;

    return (
      <div>
        {this.renderCreateComment()}
        {this.renderEditPost()}
        {this.renderDeletePost()}
        <h1>Post Detail</h1>
        <p>{post.title}</p>
        <p>{post.body}</p>
        <p>{post.author}</p>
        <p>{formatDate(post.timestamp)}</p>
        <p>{post.voteScore}</p>
        <h4>Comments for {post.title}:</h4>
        {this.renderComments()}
      </div>
    );
  }
}

function mapStateToProps({ comments }) {
  return {
    commentsOfCurrentPost: comments.get('commentsOfCurrentPost'),
  };
}

export default connect(mapStateToProps, {
  getCommentsByPost,
  setCurrentPost,
  deletePost,
  deleteComment,
  commentVote,
})(PostDetail);
