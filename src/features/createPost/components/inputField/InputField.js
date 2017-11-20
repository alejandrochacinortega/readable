import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputField extends Component {
  constructor(props) {
    super(props);
    this.valid = this.props.validator(this.props.value);
  }

  render() {
    const { label, validator, ...rest } = this.props;
    return (
      <div>
        <p>{label}</p>
        <input
          ref={input => {
            this.input = input;
          }}
          {...rest}
          onChange={text => {
            this.value = text.target.value;
            this.valid = validator(text.target.value);
            this.props.onChange(text.target.value);
          }}
        />
      </div>
    );
  }
}

InputField.propTypes = {
  onChange: PropTypes.func,
  validator: PropTypes.func.isRequired,
};

InputField.defaultProps = {
  onChange: () => {},
  validator: () => true,
};

export default InputField;
