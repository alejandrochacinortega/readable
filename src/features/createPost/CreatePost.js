import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import InputField from './components/inputField';

class CreatePost extends Component {
  render() {
    console.log('====================================');
    console.log('Create post');
    console.log('====================================');
    return (
      <div>
        <p>Label</p>
        <InputField
          ref={field => {
            this.title = field;
          }}
          placeholder="test"
          label={'Title'}
          validator={value => value === 'omar'}
          onChange={text => console.log('text ', this.title.valid)}
        />
      </div>
    );
  }
}

export default CreatePost;
