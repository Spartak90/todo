import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MaterialModule } from './modules/material/material.module';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { DoneListComponent } from './components/done-list/done-list.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { DeleteTaskComponent } from './dialogs/delete-task/delete-task.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    DoneListComponent,
    TaskItemComponent,
    DeleteTaskComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule
  ],
  entryComponents: [
    DeleteTaskComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
