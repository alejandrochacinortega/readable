import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addNewPost } from '../../dux/posts';
import { getAllCategories } from '../../dux/categories';
import { addNewComment } from '../../dux/comments';

class CreateComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: props.body || '',
      author: props.author || '',
    };
  }

  handleBodyChange = event => this.setState({ body: event.target.value });

  handleAuthorChange = event => this.setState({ author: event.target.value });

  handleSubmit = event => {
    event.preventDefault();

    const { title, body, author, voteScore } = this.state;
    const { post } = this.props.location.state;
    const fields = {
      id: Date.now(),
      parentId: post.id,
      timestamp: Date.now(),
      body,
      author,
      category: post.category,
      deleted: false,
      parentDeleted: false,
    };

    this.props.addNewComment(fields, () => {
      this.props.history.push({
        pathname: `/postDetail/${this.props.location.state.post.id}`,
        state: { post: post },
      });
    });
  };

  // componentDidMount() {
  //   const { getAllCategories } = this.props;
  //   setTimeout(() => {
  //     getAllCategories();
  //   });
  // }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h4>Create new comment</h4>
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
          )}
          <button>Create comment</button>
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

export default connect(mapStateToProps, { addNewComment })(CreateComment);
