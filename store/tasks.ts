import { Action } from './types'

export function taskReducer(state: any, action: Action) {
  switch (action.type) {
    case 'CREATE_TASK':
      return { ...state, todo: [...state.todo, action.payload] }
    case 'MOVE_TASK':
      if (action.payload.type === action.dropTarget) {
        const tasksAtColumn = state[action.payload.type]
        tasksAtColumn.splice(action.sourceIndex, 1)
        tasksAtColumn.splice(action.destinationIndex, 0, action.payload)

        return {
          ...state,
          [action.payload.type]: tasksAtColumn
        }
      } else {
        const tasksAtSourceColumn = state[action.payload.type]
        tasksAtSourceColumn.splice(action.sourceIndex, 1)

        const tasksAtDestinationColumn = state[action.dropTarget]
        action.payload.type = action.dropTarget
        tasksAtDestinationColumn.splice(
          action.destinationIndex,
          0,
          action.payload
        )

        return {
          ...state,
          [action.payload.type]: tasksAtSourceColumn,
          [action.dropTarget]: tasksAtDestinationColumn
        }
      }
    case 'DELETE_TASK':
      const tasksAtColumn = state[action.payload.type]
      tasksAtColumn.splice(action.payload.index, 1)
      return { ...state, [action.payload.type]: tasksAtColumn }
    case 'FETCH_TASKS':
      return [action.payload]
    default:
      return state
  }
}
