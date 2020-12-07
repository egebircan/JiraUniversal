const TASKS_BASE_URL = 'http://localhost:8080/tasks'
const TOTAL_SCORE_BASE_URL = 'http://localhost:8080/totalScore'
const AUTH_BASE_URL = 'http://localhost:8080/auth'

const prod = {
  url: {
    //! TODO: Implement later after production.
  }
}

const dev = {
  url: {
    GET_TASKS: `${TASKS_BASE_URL}/getTasks`,
    CREATE_TASK: `${TASKS_BASE_URL}/createTask`,
    MOVE_TASKS: `${TASKS_BASE_URL}/moveTask`,
    DELETE_TASK: `${TASKS_BASE_URL}/deleteTask`,
    GET_ALL_TOTAL_SCORES: `${TOTAL_SCORE_BASE_URL}/getAllTotalScores`,
    LOGIN: `${AUTH_BASE_URL}/login`,
    SIGN_UP: `${AUTH_BASE_URL}/createUser`
  }
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod
