import React from 'react';
import './css/App.css';
import Question from './components/Question'
import Home from './components/Home'

import app from 'firebase';

import firebaseConfig from './config/firebase'


export const FirebaseContext = React.createContext(null)
app.initializeApp(firebaseConfig)

export const ref = app.database().ref('/')

function App() {
  return (
    <div className="App">
      <FirebaseContext.Provider value={ref}>
      </FirebaseContext.Provider>
      <Home questionNo={1}></Home>
    </div>
  );
}

export default App;
