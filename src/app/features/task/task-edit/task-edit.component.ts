import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/core/services/task.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  
  errorMessage = '';
  
  constructor(    
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private api: TaskService
    ) { }
    
    mainform = this.fb.group({
      id: [0],
      description: ['', [Validators.required]],
      creationDate: [new Date],
      valid: [true]
    })

    
  ngOnInit(): void {
    this.findById(this.route.snapshot.params['id']); 
  }

  findById(id: string) {
  this.api.findById(id).subscribe({
    next: (data) => {
      
      const d = (data as any).data;

      this.mainform.setValue({
        id: d.id,
        description: d.description,
        creationDate: d.creationDate,
        valid: d.valid
      });

    },
    error: (e) => {
      console.log('Error');
      this.errorMessage = 'Error desconocido';
    }
  });
}
  
  cancel() {
    this.router.navigate(['/']);
  }

  save(form : FormGroup) {
    var taskData = {
      id: form.value.id,
      description: form.value.description,
      valid: form.value.valid
    }

    var formData: any = new FormData();
    formData.append("taskData", JSON.stringify(taskData));

    this.api.update(formData).subscribe({      
      next: (data) => {
        this.cancel();
      },
      error: (e) => {
        console.log('Error');
        this.errorMessage = 'Error desconocido';
      }
    });
  }
  
}
