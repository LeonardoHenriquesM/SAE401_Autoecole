<?php
header("Content-Type: application/json");
require_once "../config/connexion_db.php";

if (!isset($_GET['id'])) {
    echo json_encode(["error" => "ID élève requis"]);
    exit;
}

$idEleve = intval($_GET['id']);

// Récupérer les derniers tests
$query = "SELECT date_test, score FROM test WHERE id_user = :id ORDER BY date_test DESC LIMIT 5";
$stmt = $pdo->prepare($query);
$stmt->execute(["id" => $idEleve]);
$tests = $stmt->fetchAll();

echo json_encode($tests);
?>