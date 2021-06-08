import { Todo } from '../modles/todo';

let todos: Todo[] = [];

type ReqBody = { text: string };
type ReqParams = { todoId: string };

export function getTodo(req: any, res: any, next: any) {
	return res.status(200).json({ todo: todos });
}

export function postTodo(req: any, res: any, next: any) {
	const body = req.body as ReqBody;
	const newTodo: Todo = {
		id: new Date().toISOString(),
		text: body.text,
	};

	todos.push(newTodo);
	return res
		.status(201)
		.json({ message: 'Added Sucessfully', todo: newTodo });
}

export function putTodo(req: any, res: any, next: any) {
	const params = req.params as ReqParams;
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

export function deleteTodo(req: any, res: any, next: any) {
	const params = req.params as ReqParams;
	todos = todos.filter((todoItem) => todoItem.id !== params.todoId);
	return res.status(200).json({ message: 'Deleted Sucessfully' });
}
