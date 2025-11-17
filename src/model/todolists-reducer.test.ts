import { v1 } from 'uuid'
import {expect, test} from 'vitest'
import { Todolist } from '../App'
import { deleteTodolistAC, todolistsReducer } from './todolists-reducer'

test('correct todolist should be deleted', () => {
    const todolist1 = v1()
    const todolist2 = v1()

    const startState: Todolist[] = [
        {id: todolist1, title: 'Learn React', filter: 'all'},
        {id: todolist2, title: 'Learn Redux', filter: 'all'},
    ]

    const endState = todolistsReducer(startState, deleteTodolistAC(todolist1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolist2)
})