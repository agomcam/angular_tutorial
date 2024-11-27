import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {customValidator} from './taskForm.validators';

@Component({
  selector: 'app-taskform',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './taskform.component.html',
  styleUrl: './taskform.component.css'
})
export class TaskformComponent {
  formTaskEdit: FormGroup

  constructor(formBuilder: FormBuilder) {
    this.formTaskEdit = formBuilder.group({
      'name': ['', [Validators.required, Validators.maxLength(50),Validators.minLength(2)]],
      'description': ['', [Validators.required]],
      'priority': ['', [Validators.required]],
      'expirationDate': ['', [Validators.required, customValidator()]],

    })
  }

  onSubmit() {


    if (this.formTaskEdit.valid) {
      console.log(this.formTaskEdit.value)
    } else {
      console.log(`El formulario tiene errores ${this.formTaskEdit.errors}`)
    }
  }

}
