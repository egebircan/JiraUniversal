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

type Todo = {

}

type InProgress = {

}

type Done = {

}

type Note = {

}


