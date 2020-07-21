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
  title: string
  description: string
  point: string
}

export type InProgress = {
  title: string
  description: string
  point: string
}

export type Done = {
  title: string
  description: string
  point: string
}

export type Note = {
  text: string
}

export enum TaskType {
  Todo = "todo",
  InProgress = "inprogress",
  Done = "done",
}

