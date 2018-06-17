import {Component, OnInit} from '@angular/core';
import {Task} from '../../models/task';
import {Tasks} from '../../classes/Tasks';
import {MatDialog} from '@angular/material';
import {TaskService} from '../../providers/task.service';

@Component({
  selector: 'app-done-list',
  templateUrl: './done-list.component.html',
  styleUrls: ['./done-list.component.scss']
})
export class DoneListComponent extends Tasks implements OnInit {
  constructor(
    public dialog: MatDialog,
    public taskService: TaskService
  ) {
    super(dialog, taskService);
  }

  ngOnInit() {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks$({completed: true}).subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }
}
