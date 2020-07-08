import { State, Action, Todo } from "./types"

export function taskReducer(state: State, action: Action) {
  switch (action.type) {
    case 'CREATE_TASK':
      return { ...state, todoTasks: [...state.todoTasks, action.payload] }
    default:
      return state;
  }
}