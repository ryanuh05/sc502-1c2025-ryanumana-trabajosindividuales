<?php
$host = "localhost";
$dbname = "todo_app";
$user = "web";
$password = "clave_web";

try{
 
    $pdo = new PDO("mysql:host=$host;dbname=$dbname",$user,$password);
    $pdo -> setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    echo "Conexion exitosa ". PHP_EOL;
    
}catch(PDOException $e){
    die("Error de conexion: " . $e -> getMessage());
}
 
