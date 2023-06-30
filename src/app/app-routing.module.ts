import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './features/task/task-list/task-list.component';
import { TaskEditComponent } from './features/task/task-edit/task-edit.component';
import { TaskCreateComponent } from './features/task/task-create/task-create.component';

const routes: Routes = [
  {
    path: '',
    component: TaskListComponent
  },
  {
    path: 'edit/:id',
    component: TaskEditComponent
  },
  {
    path: 'add',
    component: TaskCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
