import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TodosService
{
    constructor(private _http : Http){}   // Injecting the http service
    getTodos()
    {
        return this._http.get('/api/v1/todos')
            .map(res => res.json());
    }

    saveTodo(newTodo)
    {
        let headers = new Headers();
        headers.append('Content-type' , 'application/json');
        return this._http.post('/api/v1/todo' , JSON.stringify(newTodo) , {headers:headers})
            .map(x => x.json());
    }
}