import React, { Component } from 'react'
import RankingItem from './RankingItem'
import { Table } from 'react-bootstrap';

class RankingList extends Component {

    loadItems() {
        const { data } = this.props
        return data.map((player, i) => {
            return (
                <RankingItem
                    name={player.name}
                    score={player.score}
                    date={player.date}
                    key={Math.trunc((Math.random() * 10000 * i)).toString()}
                />
            )
        })
    }

    render() {
        return (
            <div style={styles.wrapper}>
                <div style={styles.mainDiv}>
                    <Table>
                        <thead>
                            <tr>
                                <th style={styles.tableTitle}>NAME</th>
                                <th style={styles.tableTitle}>DATE</th>
                                <th style={styles.tableTitle}>SCORE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.loadItems()}
                        </tbody>
                    </Table>
                </div>
            </div>

        )
    }
}

const styles = {
    mainDiv: {
        backgroundColor: '#f5f7fa',
        padding: 37,
        marginTop: 30,
        marginBottom: 10
    },
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tableTitle: {
        fontSize: 20,
    }
}

export default RankingList