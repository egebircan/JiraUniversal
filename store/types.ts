export interface State {
  tasks: Tasks
  notes: Note[]
  score: number
}

export type Tasks = {
  todoTasks: Todo[]
  inProgressTasks: InProgress[]
  doneTasks: Done[]
}

export interface Action {
  type: string
  payload: any
  dropTarget: string
}

export type Todo = {
  id: string
  title: string
  description: string
  score: number
}

export type InProgress = {
  id: string
  title: string
  description: string
  score: number
}

export type Done = {
  id: string
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
