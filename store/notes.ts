import { State, Action, Note } from './types'

export function noteReducer(state: Note[], action: Action) {
  switch (action.type) {
    case 'BASIC_CASE':
      //console.log(action.payload)
    default:
      return state
  }
}
