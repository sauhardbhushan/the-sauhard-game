import React from 'react';
import { BrowserRouter as Router, Link, Redirect, Route, Switch } from 'react-router-dom';
import { db } from '../App';
import Register from './Register';
import Leaderboard from './Leaderboard';
import Question from './Question';



let allQuestions = [];
class Home extends React.Component {

    constructor() {
        super();

        this.state = {
            isFinished: false,
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
        db.ref('/').once('value').then(snapshot => {
            state = snapshot.val();
            this.setState({ quiz: state.questions })
            this.setCurrentQuestion();
        });

    }

    setCurrentQuestion() {
        allQuestions = Object.keys(this.state.quiz)
        const currentKey = allQuestions[this.state.currentQuestionNo]
        this.setState({ currentQuestion: currentKey, currentOptions: this.state.quiz[currentKey] })
    }

    getNextQuestion(isCorrect) {
        // get next q
        console.log('gettin next q 1', this.state.currentQuestionNo)
        const nextQNo = this.state.currentQuestionNo + 1;

        if (allQuestions.length > 0 && nextQNo === allQuestions.length) {
            console.log('finised, you got', this.state.score);

            this.setState({ isFinished: true })
        }

        const nextQ = allQuestions[nextQNo] || null;
        this.setState({
            currentQuestionNo: nextQNo,
            currentQuestion: nextQ,
            currentOptions: this.state.quiz[nextQ],
            score: this.state.score + isCorrect
        })

        console.log('gettin next q', this.state.score)
    }

    // componentWillUpdate() {
    //     console.log('cwu', this.state.currentQuestionNo, allQuestions.length)

    //     }
    // }


    render() {
        
        if (this.state.isFinished) {
            return (
                <Router>
                    <Route path='/register'><Register score={this.state.score}></Register></Route>
                    <Route><Redirect to="/register"></Redirect></Route>
                </Router>
            )
        }
        else {
            return (

                <Router>
                    <Switch>
                        <Route path="/play" exact>
                            <Question question={this.state.currentQuestion} options={this.state.currentOptions} getNextQuestion={this.getNextQuestion} />
                        </Route>
                        <Route path="/leaderboard" exact><Leaderboard dbRef={db}></Leaderboard></Route>
                        <Route path="/register"><Register score={0}></Register></Route>

                        <ion-grid class="ion-padding">
                            <ion-row class="ion-justify-content-center">
                                <ion-col size="10">
                                    <h1 className="logo">The Sauhard Game</h1>
                                </ion-col>
                            </ion-row>
                            <ion-row class="ion-justify-content-center">
                                <ion-col size="10">
                                    <Link to="/play" onClick={this.getQuestions}><ion-button color="light" shape="round" size="large">Play</ion-button></Link>
                                </ion-col>
                            </ion-row>
                            <ion-row class="ion-justify-content-center">
                                <ion-col size="10">
                                    <Link to="/leaderboard"><ion-button color="light" shape="round" size="large">Leaderboard</ion-button></Link>
                                </ion-col>
                            </ion-row>

                        </ion-grid>
                    </Switch>

                </Router>
            )
        }
    }
}

export default Home;
