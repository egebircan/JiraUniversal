import { Action } from './types'

export function taskReducer(state: any, action: Action) {
  switch (action.type) {
    case 'CREATE_TASK':
      return [ ...state, action.payload]
    case 'MOVE_TASK':
      return [ ...state.filter(task => task.taskId !== action.payload.taskId), { ...action.payload, type: action.dropTarget } ]
    case 'DELETE_TASK':
      for (const [key, value] of Object.entries(state)) {
        state[key] = value.filter((e) => e.taskId != action.payload)
      }
      return { ...state }
    case 'FETCH_TASKS':
      return [action.payload]
    default:
      return state
  }
}