import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { userNameSelected } from '../actions/user_actions'

class RankingItem extends Component {
    selectUser() {
        const { name } = this.props
        this.props.userNameSelected(name)
    }

    render() {
        const { name, score, date } = this.props
        const id = Math.trunc((Math.random() * 1000)).toString()
        return (
            <tr className='rankingItem' style={styles.item} key={id} onClick={this.selectUser.bind(this)}>
                <td style={styles.tableItem}>{name}</td>
                <td style={styles.tableItem}>{moment(date).format('DD/MM/YYYY')}</td>
                <td style={styles.tableItem}>{score}</td>
            </tr>
        )
    }
}

const styles = {
    item: {
        cursor: 'pointer'
    },
    tableItem: {
        fontSize: 20,
        fontWeight: 200
    }
}

export default connect(null, { userNameSelected })(RankingItem)