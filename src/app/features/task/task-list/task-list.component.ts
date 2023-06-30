import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/core/services/task.service';
import { TaskDTO } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  isCompleted:boolean = true;
  taskList: TaskDTO[]  = [];

  constructor(private api: TaskService) { }

  getTasks() {

    this.api.getTasks().subscribe({
      next: (data) => {        
        this.taskList = (data as any).data;
      },
      error: (e) => {
        throw new Error('Get data error');
      },
      complete: () => {
        console.log('Completed!');
      }
    })

  }

  ngOnInit(): void {
    this.getTasks();
  }


  delete(idTask: number) {
    if (confirm("¿Está seguro?")) {

      this.api.delete(idTask).subscribe({      
        next: (data) => {
          this.getTasks();
        },
        error: (e) => {
          throw new Error('Error on delete item');
        }
      });

    }

  }

}
