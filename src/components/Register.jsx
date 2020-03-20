import React from 'react'
import '../css/App.css'
import { ref } from '../App'

const Register = props => {

    const submitUsername = (e) => {
        e.preventDefault()
        const username = document.querySelector('ion-input').value;

        ref.child('leaderboard').child(username).set(this.props.score)
            .then( res => {
                console.log('promise sent', res)
            });
    }

    return (
        <div className="ion-padding register__content">
            <ion-row>
                <ion-col>
                    <ion-text>
                        <h1 className="c-question">Enter your name</h1>
                    </ion-text>
                </ion-col>
            </ion-row>

            <form onSubmit={submitUsername}>
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
    )
}

export default Register;
