<h1 style=text-align:center>Would You Rather Project</h1>
                            
<div style=text-align:center>                          
<a href="https://www.linkedin.com/in/mamdouh-morad/">
    <img alt="Follow Me on LinkedIn" src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white">
</a>
 </div>                           

This Project is Final Assessment of The FWD-Scholarship offered by the Egyptian Government in Association with Udacity on Front-End Development and Advanced Web Applications, using React & Redux.

The `_DATA.js` file represents a fake database and methods that let you access the data. The only thing you need to edit in the ` _DATA.js` file is the value of `avatarURL`. Each user should have an avatar, so you’ll need to add the path to each user’s avatar.

I have built a React/Redux front end for the application, using the [Create React App](https://github.com/facebook/create-react-app) to bootstrap the project.

The Solution Consists of Adding Actions, Reducers and Middleware to successfully communicate the results and dispatch actions;

<h2 style=text-align:center>Solution Details </h2>

```
1) Login Functionality with Authentication
2) Sign Up Functionality by providing UserName, Real Name, Password and URL for Avatar

3) Toggling between Views to show Unanswered and Answered Questions Accordingly 

4) Ability to Add New Questions, Answers and Polls

5) Ability to show each answered Question Independently according to id, dynamically. 

6) Leaderboard to show user scores according to answered and created questions

7) Logout Functionality
```

## Data

There are two types of objects stored in our database:

* Users
* Questions

### Users

Users include:

| Attribute    | Type             | Description           |
|-----------------|------------------|-------------------         |
| id                 | String           | The user’s unique identifier |
| name          | String           | The user’s first name  and last name     |
| avatarURL  | String           | The path to the image file |
| questions | Array | A list of ids of the polling questions this user created|
| answers      | Object         |  The object's keys are the ids of each question this user answered. The value of each key is the answer the user selected. It can be either `'optionOne'` or `'optionTwo'` since each question has two options.

### Questions

Questions Structure:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| id                  | String | The question’s unique identifier |
| author        | String | The author’s unique identifier |
| timestamp | String | The time when the question was created|
| optionOne | Object | The first voting option|
| optionTwo | Object | The second voting option|

### Voting Options

Voting options are attached to questions. They include:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| votes             | Array | A list that contains the id of each user who voted for that option|
| text                | String | The text of the option |

Functions to communicate with the DataBase:

* `_getUsers()`
* `_getQuestions()`
* `_saveQuestion(question)`
* `_saveQuestionAnswer(object)`

## Details of each Function

    1) `_getUsers()` Method

        *Description*: Get all of the existing users from the database.  
        *Return Value*: Object where the key is the user’s id and the value is the user object.

    2) `_getQuestions()` Method

        *Description*: Get all of the existing questions from the database. 
        *Return Value*: Object where the key is the question’s id and the  value is the question object.

    3) `_saveQuestion(question)` Method

        *Description*: Save the polling question in the database.  
        *Parameters*:  Object that includes the following properties:   
        `author`, `optionOneText`, and `optionTwoText`. More details about  these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| author | String | The id of the user who posted the question|
| optionOneText| String | The text of the first option |
| optionTwoText | String | The text of the second option |

*Return Value*:  An object that has the following properties: `id`, `author`, `optionOne`, `optionTwo`, `timestamp`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| id | String | The id of the question that was posted|
| author | String | The id of the user who posted the question|
| optionOne | Object | The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option|
| optionTwo | Object | The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option|
|timestamp|String | The time when the question was created|

4) `_saveQuestionAnswer(object)` Method

*Description*: Save the answer to a particular polling question in the database.
*Parameters*: Object that contains the following properties: `authedUser`, `qid`, and `answer`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| authedUser | String | The id of the user who answered the question|
| qid | String | The id of the question that was answered|
| answer | String | The option the user selected. The value should be either `"optionOne"` or `"optionTwo"`|

