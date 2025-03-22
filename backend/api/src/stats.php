<?php
header("Content-Type: application/json");
require_once "../config/connexion_db.php";

if (!isset($_GET['id'])) {
    echo json_encode(["error" => "ID élève requis"]);
    exit;
}

$idEleve = intval($_GET['id']);

// Statistiques de l'eleve
$query = "SELECT 
            (COUNT(*) / (SELECT COUNT(*) FROM test WHERE id_user = :id)) * 100 AS taux_reussite, 
            COUNT(*) AS tests_passes, 
            AVG(score) AS score_moyen
          FROM test WHERE id_user = :id AND score >= 32"; 

$stmt = $pdo->prepare($query);
$stmt->execute(["id" => $idEleve]);
$stats = $stmt->fetch();

echo json_encode($stats);
?>