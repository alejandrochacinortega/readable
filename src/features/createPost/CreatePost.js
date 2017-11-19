import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addNewPost } from '../../dux/posts';
import { getAllCategories } from '../../dux/categories';

import InputField from './components/inputField';

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title || '',
      body: props.body || '',
      author: props.author || '',
      voteScore: props.voteScore || '',
      category: props.category || '',
    };
  }

  handleTitleChange = event => this.setState({ title: event.target.value });

  handleBodyChange = event => this.setState({ body: event.target.value });

  handleAuthorChange = event => this.setState({ author: event.target.value });

  handleCategoryChange = event =>
    this.setState({ category: event.target.value });

  handleSubmit = event => {
    event.preventDefault();

    const { title, body, author, voteScore } = this.state;
    const fields = {
      id: Date.now(),
      timestamp: Date.now(),
      title,
      body,
      author,
      category: this.state.category,
      voteScore,
    };
    this.props.addNewPost(fields, () => {
      this.props.history.push('/');
    });
  };

  componentDidMount() {
    const { getAllCategories } = this.props;
    setTimeout(() => {
      getAllCategories();
    });
  }

  render() {
    const { allCategories } = this.props;

    if (allCategories.size === 0) {
      return <h1>Loading...</h1>;
    }

    return (
      <div>
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
            Category:
            <select
              value={this.state.category}
              onChange={this.handleCategoryChange}
            >
              <option value="" disabled>
                Select category
              </option>
              {this.props.allCategories.map(category => {
                const name = category.get('name');
                return (
                  <option key={name} value={name}>
                    {name}
                  </option>
                );
              })}
            </select>
          </label>

          <button>Create Post</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ categories }) {
  return {
    currentCategory: categories.get('currentCategory'),
    allCategories: categories.get('allCategories'),
  };
}

export default connect(mapStateToProps, { addNewPost, getAllCategories })(
  CreatePost,
);
