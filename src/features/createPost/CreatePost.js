import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addNewPost } from '../../dux/posts';

import InputField from './components/inputField';

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title || '',
      body: props.body || '',
      author: props.author || '',
      voteScore: props.voteScore || '',
    };
  }

  handleTitleChange = event => this.setState({ title: event.target.value });

  handleBodyChange = event => this.setState({ body: event.target.value });

  handleAuthorChange = event => this.setState({ author: event.target.value });

  handleVoteScoreChange = event =>
    this.setState({ voteScore: event.target.value });

  handleSubmit = event => {
    event.preventDefault();
    const { title, body, author, voteScore } = this.state;
    const fields = {
      id: Date.now(),
      timestamp: Date.now(),
      title,
      body,
      author,
      category: 'react',
      voteScore,
    };
    this.props.addNewPost(fields);
  };

  render() {
    return (
      <div>
        <p>Label</p>
        <form onSubmit={this.handleSubmit}>
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
          <label>
            Author
            <input
              placeholder="Author"
              value={this.state.author}
              onChange={this.handleAuthorChange}
            />
          </label>
          <label>
            Vote
            <input
              placeholder="Vote"
              value={this.state.voteScore}
              onChange={this.handleVoteScoreChange}
            />
          </label>

          <button>Create Post</button>
        </form>
      </div>
    );
  }
}

export default connect(null, { addNewPost })(CreatePost);
