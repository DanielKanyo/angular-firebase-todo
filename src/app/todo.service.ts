import { Injectable } from '@angular/core';

import { TodoItem } from './app.model';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TodoService {
    private todos: TodoItem[] = [];
    todosSubject = new Subject<TodoItem[]>();

    constructor() {}

    getTodosSubject(): Subject<TodoItem[]> {
        return this.todosSubject;
    }

    getTodos(): TodoItem[] {
        return this.todos;
    }

    setTodo(todo: TodoItem): void {
        this.todos.push(todo);
        this.todosSubject.next(this.todos);
    }

    setTodos(todos: TodoItem[]): void {
        this.todos = todos;
        this.todosSubject.next(this.todos);
    }

    removeTodoItem(id: number): void {
        const todos = this.todos.filter((element) => element.id !== id);

        this.setTodos(todos);
    }
}
