import { Todolist } from "../App"

const initialState: Todolist[] = []

export const todolistsReducer = (state: Todolist[] = initialState, action: any): Todolist[] => {
    switch(action.type) {
        case 'delete_todolist': {
            return state.filter(todolist => todolist.id !== action.payload.id)
        }
        default: 
            return state
    }
}