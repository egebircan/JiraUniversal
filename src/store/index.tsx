import React, { createContext, useReducer } from 'react'
import { State, Action } from './types'
import { taskReducer } from './tasks'
import { noteReducer } from './notes'
import { scoreReducer } from './score'
import { userReducer } from './user'

export const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const initialState: State = {
    tasks: [],
    notes: [],
    score: null,
    userName: null
  }

  const rootReducer: any = (initialState: State, action: Action) => {
    const { tasks, notes, score, userName } = initialState

    return {
      tasks: taskReducer(tasks, action),
      notes: noteReducer(notes, action),
      score: scoreReducer(score, action),
      userName: userReducer(userName, action)
    }
  }

  const [state, dispatch] = useReducer(rootReducer, initialState)

  const value = { state, dispatch }

  return <StoreContext.Provider value={{ value }}>{children}</StoreContext.Provider>
}

export default StoreContext
