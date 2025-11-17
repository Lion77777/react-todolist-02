import { v1 } from "uuid";
import { beforeEach, expect, test } from "vitest";
import { TaskState } from "../App";
import { tasksReducer } from "./tasks-reducer";
import { createTodolistAC, deleteTodolistAC } from "./todolists-reducer";

let todolistId1: string
let todolistId2: string
let startState: TaskState = {}

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = {
        [todolistId1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },
        ],
        [todolistId2]: [
            { id: v1(), title: 'Milk', isDone: true },
            { id: v1(), title: 'Bread', isDone: true },
            { id: v1(), title: 'Juice', isDone: false },
        ]
    }
})

test('array should be created for new todolist', () => {
    const endState = tasksReducer(startState, createTodolistAC('New Todolist'))

    const keys = Object.keys(endState)
    const newKey = keys.find(key => key !== todolistId1 && key !== todolistId2)

    if(!newKey) {
        throw Error('New key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('todolist with tasks should be deleted', () => {
    const endState = tasksReducer(startState, deleteTodolistAC(todolistId1))

    const keys = Object.keys(endState)

    expect(endState[todolistId1]).toBeUndefined()
    expect(keys.length).toBe(1)
})