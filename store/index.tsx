import React, { createContext, useEffect, useState, useReducer } from 'react'
import { THEME } from '../constants'
import { State, Action } from "./types"
import { taskReducer } from "./tasks"
import { noteReducer } from "./notes"

export const StoreContext = createContext(null)

function combineReducers(reducers) {  
  return (state = {}, action: Action) => {
    const newState = {};
    for (let key in reducers) {
      newState[key] = reducers[key](state[key], action);
    }
    return newState;
  }
}

export function StoreProvider({ children }) {

  // THEME
  const [theme, themeSet] = useState(null)

  useEffect(() => {
    const theme = localStorage.getItem('THEME') || THEME.LIGHT
    themeSet(theme)
  }, [])

  const changeTheme = (theme) => {
    themeSet(theme)
    localStorage.setItem('THEME', theme)
  }

  useEffect(() => {
    if (!theme) return
    const $html = document.querySelector('html')
    $html.classList.remove(...$html.classList)
    $html.classList.add(theme.toString())
  }, [theme])

  //////

  const initialState: State = {
    todoTasks: [],
    inProgressTasks: [],
    doneTasks: [],
    notes: [],
    score: 0,
  };

  /* const [state, dispatch] = useReducer(combineReducers({
    tasks: taskReducer,
    notes: noteReducer
  }), initialState); */

  const [state, dispatch] = useReducer(taskReducer, initialState);

  const value = { state, dispatch };

  return (
    <StoreContext.Provider value={{ value, theme, changeTheme }}>
      {children}
    </StoreContext.Provider>
  )
}

export default StoreContext
