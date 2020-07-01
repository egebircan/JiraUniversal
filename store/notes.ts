import { State, Action } from "./types"

export function noteReducer(state: State, action: Action) {
  switch (action.type) {
    case 'FETCH_DATA':
      return { ...state, episodes: action.payload };
    case 'ADD_FAV':
      return {
        ...state,
        favourites: [...state.doneTasks, action.payload]
      };
    case 'REMOVE_FAV':
      return {
        ...state,
        favourites: action.payload
      };
    default:
      return state;
  }
}