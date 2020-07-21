import React, { createContext, useEffect, useState, useReducer } from 'react'
import { THEME } from '../constants'
import { State, Action } from "./types"
import { taskReducer } from "./tasks"
import { noteReducer } from "./notes"
import { scoreReducer } from "./score"

export const StoreContext = createContext(null)

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
    tasks: {
      todoTasks: [{ title: 'Evrensel', description: "safdsgdfhgfhgfhgdsfs", point: "MEDIUM" }, { title: 'Jira', description: "safdsgdfhgfhgfhgdsfs", point: "EASY" }],
      inProgressTasks: [],
      doneTasks: [],
    },
    notes: [],
    score: 0,
  };

  const rootReducer: any = (initialState: State, action: Action) => {
    const { tasks, notes, score } = initialState

    return {
      tasks: taskReducer(tasks, action),
      notes: noteReducer(notes, action),
      score: scoreReducer(score, action),
    }
  } 

  const [state, dispatch] = useReducer(rootReducer, initialState);

  const value = { state, dispatch };

  return (
    <StoreContext.Provider value={{ value, theme, changeTheme }}>
      {children}
    </StoreContext.Provider>
  )
}

export default StoreContext
