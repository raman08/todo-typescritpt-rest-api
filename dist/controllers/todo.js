"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.putTodo = exports.postTodo = exports.getTodo = void 0;
let todos = [];
function getTodo(req, res, next) {
    return res.status(200).json({ todo: todos });
}
exports.getTodo = getTodo;
function postTodo(req, res, next) {
    const body = req.body;
    const newTodo = {
        id: new Date().toISOString(),
        text: body.text,
    };
    todos.push(newTodo);
    return res
        .status(201)
        .json({ message: 'Added Sucessfully', todo: newTodo });
}
exports.postTodo = postTodo;
function putTodo(req, res, next) {
    const params = req.params;
    const todoId = params.todoId;
    const todoIndex = todos.findIndex((todoItem) => todoItem.id === todoId);
    if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: req.body.text };
        return res
            .status(200)
            .json({ message: 'Updated Sucessfully', todos: todos });
    }
    res.status(404).json({ message: 'No todo item found' });
}
exports.putTodo = putTodo;
function deleteTodo(req, res, next) {
    const params = req.params;
    todos = todos.filter((todoItem) => todoItem.id !== params.todoId);
    return res.status(200).json({ message: 'Deleted Sucessfully' });
}
exports.deleteTodo = deleteTodo;
