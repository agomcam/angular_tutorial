import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task, TaskPriority, TaskStatus } from '../../../models/task.models';
import { CommonModule } from '@angular/common';
import { TaskEvent } from '../../../models/TaskEvent.models';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css'
})


export class ResumeComponent {
  @Input()
  task: Task = new Task(1, "Tarea 1", "Descripción Tarea 1", TaskPriority.LOW, TaskStatus.PENDING, new Date("11/1/2024"), new Date("11/18/2024"), false);

  @Output()
  eventTaskModify = new EventEmitter<TaskEvent>();

  @Output()
  editTask = new EventEmitter<Task>();

  setStatus(id: number) {
    this.eventTaskModify.emit(new TaskEvent("setStatus", this.task.id))

  }

  deleteTask(id: number) {

    this.eventTaskModify.emit(new TaskEvent("deleteTask", this.task.id))
  }


  lowerPriority(id: number) {
    this.eventTaskModify.emit(new TaskEvent("lowerPriority", this.task.id))
  }


  raiseifpriority(id: number) {
    this.eventTaskModify.emit(new TaskEvent("raiseifpriority", this.task.id))
  }

  onEditTask() {
    this.editTask.emit(this.task); // Emitir la tarea actual para ser editada
  }
}
