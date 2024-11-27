import { CommonModule } from '@angular/common';
import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {customValidator, customValidatorPriority} from './taskForm.validators';
import {Task, TaskStatus} from '../../../models/task.models';

@Component({
  selector: 'app-taskform',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './taskform.component.html',
  styleUrl: './taskform.component.css'
})
export class TaskformComponent {

  @Input()
  taskToEdit: Task | null = null; // Tarea a editar (null si estamos añadiendo)
  @Output()
  saveTask = new EventEmitter<Task>(); // Emitir tarea editada
  @Output()
  addTask = new EventEmitter<Task>(); // Emitir nueva tarea

  formTaskEdit: FormGroup

  constructor(formBuilder: FormBuilder) {
    this.formTaskEdit = formBuilder.group({
      'name': ['', [Validators.required, Validators.maxLength(50)]],
      'description': ['', [Validators.required, Validators.maxLength(255)]],
      'priority': ['', [Validators.required, customValidatorPriority()]],
      'expirationDate': ['', [Validators.required, customValidator()]],

    })
  }

  onSubmit() {
    if (this.formTaskEdit.valid) {
      if (this.taskToEdit) {
        // Editar tarea existente
        const updatedTask: Task = {
          ...this.taskToEdit,
          ...this.formTaskEdit.value,
          expirationDate: new Date(this.formTaskEdit.value.expirationDate),
        };
        this.saveTask.emit(updatedTask); // Emitir tarea editada
      } else {
        // Añadir nueva tarea
        const newTask: Task = new Task(
          Math.floor(Math.random() * 1000000), // ID aleatorio
          this.formTaskEdit.value.name,
          this.formTaskEdit.value.description,
          this.formTaskEdit.value.priority,
          TaskStatus.PENDING,
          new Date(this.formTaskEdit.value.expirationDate),
          new Date(), // Fecha de creación
          false
        );
        this.addTask.emit(newTask); // Emitir nueva tarea
      }

      this.formTaskEdit.reset(); // Limpiar el formulario después de guardar
    } else {
      console.log('El formulario tiene errores:', this.formTaskEdit.errors);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['taskToEdit'] && this.taskToEdit) {
      // Cargar los valores de la tarea en el formulario
      this.formTaskEdit.patchValue({
        name: this.taskToEdit.name,
        description: this.taskToEdit.description,
        priority: this.taskToEdit.priority,
        expirationDate: this.taskToEdit.expirationDate.toISOString().slice(0, 16),
      });
    } else {
      // Limpiar el formulario si no hay tarea en edición
      this.formTaskEdit.reset();
    }
  }

}
