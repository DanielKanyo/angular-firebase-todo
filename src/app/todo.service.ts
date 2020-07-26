import { Injectable } from '@angular/core';
import {
    AngularFirestore,
    DocumentChangeAction,
    DocumentReference,
    AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { TodoItemDTO, TodoItem } from './app.model';

@Injectable({
    providedIn: 'root',
})
export class TodoService {
    private todos: TodoItem[] = [];

    constructor(private readonly firestore: AngularFirestore) {}

    set todoItems(todoItems: TodoItem[]) {
        this.todos = todoItems;
    }

    get todoItems(): TodoItem[] {
        return this.todos;
    }

    getTodos(): Observable<DocumentChangeAction<unknown>[]> {
        return this.firestore
            .collection('todos', (ref) => ref.orderBy('timestamp'))
            .snapshotChanges();
    }

    addTodoItem(todoItem: TodoItemDTO): Promise<DocumentReference> {
        return this.firestore.collection('todos').add(todoItem);
    }

    removeTodoItemById(todoId: number): void {
        this.firestore.doc(`todos/${todoId}`).delete();
    }

    toggleDoneStateById(todoId: number, doneState: boolean): void {
        const todoItem = this.todos.find((item) => item.id === todoId);
        todoItem.isDone = doneState;

        this.firestore.doc(`todos/${todoId}`).update(todoItem);
    }
}
