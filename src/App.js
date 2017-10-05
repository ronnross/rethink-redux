// import React, { Component } from 'react';
import React from 'react';
// import logo from './logo.svg';
import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }


const App = ({ model }) => {
  console.log(model);
  return (
    <div className="">
      <div className="">{model.state.people.length}</div>
      <button onClick={model.actions.loadAllAjaxCalls}>Get Folks</button>
    </div>
  );
};

export default App;