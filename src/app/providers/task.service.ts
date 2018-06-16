import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  url = '/api/tasks';

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

  getTodoTasks$(options?) {
    return this._httpClient.get(`${this.url}?completed=false`);
  }

  getCompletedTasks$() {
    return this._httpClient.get(`${this.url}/completed=true`);
  }
}
