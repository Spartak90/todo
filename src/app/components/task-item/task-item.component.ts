import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatCheckboxChange} from '@angular/material';
import {Task} from '../../models/task';
import {DeleteTaskEvent} from '../../interfaces/delete-task-event';
import {EditTaskEvent} from '../../interfaces/edit-task-event';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {
  @Input() task: Task;

  @Output()
    deleteEvent = new EventEmitter<DeleteTaskEvent>();

  @Output()
    editEvent = new EventEmitter<EditTaskEvent>();

  @Output()
    statusChangeEvent = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  onCheckboxChange(ev: MatCheckboxChange): void {
    this.task.completed = ev.checked;
    this.statusChangeEvent.emit({id: this.task.id, completed: ev.checked});
  }

  onDelete(): void {
    this.deleteEvent.emit({id: this.task.id});
  }

  onEdit(): void {
    this.editEvent.emit({task: this.task});
  }
}
