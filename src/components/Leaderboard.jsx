import React from 'react'
import '../css/App.css'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Home from './Home'

class Leaderboard extends React.Component {

    constructor() {
        super();
        this.state = {
            isLoading: true,
            leaderboard: {}
        }
    }

    getLeaderboard() {
        this.props.dbRef.once('value', snapshot => {
            const val = snapshot.val()
            this.setState({ isLoading: false, leaderboard: val.leaderboard })
        })
    }

    componentDidMount() {
        this.getLeaderboard()
    }

    render() {

        return (
            <>
                <Router>
                    <Route path="/" exact component={Home}></Route>
                    <Link to="/"><ion-button>Home</ion-button></Link>
                </Router>
                <div className="ion-padding">
                    <ion-row >
                        <ion-col class="c-question">
                            <h1 className="u-text-large">Leaderboard</h1>

                            <h3 className="">See where you rank amongst the world's top players</h3>
                        </ion-col>
                    </ion-row>
                </div>

                <div className="ion-padding c-leaderboard">
                    {this.state.isLoading ? <ion-spinner /> :
                        <ion-list >
                            {Object.entries(this.state.leaderboard).map((key) => {
                                const [name, score] = key
                                return (
                                    <ion-item key={name} >
                                        <ion-label>1. </ion-label>
                                        <ion-label>{name} </ion-label>
                                        <ion-label>{score}</ion-label>
                                    </ion-item>
                                )
                            })
                            }
                        </ion-list>
                    }
                </div>

            </>
        )
    }
}

export default Leaderboard;
