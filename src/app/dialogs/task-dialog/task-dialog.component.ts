
import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Task} from '../../models/task';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent implements OnInit {
  task: Task;

  constructor(
    private _dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    if (this.data && this.data.task) {
      this.task = Object.assign(this.data.task);
    } else {
      this.task = new Task();
    }
  }

  onClose() {
    this._dialogRef.close();
  }

  onSave() {
    this._dialogRef.close();
  }
}
