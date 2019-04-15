import './App.scss';

import React, { FunctionComponent, useState } from 'react';

import excitify from 'utils/excitify';

interface Props {
  name: string;
}

const App: FunctionComponent<Props> = ({ name }) => {
  const [clicks, updateClick] = useState(0);
  const handleClick = () => updateClick(clicks + 1);

  return (
    <div className="app">
      <span className="greeting">
        Hello, {excitify(name)} You clicked {clicks} times!
      </span>
      <button onClick={handleClick} className="btn">
        Click me!
      </button>
    </div>
  );
};

export default App;
