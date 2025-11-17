import { v1 } from "uuid";
import { TaskState } from "../App";
import { CreateTodolistAction, DeleteTodolistAction } from "./todolists-reducer";

const initialState: TaskState = {}

export type DeleteTaskAction = ReturnType<typeof deleteTaskAC>
export type CreateTaskAction = ReturnType<typeof createTaskAC>

type Actions = CreateTodolistAction | DeleteTodolistAction | DeleteTaskAction | CreateTaskAction

export const tasksReducer = (state: TaskState = initialState, action: Actions): TaskState => {
    switch(action.type) {
        case 'create_todolist': {
            return {...state, [action.payload.id]: []}
        }
        case 'delete_todolist': {
            const newState = {...state}

            delete newState[action.payload.id]
            
            return newState
        }
        case 'delete_task': {
            const {taskId, todolistId} = action.payload
            const newTasks = state[todolistId].filter(task => task.id !== taskId)

            return {...state, [todolistId]: newTasks}
        }
        case 'create_task': {
            const {todolistId, title} = action.payload
            const newTask = {id: v1(), title, isDone: false}

            return {...state, [todolistId]: [newTask, ...state[todolistId]]}
        }
        default: 
            return state
    }
}

export const deleteTaskAC = (payload: {todolistId: string, taskId: string}) => {
    return {type: 'delete_task', payload} as const
}

export const createTaskAC = (payload: {todolistId: string, title: string}) => {
    return {type: 'create_task', payload} as const
}