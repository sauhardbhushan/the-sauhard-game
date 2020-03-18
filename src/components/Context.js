import React from 'react'
import { Question } from './Question'

import { ref } from '../App'
const FirebaseContext = React.createContext()

class Context extends React.Component {
    

    getQuestions = () => {
        ref.on('value', async snapshot => {
            const state = snapshot.val();

            this.setState({ isPlay: true, questions: state.questions })
        })

    }

    render() {
        return (
            <FirebaseContext.Provider value={this.state.questions}>
                <Question></Question>
            </FirebaseContext.Provider>
        )

    }
}

export default Context;
