import { State, Action, Todo } from "./types"

export function taskReducer(state: State, action: Action) {
  switch (action.type) {
    case 'CREATE_TASK':
      return { ...state, todoTasks: [...state.todoTasks, action.payload] }
    case 'MOVE_TASK':
      for (const [key, value] of Object.entries(state)) {
        state[key] = value.filter(e => e.title != action.payload.title)
      }
      return { ...state, [action.dropTarget]: [ ...state[action.dropTarget], { title: action.payload.title, description: action.payload.description, point: action.payload.point }]}
    default:
      return state;
  }
}