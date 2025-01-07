import {Component, Input} from '@angular/core';
import {Task, TaskPriority, TaskStatus} from '../../../models/task.models';
import {CommonModule} from '@angular/common';
import {TaskService} from '../../../services/task.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css'
})


export class ResumeComponent  {
  @Input()
  task: Task = new Task("1", "Tarea 1", "Descripción Tarea 1", TaskPriority.LOW, TaskStatus.PENDING, new Date("11/1/2024"), new Date("11/18/2024"), false);


  constructor(private taskService: TaskService, private router: Router) {
  }

  setStatus(id: string) {
   this.taskService.setStatus(id);
  }

  deleteTask(id: string) {
    this.taskService.removeTask(id.toString()) // Asegurar conversión
      .then(() => console.log(`La tarea eliminada tiene el id: ${id}`))
      .catch((error) => {
        console.log("Error: ", error);
      });
  }



  lowerPriority(id: string) {
    this.taskService.lowerPriority(id)
  }


  raisePriority(id: string) {
   this.taskService.raisePriority(id)
  }

  onEditTask(id: string) {
    this.router.navigate([`/formTaskEdit/${id}`]);
  }

}
