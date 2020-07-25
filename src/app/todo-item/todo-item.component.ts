import { Component, Input } from '@angular/core';

import { TodoItem } from '../app.model';
import { TodoService } from '../todo.service';

@Component({
    selector: 'app-todo-item',
    templateUrl: './todo-item.component.html',
    styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
    @Input() item: TodoItem;

    constructor(private readonly todoService: TodoService) {}

    handleDeleteBtnClick(todoId: number): void {
        this.todoService.removeTodoItem(todoId);
    }

    handleCheckboxBtnClick(todoId: number, isDone: boolean): void {
        this.todoService.toggleDoneStateById(todoId, isDone);
    }
}
