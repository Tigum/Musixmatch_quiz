import React, { Component } from 'react'
import { connect } from 'react-redux'
import { rightAnswer, wrongAnswer } from '../actions/questionary_actions'
import AnswerItem from './AnswerItem'

class AnswerItems extends Component {

    state = {
        correctAnswer: ''
    }

    componentDidMount() {
        const { questionNumber, correctAnswer } = this.props
        this.setState({
            questionNumber,
            correctAnswer
        })
    }

    onSelectAnswer(e) {
        const { correctAnswer } = this.props
        const answer = e.currentTarget.innerHTML

        if (answer === correctAnswer) {
            this.props.rightAnswer()
            this.setState({
                correctAnswer
            })
        }

        if (answer !== correctAnswer) {
            this.props.wrongAnswer()
            this.setState({
                correctAnswer
            })
        }

    }

    loadAnswers(answers) {
        console.log('answers', answers)
        return answers.map((item, i) => {
            return <AnswerItem action={this.onSelectAnswer.bind(this)} item={item} key={i} id={i} />
        })
    }

    render() {
        const { answers, questionNumber, correctAnswer } = this.props
        return (
            <ul style={styles.list}>
                {this.loadAnswers(answers, questionNumber, correctAnswer)}
            </ul>
        )
    }
}

const styles = {
    list: {
        listStyleType: 'none',
        marginLeft: -46,
        marginTop: 40
    },
}

const mapStateToProps = ({ questionary }) => {
    const { questionNumber } = questionary
    return { questionNumber }
}

export default connect(mapStateToProps, { rightAnswer, wrongAnswer })(AnswerItems);