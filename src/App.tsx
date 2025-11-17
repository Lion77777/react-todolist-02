import './App.css'
import { useReducer, useState } from 'react'
import { v1 } from 'uuid'
import { TodolistItem } from './TodolistItem'
import { CreateItemForm } from './CreateItemForm'
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import MenuIcon from '@material-ui/icons/Menu'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { NavButton } from './NavButton'
import { containerSx } from './TodolistItem.styles'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import { changeTodolistFilterAC, changeTodolistTitleAC, createTodolistAC, deleteTodolistAC, todolistsReducer } from './model/todolists-reducer'
import { createTaskAC, tasksReducer } from './model/tasks-reducer'

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

type ThemeMode = 'dark' | 'light'

export const App = () => {
  const [todolists, dispatchTodolists] = useReducer(todolistsReducer, [])

  // const [tasks, setTasks] = useState<TaskState>({})
  const [tasks, dispatchTasks] = useReducer(tasksReducer, {})

  const [themeMode, setThemeMode] = useState<ThemeMode>('light')

  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: '#087ea4'
      }
    }
  })

  const changeMode = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light')
  }

  const deleteTask = (todolistId: string, taskId: string) => {
    // const filteredTasks = tasks[todolistId].filter(task => {
    //   return task.id !== taskId
    // })

    // setTasks((prev) => ({ ...prev, [todolistId]: filteredTasks }))
  }

  const changeFilter = (todolistId: string, filter: FilterValues) => {
    dispatchTodolists(changeTodolistFilterAC({id: todolistId, filter}))
  }

  const changeTodolistTitle = (todolistId: string, title: string) => {
    dispatchTodolists(changeTodolistTitleAC({id: todolistId, title}))
  }

  const createTask = (todolistId: string, title: string) => {
    // const newTask = { id: v1(), title, isDone: false }
    // const newTasks = [newTask, ...tasks[todolistId]]

    // setTasks((prev) => ({ ...prev, [todolistId]: newTasks }))

    dispatchTasks(createTaskAC({todolistId, title}))
  }

  const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    const newState = tasks[todolistId].map(task => task.id == taskId ? { ...task, isDone } : task)

    setTasks(prev => ({ ...prev, [todolistId]: newState }))
  }

  const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
    const newState = tasks[todolistId].map(task => task.id == taskId ? { ...task, title } : task)

    setTasks(prev => ({ ...prev, [todolistId]: newState }))
  }

  const deleteTodolist = (todolistId: string) => {
    dispatchTodolists(deleteTodolistAC(todolistId))

    delete tasks[todolistId]

    setTasks({ ...tasks })
  }

  const createTodolist = (title: string) => {
    const action = createTodolistAC(title)

    dispatchTodolists(action)
    // setTasks(prev => ({ [action.payload.id]: [], ...prev }))
    dispatchTasks(action)
  }

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position='static' sx={{ mb: '30px' }}>
          <Toolbar>
            <Container maxWidth={'lg'} sx={containerSx}>
              <IconButton color='inherit'>
                <MenuIcon />
              </IconButton>
              <div>
                <NavButton>Sign In</NavButton>
                <NavButton>Sign Up</NavButton>
                <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                <Switch color='default' onChange={changeMode} />
              </div>
            </Container>
          </Toolbar>
        </AppBar>
        <Container>
          <Grid container sx={{ mb: '30px' }}>
            <CreateItemForm createItem={createTodolist} />
          </Grid>
          <Grid container spacing={4}>
            {todolists.map(todolist => {
              let filteredTasks = tasks[todolist.id]

              if (todolist.filter === 'active') {
                filteredTasks = tasks[todolist.id].filter(task => !task.isDone)
              }
              if (todolist.filter === 'completed') {
                filteredTasks = tasks[todolist.id].filter(task => task.isDone)
              }

              return (
                <Grid key={todolist.id}>
                  <Paper sx={{ p: '0 20px 20px 20px' }}>
                    <TodolistItem todolist={todolist}
                      tasks={filteredTasks}
                      deleteTask={deleteTask}
                      changeFilter={changeFilter}
                      createTask={createTask}
                      changeTaskStatus={changeTaskStatus}
                      changeTaskTitle={changeTaskTitle}
                      deleteTodolist={deleteTodolist}
                      changeTodolistTitle={changeTodolistTitle}
                    />
                  </Paper>
                </Grid>
              )
            })}
          </Grid>
        </Container>
      </ThemeProvider>
    </div>
  )
}
