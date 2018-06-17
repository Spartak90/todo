import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MaterialModule } from './modules/material/material.module';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { DoneListComponent } from './components/done-list/done-list.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { DeleteTaskComponent } from './dialogs/delete-task/delete-task.component';
import { TaskDialogComponent } from './dialogs/task-dialog/task-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TaskService} from './providers/task.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    DoneListComponent,
    TaskItemComponent,
    DeleteTaskComponent,
    TaskDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    DeleteTaskComponent,
    TaskDialogComponent
  ],
  providers: [
    TaskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
