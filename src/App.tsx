import './App.css'
import { useState } from 'react'
import { v1 } from 'uuid'
import { TodolistItem } from './TodolistItem'

export type Task = {
  id: string
  title: string
  isDone: boolean
}

export type Todolist = {
  id: string
  title: string
  filter: FilterValues
}

export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {

  const [todolists, setTodolists] = useState<Todolist[]>([
    { id: v1(), title: 'What to learn', filter: 'all' },
    { id: v1(), title: 'What to buy', filter: 'all' },
    { id: v1(), title: 'What to do', filter: 'all' },
  ])

  const [tasks, setTasks] = useState<Task[]>([
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJS', isDone: false },
  ])

  const deleteTask = (taskId: string) => {
    const filteredTasks = tasks.filter(task => {
      return task.id !== taskId
    })
    setTasks(filteredTasks)
  }

  const changeFilter = (todolistId: string, filter: FilterValues) => {
    const filteredTodolists = todolists.map(todolist => todolist.id === todolistId ? {...todolist, filter} : todolist)

    setTodolists(filteredTodolists)
  }

  const createTask = (title: string) => {
    const newTask = { id: v1(), title, isDone: false }
    const newTasks = [newTask, ...tasks]
    setTasks(newTasks)
  }

  const changeTaskStatus = (taskId: string, isDone: boolean) => {
    const newState = tasks.map(task => task.id == taskId ? { ...task, isDone } : task)
    setTasks(newState)
  }

  return (
    <div className="app">
      {todolists.map(todolist => {
        let filteredTasks = tasks

        if (todolist.filter === 'active') {
          filteredTasks = tasks.filter(task => !task.isDone)
        }
        if (todolist.filter === 'completed') {
          filteredTasks = tasks.filter(task => task.isDone)
        }

        return <TodolistItem key={todolist.id}
          todolist={todolist}
          tasks={filteredTasks}
          deleteTask={deleteTask}
          changeFilter={changeFilter}
          createTask={createTask}
          changeTaskStatus={changeTaskStatus}
        />
      })}
    </div>
  )
}
