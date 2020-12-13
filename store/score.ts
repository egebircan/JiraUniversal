import { Action } from './types'

export function scoreReducer(state: number, action: Action) {
  switch (action.type) {
    case 'INITIAL_SCORE':
      console.log("reducer geldi")
      return action.payload
    case 'UPDATE_SCORE':
      return state + action.payload
    default:
      return state
  }
}
