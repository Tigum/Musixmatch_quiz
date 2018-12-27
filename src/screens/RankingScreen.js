import React, { Component } from 'react'
import { connect } from 'react-redux'
import { resetGame } from '../actions/questionary_actions'
import { numberOfQuestions } from '../apiAndQuestionsInfo'
import Button from '../components/Button'
import RankingList from '../components/RankingList'
import { Animated } from "react-animated-css";

class Ranking extends Component {

    state = {
        ranking: []
    }

    async componentWillMount() {

        try {
            const ranking = await JSON.parse(localStorage.getItem('musix_ranking'))
            if (ranking) {
                const rankingSorted = ranking.sort(this.sortArray.bind(this))
                this.setState({ ranking: rankingSorted || [] })
            }

        } catch (err) {
            console.log(err)
            return
        }

    }

    onButtonPress() {
        this.props.resetGame()
    }

    sortArray(a, b) {
        if (a.score < b.score)
            return 1;
        if (a.score > b.score)
            return -1;
        return 0;
    }

    render() {
        const { name, score } = this.props
        const { ranking } = this.state
        if (!ranking || ranking.length === 0) return (
            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                <div>
                    <h1 style={styles.title}>Nobody has tried to play yet. <br />Be the first one to be on the rank!</h1>
                    <Button
                        className='startButton'
                        buttonAction={this.onButtonPress.bind(this)}
                        buttonText='PLAY NOW'
                    />
                </div>
            </Animated>
        )
        return (
            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                <div>
                    <h1 style={styles.title}>Ranking</h1>
                    {this.props.name ? <h2 style={styles.subtitle}>{name || 'Name not informed'} scored {score || '0'} out of {numberOfQuestions}</h2> : ''}
                    <RankingList data={ranking} />
                    <Button
                        className='startButton'
                        buttonAction={this.onButtonPress.bind(this)}
                        buttonText={this.props.name ? 'PLAY AGAIN' : 'PLAY NOW'}
                    />
                </div>
            </Animated>
        )
    }
}

const styles = {
    title: {
        fontWeight: 100,
    },
    subtitle: {
        fontWeight: 300,
        color: '#ff4b2f'
    }
}

const mapStateToProps = ({ user, questionary }) => {
    const { name } = user
    const { score, ranking } = questionary
    return { name, score, ranking }
}
export default connect(mapStateToProps, { resetGame })(Ranking)