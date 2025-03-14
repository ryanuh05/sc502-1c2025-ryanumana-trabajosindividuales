document.addEventListener('DOMContentLoaded', function () {

    // Datos ficticios para tareas con un array de comentarios para cada tarea
    const tasks = [
        {
            id: 1,
            title: "Complete Project Report",
            description: "Prepare and submit the final project report by the end of the week.",
            due_date: "2024-08-25",
            comments: []
        },
        {
            id: 2,
            title: "Team Meeting",
            description: "Schedule a team meeting to discuss the next sprint.",
            due_date: "2024-08-26",
            comments: []
        },
        {
            id: 3,
            title: "Code Review",
            description: "Review the codebase and ensure all pull requests are merged.",
            due_date: "2024-08-27",
            comments: []
        }
    ];

    let editingTaskId = null;
    let taskCounter = tasks.length;

    function loadTasks() {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';

        tasks.forEach(function (task) {
            const taskCard = document.createElement('div');
            taskCard.className = 'col-md-4 mb-3';
            taskCard.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${task.title}</h5>
                    <p class="card-text">${task.description}</p>
                    <p class="card-text text-muted">${task.due_date}</p>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <button class="btn btn-secondary btn-sm edit-task" data-id="${task.id}">Edit</button>
                    <button class="btn btn-danger btn-sm delete-task" data-id="${task.id}">Delete</button>
                </div>
                <div class="card-footer">
                    <h6>Comments</h6>
                    <ul class="list-group comment-list" id="comment-list-${task.id}"></ul>
                    <div class="mt-2">
                        <input type="text" class="form-control comment-input" id="comment-input-${task.id}" placeholder="Add a comment...">
                        <button class="btn btn-primary btn-sm mt-1 add-comment" data-id="${task.id}">Add</button>
                    </div>
                </div>
            </div>
            `;
            taskList.appendChild(taskCard);

            loadComments(task.id);
        });

        document.querySelectorAll('.edit-task').forEach(btn => btn.addEventListener('click', handleEditTask));
        document.querySelectorAll('.delete-task').forEach(btn => btn.addEventListener('click', handleDeleteTask));
        document.querySelectorAll('.add-comment').forEach(btn => btn.addEventListener('click', handleAddComment));
    }

    function loadComments(taskId) {
        const task = tasks.find(t => t.id === taskId);
        const commentList = document.getElementById(`comment-list-${taskId}`);
        commentList.innerHTML = '';

        task.comments.forEach((comment, index) => {
            const commentItem = document.createElement('li');
            commentItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            commentItem.innerHTML = `
                ${comment}
                <button class="btn btn-danger btn-sm delete-comment" data-task-id="${taskId}" data-index="${index}">X</button>
            `;
            commentList.appendChild(commentItem);
        });

        document.querySelectorAll('.delete-comment').forEach(btn => btn.addEventListener('click', handleDeleteComment));
    }

    function handleAddComment(event) {
        const taskId = parseInt(event.target.dataset.id);
        const inputField = document.getElementById(`comment-input-${taskId}`);
        const comment = inputField.value.trim();

        if (comment !== "") {
            const task = tasks.find(t => t.id === taskId);
            task.comments.push(comment);
            inputField.value = '';
            loadComments(taskId);
        }
    }

    function handleDeleteComment(event) {
        const taskId = parseInt(event.target.dataset.taskId);
        const index = parseInt(event.target.dataset.index);

        const task = tasks.find(t => t.id === taskId);
        task.comments.splice(index, 1);
        loadComments(taskId);
    }

    function handleEditTask(event) {
        editingTaskId = parseInt(event.target.dataset.id);
        const task = tasks.find(t => t.id === editingTaskId);
        document.getElementById('task-title').value = task.title;
        document.getElementById('task-desc').value = task.description;
        document.getElementById('due-date').value = task.due_date;
        document.getElementById('taskModalLabel').textContent = '.edit-task';
        const modal = new bootstrap.Modal(document.getElementById('taskModal'));
        modal.show();
    }

    function handleDeleteTask(event) {
        const id = parseInt(event.target.dataset.id);
        const taskIndex = tasks.findIndex(t => t.id === id);
        tasks.splice(taskIndex, 1);
        loadTasks();
    }

    document.getElementById('task-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const title = document.getElementById('task-title').value;
        const description = document.getElementById('task-desc').value;
        const dueDate = document.getElementById('due-date').value;

        if (!editingTaskId) {
            taskCounter++;
            const newTask = { id: taskCounter, title, description, due_date: dueDate, comments: [] };
            tasks.push(newTask);
        } else {
            let task = tasks.find(t => t.id === editingTaskId);
            task.title = title;
            task.description = description;
            task.due_date = dueDate;
        }

        const modal = bootstrap.Modal.getInstance(document.getElementById('taskModal'));
        modal.hide();
        loadTasks();
    });

    document.getElementById('taskModal').addEventListener('show.bs.modal', function () {
        if (!editingTaskId) {
            document.getElementById('task-form').reset();
            document.getElementById('taskModalLabel').textContent = 'Add Task';
        }
    });

    document.getElementById('taskModal').addEventListener('hidden.bs.modal', function () {
        editingTaskId = null;
    });

    loadTasks();
});
