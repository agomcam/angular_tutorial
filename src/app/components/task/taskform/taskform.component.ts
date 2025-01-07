import {CommonModule} from '@angular/common';
import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {customValidator, customValidatorPriority} from './taskForm.validators';
import {Task, TaskStatus} from '../../../models/task.models';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {TaskService} from '../../../services/task.service';
import exp from 'node:constants';

@Component({
  selector: 'app-taskform',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './taskform.component.html',
  styleUrl: './taskform.component.css'
})
export class TaskformComponent implements OnInit {

  taskToEdit: Task | null = null; // Tarea a editar (null si estamos añadiendo)

  formTaskEdit: FormGroup

  constructor(private taskService: TaskService,private router:Router, private route: ActivatedRoute, formBuilder: FormBuilder) {
    this.formTaskEdit = formBuilder.group({
      'name': ['', [Validators.required, Validators.maxLength(50)]],
      'description': ['', [Validators.required, Validators.maxLength(255)]],
      'priority': ['', [Validators.required, customValidatorPriority()]],
      'expirationDate': ['', [Validators.required, customValidator()]],

    })
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id')
      this.taskService.getTaskById(id!)
        .then((taskVal) => {
          if (taskVal.exists()) {
            this.taskToEdit = taskVal.val();

            if (this.taskToEdit) {
              const expirationDate = this.taskToEdit.expirationDate
                ? new Date(this.taskToEdit.expirationDate).toISOString().slice(0, 16) // Formato YYYY-MM-DDTHH:mm
                : null;

              console.log(this.taskToEdit);
              this.formTaskEdit.patchValue({
                name: this.taskToEdit.name,
                description: this.taskToEdit.description,
                priority: this.taskToEdit.priority,
                expirationDate: expirationDate, // Formato compatible con <input type="datetime-local">
              });
            }
          }
        })
        .catch((error) => {
          console.log(error);
        })
    })
  }

  onSubmit() {
    if (this.formTaskEdit.valid) {
      const taskData = this.formTaskEdit.value;

      if (this.taskToEdit) {
        taskData.id = this.taskToEdit.id;
        taskData.status = this.taskToEdit.status;
      }
      this.taskService.saveTask(taskData)
        .then(() =>{
          this.router.navigate(['/tasks'])
        })
        .catch((error) => {console.log(error);})
      this.formTaskEdit.reset(); // Limpiar el formulario
    } else {
      console.log('El formulario tiene errores:', this.formTaskEdit.errors);
    }
  }


}
