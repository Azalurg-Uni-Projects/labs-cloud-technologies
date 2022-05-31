import './App.css';
import axios from 'axios';
import React, { useState } from 'react';

function App() {
  const [data, setData] = useState("")
  const [toPost, setToPost] = useState(0)

  const getData = async () => {
    console.log("get");
    try{
      const response = await axios.get('http://localhost:8080');
      if(response.status === 200) {
        console.log(response.data);
        setData(response.data.value);
      } else{
          alert("Wrong login data");
      }
  } catch(ex) {
      alert(ex);
  }
  }

  const postData = async () => {
    console.log("post");
    try{
      const response = await axios.post('http://localhost:8080', {"number": toPost});
      if(response.status === 200) {
        console.log(response.data);
        setData(response.data.message);
      } else{
          alert("Wrong login data");
      }
  } catch(ex) {
      alert(ex);
  }
  }

  return (
    <div className="App App-header">
      <h1>My app</h1>
      <button onClick = {() => getData()}> GET </button>
      <form>
        <label htmlFor="number">Number: </label>
        <input type="number" id="number" onChange={e => setToPost(e.target.value)}></input>
        <button type="button" onClick={() => postData()}>POeST</button>
      </form>

      <dib>
        <p>Response form backend: {data}</p>
      </dib>
    </div>
  );
}

export default App;
