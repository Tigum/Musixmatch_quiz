import React, { Component } from 'react'

class AnswerItem extends Component {

    render() {
        const { item, action, id } = this.props
        return <li className='answersItem' style={styles.answer} onClick={action} key={id}>{item}</li>
    }
}

const styles = {
    answer: {
        padding: 5,
        fontWeight: 100,
        fontSize: 25,
        cursor: 'pointer',
    }
}

export default AnswerItem