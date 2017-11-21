import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { editComment } from '../../dux/comments';

class EditComment extends Component {
  constructor(props) {
    super(props);
    const params = this.props.location.params;
    this.state = {
      author: params && params.comment ? params.comment.get('author') : null,
      body: params && params.comment ? params.comment.get('body') : null,
    };
  }

  handleBodyChange = event => this.setState({ body: event.target.value });

  handleAuthorChange = event => this.setState({ author: event.target.value });

  handleSubmit = event => {
    event.preventDefault();
    const { title, body, author } = this.state;
    const { comment } = this.props.location.params;
    const fields = {
      parentId: this.props.currentPost.get('id'),
      id: comment.get('id'),
      deleted: false,
      parentDeleted: false,
      timestamp: Date.now(),
      voteScore: comment.voteScore,
      body,
      author,
    };
    this.props.editComment(fields, () => {
      this.props.history.push('/');
    });
  };

  render() {
    if (!this.props.location.params) {
      this.props.history.push('/');
    }
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h4>Edit comment</h4>
          <label>
            Author
            <textarea
              placeholder="Type the body..."
              value={this.state.author}
              onChange={this.handleAuthorChange}
            />
          </label>
          <label>
            Body
            <textarea
              placeholder="Type the body..."
              value={this.state.body}
              onChange={this.handleBodyChange}
            />
          </label>
          <button>Edit Post</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ categories, posts }) {
  return {
    currentPost: posts.get('currentPost'),
  };
}

export default connect(mapStateToProps, { editComment })(EditComment);
