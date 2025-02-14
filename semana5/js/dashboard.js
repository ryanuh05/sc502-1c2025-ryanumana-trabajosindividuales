document.addEventListener('DOMContentLoaded', function(){
 
    // Datos ficticios para tareas
    const tasks = [
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
 
//carga las tareas en el DOM
    function loadTasks(){
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';
 
        tasks.forEach(function(task){
            //aqui vamos a tener un element del arreglo de tareas por cada uno de los elementos
            const taskCard = document.createElement('div');
            taskCard.className = 'col-md-4 mb-3';
            taskCard.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${task.title}</h5>
                    <p class="card-text">${task.description}</p>
                    <p class="card-text">${task.due_date}</p>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <button class="btn btn-secondary btn-sm edit-task" data-id="${task.id}">Edit</button>
                    <button class="btn btn-danger btn-sm delete-task" data-id="${task.id}">Delete</button>
                </div>
            </div>
            `;
            taskList.appendChild(taskCard);
        })

        document.querySelectorAll('.edit-task').forEach(function(btnEdit){
            btnEdit.addEventListener('click' , handleEditTask);
        })
 
    }
    function handleEditTask(event){
        alert('se presiono el boton con taskid')
    }

    loadTasks();
 
});