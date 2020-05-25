import React from 'react';
import logo from './logo.svg';
import './App.css';
import './db'
import { load_data } from './db';

function App() {
  
  var startTime, endTime;
  function start() {
    startTime = performance.now();
  };


  function end() {
    endTime = performance.now();
    var timeDiff = endTime - startTime; //in ms 
    // get seconds 
    // var seconds = Math.round(timeDiff);
    console.log(timeDiff + " ms");
  }

  
  async function data_get() {

    start();
    const db = await load_data();
    end();

    start();
    const query = await db.nodes.find();

    // console.log(query);

    query.exec() // <- find all documents
  .then(documents => {
    console.dir(documents[0].nodeID);
    console.dir(documents[0].title);
    console.dir(documents[0].loc.x);
    console.dir(documents[0].loc.y);
    console.dir(documents[0]);
  }
    );
    end();
   



    //   query.then(results => {
    //     console.log(results);
    // });
    return query;
    // console.log(query); // 10
  }
  data_get();



  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
