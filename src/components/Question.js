import React, { Component } from 'react';
import { connect } from 'react-redux'
import AnswerItems from './AnswersList'
import { endGame } from '../actions/questionary_actions'

class Question extends Component {
    render() {
        const { questions, questionNumber } = this.props

        if (!questions[questionNumber] || !questions[questionNumber].questionType) return null

        if (questions[questionNumber].questionType === 'read-artist-guess-track') {
            const { questionSubject, answers, correctAnswer } = questions[questionNumber]
            const question = `What song is performed by '${questionSubject}'?`
            return (
                <div>
                    <h1 style={styles.question}>{question}</h1>
                    <AnswerItems answers={answers} questionNumber={questionNumber} correctAnswer={correctAnswer} />
                </div>
            )
        }

        if (questions[questionNumber].questionType === 'read-track-guess-artist') {
            const { questionSubject, answers, correctAnswer } = questions[questionNumber]
            const question = `Which artist performs the song '${questionSubject}'?`
            return (
                <div>
                    <h1 style={styles.question}>{question}</h1>
                    <AnswerItems answers={answers} questionNumber={questionNumber} correctAnswer={correctAnswer} />
                </div>
            )
        }

        if (questions[questionNumber].questionType === 'read-lyrics-guess-artist') {
            const { questionSubject, answers, correctAnswer } = questions[questionNumber]
            const question = `Which artist sings the lyrics '${questionSubject}'?`
            return (
                <div>
                    <h1 style={styles.question}>{question}</h1>
                    <AnswerItems answers={answers} questionNumber={questionNumber} correctAnswer={correctAnswer} />
                </div>
            )
        }
    }
}

const styles = {
    question: {
        fontWeight: 300,
        padding: 25
    }
}

const mapStateToProps = ({ questionary, user }) => {
    const { name } = user
    const { score } = questionary
    return { name, score }
}

export default connect(mapStateToProps, { endGame })(Question)