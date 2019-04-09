import './App.scss';

import React, { SFC } from 'react';

interface Props {
  name: string;
}

const App: SFC<Props> = ({ name }) => (
  <div styleName="greeting">Hello, {name}</div>
);

export default App;
