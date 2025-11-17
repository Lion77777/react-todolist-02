import { v1 } from "uuid";
import { beforeEach, expect, test } from "vitest";
import { TaskState } from "../App";
import { deleteTaskAC, tasksReducer } from "./tasks-reducer";
import { createTodolistAC, deleteTodolistAC } from "./todolists-reducer";

let todolistId1: string
let todolistId2: string
let startState: TaskState = {}

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = {
        [todolistId1]: [
            { id: '1', title: 'HTML&CSS', isDone: true },
            { id: '2', title: 'JS', isDone: true },
            { id: '3', title: 'ReactJS', isDone: false },
        ],
        [todolistId2]: [
            { id: '1', title: 'Milk', isDone: true },
            { id: '2', title: 'Bread', isDone: true },
            { id: '3', title: 'Juice', isDone: false },
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

test('correct task should be deleted', () => {
    const endState = tasksReducer(startState, deleteTaskAC({todolistId: todolistId1, taskId: '2'}))

    expect(endState[todolistId1].length).toBe(2)
    expect(endState[todolistId1]['2']).not.toBeDefined()
})