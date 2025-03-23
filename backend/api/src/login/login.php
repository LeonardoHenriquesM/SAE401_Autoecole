<?php
//API login
session_start();
require "../config/connexion_db.php";

header("Content-type: application/json; charset=utf-8");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['id_user']) || !isset($data['password'])) {
        http_response_code(400);
        echo json_encode(["message" => "Champs requis manquants"]);
        exit();
    }

    $login = $data['id_user'];
    $password = $data['password'];

    try {
        // Recherche de l'utilisateur administrateur
        $query = $pdo->prepare("SELECT * FROM administrateur WHERE Prenom = ?");
        $query->execute([$login]);
        $user_admin = $query->fetch(PDO::FETCH_ASSOC);

        // Recherche de l'élève
        $query = $pdo->prepare("SELECT * FROM eleves WHERE Prenom = ?");
        $query->execute([$login]);
        $eleve_user = $query->fetch(PDO::FETCH_ASSOC);

        // Vérification pour l'administrateur
        if ($user_admin && password_verify($password, $user_admin['password'])) {
            $_SESSION['id_user'] = $user_admin['id_user'];
            $_SESSION['Nom'] = $user_admin['Nom'];
            $_SESSION['Prenom'] = $user_admin['Prenom'];

            echo json_encode(["message" => "Connexion Administrateur réussie"]);
        }
        // Vérification pour l'élève
        elseif ($eleve_user && password_verify($password, $eleve_user['password'])) {
            $_SESSION['id_user'] = $eleve_user['id_user'];
            $_SESSION['Nom'] = $eleve_user['Nom'];
            $_SESSION['Prenom'] = $eleve_user['Prenom'];

            echo json_encode(["message" => "Connexion élève réussie"]);
        } else {
            http_response_code(401);
            echo json_encode(["message" => "Identifiants incorrects"]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["message" => "Erreur serveur : " . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(["message" => "Méthode non autorisée"]);
}
?>
