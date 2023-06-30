import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/core/services/task.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {

  constructor(    
    private fb: FormBuilder,
    private router: Router,
    private api: TaskService
    ) { }

  ngOnInit(): void {
    
  }

  mainform = this.fb.group({
    description: ['', [Validators.required]],
    valid: ['']
  })

  cancel() {
    this.router.navigate(['/']);
  }

  save(form : FormGroup) {

    var taskData = {
      description: form.value.description,
      valid: form.value.valid,
      creationDate: new Date()
    }

    var formData: any = new FormData();
    formData.append("taskData", JSON.stringify(taskData));

    this.api.save(formData).subscribe({      
      next: (data) => {
        this.cancel();
      },
      error: (e) => {
        throw new Error('Error on add item');
      }
    });

  }


}
