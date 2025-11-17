import { TaskState } from "../App";
import { CreateTodolistAction, DeleteTodolistAction } from "./todolists-reducer";

const initialState: TaskState = {}

export type DeleteTaskAction = ReturnType<typeof deleteTaskAC>

type Actions = CreateTodolistAction | DeleteTodolistAction | DeleteTaskAction

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
        default: 
            return state
    }
}

export const deleteTaskAC = (payload: {todolistId: string, taskId: string}) => {
    return {type: 'delete_task', payload} as const
}