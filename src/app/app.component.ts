import { Component, OnInit } from '@angular/core';

import { TodoService } from './todo.service';
import { TodoItem } from './app.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    inputValue: string;
    todos: TodoItem[] = [];

    constructor(private readonly todoService: TodoService) {
        this.inputValue = '';
    }

    ngOnInit(): void {
        this.getTodos();
    }

    private getTodos(): void {
        this.todoService.getTodos().subscribe((data) => {
            this.todos = data.map((e) => {
                const todoItem = e.payload.doc.data() as TodoItem;
                const { id } = e.payload.doc;

                return {
                    id,
                    ...todoItem,
                };
            });

            this.todoService.todoItems = this.todos;
        });
    }

    handleKeyUp(newValue: string): void {
        this.inputValue = newValue;
    }

    handleAddBtnClick(): void {
        if (this.inputValue) {
            this.todoService.addTodoItem({
                value: this.inputValue,
                isDone: false,
                timestamp: new Date(),
            });

            this.inputValue = '';
        }
    }
}
