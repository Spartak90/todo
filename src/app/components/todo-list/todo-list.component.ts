import {Component, OnInit} from '@angular/core';
import {Task} from '../../models/task';
import {DeleteTaskEvent} from '../../interfaces/delete-task-event';
import {EditTaskEvent} from '../../interfaces/edit-task-event';
import {MatDialog} from '@angular/material';
import {DeleteTaskComponent} from '../../dialogs/delete-task/delete-task.component';
import {CompletedChangeEvent} from '../../interfaces/completed-change-event';
import {TaskDialogComponent} from '../../dialogs/task-dialog/task-dialog.component';
import {TaskService} from '../../providers/task.service';

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

  constructor(
    private _dialog: MatDialog,
    private _taskService: TaskService
  ) {}

  ngOnInit() {
    this._taskService.getTodoTasks$().subscribe((results: Task[]) => {
      this.tasks = results;
    });
  }

  addNewTodoTask() {
    const dialogRef = this._dialog.open(TaskDialogComponent);

    dialogRef.afterClosed().subscribe(newTask => {
      console.log('add new task');
    });
  }

  onDeleteEvent(ev: DeleteTaskEvent): void {
    const dialogRef = this._dialog.open(DeleteTaskComponent);

    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        console.log('todo');
      }
    });
  }

  onEditEvent(ev: EditTaskEvent): void {
    const dialogRef = this._dialog.open(TaskDialogComponent, {
      data: {
        task: ev.task
      }
    });

    dialogRef.afterClosed().subscribe((task: Task) => {
      console.log('task edited', task);
    });
  }

  onTaskCompletedChange(ev: CompletedChangeEvent) {
    console.log('todo: reflect changes in backend', ev);
  }
}
