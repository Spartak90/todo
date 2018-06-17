
import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Task} from '../../models/task';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent implements OnInit, OnDestroy {
  task: Task;

  taskNameFc = new FormControl(undefined, [Validators.required]);
  taskNameSubscription;

  constructor(
    private _dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    if (this.data && this.data.task) {
      this.task = new Task(this.data.task);
    } else {
      this.task = new Task({completed: false});
    }

    this.taskNameFc.setValue(this.task.name);

    this.taskNameSubscription = this.taskNameFc.valueChanges.subscribe((value) => {
      this.task.name = value;
    });
  }

  ngOnDestroy() {
    this.taskNameSubscription.unsubscribe();
  }

  onClose(): void {
    this._dialogRef.close();
  }

  onSave(): void {
    this._dialogRef.close(this.task);
  }
}
