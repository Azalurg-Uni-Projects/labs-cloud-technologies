import logo from './logo.svg';
import './App.css';

import {useState, useEffect} from "react";
import axios from 'axios';

const App = () =>{
  const [message, setMessage] = useState(" ");
  useEffect(() => {
    axios.get('/api/hello')
      .then(response => {
        console.log(response.data);
        setMessage(response);
      })
      .catch(err => console.log(err.message));
    
  } , [])
  
  return (
    <div>
      {message}
    </div>
    );
}

export default App;
