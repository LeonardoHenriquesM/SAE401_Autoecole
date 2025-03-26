<?php
require_once "../config/config_cors.php";
require_once "../config/connexion_db.php";

if (!isset($_GET['id_user'])) {
    echo json_encode(["error" => "ID utilisateur requis"]);
    exit();
}

$id_user = $_GET['id_user'];
