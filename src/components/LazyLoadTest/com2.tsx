import React from 'react';
import { add } from 'Utils/math';

interface AddProps {
  a: number;
  b: number;
}

function ComputedTwo(props: AddProps) {
  const { a, b } = props;
  const sum = add(a, b);
  return <p className='computed-two'>came from ComputedTwo and sum is {sum}</p>;
}

export default ComputedTwo;
