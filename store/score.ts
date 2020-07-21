import { State, Action,  } from "./types"

export function scoreReducer(state: number, action: Action) {
  switch (action.type) {
    case 'BASIC_CASE':
      console.log(action.payload)
    default:
      console.log(action.payload)
  }
}