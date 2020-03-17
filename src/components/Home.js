import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import { ref } from '../App'
import Question from './Question';

class Home extends React.Component {

    constructor() {
        super();
        this.state = {
            questions: []
        }

        this.getQuestions = this.getQuestions.bind(this)
    }

    getQuestions() {
        let state;
        ref.on('value', snapshot => {
            state = snapshot.val();
            console.log(state)
            this.setState(state)
        })
    }

    render() {
        return (
            <Router>
                <div>
                    <ul>
                        <li>
                            <Link to="/play">About</Link>
                        </li>
                        <li>
                            <Link to="/dashboard">Dashboard</Link>
                        </li>
                    </ul>

                    <hr />
                    <div>
                        <Switch>
                            <Route path="/play">
                                <Question />
                            </Route>
                            <Route path="/leaderboard">
                                <Leaderboard />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </Router>
        )
    }
}

export default Home;
