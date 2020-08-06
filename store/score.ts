import { Action } from './types'

export function scoreReducer(state: number, action: Action) {
  switch (action.type) {
    case 'UPDATE_SCORE':
      return state + action.payload
    default:
      return state
  }
}
