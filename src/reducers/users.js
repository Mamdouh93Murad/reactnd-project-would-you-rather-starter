import { RECEIVE_USERS, ADD_USER } from "../actions/users";
import { ADD_QUESTION , SAVE_ANSWER} from "../actions/questions";

export default function users(state = {}, action)
{
    switch(action.type)
    {
        case RECEIVE_USERS:
            return{
                ...state,
                ...action.users
            }
        case ADD_QUESTION:
            return{
                  ...state,
                  [action.question.author]: {
                    ...state[action.question.author],
                    questions: state[action.question.author].questions.concat(action.question.id)
                  }
            }
        case ADD_USER:
            return{
                  ...state,
                  [action.user.id]: {
                    id : action.user.id,
                    name : action.user.name,
                    password : action.user.password,
                    avatarURL : action.user.avatarURL,
                    answers: {},
                    questions: [],
                  }
                }
        case SAVE_ANSWER:
            return{
                    ...state,
                    [action.question.authedUser]: {
                      ...state[action.question.authedUser],
                      answers: {
                        ...state[action.question.authedUser].answers,
                        [action.question.id]: action.question.answer
                      }
                }
            }
        default:
        return state
    }
}