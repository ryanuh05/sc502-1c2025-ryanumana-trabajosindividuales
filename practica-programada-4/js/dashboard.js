document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
});

function loadTasks() {
    fetch("backend/tasks.php")
        .then(response => response.json())
        .then(tasks => {
            const taskList = document.getElementById("task-list");
            taskList.innerHTML = "";
            tasks.forEach(task => {
                renderTaskCard(task);
            });
        });
}

function renderTaskCard(task) {
    const taskCard = document.createElement("div");
    taskCard.classList.add("col-md-6", "mb-4");
    taskCard.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${task.title}</h5>
                <p class="card-text">${task.description}</p>
                <p class="card-text"><small class="text-muted">Due: ${task.due_date}</small></p>
                <button class="btn btn-sm btn-outline-primary mb-2" onclick="openCommentModal(${task.id})">Add Comment</button>
                <div id="comments-container-${task.id}" class="mb-2">
                    <!-- Comentarios aquí -->
                </div>
            </div>
        </div>
    `;
    document.getElementById("task-list").appendChild(taskCard);
    loadComments(task.id); 
}

function openCommentModal(taskId) {
    document.getElementById('comment-task-id').value = taskId;
    document.getElementById('task-comment').value = '';
    const modal = new bootstrap.Modal(document.getElementById('commentModal'));
    modal.show();
}

document.getElementById('comment-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const taskId = document.getElementById('comment-task-id').value;
    const comment = document.getElementById('task-comment').value;

    fetch('backend/comments.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ task_id: taskId, comment: comment })
    })
    .then(response => response.json())
    .then(data => {
        if (data.id) {
            loadComments(taskId);
            bootstrap.Modal.getInstance(document.getElementById('commentModal')).hide();
        }
    });
});

function loadComments(taskId) {
    fetch(`backend/comments.php?task_id=${taskId}`)
        .then(response => response.json())
        .then(comments => {
            const container = document.getElementById(`comments-container-${taskId}`);
            container.innerHTML = ''; // Limpiar antes de agregar
            comments.forEach(comment => {
                const commentDiv = document.createElement('div');
                commentDiv.classList.add('border', 'rounded', 'p-2', 'mb-2');
                commentDiv.innerHTML = `
                    <p>${comment.comment}</p>
                    <button class="btn btn-sm btn-outline-secondary me-2" onclick="editComment(${comment.id}, '${comment.comment.replace(/'/g, "\\'")}', ${taskId})">Edit</button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteComment(${comment.id}, ${taskId})">Delete</button>
                `;
                container.appendChild(commentDiv);
            });
        });
}

function editComment(commentId, oldComment, taskId) {
    const nuevoComentario = prompt("Editar comentario:", oldComment);
    if (nuevoComentario !== null) {
        fetch('backend/comments.php', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ id: commentId, comment: nuevoComentario })
        })
        .then(response => response.json())
        .then(data => {
            loadComments(taskId);
        });
    }
}

function deleteComment(commentId, taskId) {
    if (confirm("¿Eliminar este comentario?")) {
        fetch('backend/comments.php', {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ id: commentId })
        })
        .then(response => response.json())
        .then(data => {
            loadComments(taskId);
        });
    }
}
