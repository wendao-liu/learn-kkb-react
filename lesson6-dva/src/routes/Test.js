// import React, { useRef, useState } from 'react';

// let d = () => { }
// function b(n) {
//   return () => {
//     console.log(n, 'this'); // lhy-log
//     return n
//   }
// }

// function Test(props) {
//   const test = useRef(null)
//   return (
//     <div>
//       <button onClick={() => {
//         test.current = Math.random()
//         if (!d()) {
//           d = b(test.current);
//         }
//         console.log(d(), test.current)
//       }}>set</button>
//       <button onClick={() => {
//         // console.log(d())
//         const t = test;
//         test.current = 6
//         console.log(t)
//       }}>get</button>
//     </div>
//   );
// }
// export default Test



import React, { Component } from 'react';

class Test extends Component {
  state = {
    count: 1
  }
  render() {
    const { count } = this.state || {};
    return (
      <div>
        <button onClick={() => {
          this.state.count = 55
          console.log(this.state.count)
        }}>21321</button>
        <h3>{count}</h3>
      </div>
    );
  }
}
export default Test;