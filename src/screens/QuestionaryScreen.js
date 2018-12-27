import React, { Component } from 'react';
import { connect } from 'react-redux'
import { loadQuestions, setCurrentRightAnswer, endGame } from '../actions/questionary_actions'
import Question from '../components/Question'
import history from '../history'
import { Animated } from "react-animated-css";
import { css } from 'react-emotion';
import { ScaleLoader } from 'react-spinners';

class QuestionaryScreen extends Component {

    state = {
        questionNumber: 0,
    }

    componentWillMount() {
        const { name } = this.props
        if (!name) return history.push('/')
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.questionNumber !== nextProps.questionNumber) {
            const { questionNumber, questions } = nextProps
            if (!questions[questionNumber]) {
                const { name, score } = nextProps
                nextProps.endGame(name, score)
                return null
            }
            this.setState({ questionNumber: questionNumber })
            const { correctAnswer } = questions[questionNumber]
            nextProps.setCurrentRightAnswer(correctAnswer)
        }
    }

    renderQuestionary() {
        const { questions, questionNumber } = this.props
        return (
            <Animated animationIn="bounceInRight" animationOut="bounceOutLeft" isVisible={true}>
                <Question animationIn='' animationOut='' questions={questions} questionNumber={questionNumber} />
            </Animated>
        )
    }

    loader() {
        return (
            <div>
                <ScaleLoader
                    className={override}
                    sizeUnit={"px"}
                    size={460}
                    color={'#ff4b2f'}
                    loading={this.props.loading}
                    width={1}
                />
                <h5 style={{fontWeight: 200}}>GENERATING QUESTIONS...</h5>
            </div>
        )
    }

    render() {
        const { loading } = this.props
        if (loading) {
            return this.loader()
        }
        return this.renderQuestionary()
    }
}

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    margin-top: 90px
`;

const mapStateToProps = ({ questionary, user }) => {
    const { questions, loading, score, questionNumber } = questionary
    const { name } = user
    return { questions, loading, score, questionNumber, name }
}

export default connect(mapStateToProps, { loadQuestions, setCurrentRightAnswer, endGame })(QuestionaryScreen);