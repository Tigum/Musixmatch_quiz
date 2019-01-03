import {
    ADD_QUESTION_TO_SET,
    LOADING_QUESTIONS,
    RIGHT_ANSWER,
    GO_TO_NEXT_QUESTION,
    SET_CURRENT_RIGHT_ANSWER,
    ADD_PLAYER_TO_RANKING,
    RESET_GAME
} from './types'
import axios from 'axios'
import history from '../history'
import _ from 'lodash'
import { toastr } from 'react-redux-toastr'
import {
    artists,
    questionsTypes,
    apiKey,
    numberOfQuestions,
    numberOfWrongAnswers
} from '../apiAndQuestionsInfo'

export const rightAnswer = () => (dispatch) => {
    toastr.success('Correct Answer', 'Nice job! You rock!')
    dispatch({
        type: RIGHT_ANSWER
    })

    dispatch({
        type: GO_TO_NEXT_QUESTION,
    })
}

export const wrongAnswer = () => (dispatch) => {
    toastr.error('Wrong Answer', 'Try again, you might get it right next time!')
    dispatch({
        type: GO_TO_NEXT_QUESTION,
    })
}

export const resetGame = () => (dispatch) => {
    dispatch({
        type: RESET_GAME,
    })
    history.push('/')
}

export const setCurrentRightAnswer = (answer) => (dispatch) => {
    dispatch({
        type: SET_CURRENT_RIGHT_ANSWER,
        payload: answer
    })
}

export const loadQuestions = () => async (dispatch) => {
    history.push('/questionary')
    const toastrOptions = {
        timeOut: 10000,
    }
    toastr.info('Loading Questions...', 'We are currently creating awesome questions for you! Get ready!', toastrOptions)
    let i
    for (i = 0; i < numberOfQuestions; i++) {
        const questionTypeChoice = chooseRandom(questionsTypes)

        if (questionTypeChoice === 'read-artist-guess-track') {
            const questionType = 'read-artist-guess-track'
            let answers = []
            let correctAnswer
            const artist = chooseRandom(artists)

            try {
                const data = await findArtist(artist)

                if (data) {
                    const { track_list } = data.data.message.body
                    const chosenFile = chooseRandom(track_list)
                    const { track_name } = chosenFile.track
                    answers.push(track_name)
                    correctAnswer = track_name
                }
            } catch (err) {
                alert(err)
                return
            }

            let wrongArtists = []

            artists.forEach((item) => {
                if (item !== correctAnswer) {
                    wrongArtists.push(item)
                }
            })

            while (answers.length < numberOfWrongAnswers + 1) {
                const randomArtist = chooseRandom(wrongArtists)
                try {
                    const randomData = await findArtist(randomArtist)
                    if (randomData) {
                        const { track_list } = randomData.data.message.body
                        const randomChosenFile = chooseRandom(track_list)
                        const { track_name } = randomChosenFile.track
                        if (_.includes(answers, track_name)) {
                            continue
                        }
                        answers.push(track_name)
                    }
                } catch (err) {
                    alert(err)
                    return
                }
            }

            const finalAnswers = shuffleAnswers(answers)

            const object = {
                questionType,
                answers: finalAnswers,
                correctAnswer,
                questionSubject: artist
            }

            dispatch({
                type: ADD_QUESTION_TO_SET,
                payload: object
            })
        }


        if (questionTypeChoice === 'read-track-guess-artist') {
            const questionType = 'read-track-guess-artist'
            let answers = []
            let correctAnswer
            let track
            const artist = chooseRandom(artists)

            correctAnswer = artist
            answers.push(artist)

            try {
                const data = await findArtist(artist)

                if (data) {
                    const { track_list } = data.data.message.body
                    const chosenFile = chooseRandom(track_list)
                    const { track_name } = chosenFile.track
                    track = track_name
                }
            } catch (err) {
                alert(err)
                return
            }

            let wrongArtists = []
            artists.forEach((item) => {
                if (item !== artist) {
                    wrongArtists.push(item)
                }
            })

            const wrongAnswers = getRandomArtists(wrongArtists, 3)

            wrongAnswers.forEach((item) => {
                answers.push(item)
            })

            const finalAnswers = shuffleAnswers(answers)

            const object = {
                questionType,
                answers: finalAnswers,
                correctAnswer,
                questionSubject: track
            }

            dispatch({
                type: ADD_QUESTION_TO_SET,
                payload: object
            })

        }


        if (questionTypeChoice === 'read-lyrics-guess-artist') {
            const questionType = 'read-lyrics-guess-artist'
            let answers = []
            let correctAnswer
            let lyrics = undefined
            const artist = chooseRandom(artists)

            correctAnswer = artist
            answers.push(artist)

            try {
                while (lyrics === undefined) {
                    const data = await findArtist(artist)

                    if (data) {
                        const { track_list } = data.data.message.body
                        const chosenFile = chooseRandom(track_list)
                        const { track_name } = chosenFile.track

                        try {
                            const lyricsData = await findLyrics(track_name)
                            if (lyricsData) {
                                const lyricsFromAPI = lyricsData.data.message.body

                                if (lyricsFromAPI.lyrics) {

                                    lyrics = lyricsFromAPI.lyrics.lyrics_body.substring(0, 65) + '...'
                                }

                            }
                        } catch (err) {
                            alert(err)
                            return
                        }
                    }
                }
            } catch (err) {
                alert(err)
                return
            }

            if (lyrics) {
                let wrongArtists = []
                artists.forEach((item) => {
                    if (item !== artist) {
                        wrongArtists.push(item)
                    }
                })

                const wrongAnswers = getRandomArtists(wrongArtists, 3)

                wrongAnswers.forEach((item) => {
                    answers.push(item)
                })

                const finalAnswers = shuffleAnswers(answers)

                const object = {
                    questionType,
                    answers: finalAnswers,
                    correctAnswer,
                    questionSubject: lyrics
                }

                dispatch({
                    type: ADD_QUESTION_TO_SET,
                    payload: object
                })
            }
        }
    }

    dispatch({
        type: LOADING_QUESTIONS,
        payload: false
    })
}


const findArtist = async (artistName) => {
    try {
        const url = `http://api.musixmatch.com/ws/1.1/track.search?q_artist=${artistName}&page_size=10&page=1&s_track_rating=desc&apikey=${apiKey}`
        const response = await axios.get(url, {
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
        })

        return response

    } catch (err) {
        alert(err)
        return
    }
}

const findLyrics = async (trackName) => {
    try {
        const url = `http://api.musixmatch.com/ws/1.1/matcher.lyrics.get?q_track=${trackName}&page_size=10&page=1&s_track_rating=desc&apikey=${apiKey}`
        const response = await axios.get(url, {
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
        })
        return response

    } catch (err) {
        alert(err)
        return
    }
}

const chooseRandom = (array) => {
    return array[Math.floor(Math.random() * array.length)]
}


const shuffleAnswers = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

const getRandomArtists = (arr, n) => {
    let result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

export const endGame = (name, score) => async (dispatch) => {

    try {

        const ranking = await JSON.parse(localStorage.getItem('musix_ranking'))
        const date = new Date()
        const newItem = { name, score, date }

        if (ranking) {
            localStorage.setItem('musix_ranking', JSON.stringify([...ranking, newItem]))
        } else {
            localStorage.setItem('musix_ranking', JSON.stringify([newItem]))
        }

    } catch (err) {
        alert(err)
        return
    }

    dispatch({
        type: ADD_PLAYER_TO_RANKING,
        payload: { name, score }
    })
    history.push('/ranking')
}
