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
        this.todoService.getTodosSubject().subscribe((todos) => {
            this.todos = todos;
        });
    }

    handleKeyUp(newValue: string): void {
        this.inputValue = newValue;
    }

    handleAddBtnClick(): void {
        if (this.inputValue) {
            this.todoService.setTodo({
                id: this.todos.length,
                value: this.inputValue,
            });

            this.inputValue = '';
        }
    }
}
