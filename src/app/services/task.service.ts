import {Injectable} from '@angular/core';
import {Task, TaskPriority, TaskStatus} from '../models/task.models';
import {TaskEvent} from '../models/TaskEvent.models';
import {Database, get, listVal, ref, DataSnapshot, remove, push, set} from '@angular/fire/database';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private database: Database) {
  }


  setStatus(id: string) {
    console.log('set status', id);
    this.getTaskById(id).then((taskDataSnapshot) => {
      let task = taskDataSnapshot.val();

      console.log(taskDataSnapshot.val()); // Estoy editando aquí

      if (task.status == TaskStatus.COMPLETED) {
        task.status = TaskStatus.PENDING
      } else if (task.status == TaskStatus.IN_PROGRESS) {
        task.status = TaskStatus.COMPLETED
      } else {
        task.status = TaskStatus.IN_PROGRESS
      }
      this.saveTask(task).catch((error) => {
        console.log(error)
      });
    })

  }


  lowerPriority(id: string) {
    this.getTaskById(id).then((taskDataSnapshot) => {
      let task = taskDataSnapshot.val();

      if (task.priority == TaskPriority.HIGH) {
        task.priority = TaskPriority.MEDIUM;
      } else if (task.priority == TaskPriority.MEDIUM) {
        task.priority = TaskPriority.LOW;
      }

      // Guardar los cambios en la base de datos
      this.saveTask(task).catch((error) => {
        console.log(error);
      });
    });
  }


  raisePriority(id: string) {
    this.getTaskById(id)
      .then((taskDataSnapshot) => {
        let task = taskDataSnapshot.val();

        if (task.priority == TaskPriority.MEDIUM) {
          task.priority = TaskPriority.HIGH
        } else if (task.priority == TaskPriority.LOW) {
          task.priority = TaskPriority.MEDIUM
        }

        // Una vez actualizada la prioridad actualizamos la tarea
        this.saveTask(task).catch((err) => {
          console.log(err)
        });
      })
      .catch(err => {
        console.log(err)
      });


  }


  /**
   * Funcion que sirve para guardar una tarea o actualizarlo
   * @param task
   */
  saveTask(task: Task): Promise<void> {
    console.log(task);
    let taskRef = ref(this.database, `/Tareas/${task.id}`);

    // Si no tiene id significa que es para guardar un anime
    if (!task.id) {
      let newAnimeRef = ref(this.database, `/Tareas/`);

      // Creamos el id del nuevo anime
      taskRef = push(newAnimeRef);
      if (taskRef.key != null) {
        task.id = taskRef.key;
        task.status = TaskStatus.PENDING
      }

    }
    return set(taskRef, task) as Promise<void>;

  }

  getAllTasks() {
    let task = ref(this.database, "/Tareas");
    return listVal(task) as Observable<Task[]>;
  }


  getTaskById(id: string) {
    let task = ref(this.database, '/Tareas/' + id);
    return get(task) as Promise<DataSnapshot>;
  }

  removeTask(id: string) {
    let task = ref(this.database, `/Tareas/${id}`);
    return remove(task) as Promise<void>;
  }
}
