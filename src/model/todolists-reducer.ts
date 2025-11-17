import { v1 } from "uuid"
import { FilterValues, Todolist } from "../App"

const initialState: Todolist[] = []

export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>
export type ChangeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterAction = ReturnType<typeof changeTodolistFilterAC>

type Actions = DeleteTodolistAction | CreateTodolistAction | ChangeTodolistTitleAction | ChangeTodolistFilterAction

export const todolistsReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
    switch(action.type) {
        case 'delete_todolist': {
            return state.filter(todolist => todolist.id !== action.payload.id)
        }
        case 'create_todolist': {
            const newTodolist: Todolist = {id: action.payload.id, title: action.payload.title, filter: 'all'}

            return [newTodolist, ...state]
        }
        case 'change_todolist_title': {
            const {id, title} = action.payload
            const changedTodolists = state.map(todolist => todolist.id === id ? {...todolist, title} : todolist)

            return changedTodolists
        }
        case 'change_todolist_filter': {
            const {id, filter} = action.payload
            const changedTodolists = state.map(todolist => todolist.id === id ? {...todolist, filter} : todolist)

            return changedTodolists
        }
        default: 
            return state
    }
}

export const deleteTodolistAC = (id: string) => {
    return {type: 'delete_todolist', payload: {id}} as const
}

export const createTodolistAC = (title: string) => {
    return {type: 'create_todolist', payload: {id: v1(), title}} as const
}

export const changeTodolistTitleAC = (payload: {id: string, title: string}) => {
    return {type: 'change_todolist_title', payload} as const
}

export const changeTodolistFilterAC = (payload: {id: string, filter: FilterValues}) => {
    return {type: 'change_todolist_filter', payload} as const
}