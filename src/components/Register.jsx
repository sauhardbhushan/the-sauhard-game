import React from 'react'
import '../css/App.css'
import { ref } from '../App'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Leaderboard from './Leaderboard'

class Register extends React.Component {

    constructor() {
        super();
        this.state = {
            promiseSent: false
        };

    }


    submitUsername = (e) => {
        e.preventDefault()
        const username = document.querySelector('ion-input').value;

        ref.child('leaderboard').child(username).set(this.props.score)
            .then(res => {
                console.log('promise sent')
                this.setState({ promiseSent: true })
            });
    }

    render() {

        if (this.state.promiseSent) {
            return (
                <Router>
                    <Route to="/leaderboard"><Leaderboard dbRef={ref}></Leaderboard></Route>
                    <Route>
                        <Redirect to="/leaderboard"></Redirect>
                    </Route>
                </Router>
            )
        }
        else {
            return (
                <>
                    <div className="ion-padding register__conte">
                        <ion-row>
                            <ion-col class="c-question">
                                <h1 className="u-text-large">
                                    YOU GOT {this.props.score}!!!
                            </h1>
                                <h2>
                                    {this.props.score < 7 ? '(Book some revision lessons)' : `Fantastic effort!! Halfway there to being Sauhard's favourite acquantance`}
                                </h2>

                            </ion-col>
                        </ion-row>


                        <ion-row>
                            <ion-col>
                                <ion-text>
                                    <h1 className="c-question">Enter your name pls</h1>
                                </ion-text>
                            </ion-col>
                        </ion-row>

                        <form onSubmit={this.submitUsername}>
                            <ion-row>
                                <ion-col>
                                    <ion-item class="register__input">
                                        <ion-input placeholder="What does Sauhard know you as?" name="name" required></ion-input>
                                    </ion-item>
                                </ion-col>
                            </ion-row>

                            <ion-row>
                                <ion-col>
                                    <ion-button size="large" expand="block" shape="round" class="options" type="submit">Submit</ion-button>
                                    <ion-ripple-effect></ion-ripple-effect>
                                </ion-col>
                            </ion-row>
                        </form>
                    </div>
                </>
            )
        }
    }
}

export default Register;
