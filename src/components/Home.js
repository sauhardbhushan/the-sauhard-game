import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from 'react-router-dom';

import { ref } from '../App'

import Question from './Question';
import Leaderboard from './Leaderboard.jsx';
import Register from './Register';

let allQuestions = [];
class Home extends React.Component {

    constructor() {
        super();

        this.state = {
            isPlay: false,
            quiz: [],
            currentQuestionNo: 0,
            currentQuestion: '',
            currentOptions: {},
            score: 0
        }

        this.getQuestions = this.getQuestions.bind(this)
        this.setCurrentQuestion = this.setCurrentQuestion.bind(this)
        this.getNextQuestion = this.getNextQuestion.bind(this);
    }

    getQuestions() {
        let state;
        ref.once('value').then(snapshot => {
            state = snapshot.val();
            this.setState({ quiz: state.questions, isPlay: true })
            this.setCurrentQuestion();
        });

    }

    setCurrentQuestion() {
        if (this.state.isPlay) {
            allQuestions = Object.keys(this.state.quiz)
            const currentKey = allQuestions[this.state.currentQuestionNo]
            this.setState({ currentQuestion: currentKey, currentOptions: this.state.quiz[currentKey] })
        }
    }

    getNextQuestion(isCorrect) {
        // get next q
        console.log('gettin next q 1', this.state.currentQuestionNo)
        const nextQNo = this.state.currentQuestionNo + 1;

        if (allQuestions.length > 0 && nextQNo === allQuestions.length) {
            console.log('finised, you got', this.state.score);
            return (
                <Router>
                    <Switch>
                        <Redirect to="/register"></Redirect>
                    </Switch>
                </Router>

            )

            }

        const nextQ = allQuestions[nextQNo] || null;
        this.setState({
            currentQuestionNo: nextQNo,
            currentQuestion: nextQ,
            currentOptions: this.state.quiz[nextQ],
            score: this.state.score + isCorrect
        })

        console.log('gettin next q', this.state.currentQuestionNo)
    }

    // componentWillUpdate() {
    //     console.log('cwu', this.state.currentQuestionNo, allQuestions.length)

    //     }
    // }


    render() {

        return (
            <Router>

                {/* {this.state.isPlay && this.state.currentQuestion ? */}
                <div>
                    <Switch>
                        <Route path="/play" exact>
                            <Question question={this.state.currentQuestion} options={this.state.currentOptions} getNextQuestion={this.getNextQuestion} />
                        </Route>
                        {/* </Switch>
                    </div>
                    
                    <div>
                        <Switch> */}
                        <Route path="/leaderboard" exact><Leaderboard dbRef={ref}></Leaderboard>
                        </Route>
                        <Route path="/register"><Register score={this.state.score}></Register></Route>

                        <ion-grid class="ion-padding">
                            <ion-row class="ion-justify-content-center">
                                <ion-col size="10">
                                    <h1>The Sauhard Game</h1>
                                </ion-col>
                            </ion-row>
                            <ion-row class="ion-justify-content-center">
                                <ion-col size="10">
                                    <Link to="/play" onClick={this.getQuestions}><ion-button expand="block" shape="round" size="large">Play</ion-button></Link>
                                </ion-col>
                            </ion-row>
                            <ion-row class="ion-justify-content-center">
                                <ion-col size="10">
                                    <Link to="/leaderboard"><ion-button expand="block" shape="round" size="large">Leaderboard</ion-button></Link>
                                </ion-col>
                            </ion-row>
                            <ion-row class="ion-justify-content-center">
                                <ion-col size="10">
                                    <Link to="/add-question"><ion-button expand="block" shape="round" size="large">Add q</ion-button></Link>
                                </ion-col>
                            </ion-row>

                        </ion-grid>
                    </Switch>
                </div>


            </Router>
        )
    }
}

export default Home;
