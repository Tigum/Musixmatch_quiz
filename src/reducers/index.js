import { combineReducers } from 'redux';
import UserReducer from './UserReducer'
import QuestionaryReducer from './QuestionaryReducer'
import { reducer as toastrReducer } from 'react-redux-toastr'

export default combineReducers({
    user: UserReducer,
    questionary: QuestionaryReducer,
    toastr: toastrReducer
})