import {Component, Input, OnInit} from '@angular/core';
import {Task, TaskPriority, TaskStatus} from '../../../models/task.models';
import {CommonModule} from '@angular/common';
import {TaskService} from '../../../services/task.service';
import {Router} from '@angular/router';
import {PersonType} from '../../../models/Person.models';
import {AuthService} from '../../../services/auth.service';
import {PersonService} from '../../../services/person.service';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css'
})


export class ResumeComponent implements OnInit {
  @Input()
  task: Task = new Task("1", "Tarea 1", "Descripción Tarea 1", TaskPriority.LOW, TaskStatus.PENDING, new Date("11/1/2024"), new Date("11/18/2024"), false);

  personRole: PersonType | null = null;

  constructor(private taskService: TaskService, private router: Router, private authService: AuthService, private personService: PersonService) {
  }

  ngOnInit() {
    this.authService.getUserAuthenticated().subscribe(user => {
      if (user) {
        this.personService.getPersonByUID(user.uid).subscribe(person => {
          if (person) {
            this.personRole = person.role;
          }
        })
      }
    })
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

  protected readonly PersonType = PersonType;
}
