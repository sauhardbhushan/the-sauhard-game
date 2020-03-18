import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import { ref } from '../App'
import Question from './Question';
import Leaderboard from './Leaderboard';
import AddQuestion from './AddQuestion';

let allQuestions;
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
            console.log('in', this.state.isPlay)
            this.setCurrentQuestion();
        });

    }

    setCurrentQuestion() {
        console.log('settet', this.state.isPlay)
        if (this.state.isPlay) {
            allQuestions = Object.keys(this.state.quiz)
            const currentKey = allQuestions[this.state.currentQuestionNo]
            this.setState({ currentQuestion: currentKey, currentOptions: this.state.quiz[currentKey] })
            console.log('set', this.state.currentQuestion, 'options', this.state.currentOptions)
        }
    }

    getNextQuestion(isCorrect) {
        // get next q
        const nextQNo = this.state.currentQuestionNo + 1;
        const nextQ = allQuestions[nextQNo]
        if (allQuestions) {
            this.setState({
                currentQuestionNo: nextQNo,
                currentQuestion: nextQ,
                currentOptions: this.state.quiz[nextQ],
                score: this.state.score + isCorrect
            })
        }
    }

    componentDidUpdate() {
        if (allQuestions && this.state.currentQuestionNo === allQuestions.length) {
            console.log('finished, you got', this.state.score)
        }
    }

    render() {

        return (
            <Router>

                {this.state.isPlay && this.state.currentQuestion ?
                    <div>
                        <Switch>
                            <Route path="/play">
                                <Question question={this.state.currentQuestion} options={this.state.currentOptions} getNextQuestion={this.getNextQuestion} />
                            </Route>
                            <Route path="/leaderboard" component={Leaderboard}>
                                <Leaderboard />
                            </Route>
                            <Route path="/add-question" component={AddQuestion}>
                            </Route>
                        </Switch>
                    </div>
                    :
                    <div>
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

                    </div>
                }


            </Router>
        )
    }
}

export default Home;
