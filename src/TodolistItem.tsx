import { type ChangeEvent } from 'react'
import type { FilterValues, Task, Todolist } from './App'
import { CreateItemForm } from './CreateItemForm'
import { EditableSpan } from './EditableSpan'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'

type Props = {
  todolist: Todolist
  tasks: Task[]
  deleteTask: (todolistId: string, taskId: string) => void
  changeFilter: (todolistId: string, filter: FilterValues) => void
  createTask: (todolistId: string, title: string) => void
  changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
  changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
  deleteTodolist: (todolistId: string) => void
  changeTodolistTitle: (todolistId: string, title: string) => void
}

export const TodolistItem = (props: Props) => {
  const {
    todolist: { id, title, filter },
    tasks,
    deleteTask,
    changeFilter,
    createTask,
    changeTaskStatus,
    changeTaskTitle,
    deleteTodolist,
    changeTodolistTitle
  } = props

  const deleteTodolistHandler = () => {
    deleteTodolist(id)
  }

  const createTaskHandler = (itemTitle: string) => {
    createTask(id, itemTitle)
  }

  const changeFilterHandler = (filter: FilterValues) => {
    changeFilter(id, filter)
  }

  const changeTodolistTitleHandler = (title: string) => {
    changeTodolistTitle(id, title)
  }

  return (
    <div>
      <div className='container'>
        <h3>
          <EditableSpan itemTitle={title} onChange={changeTodolistTitleHandler} />
        </h3>
        <IconButton onClick={deleteTodolistHandler}>
          <DeleteIcon />
        </IconButton>
      </div>
      <CreateItemForm createItem={createTaskHandler} />
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map(task => {
            const deleteTaskHandler = () => {
              deleteTask(id, task.id)
            }

            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
              const newStatusValue = e.currentTarget.checked

              changeTaskStatus(id, task.id, newStatusValue)
            }

            const changeTaskTitleHandler = (title: string) => {
              changeTaskTitle(id, task.id, title)
            }

            return (
              <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler} />
                <EditableSpan itemTitle={task.title} onChange={changeTaskTitleHandler} />
                <IconButton onClick={deleteTaskHandler}>
                  <DeleteIcon />
                </IconButton>
              </li>
            )
          })}
        </ul>
      )}
      <div>
        <Button variant={filter === 'all' ? 'outlined' : 'text'}
          color='inherit'
          onClick={() => changeFilterHandler('all')}
        >All</Button>
        <Button variant={filter === 'active' ? 'outlined' : 'text'}
          color='primary'
          onClick={() => changeFilterHandler('active')}
        >Active</Button>
        <Button variant={filter === 'completed' ? 'outlined' : 'text'}
          color='secondary'
          onClick={() => changeFilterHandler('completed')}
        >Completed</Button>
      </div>
    </div>
  )
}
