<?php
$host = "mysql-api401.alwaysdata.net";
$dbname = "api401_bd_easy";
$user = "api401";
$pass = "Azerty123456+";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erreur : " . $e->getMessage());
}
?>