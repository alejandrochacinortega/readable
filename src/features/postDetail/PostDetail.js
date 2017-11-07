import React, { Component } from 'react';

class PostDetail extends Component {
  render() {
    if (!this.props.location) {
      return false;
    }
    console.log('====================================');
    console.log('Post details ', this.props.location.state.post);

    console.log('====================================');
    const { post } = this.props.location.state;

    return (
      <div>
        <h1>Post Detail</h1>
        <p>{post.get('title')}</p>
      </div>
    );
  }
}

export default PostDetail;
