import React from 'react';
import { add, minus } from 'Utils/math';

interface AddProps {
  a: number;
  b: number;
}

function ComputedOne(props: AddProps) {
  const { a, b } = props;
  const sum = add(a, b);
  return <p className='computed-one'>came from ComputedOne and sum is {sum}</p>;
}

export default ComputedOne;
