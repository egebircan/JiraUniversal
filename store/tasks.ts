import { Action, Tasks } from "./types"

export function taskReducer(state: Tasks, action: Action) {
  switch (action.type) {
    case 'CREATE_TASK':
      return { ...state, todoTasks: [...state.todoTasks, action.payload] }
    case 'MOVE_TASK':
      for (const [key, value] of Object.entries(state)) {
        state[key] = value.filter(e => e.title != action.payload.title)
      }
      return { ...state, [action.dropTarget]: [ ...state[action.dropTarget], { title: action.payload.title, description: action.payload.description, point: action.payload.point }]}
    case 'DELETE_TASK':
      console.log("delete task entered")
      for (const [key, value] of Object.entries(state)) {
        state[key] = value.filter(e => e.title != action.payload)
      }
      return { ...state }
    default:
      return state;
  }
}