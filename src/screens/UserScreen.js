import React, { Component } from 'react';
import { connect } from 'react-redux'
import history from '../history'
import { loadUserRecords, deletePlayer } from '../actions/user_actions'
import RankingList from '../components/RankingList'
import { Animated } from "react-animated-css";

class UserScreen extends Component {

    componentDidMount() {
        const { name } = this.props
        if (!name) return history.push('/')
        this.props.loadUserRecords(name)
    }

    sortArray(a, b) {
        if (a.score < b.score)
            return 1;
        if (a.score > b.score)
            return -1;
        return 0;
    }

    deletePlayer() {
        const { name } = this.props
        this.props.deletePlayer(name)
    }

    render() {
        const { name, selectedUserRecords } = this.props
        return (
            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                <div>
                    <h1>{name}</h1>
                    <RankingList data={selectedUserRecords.sort(this.sortArray.bind(this)) || []} />
                    <h5 className='deleteLink' style={styles.delete} onClick={this.deletePlayer.bind(this)}>Delete player</h5>
                    <a href='/ranking'>
                        <h5>Go back to the Rank</h5>
                    </a>
                </div>
            </Animated>
        )
    }
}

const styles = {
    delete: {
        cursor: 'pointer'
    }
}

const mapStateToProps = ({ user }) => {
    const { name, selectedUserRecords } = user
    return { name, selectedUserRecords }
}

export default connect(mapStateToProps, { loadUserRecords, deletePlayer })(UserScreen)