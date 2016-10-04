import React, { Component } from 'react';

export default class Pic extends Component {
  componentDidMount() {
  }

  render() {
    return <img src={this.props.serverImg}></img>;
  }
}

Pic.propTypes = {
  serverImg: React.PropTypes.string.isRequired
}
