import { saveQuestionAnswer,saveQuestion } from "../utils/api"
import { showLoading, hideLoading } from 'react-redux-loading'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const SAVE_ANSWER = 'SAVE_ANSWER'
export function receiveQuestions(questions)
{
    return{
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

export function addQuestion (question) {
    return {
      type: ADD_QUESTION,
      question,
    }
  }

  export function handleAddQuestion (optionOneText, optionTwoText) {
    return (dispatch, getState) => {
      const { authedUser } = getState()
  
      dispatch(showLoading())
  
      return saveQuestion({
        optionOneText,
        optionTwoText,
        author: authedUser,
      })
        .then((question) => dispatch(addQuestion(question)))
        .then(() => dispatch(hideLoading()))
    }
  }

  export function handleAnswerQuestion(authedUser, qid, answer)
  {
    return(dispatch) => {
    dispatch(showLoading)
      return saveQuestionAnswer({authedUser, qid, answer}).then((question) =>
       dispatch(AnswerQuestion({authedUser, qid, answer}))).then(() =>
        dispatch(dispatch(hideLoading)))
    }
  }

 export function AnswerQuestion(question)
 {
    return{
      type: SAVE_ANSWER,
      question
    }
 }
 