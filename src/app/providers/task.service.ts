import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Task} from '../models/task';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  url = 'api/tasks';

  constructor(private _httpClient: HttpClient) { }

  addNewTask$(body): Observable<Task> {
    return this._httpClient.post<Task>(`${this.url}`, body);
  }

  deleteTask$(id): Observable<Object> {
    return this._httpClient.delete(`${this.url}/${id}`);
  }

  editTask$(id, body): Observable<Task> {
    return this._httpClient.put<Task>(`${this.url}/${id}`, body);
  }

  getTasks$(options?): Observable<Task[]> {
    return this._httpClient.get<Task[]>(`${this.url}?completed=${options ? options.completed : undefined}`)
      .pipe(
        map((result) => {
          return result.map((task) => {
            return new Task(task);
          });
        })
      );
  }

  changeTaskStatus$(id, value): Observable<Task> {
    return this._httpClient.patch<Task>(`${this.url}/${id}`, {completed: value});
  }
}
