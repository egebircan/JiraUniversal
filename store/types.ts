export interface State {
  todoTasks: Todo[]
  inProgressTasks: InProgress[]
  doneTasks: Done[]
  notes: Note[]
  score: number
}

export interface Action {
  type: string
  payload: any
}

export type Todo = {
  name: string
}

type InProgress = {

}

type Done = {

}

type Note = {

}


