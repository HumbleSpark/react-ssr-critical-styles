import React from 'react';

export default (styles) => (WrappedComponent) => {
  return class extends React.Component {
    static contextTypes = {
      addCriticalStyles: React.PropTypes.func,
    };

    render() {
      if (this.context.addCriticalStyles) this.context.addCriticalStyles(styles);
      return <WrappedComponent {...this.props} />;
    }
  }
};
