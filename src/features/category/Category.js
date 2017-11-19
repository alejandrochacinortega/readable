import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCategory } from '../../dux/categories';
import { Button } from 'react-bootstrap';

import ListItem from './components/listItem';
import { formatDate } from '../../utils/numbers';

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

    const posts = postsOfCurrentCategory
      .sortBy(item => item.get('voteScore'))
      .reverse()
      .toJS();

    const data = postsOfCurrentCategory.toJS();
    const columns = [
      {
        Header: 'Title',
        accessor: 'title',
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
          <Link to={'/createPost/'}>
            <Button bsStyle="primary">GO</Button>
          </Link>
        ),
      },
    ];

    console.log('====================================');
    console.log(this.props);
    console.log('====================================');
    return (
      <div>
        <h1>Category {this.props.match.params.category}</h1>
        <Link to={`/createPost/${this.props.match.params.category}`}>
          Add post
        </Link>
        {this.renderPosts()}
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
})(Category);
