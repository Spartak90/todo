import {Component, OnInit} from '@angular/core';
import {Task} from '../../models/task';
import {MatDialog} from '@angular/material';
import {TaskDialogComponent} from '../../dialogs/task-dialog/task-dialog.component';
import {TaskService} from '../../providers/task.service';
import {Tasks} from '../../classes/Tasks';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent extends Tasks implements OnInit  {
  tasks: Task[];

  constructor(
    public dialog: MatDialog,
    public taskService: TaskService
  ) {
    super(dialog, taskService);
  }

  ngOnInit() {
    this.getTasks();
  }

  addNewTodoTask(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent);

    dialogRef.afterClosed().subscribe(newTask => {
      if (!newTask) {
        return;
      }

      this.taskService.addNewTask$(newTask).subscribe(() => {
        this.getTasks();
      });
    });
  }

  getTasks() {
    this.taskService.getTasks$({completed: false}).subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }
}
