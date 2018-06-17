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
  tasks: Task[];

  constructor(
    private _dialog: MatDialog,
    private _taskService: TaskService
  ) {}

  ngOnInit() {
    this.getTasks();
  }

  addNewTodoTask(): void {
    const dialogRef = this._dialog.open(TaskDialogComponent);

    dialogRef.afterClosed().subscribe(newTask => {
      if (!newTask) {
        return;
      }

      this._taskService.addNewTask$(newTask).subscribe(() => {
        this.getTasks();
      });
    });
  }

  getTasks() {
    this._taskService.getTodoTasks$().subscribe((results: Task[]) => {
      this.tasks = results;
    });
  }

  onDeleteEvent(ev: DeleteTaskEvent): void {
    const dialogRef = this._dialog.open(DeleteTaskComponent);

    dialogRef.afterClosed().subscribe(confirm => {
      if (!confirm) {
        return;
      }

      this._taskService.deleteTask$(ev.id).subscribe(() => {
        this.getTasks();
      });
    });
  }

  onEditEvent(ev: EditTaskEvent): void {
    const dialogRef = this._dialog.open(TaskDialogComponent, {
      data: {
        task: ev.task
      }
    });

    dialogRef.afterClosed().subscribe((task: Task) => {
      if (!task) {
        return;
      }

      this._taskService.editTask$(task.id, task).subscribe(() => {
        this.getTasks();
      });
    });
  }

  onTaskCompletedChange(ev: CompletedChangeEvent) {
    this._taskService.changeTaskStatus$(ev.id, ev.completed)
      .subscribe(() => {
        const index = this.tasks.findIndex((task: Task) => {
          return task.id === ev.id;
        });

        this.tasks.push(this.tasks.splice(index, 1)[0]);
      });
  }
}
