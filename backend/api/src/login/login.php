
<?php
// Démarrer la session
session_start();

// Inclusion de la BDD
require_once "../../config/config_cors.php";
require_once "../../config/connexion_db.php";

// Vérifier la méthode
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    ob_clean();
    echo json_encode(["message" => "Méthode non autorisée"]);
    exit();
}

// Récupérer les données JSON
$data = json_decode(file_get_contents('php://input'), true);

// Vérifier les champs requis
if (!isset($data['prenom'], $data['password'])) {
    http_response_code(400);
    ob_clean();
    echo json_encode(["message" => "Champs requis manquants"]);
    exit();
}

$prenom = $data['prenom'];
$password = $data['password'];

try {
    // Vérifier l'admin par prénom
    $stmt = $pdo->prepare("SELECT * FROM administrateur WHERE Prenom = ?");
    $stmt->execute([$prenom]);
    $admin = $stmt->fetch(PDO::FETCH_ASSOC);

    // Vérifier l'élève par prénom
    $stmt = $pdo->prepare("SELECT * FROM eleves WHERE Prenom = ?");
    $stmt->execute([$prenom]);
    $eleve = $stmt->fetch(PDO::FETCH_ASSOC);

    // Avant d'envoyer la réponse JSON, on vide le tampon
    ob_clean();

    if ($admin && $password === $admin['password']) {
        // Stocker les informations de l'admin dans la session
        $_SESSION['id_user'] = $admin['id_user'];
        $_SESSION['type'] = 'admin'; // On précise qu'il est un admin
        echo json_encode([
            "message" => "Connexion réussie",
            "type"    => "admin",
            "id_user" => $admin['id_user'],
            "nom"     => $admin['Nom'],
            "prenom"  => $admin['Prenom']
        ]);
    } elseif ($eleve && $password === $eleve['password']) {
        // Stocker les informations de l'élève dans la session
        $_SESSION['id_user'] = $eleve['id_user'];
        $_SESSION['type'] = 'eleve'; // On précise qu'il est un élève
        echo json_encode([
            "message" => "Connexion réussie",
            "type"    => "eleve",
            "id_user" => $eleve['id_user'],
            "nom"     => $eleve['Nom'],
            "prenom"  => $eleve['Prenom']
        ]);
    } else {
        http_response_code(401);
        echo json_encode(["message" => "Identifiants incorrects"]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    ob_clean();
    echo json_encode(["message" => "Erreur serveur : " . $e->getMessage()]);
}
?>