import React, { Component } from 'react';
import { connect } from 'react-redux';

import { formatDate } from '../../utils/numbers';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { getCommentsByPost } from '../../dux/comments';

class PostDetail extends Component {
  componentDidMount() {
    if (!this.props.location) {
      return false;
    }

    const { post } = this.props.match.params;
    setTimeout(() => {
      this.props.getCommentsByPost(post);
    });
  }

  renderComments = () => {
    console.log('====================================');
    console.log(this.props.commentsOfCurrentPost);
    console.log('====================================');
    if (this.props.commentsOfCurrentPost.size === 0) {
      return <p>No comments</p>;
    }

    return this.props.commentsOfCurrentPost.map(comment => {
      return (
        <div
          style={{
            marginTop: 15,
            borderBottomStyle: 'solid',
            borderColor: 'gray',
          }}
          key={comment.get('id)')}
        >
          <h5>
            {comment.get('author')} - {comment.get('voteScore')}
          </h5>
          <h6>{comment.get('body')}</h6>
        </div>
      );
    });
  };

  render() {
    if (!this.props.location) {
      return false;
    }
    const { post } = this.props.location.state;

    return (
      <div>
        <Link
          to={{
            pathname: `/createComment/`,
            state: { post: post },
          }}
        >
          <Button bsStyle="primary">Create comment</Button>
        </Link>
        <h1>Post Detail</h1>
        <p>{post.title}</p>
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

export default connect(mapStateToProps, { getCommentsByPost })(PostDetail);
