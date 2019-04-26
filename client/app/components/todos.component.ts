import { Component  , OnInit} from '@angular/core';
import {TodosService} from '../services/todos.service';
import {Todos} from '../../Todos';

@Component({
    moduleId : module.id,
    selector: 'todos',
    templateUrl: 'todos.component.html',
    providers : [TodosService]
})
export class TodosComponent implements OnInit
{
    constructor(private _todos : TodosService){}
    todos : Todos[];

    ngOnInit()
    {
        this.todos = [];
        this._todos.getTodos()
            .subscribe(todos =>{
                this.todos = todos;
            })
    }

    addTodo(newTodo)
    {
        let result;
        let todo = {
            text : newTodo.value,
            isCompleted : false
        };
        result = this._todos.saveTodo(todo);
        result.subscribe(x => {
                this.todos.push(x);
                newTodo.value = "";
            });
    }

    editState(todo , state)
    {
        
    }
}
