import React from 'react';
import './css/App.css';
import Home from './components/Home'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import app from 'firebase';

import firebaseConfig from './config/firebase'
import Leaderboard from './components/Leaderboard';



app.initializeApp(firebaseConfig)

export const db = app.database()

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/leaderboard" render={() => <Leaderboard dbRef = { db }/>}></Route>
          </Switch>
      </div>
    </Router>
  );
}

export default App;
