import { ADD_QUESTION_TO_SET, RESET_GAME, LOADING_QUESTIONS, RIGHT_ANSWER, GO_TO_NEXT_QUESTION, ADD_PLAYER_TO_RANKING } from '../actions/types'

const INITIAL_STATE = {
    questions: [],
    loading: true,
    score: 0,
    questionNumber: 0,
    correctAnswer: '',
    ranking: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_QUESTION_TO_SET:
            let array = state.questions
            array.push(action.payload)
            return { ...state, questions: array }
        case LOADING_QUESTIONS:
            return { ...state, loading: action.payload }
        case RIGHT_ANSWER:
            return { ...state, score: state.score + 1 }
        case GO_TO_NEXT_QUESTION:
            return { ...state, questionNumber: state.questionNumber + 1 }
        case ADD_PLAYER_TO_RANKING:
            let arrayRanking = state.ranking
            arrayRanking.push(action.payload)
            return { ...state, ranking: arrayRanking }
        case RESET_GAME:
            return { ...state, questions: [], loading: true, score: 0, correctAnswer: '', questionNumber: 0 }
        default:
            return state
    }
}
