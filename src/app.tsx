import React, { lazy, Suspense, useState } from 'react';
import Header from 'Components/Header';
import testImg from './assets/images/test.jpg';

const ComputedOne = lazy(() => import('Components/LazyLoadTest/com1'));
const ComputedTwo = lazy(() => import('Components/LazyLoadTest/com2'));

interface AProps {
  name: string;
}
function App(props: AProps) {
  const { name } = props;
  const [showComTwo, setShowComTwo] = useState<boolean>(false);
  console.log(name);
  // test commend
  return (
    <div>
      <Header />
      <h1>{name},Welcome to 2022</h1>
      <img style={{ height: '100px', width: '100px' }} src={testImg} alt='' />
      <Suspense fallback={<div>loading...</div>}>
        <ComputedOne a={1} b={2} />
        <hr />
        {showComTwo && <ComputedTwo a={3} b={4} />}
        <button onClick={() => setShowComTwo(true)}>click to load Component-ComputedTwo</button>
      </Suspense>
    </div>
  );
}

export default App;
