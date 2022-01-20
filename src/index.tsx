// react entry
import React from 'react';
import ReactDom from 'react-dom';
import App from './app';

if (module && module.hot) {
  module.hot.accept();
}

ReactDom.render(<App name='xuxin' />, document.querySelector('#root'));

// ts-test index
// import Button from './ts-test/interface';
// let btn = new Button();
// btn.select();
// btn.print();
// console.log(1);
