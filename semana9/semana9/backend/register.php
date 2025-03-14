<?php 
require('db.php');

function userRegistry($username, $password,$email) { 
    try {
        global $pdo;
        $passwordHashed = password_hash($password, PASSWORD_BCRYPT);
        $sql = "INSERT INTO USERS (username, password, email) values (:username, :password, :email)";
        $stmt = $pdo->prepare($sql);
        $stmt -> execute(['username' => $username, 'password' => $passwordHashed,'email'=> $email]);
        return "User registered";
        
    } catch (Exception $e) {
    }
}