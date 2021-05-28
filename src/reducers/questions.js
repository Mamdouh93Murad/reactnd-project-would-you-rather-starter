import {RECEIVE_QUESTIONS, ADD_QUESTION, SAVE_ANSWER} from '../actions/questions'

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      }
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question
      }
      case SAVE_ANSWER:
        return{
          ...state,
          [action.question.id]: {
            ...state[action.question.id],
            [action.question.answer]: {
              ...state[action.question.id][action.question.answer],
              votes: state[action.question.id][action.question.answer].votes.concat([action.question.authedUser])
            }
          }
      }
    default:
      return state
  }
}
