import logo from './logo.svg';
import './App.css';
import axios from "axios";
import React, { useEffect, useState } from 'react';


function App() {
  const [message, setMessage] = useState("");
  const [number, setNumber] = useState(1)
  const getOne = async () => {
    try{
      const response = await axios.get('http://localhost:5000');
      if(response.status === 200) {
        setMessage(response);
      } else{
          alert("Wrong login data");
      }
  } catch(ex) {
      alert(ex);
  }
  }

  const postOne = async () => {
    setMessage(number + 1)
    try{
      const response = await axios.post('http://localhost:5000', {number: number});
      if(response.status === 200) {
        setMessage(response.value);
      } else{
          alert("Wrong login data");
      }
  } catch(ex) {
      alert(ex);
  }
  }

  return (
    <div className="App App-header">
      My App
      <div>
        <button onClick={() => getOne()}>GET</button>
        <button onClick={() => postOne()}>POST</button>
      </div>
      <p>{message}</p>
    </div>
  );
}

export default App;
