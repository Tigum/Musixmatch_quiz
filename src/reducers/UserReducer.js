import { USER_NAME_CHANGE, GAME_STARTED, RESET_GAME, USER_NAME_SELECTED, LOAD_USER_RECORDS } from '../actions/types'

const INITIAL_STATE = {
    name: '',
    gameStarted: false,
    selectedUserName: '',
    selectedUserRecords: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_NAME_CHANGE:
            return { ...state, name: action.payload }
        case USER_NAME_SELECTED:
            return { ...state, name: action.payload }
        case GAME_STARTED:
            return { ...state, gameStarted: action.payload }
        case LOAD_USER_RECORDS:
            return { ...state, selectedUserRecords: action.payload }
        case RESET_GAME:
            return { ...state, ...INITIAL_STATE }
        default:
            return state
    }
}