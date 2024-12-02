import {Component, OnInit} from '@angular/core';
import {Task, TaskPriority, TaskStatus} from '../../../models/task.models';
import {CommonModule} from '@angular/common';
import {ResumeComponent} from '../resume/resume.component';
import {TaskEvent} from '../../../models/TaskEvent.models';
import {TaskformComponent} from '../taskform/taskform.component';
import {TaskService} from '../../../services/task.service';

@Component({
  selector: 'app-tasklist',
  standalone: true,
  imports: [CommonModule, ResumeComponent, TaskformComponent],
  templateUrl: './tasklist.component.html',
  styleUrl: './tasklist.component.css'
})
export class TasklistComponent implements OnInit {

  tasklist: Task[] = [];

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.tasklist = this.taskService.getTasks()
  }

  taskToEdit: Task | null = null; // Tarea actualmente en edición


  setTaskToEdit(task: Task) {
    this.taskService.setTaskToEdit(task);
    this.taskToEdit = this.taskService.taskToEdit;
  }

  saveTask(task: Task) {
    if (task.id > 0) {
      // Editar tarea existente
      console.log('Guardando tarea editada:', task);
      this.taskService.saveTask(task);
    } else {
      task.id = Math.floor(Math.random() * 1000000)
      console.log('Guardando nueva tarea:', task);
      this.taskService.addNewTask(task);
    }
    this.tasklist = [...this.taskService.getTasks()]; // Actualizar la lista de tareas
    this.taskToEdit = null; // Limpiar el modo de edición
  }


  modifyTask(taskEvent: TaskEvent) {
    this.taskService.modifyTask(taskEvent)
  }
}
