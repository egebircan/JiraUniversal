import { Action } from './types'

export function taskReducer(state: any, action: Action) {
  switch (action.type) {
    case 'CREATE_TASK':
      return [...state, action.payload]
    case 'MOVE_TASK':
      return [
        ...state.filter((task) => task.taskId !== action.payload.taskId),
        { ...action.payload, type: action.dropTarget }
      ]
    case 'DELETE_TASK':
      return [...state.filter((task) => task.taskId !== action.payload)]
    case 'FETCH_TASKS':
      return [action.payload]
    default:
      return state
  }
}
