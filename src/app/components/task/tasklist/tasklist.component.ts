import { Component } from '@angular/core';
import { Task, TaskPriority, TaskStatus } from '../../../models/task.models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasklist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tasklist.component.html',
  styleUrl: './tasklist.component.css'
})
export class TasklistComponent {
  tasklist: Task[] = [
    new Task(1, "Tarea 1", "Descripción Tarea 1", TaskPriority.LOW, TaskStatus.PENDING, new Date("11/1/2024"), new Date("11/18/2024"), false),
    new Task(2, "Tarea 2", "Descripción Tarea 2", TaskPriority.HIGH, TaskStatus.IN_PROGRESS, new Date("11/5/2024"), new Date("11/16/2024"), false),
    new Task(3, "Tarea 3", "Descripción Tarea 3", TaskPriority.LOW, TaskStatus.IN_PROGRESS, new Date("11/21/2024"), new Date("11/30/2024"), false),
    new Task(4, "Tarea 4", "Descripción Tarea 4", TaskPriority.HIGH, TaskStatus.COMPLETED, new Date("11/8/2024"), new Date("11/21/2024"), false),
    new Task(5, "Tarea 5", "Descripción Tarea 5", TaskPriority.MEDIUM, TaskStatus.PENDING, new Date("11/10/2024"), new Date("11/30/2024"), false)
  ]

  setStatus(id: number) {
    for (let index = 0; index < this.tasklist.length; index++) {
      if (this.tasklist[index].id == id) {
        if (this.tasklist[index].status == TaskStatus.COMPLETED) {
          this.tasklist[index].status = TaskStatus.PENDING
        } else if (this.tasklist[index].status == TaskStatus.IN_PROGRESS) {
          this.tasklist[index].status = TaskStatus.COMPLETED
        } else {
          this.tasklist[index].status = TaskStatus.IN_PROGRESS
        }

        break;
      }
    }

  }

  deleteTask(id: number) {
    for (let index = 0; index < this.tasklist.length; index++) {
      if (this.tasklist[index].id == id) {
        this.tasklist[index].isDelete = true;
        break;
      }

    }
  }


  lowerPriority(id: number) {
    for (let index = 0; index < this.tasklist.length; index++) {
      if (this.tasklist[index].id == id) {
        if (this.tasklist[index].priority == TaskPriority.HIGH) {
          this.tasklist[index].priority = TaskPriority.MEDIUM
        } else if (this.tasklist[index].priority == TaskPriority.MEDIUM) {
          this.tasklist[index].priority = TaskPriority.LOW
        }

        break;
      }
    }
  }


  raiseifpriority(id: number) {
    for (let index = 0; index < this.tasklist.length; index++) {
      if (this.tasklist[index].id == id) {
        if (this.tasklist[index].priority == TaskPriority.MEDIUM) {
          this.tasklist[index].priority = TaskPriority.HIGH
        } else if (this.tasklist[index].priority == TaskPriority.LOW) {
          this.tasklist[index].priority = TaskPriority.MEDIUM
        }

        break;
      }
    }
  }
}
