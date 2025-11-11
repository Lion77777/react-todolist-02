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

export type TaskState = Record<string, Task[]>

export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {
  const todolistId1 = v1()
  const todolistId2 = v1()
  const todolistId3 = v1()

  const [todolists, setTodolists] = useState<Todolist[]>([
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
    { id: todolistId3, title: 'What to do', filter: 'all' },
  ])

  const [tasks, setTasks] = useState<TaskState>({
    [todolistId1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: 'Milk', isDone: true },
      { id: v1(), title: 'Bread', isDone: true },
      { id: v1(), title: 'Juice', isDone: false },
    ],
    [todolistId3]: [
      { id: v1(), title: 'Go to market', isDone: true },
      { id: v1(), title: 'Go to gym', isDone: true },
    ],
  })

  const deleteTask = (todolistId: string, taskId: string) => {
    const filteredTasks = tasks[todolistId].filter(task => {
      return task.id !== taskId
    })

    setTasks((prev) => ({ ...prev, [todolistId]: filteredTasks }))
  }

  const changeFilter = (todolistId: string, filter: FilterValues) => {
    const filteredTodolists = todolists.map(todolist => todolist.id === todolistId ? { ...todolist, filter } : todolist)

    setTodolists(filteredTodolists)
  }

  const createTask = (todolistId: string, title: string) => {
    const newTask = { id: v1(), title, isDone: false }
    const newTasks = [newTask, ...tasks[todolistId]]

    setTasks((prev) => ({ ...prev, [todolistId]: newTasks }))
  }

  const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    const newState = tasks[todolistId].map(task => task.id == taskId ? { ...task, isDone } : task)

    setTasks(prev => ({ ...prev, [todolistId]: newState }))
  }

  const deleteTodolist = (todolistId: string) => {
    const filteredTodolists = todolists.filter(todolist => todolist.id !== todolistId)

    setTodolists(filteredTodolists)

    delete tasks[todolistId]

    setTasks({...tasks})
  }

  return (
    <div className="app">
      {todolists.map(todolist => {
        let filteredTasks = tasks[todolist.id]

        if (todolist.filter === 'active') {
          filteredTasks = tasks[todolist.id].filter(task => !task.isDone)
        }
        if (todolist.filter === 'completed') {
          filteredTasks = tasks[todolist.id].filter(task => task.isDone)
        }

        return <TodolistItem key={todolist.id}
          todolist={todolist}
          tasks={filteredTasks}
          deleteTask={deleteTask}
          changeFilter={changeFilter}
          createTask={createTask}
          changeTaskStatus={changeTaskStatus}
          deleteTodolist={deleteTodolist}
        />
      })}
    </div>
  )
}
