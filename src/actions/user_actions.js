import { USER_NAME_CHANGE, GAME_STARTED, USER_NAME_SELECTED, LOAD_USER_RECORDS } from './types'
import history from '../history'

export const userNameChanged = (text) => {
    return {
        type: USER_NAME_CHANGE,
        payload: text
    }
}

export const startGame = (input) => {
    return {
        type: GAME_STARTED,
        payload: input
    }
}

export const userNameSelected = (name) => (dispatch) => {
    dispatch({
        type: USER_NAME_SELECTED,
        payload: name
    })

    history.push('/user')
}

export const loadUserRecords = (name) => (dispatch) => {
    const records = JSON.parse(localStorage.getItem('musix_ranking'))
    let userRecords = []

    records.forEach((item) => {
        if (item.name === name) {
            userRecords.push(item)
        }
    })

    dispatch({
        type: LOAD_USER_RECORDS,
        payload: userRecords
    })
}

export const deletePlayer = (name) => async () => {

    let result = window.confirm('Are you sure you wish to delete all records related to this user?');
    if (!result) return;

    let newRanking = []
    try {
        const ranking = await JSON.parse(localStorage.getItem('musix_ranking'))
        if (ranking) {
            ranking.forEach((item) => {
                if (item.name !== name) {
                    newRanking.push(item)
                }
            })

            try {
                await localStorage.setItem('musix_ranking', JSON.stringify(newRanking))
            } catch (err) {
                console.log(err)
                return
            }
            history.push('/ranking')
        }
    } catch (err) {
        console.log(err)
        return
    }
}

