import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userNameChanged, loadQuestions } from '../actions'
import Button from '../components/Button'
import { Animated } from "react-animated-css";
import { toastr } from 'react-redux-toastr'
import img from '../img/bg02.jpg';

class WelcomeScreen extends Component {

    goToQuestionary() {
        const { name } = this.props
        const toastrOptions = {
            timeOut: 4000,
        }
        if (!name) return toastr.error('Please inform your name', 'Type your name to successfully start the game!', toastrOptions)
        this.props.loadQuestions()
    }

    onChangeName(event) {
        const { value } = event.target
        this.props.userNameChanged(value)
    }

    welcomeContent() {
        return (
            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                <div style={styles.mainDiv}>
                    <h1 style={styles.title}>Welcome to the Singer/Song quiz. <br /> Type your name below and let's begin!</h1>

                    <div style={styles.textInputDiv}>
                        <input onChange={this.onChangeName.bind(this)} className='nameInput' style={styles.textInput} type='text' placeholder='Your name...' />
                    </div>

                    <div style={styles.buttonDiv}>
                        <Button
                            buttonClassName='startButton'
                            buttonAction={this.goToQuestionary.bind(this)}
                            buttonText='START'
                        />
                    </div>
                    <a href='/ranking'>
                        <h5>Check the ranking!</h5>
                    </a>
                </div>
            </Animated>

        )
    }

    render() {
        return this.welcomeContent()
    }
}

const styles = {
    textInput: {
        border: 'none',
        fontSize: 30,
        fontWeight: 200,
        alignSelf: 'center',
    },
    buttonDiv: {
        paddingTop: 70,
        outlineWidth: 0
    },
    textInputDiv: {
        paddingTop: 40
    },
    mainDiv: {
        padding: 6,
        backgroundImage: `url(${img})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
    },
    title: {
        fontWeight: 300,
        color: 'white'
    }
}

const mapStateToProps = ({ user, questionary }) => {
    const { name, gameStarted } = user
    const { ranking } = questionary
    return { name, gameStarted, ranking }
}
export default connect(mapStateToProps, { userNameChanged, loadQuestions })(WelcomeScreen)