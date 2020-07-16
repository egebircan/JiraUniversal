export interface State {
  todoTasks: Todo[]
  inProgressTasks: InProgress[]
  doneTasks: Done[]
  //notes: Note[]
  //score: number
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

}

export enum TaskType {
  Todo = "todo",
  InProgress = "inprogress",
  Done = "done",
}

