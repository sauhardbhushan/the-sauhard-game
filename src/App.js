import React from 'react';
import './css/App.css';
import Home from './components/Home'

import app from 'firebase';

import firebaseConfig from './config/firebase'



app.initializeApp(firebaseConfig)

export const ref = app.database().ref('/')

function App() {
  return (
    <div className="App">
        <Home></Home>
    </div>
  );
}

export default App;
