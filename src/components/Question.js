import React from 'react'

class Question extends React.Component {

    constructor() {
        super()
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e) {
        const userAnswer = e.currentTarget.innerText;
        const isUserAnswerCorrect = this.props.options[userAnswer]

        this.props.getNextQuestion(isUserAnswerCorrect);
    }

    renderAnswer(option, key, isCorrect) {
        return (
            <ion-row key={key.toString()} class="ion-justify-content-center">
                <ion-col size="8">
                    <ion-button class="options" expand="block" shape="round" size="large" is-correct={isCorrect.toString()} onClick={this.handleClick}> {option} </ion-button>
                </ion-col>
            </ion-row>
        )
    }

    render() {
        console.log('render')
        return (
            <div>
                <ion-grid class="ion-padding">
                    <ion-row class="ion-justify-content-center">
                        <ion-col>
                            <h1 className="c-question">
                                {this.props.question}
                            </h1>
                            
                        </ion-col>
                    </ion-row>

                    { Object.keys(this.props.options).map((option, i) => (
                        this.renderAnswer(option, i, Object.values(this.props.options)[i])
                        ))
                    }

                </ion-grid>
            </div>
        )
    }
}

export default Question;