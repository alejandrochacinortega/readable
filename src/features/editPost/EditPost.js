import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { editPost } from '../../dux/posts';

class EditPost extends Component {
  constructor(props) {
    super(props);
    console.log('Hey ', this.props.currentPost);
    this.state = {
      title: this.props.currentPost
        ? this.props.currentPost.get('title')
        : null,
      body: this.props.currentPost ? this.props.currentPost.get('body') : null,
    };
  }

  handleTitleChange = event => this.setState({ title: event.target.value });

  handleBodyChange = event => this.setState({ body: event.target.value });

  handleSubmit = event => {
    event.preventDefault();

    const { title, body } = this.state;
    const fields = {
      id: this.props.currentPost.get('id'),
      title,
      body,
    };
    this.props.editPost(fields, () => {
      this.props.history.push('/');
    });
  };

  render() {
    if (!this.props.currentPost) {
      this.props.history.push('/');
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h4>Edit post</h4>
          <label>
            Title
            <input
              type="text"
              placeholder="Enter title"
              value={this.state.title}
              onChange={this.handleTitleChange}
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
    currentCategory: categories.get('currentCategory'),
    allCategories: categories.get('allCategories'),
    currentPost: posts.get('currentPost'),
  };
}

export default connect(mapStateToProps, { editPost })(EditPost);
