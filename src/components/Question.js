import React from 'react'
import { FirebaseContext } from '../App'

class Question extends React.Component {



    render() {
        return (
            <div>
                <FirebaseContext.Consumer>
                    {
                        (value) => {
                            return (<ion-card>
                                <ion-card-header>Question</ion-card-header>
                            </ion-card>)
                        }
                    }
                </FirebaseContext.Consumer>

            </div>
        )
    }
}

export default Question;