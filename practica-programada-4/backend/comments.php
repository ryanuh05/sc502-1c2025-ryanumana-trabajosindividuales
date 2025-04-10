<?php
require('db.php');

header('Content-type: application/json');
session_start();

function getJsonInput() {
    return json_decode(file_get_contents("php://input"), associative: true);
}

function validarComentario($input) {
    return isset($input['comment'], $input['task_id']);
}

// Crear comentario
function createComment($task_id, $comment) {
    global $pdo;
    try {
        $sql = "INSERT INTO comments (task_id, comment) VALUES (:task_id, :comment)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['task_id' => $task_id, 'comment' => $comment]);
        return $pdo->lastInsertId();
    } catch (Exception $e) {
        echo json_encode(['error' => $e->getMessage()]);
        return 0;
    }
}

// Obtener comentarios por tarea
function getCommentsByTask($task_id) {
    global $pdo;
    try {
        $stmt = $pdo->prepare("SELECT * FROM comments WHERE task_id = :task_id");
        $stmt->execute(['task_id' => $task_id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $e) {
        echo json_encode(['error' => $e->getMessage()]);
        return [];
    }
}

// Editar comentario
function editComment($id, $comment) {
    global $pdo;
    try {
        $sql = "UPDATE comments SET comment = :comment WHERE id = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['comment' => $comment, 'id' => $id]);
        return $stmt->rowCount() > 0;
    } catch (Exception $e) {
        echo json_encode(['error' => $e->getMessage()]);
        return false;
    }
}

// Eliminar comentario
function deleteComment($id) {
    global $pdo;
    try {
        $sql = "DELETE FROM comments WHERE id = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['id' => $id]);
        return $stmt->rowCount() > 0;
    } catch (Exception $e) {
        echo json_encode(['error' => $e->getMessage()]);
        return false;
    }
}



// Manejo del método
$method = $_SERVER['REQUEST_METHOD'];

try {
    switch ($method) {
        case 'GET':
          
            $comments = getCommentsByTask($_GET['task_id']);
            echo json_encode($comments);
            break;

        case 'POST':
            $input = getJsonInput();
            if (validarComentario($input)) {
                $id = createComment($input['task_id'], $input['comment']);
                if ($id > 0) {
                    http_response_code(201);
                    echo json_encode(['message' => 'Comentario creado', 'id' => $id]);
                } else {
                    http_response_code(500);
                    echo json_encode(['error' => 'Error creando el comentario']);
                }
            } else {
                http_response_code(400);
                echo json_encode(['error' => 'Datos insuficientes']);
            }
            break;

        case 'PUT':
            $input = getJsonInput();
            if (isset($input['id'], $input['comment'])) {
                if (editComment($input['id'], $input['comment'])) {
                    echo json_encode(['message' => 'Comentario actualizado']);
                } else {
                    http_response_code(500);
                    echo json_encode(['error' => 'Error actualizando comentario']);
                }
            } else {
                http_response_code(400);
                echo json_encode(['error' => 'Datos insuficientes']);
            }
            break;

        case 'DELETE':
            $input = getJsonInput();
            if (isset($input['id'])) {
                if (deleteComment($input['id'])) {
                    echo json_encode(['message' => 'Comentario eliminado']);
                } else {
                    http_response_code(500);
                    echo json_encode(['error' => 'Error eliminando comentario']);
                }
            } else {
                http_response_code(400);
                echo json_encode(['error' => 'Falta el ID del comentario']);
            }
            break;

        default:
            http_response_code(405);
            echo json_encode(['error' => 'Método no permitido']);
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error en el servidor']);
}
