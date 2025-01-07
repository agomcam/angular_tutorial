export class TaskEvent {
    action: string;
    taskId: string;

    constructor(action: string, taskId: string) {
        this.action = action;
        this.taskId = taskId;
    }
}
