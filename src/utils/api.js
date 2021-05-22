import {_getUsers, _getQuestions, _saveQuestion,
     _saveQuestionAnswer, _formatQuestion, _generateUID} from './_DATA'


export function getUsers()
{
    return _getUsers()
}

export function getQuestions()
{
    return _getQuestions()
}


export function saveQuestion(question)
{
    return _saveQuestion(question)
}

export function saveQuestionAnswer({ authedUser, qid, answer })
{
    return _saveQuestionAnswer({ authedUser, qid, answer })
}

export function formatQuestion({ optionOneText, optionTwoText, author })
{
    return _formatQuestion({ optionOneText, optionTwoText, author })
}

export function generateUID()
{
    return _generateUID()
}


export function getInitialData ()
{
    return Promise.all([
          _getUsers(),
          _getQuestions(),
    ]).then(([users, questions]) => ({
          users,
          questions,
        }))
}