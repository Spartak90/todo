import {Component, OnInit} from '@angular/core';
import {Task} from '../../models/task';
import {DeleteTaskEvent} from '../../interfaces/delete-task-event';
import {EditTaskEvent} from '../../interfaces/edit-task-event';
import {MatDialog} from '@angular/material';
import {DeleteTaskComponent} from '../../dialogs/delete-task/delete-task.component';
import {CompletedChangeEvent} from '../../interfaces/completed-change-event';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  tasks: Task[] = [
    new Task({
      id: '1',
      name: 'Finish todo for ikub',
      completed: false
    }),

    new Task({
      id: '1',
      name: 'Upload todo app in github',
      completed: false
    })
  ];

  constructor(private _dialog: MatDialog) {}

  ngOnInit() {}

  onDeleteEvent(ev: DeleteTaskEvent): void {
    const dialogRef = this._dialog.open(DeleteTaskComponent);

    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        console.log('todo');
      }
    });
  }

  onEditEvent(ev: EditTaskEvent): void {
    console.log('todo: edit task number', ev);
  }

  onTaskCompletedChange(ev: CompletedChangeEvent) {
    console.log('todo: reflect changes in backend', ev);
  }
}
