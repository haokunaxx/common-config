function add(a: number, b: number): number {
  console.log('came from add');
  return a + b;
}

function minus(a: number, b: number): number {
  console.log('came from minus');
  return a - b;
}
export { add, minus };
