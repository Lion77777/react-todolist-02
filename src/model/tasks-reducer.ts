import { TaskState } from "../App";

const initialState: TaskState = {}

export const tasksReducer = (state: TaskState = initialState, action: any): TaskState => {
    switch(action.type) {
        default: 
            return state
    }
}