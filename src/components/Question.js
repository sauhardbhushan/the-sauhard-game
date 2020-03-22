import React from 'react'

class Question extends React.Component {

    constructor() {
        super()
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e) {
        const allOptions = document.querySelectorAll(`ion-button`);
        const userAnswer = e.currentTarget.innerText;
        const isUserAnswerCorrect = this.props.options[userAnswer]
        this.highlightCorrectAnswer(userAnswer, isUserAnswerCorrect, allOptions)

        setTimeout(() => {
            this.removeHighlightedAnswer(allOptions)
            this.props.getNextQuestion(isUserAnswerCorrect)
        }, 1000);

    }

    renderAnswer(option, key, isCorrect) {
        return (
            <ion-row key={key.toString()} class="ion-justify-content-center">
                <ion-col size="8">
                    <ion-button id={option} color="light" expand="block" shape="round" size="large" is-correct={isCorrect.toString()} onClick={this.handleClick}> {option} </ion-button>
                </ion-col>
            </ion-row>
        )
    }

    removeHighlightedAnswer(allOptions) {
        allOptions.forEach(option => {
            option.setAttribute('color', 'light')
        })
    }

    highlightCorrectAnswer(userAnswer, isUserAnswerCorrect, allOptions) {

        allOptions.forEach(option => {
            const optionId = option.getAttribute('id');
            if (optionId === userAnswer) {
                if (isUserAnswerCorrect)
                    option.setAttribute('color', 'success');
                else {
                    option.setAttribute('color', 'danger')
                }
            }
        })

    }

    render() {
        console.log('render', this.props.score)
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

                    {Object.keys(this.props.options).map((option, i) => (
                        this.renderAnswer(option, i, Object.values(this.props.options)[i])
                    ))
                    }

                </ion-grid>
            </div>
        )
    }
}

export default Question;