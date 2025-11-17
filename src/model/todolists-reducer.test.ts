import { v1 } from 'uuid'
import {expect, test} from 'vitest'
import { Todolist } from '../App'
import { createTodolistAC, deleteTodolistAC, todolistsReducer } from './todolists-reducer'

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

test('correct todolist should be created', () => {
    const todolist1 = v1()
    const todolist2 = v1()

    const startState: Todolist[] = [
        {id: todolist1, title: 'Learn React', filter: 'all'},
        {id: todolist2, title: 'Learn Redux', filter: 'all'},
    ]

    const title = 'New Todolist'

    const endState = todolistsReducer(startState, createTodolistAC(title))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(title)
})