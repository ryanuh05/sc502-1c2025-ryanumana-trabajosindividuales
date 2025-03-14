<?php
require('db.php');
 
function createTask($userId, $title, $description, $dueDate){
    global $pdo;
    try{
        $sql = "insert into tasks (user_id, title, description, due_date) value (:user_id, :title, :description, :due_date)";
        $stmt = $pdo -> prepare($sql);
        $stmt -> execute([
            'user_id' => $userId,
            'title' => $title,
            'description'=> $description,
            'due_date' => $dueDate
        ]);
        return $pdo -> lastInsertId();
 
    }catch(Exception $e){
        echo $e -> getMessage();
        return 0;
    }
}
 
function getTasksByUser($userId){
 
}
 
function editTask($id, $title, $description,$dueDate){
 
}
 
function deleteTask($id){
 
}

