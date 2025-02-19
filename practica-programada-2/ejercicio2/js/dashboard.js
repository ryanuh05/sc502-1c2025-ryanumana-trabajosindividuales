document.addEventListener('DOMContentLoaded', function () {

    // Datos ficticios para tareas
    let tasks = [
        {
            id: 1,
            title: "Complete Project Report",
            description: "Prepare and submit the final project report by the end of the week.",
            due_date: "2024-08-25"
        },
        {
            id: 2,
            title: "Team Meeting",
            description: "Schedule a team meeting to discuss the next sprint.",
            due_date: "2024-08-26"
        },
        {
            id: 3,
            title: "Code Review",
            description: "Review the codebase and ensure all pull requests are merged.",
            due_date: "2024-08-27"
        }
    ];

    // Elementos del DOM
    const taskList = document.getElementById('task-list');
    const taskForm = document.getElementById('task-form');
    const taskIdInput = document.getElementById('task-id');
    const taskTitleInput = document.getElementById('task-title');
    const taskDescInput = document.getElementById('task-desc');
    const dueDateInput = document.getElementById('due-date');

    // Cargar tareas en la interfaz
    function loadTasks() {
        taskList.innerHTML = '';

        tasks.forEach(task => {
            const taskCard = document.createElement('div');
            taskCard.className = 'col-md-4 mb-3';
            taskCard.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${task.title}</h5>
                        <p class="card-text">${task.description}</p>
                        <p class="card-text"><strong>Due:</strong> ${task.due_date}</p>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <button class="btn btn-secondary btn-sm edit-task" data-id="${task.id}">Edit</button>
                        <button class="btn btn-danger btn-sm delete-task" data-id="${task.id}">Delete</button>
                    </div>
                </div>
            `;
            taskList.appendChild(taskCard);
        });

        // Asignar eventos de edición y eliminación
        document.querySelectorAll('.edit-task').forEach(btn => btn.addEventListener('click', handleEditTask));
        document.querySelectorAll('.delete-task').forEach(btn => btn.addEventListener('click', handleDeleteTask));
    }

    // Manejar la edición de una tarea
    function handleEditTask(event) {
        const taskId = event.target.dataset.id;
        const task = tasks.find(t => t.id == taskId);

        if (task) {
            taskIdInput.value = task.id;
            taskTitleInput.value = task.title;
            taskDescInput.value = task.description;
            dueDateInput.value = task.due_date;
        }

        // Mostrar el modal
        new bootstrap.Modal(document.getElementById('taskModal')).show();
    }

    // Manejar la eliminación de una tarea
    function handleDeleteTask(event) {
        const taskId = event.target.dataset.id;
        tasks = tasks.filter(task => task.id != taskId);
        loadTasks();
    }

    // Manejar el envío del formulario (Agregar/Editar)
    taskForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const taskId = taskIdInput.value;
        const taskTitle = taskTitleInput.value;
        const taskDesc = taskDescInput.value;
        const dueDate = dueDateInput.value;

        if (taskId) {
            // Editar tarea existente
            const taskIndex = tasks.findIndex(t => t.id == taskId);
            if (taskIndex !== -1) {
                tasks[taskIndex] = { id: Number(taskId), title: taskTitle, description: taskDesc, due_date: dueDate };
            }
        } else {
            // Agregar nueva tarea
            const newTask = {
                id: tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1, // Generar un nuevo ID
                title: taskTitle,
                description: taskDesc,
                due_date: dueDate
            };
            tasks.push(newTask);
        }

        // Limpiar formulario
        taskForm.reset();
        taskIdInput.value = '';

        // Ocultar el modal
        bootstrap.Modal.getInstance(document.getElementById('taskModal')).hide();

        // Recargar la lista de tareas
        loadTasks();
    });

    // Cargar tareas iniciales
    loadTasks();
});
