import {CommonModule} from '@angular/common';
import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {customValidator, customValidatorPriority} from './taskForm.validators';
import {Task, TaskStatus} from '../../../models/task.models';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {TaskService} from '../../../services/task.service';

@Component({
  selector: 'app-taskform',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './taskform.component.html',
  styleUrl: './taskform.component.css'
})
export class TaskformComponent implements OnChanges, OnInit {

  @Input()
  taskToEdit: Task | null = null; // Tarea a editar (null si estamos añadiendo)

  formTaskEdit: FormGroup

  constructor(private taskService: TaskService, private route: ActivatedRoute, formBuilder: FormBuilder) {
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
      console.log(id)
    })
  }

  @Output() formSubmit = new EventEmitter<Task>();

  onSubmit() {
    if (this.formTaskEdit.valid) {
      const taskData = this.formTaskEdit.value;

      if (this.taskToEdit) {
        // Editar tarea existente
        const updatedTask: Task = {
          ...this.taskToEdit,
          ...taskData,
          expirationDate: new Date(taskData.expirationDate),
        };
        console.log('Editando tarea:', updatedTask);
        this.formSubmit.emit(updatedTask); // Emitir la tarea editada
      } else {
        // Añadir nueva tarea
        const newTask: Task = new Task(
          taskData.id = -1, // Generar ID aleatorio
          taskData.name,
          taskData.description,
          taskData.priority,
          TaskStatus.PENDING,
          new Date(taskData.expirationDate),
          new Date(), // Fecha de creación
          false
        );
        console.log('Añadiendo nueva tarea:', newTask);
        this.formSubmit.emit(newTask); // Emitir nueva tarea
      }

      this.formTaskEdit.reset(); // Limpiar el formulario
    } else {
      console.log('El formulario tiene errores:', this.formTaskEdit.errors);
    }
  }




  ngOnChanges(changes: SimpleChanges): void {
    if (changes['taskToEdit'] && changes['taskToEdit'].currentValue) {
      // Modo edición: llenar el formulario
      const task = changes['taskToEdit'].currentValue;
      this.formTaskEdit.patchValue({
        name: task.name,
        description: task.description,
        priority: task.priority,
        expirationDate: task.expirationDate.toISOString().slice(0, 16),
      });
    } else {
      // Modo creación: limpiar el formulario
      this.formTaskEdit.reset();
    }
  }




}
