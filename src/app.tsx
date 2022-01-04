import React from 'react';
import Header from 'Components/Header';
import testImg from './assets/images/test.jpg';

interface AProps {
  name: string;
}
function App(props: AProps) {
  const { name } = props;
  return (
    <div>
      <Header />
      <h1>{name},Welcome to 2022</h1>
      <img src={testImg} alt='' />
    </div>
  );
}

export default App;
