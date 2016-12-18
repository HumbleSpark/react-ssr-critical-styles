import React from 'react';

export default class extends React.Component {
  static propTypes = {
    styleId: React.PropTypes.string,
  };

  componentDidMount() {
    const $style = document.getElementById(this.props.styleId);
    if ($style) $style.parentNode.removeChild($style);
  }

  render() {
    return this.props.children;
  }
}
