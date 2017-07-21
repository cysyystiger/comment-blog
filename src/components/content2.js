import React, { Component } from 'react';

export default class Content2 extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onChange(e) {
    this.setState({ text: e.target.value });
  }

  handleChange(e) {
    e.preventDefault();
    this.props.add(this.state.text, this.props.cont);
    this.setState({ text: '' });
  }


  render() {
    return (
      <form onSubmit={this.handleChange}>
        <textarea
          placeholder="Reply here!"
          rows="3"
          cols="40"
          type="text"
          value={this.state.text}
          onChange={this.onChange}
        />
        <button id="ctb2" type="submit" className="btn btn-secondary">
          Reply
        </button>
      </form>
    );
  }
}
