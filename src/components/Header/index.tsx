import React from 'react';
import './index.scss';

export default function Header() {
  return (
    <header className='header'>
      <h1>标题</h1>
    </header>
  );
}
// interface HeaderProps {
//   title: string;
// }
// export class Header extends React.Component {
//   constructor(props: HeaderProps) {
//     super(props);
//     // super(props);
//     // console.log(props);
//     this.state = {
//       title: props.title,
//     };
//   }

//   render(): React.ReactNode {
//     console.log(this.state);
//     return (
//       <header className='header'>
//         <h1>{this.state.title}</h1>
//       </header>
//     );
//   }
// }
