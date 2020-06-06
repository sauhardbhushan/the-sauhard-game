import React from 'react'
import '../css/App.css'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Home from './Home'

class Leaderboard extends React.Component {

    constructor() {
        super();
        this.state = {
            isLoading: true,
            leaderboard: {},
            goHome: false
        }

        this.handleClick = this.handleClick.bind(this);
    }

    getLeaderboard() {
        this.props.dbRef.ref('/leaderboard').orderByValue().once('value', snapshot => {
            const val = snapshot.val()
            const sorted_ranks = this.sortPositions(val)
            this.setState({ isLoading: false, leaderboard: sorted_ranks })
        })
    }

    sortPositions(leaderboard) {
        let entries = Object.entries(leaderboard);
        // [["you",100],["me",75],["foo",116],["bar",15]]

        const sorted = entries.sort((a, b) => b[1] - a[1]);
        const scores = sorted.map(x => (x[1]));

        let sorted_positions = []
        sorted.map(x => {
            const position = scores.indexOf(x[1]) + 1
            sorted_positions.push(x.concat(position))
        })

        return sorted_positions;
    }

    componentDidMount() {
        this.getLeaderboard()
    }

    handleClick() {
        this.setState({ goHome: true })
    }


    render() {

        if (this.state.goHome) {
            return <Home />
        }
        else {
            return (
                
                    <Router>
                    <div className="ion-padding">

                            <Link to="/">
                                <button type="button" className="c-leaderboard__button" onClick={this.handleClick}><ion-icon size="large" icon="home-outline"></ion-icon></button>
                            </Link>

                        <ion-row>
                            <ion-col class="c-leaderboard--text">
                                <h1 className="u-text-large">Leaderboard</h1>
                                <h3 className="">See where you rank amongst the world's top players</h3>
                            </ion-col>
                        </ion-row>
                        </div>

                        <div className="c-leaderboard ion-padding">
                            <div className="c-leaderboard__column-headings">
                                <ion-row>
                                    <ion-col size="2">Rank</ion-col>
                                    <ion-col>Name</ion-col>
                                <ion-col size="3" class="u-text-center">Score / 10</ion-col>
                                </ion-row>
                            </div>
                            {/* <ion-row>
                                <ion-col size="11"> */}
                                    {this.state.isLoading ? <ion-spinner /> :
                                        <ion-list >
                                            {Object.entries(this.state.leaderboard).map((key) => {

                                                const [name, score, position] = key[1]
                                                return (
                                                    <ion-item key={name} >
                                                        <ion-col size="2">
                                                            <ion-label>{position}.</ion-label>
                                                        </ion-col>

                                                        <ion-label>{name}
                                                            {position === 1 ? (<span role="img" aria-labelledby="emoji">    🥇</span>) : null} </ion-label>
                                                        <ion-col size="2">
                                                            <ion-label>{score}</ion-label>
                                                        </ion-col>

                                                    </ion-item>
                                                )
                                            })
                                            }
                                        </ion-list>
                                    }
                                {/* </ion-col>
                            </ion-row> */}
                        </div>

                        <Switch>
                            <Route path="/" exact component={Home}></Route>
                        </Switch>
                    </Router>
                // </div>
            )
        }
    }
}

export default Leaderboard;
