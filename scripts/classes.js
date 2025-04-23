export class User {
    constructor(userId, username, password, tasks, isManager) {
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.tasks = tasks;
        this.isManager = isManager;
    }
}

export class Task {
    constructor(taskId, description, priority, date, time, creatorId, status) {
        this.taskId = taskId;
        this.description = description;
        this.priority = priority;
        this.date = date;
        this.time = time;
        this.creatorId = creatorId;
        this.status = status;
    }
}

export function initLocalStorage() {
    if(!localStorage.getItem("users")) {
        localStorage.setItem("users", JSON.stringify([]));
        localStorage.setItem("tasks", JSON.stringify([]));
    }
}