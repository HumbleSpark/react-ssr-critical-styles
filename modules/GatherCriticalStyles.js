import React from 'react';

export default class extends React.Component {
  static childContextTypes = {
    addCriticalStyles: React.PropTypes.func,
  };

  static propTypes = {
    addCriticalStyles: React.PropTypes.func,
  }

  getChildContext() {
    return {
      addCriticalStyles: (s) => {
        this.props.addCriticalStyles(s);
      }
    };
  }

  render() {
    return this.props.children;
  }
}
