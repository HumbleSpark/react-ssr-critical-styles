# react-ssr-critical-styles

*Important*
Relies on PR https://github.com/webpack/style-loader/pull/159 in `style-loader`.
Or use temp npm package of forked version - `@humblespark/style-loader`

`style-loader` can't work server side the same way it does client side, because there is no global document / object
to write styles to. to collect `critical styles` on server, we need `style-loader` to expose the generated css, for us
to bubble up to a higher order component for initial server side render. we need `style-loader` to expose locals
as `css-loader` does.

### Higher order components to use webpack style loader server side for React.

#### API
- `addCriticalStyles` - hoc `addCriticalStyles(styles)(App)`
- `RemoveCriticalStyles` - optional component for client
- `GatherCriticalStyles` - wrap server components to gather critical styles
- `stringifyStyles` - helper to join & minify styles to put in head

#### Usage

server.js (gathers styles from components to render inline in head)
```javascript
import { GatherCriticalStyles, stringifyStyles } from 'react-ssr-critical-styles';

...

  let criticalStyles = [];
  const content = renderToString(
    <GatherCriticalStyles addCriticalStyles={(s) => criticalStyles.push(s)}>
      <App />
    </GatherCriticalStyles>
  );

  res.status(200).send(template(content, stringifyStyles(criticalStyles)));

  ...
```

client.js (optionally removes styles once `style-loader` kicks in on client. using this is optional.)
```javascript
import { RemoveCriticalStyles } from 'react-ssr-critical-styles';

...

render((
  <RemoveCriticalStyles styleId="critical-styles">
    <App />
  </RemoveCriticalStyles>
), document.getElementById('root'));

...
```

AppComponent.js (addCriticalStyles hoc uses context to bubble up through component tree.)
```javascript
import React, { Component } from 'react';
import styles, { locals } from 'app.css';
import { addCriticalStyles } from 'react-ssr-critical-styles';

class App extends Component {
  render() {
    return <div className={locals.App} />
  }
}

export default addCriticalStyles(styles)(App);
```
