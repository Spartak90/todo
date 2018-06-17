import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Task} from '../models/task';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  url = 'api/tasks';

  constructor(private _httpClient: HttpClient) { }

  addNewTask$(body) {
    return this._httpClient.post(`${this.url}`, body);
  }

  deleteTask$(id) {
    return this._httpClient.delete(`${this.url}/${id}`);
  }

  editTask$(id, body) {
    return this._httpClient.put(`${this.url}/${id}`, body);
  }

  getTasks$(options?) {
    return this._httpClient.get<Task[]>(`${this.url}?completed=${options ? options.completed : undefined}`)
      .pipe(
        map((result) => {
          return result.map((task) => {
            return new Task(task);
          });
        })
      );
  }

  changeTaskStatus$(id, value) {
    return this._httpClient.patch(`${this.url}/${id}`, {completed: value});
  }
}
