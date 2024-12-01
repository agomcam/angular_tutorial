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

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.tasklist = this.taskService.getTasks()
  }

  taskToEdit: Task | null = null; // Tarea actualmente en edición

  addNewTask(task: Task) {
    this.taskService.addNewTask(task)
  }

  saveTask(updatedTask: Task) {
    this.taskService.saveTask(updatedTask)
  }

  setTaskToEdit(task: Task) {
    this.taskService.setTaskToEdit(task)
  }


  modifyTask(taskEvent: TaskEvent) {
    this.taskService.modifyTask(taskEvent)
  }
}
