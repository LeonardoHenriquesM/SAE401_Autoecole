<?php
require_once "../config/config_cors.php";
require_once "../config/connexion_db.php";

if (!isset($_GET['id_user'])) {
    echo json_encode(["error" => "ID utilisateur requis"]);
    exit();
}

$id_user = $_GET['id_user'];

$query = "SELECT 
          (COUNT(*) / (SELECT COUNT(*) FROM test WHERE id_user = :id)) * 100 AS taux_reussite, 
          COUNT(*) AS tests_passes, 
          AVG(score) AS score_moyen
        FROM test WHERE id_user = :id AND score >= 35";

$stmt = $pdo->prepare($query);
$stmt->execute(["id" => $id_user]);
$stats = $stmt->fetch();

$query = "SELECT date_test, score FROM test WHERE id_user = :id ORDER BY date_test DESC LIMIT 5";
$stmt = $pdo->prepare($query);
$stmt->execute(["id" => $id_user]);
$tests = $stmt->fetchAll();

echo json_encode([
    "stats" => $stats,
    "tests" => $tests
]);
exit();
?>