import './App.scss';

import React, { FunctionComponent } from 'react';

interface Props {
  name: string;
}

const App: FunctionComponent<Props> = ({ name }) => (
  <div styleName="greeting">Hello, {name}</div>
);

export default App;
