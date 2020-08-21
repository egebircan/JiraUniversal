export interface State {
  tasks: TaskInterface[]
  notes: Note[]
  score: number
}

export type TaskInterface = {
  taskId: number
  userName: string
  type: string
  title: string
  description: string
  score: number
}

export interface Action {
  type: string
  payload: any
  dropTarget: string
}

export type Todo = {
  taskId: number
  title: string
  description: string
  score: number
}

export type InProgress = {
  taskId: number
  title: string
  description: string
  score: number
}

export type Done = {
  taskId: number
  title: string
  description: string
  score: number
}

export type Note = {
  text: string
}

export enum TaskType {
  Todo = 'todo',
  InProgress = 'inprogress',
  Done = 'done'
}
