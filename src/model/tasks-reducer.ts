import { TaskState } from "../App";
import { CreateTodolistAction, DeleteTodolistAction } from "./todolists-reducer";

const initialState: TaskState = {}

type Actions = CreateTodolistAction | DeleteTodolistAction

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
        default: 
            return state
    }
}