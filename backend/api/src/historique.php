<?php
require_once "../config/config_cors.php";
require_once "../config/connexion_db.php";

// Débutez la session pour vérifier la session
session_start();

// Si l'utilisateur n'est pas connecté
if (!isset($_SESSION['id_user'])) {
    echo json_encode(["message" => "Vous devez être connecté pour accéder à cette page"]);
    exit();
}

// Si l'ID utilisateur est manquant dans l'URL
if (!isset($_GET['id_user'])) {
    echo json_encode(["error" => "ID utilisateur requis"]);
    exit();
}

// Récupération de l'ID utilisateur
$id_user = $_GET['id_user'];

// Ici, vous pouvez ajouter la logique pour récupérer l'historique de l'utilisateur
// Par exemple :
$historique = getHistoriqueByUserId($id_user);

// Envoi de la réponse en JSON
echo json_encode(["historique" => $historique]);
exit();

// Ta logique pour récupérer les données et les renvoyer
$query = "SELECT 
          (COUNT(*) / (SELECT COUNT(*) FROM test WHERE id_user = :id)) * 100 AS taux_reussite, 
          COUNT(*) AS tests_passes, 
          AVG(score) AS score_moyen
        FROM test WHERE id_user = :id AND score >= 32";

$stmt = $pdo->prepare($query);
$stmt->execute(["id" => $idEleve]);
$stats = $stmt->fetch();

if (!$stats) {
  echo json_encode(["message" => "Aucune statistique trouvée pour cet utilisateur."]);
  exit();
}

// Récupérer les derniers tests de l'élève
$query = "SELECT date_test, score FROM test WHERE id_user  ORDER BY date_test DESC LIMIT 5";
$stmt = $pdo->prepare($query);
$stmt->execute(["id" => $idEleve]);
$tests = $stmt->fetchAll();

if (!$tests) {
  echo json_encode(["message" => "Aucun test trouvé pour cet utilisateur."]);
  exit();
}

echo json_encode([
  "stats" => $stats,
  "tests" => $tests
]);
?>