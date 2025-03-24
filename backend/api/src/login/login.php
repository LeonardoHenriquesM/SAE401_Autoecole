<?php
//API login
session_start();
require "../../config/connexion_db.php";

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
        // Fonction qui vérifie les id
        function verification_identifiant($login, $password, $pdo) {
            // Recherche de l'admin
            $query = $pdo->prepare("SELECT * FROM administrateur WHERE id_user = ?");
            $query->execute([$login]);
            $user_admin = $query->fetch(PDO::FETCH_ASSOC);

            // Recherche de l'élève
            $query = $pdo->prepare("SELECT * FROM eleves WHERE id_user = ?");
            $query->execute([$login]);
            $eleve_user = $query->fetch(PDO::FETCH_ASSOC);

            if ($user_admin && password_verify($password, $user_admin['password'])) {
                return ['type' => 'admin', 'user' => $user_admin];
            } elseif ($eleve_user && password_verify($password, $eleve_user['password'])) {
                return ['type' => 'eleve', 'user' => $eleve_user];
            } else {
                return false;
            }
        }

        // Vérif des identifiants
        $info_identification = verification_identifiant($login, $password, $pdo);

        if ($info_identification !== false) {
            $_SESSION['id_user'] = $info_identification['user']['id_user'];
            $_SESSION['Nom'] = $info_identification['user']['Nom'];
            $_SESSION['Prenom'] = $info_identification['user']['Prenom'];
            $_SESSION['type'] = $info_identification['type'];

            if ($info_identification['type'] === 'admin') {
                echo json_encode(["message" => "Connexion Administrateur réussie"]);
            } else {
                echo json_encode(["message" => "Connexion élève réussie"]);
            }
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
    echo json_encode(["message" => "Methode non autorisee"]);
}
?>