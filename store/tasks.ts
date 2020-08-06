import { Action, Tasks } from './types'

export function taskReducer(state: Tasks, action: Action) {
  switch (action.type) {
    case 'CREATE_TASK':
      return { ...state, todoTasks: [...state.todoTasks, action.payload] }
    case 'MOVE_TASK':
      console.log(action.payload)
      for (const [key, value] of Object.entries(state)) {
        state[key] = value.filter((e) => e.id != action.payload.id)
      }
      return {
        ...state,
        [action.dropTarget]: [
          ...state[action.dropTarget],
          {
            title: action.payload.title,
            description: action.payload.description,
            score: action.payload.score,
            id: action.payload.id
          }
        ]
      }
    case 'DELETE_TASK':
      for (const [key, value] of Object.entries(state)) {
        state[key] = value.filter((e) => e.id != action.payload)
      }
      return { ...state }
    default:
      return state
  }
}
