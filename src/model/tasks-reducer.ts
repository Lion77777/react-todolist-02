import { TaskState } from "../App";
import { CreateTodolistAction } from "./todolists-reducer";

const initialState: TaskState = {}

type Actions = CreateTodolistAction

export const tasksReducer = (state: TaskState = initialState, action: Actions): TaskState => {
    switch(action.type) {
        case 'create_todolist': {
            return {...state, [action.payload.id]: []}
        }
        default: 
            return state
    }
}