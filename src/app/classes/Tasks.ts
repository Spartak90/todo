import {TaskDialogComponent} from '../dialogs/task-dialog/task-dialog.component';
import {DeleteTaskComponent} from '../dialogs/delete-task/delete-task.component';
import {EditTaskEvent} from '../interfaces/edit-task-event';
import {DeleteTaskEvent} from '../interfaces/delete-task-event';
import {Task} from '../models/task';
import {MatDialog} from '@angular/material';
import {TaskService} from '../providers/task.service';
import {CompletedChangeEvent} from '../interfaces/completed-change-event';
import {timer} from 'rxjs/internal/observable/timer';

export class Tasks {
  tasks: Task[];

  constructor(
    public dialog: MatDialog,
    public taskService: TaskService
  ) {}

  getTasks() {
    this.taskService.getTasks$().subscribe((results: Task[]) => {
      this.tasks = results;
    });
  }

  onDeleteEvent(ev: DeleteTaskEvent): void {
    const dialogRef = this.dialog.open(DeleteTaskComponent);

    dialogRef.afterClosed().subscribe(confirm => {
      if (!confirm) {
        return;
      }

      this.taskService.deleteTask$(ev.id).subscribe(() => {
        this.getTasks();
      });
    });
  }

  onEditEvent(ev: EditTaskEvent): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '300px',
      data: {
        task: ev.task
      }
    });

    dialogRef.afterClosed().subscribe((task: Task) => {
      if (!task) {
        return;
      }

      this.taskService.editTask$(task.id, task).subscribe(() => {
        this.getTasks();
      });
    });
  }

  onTaskCompletedChange(ev: CompletedChangeEvent): void {
    this.taskService.changeTaskStatus$(ev.id, ev.completed)
      .subscribe((res) => {
        timer(750).subscribe(() => {
          this.getTasks();
        });
      });
  }
}
