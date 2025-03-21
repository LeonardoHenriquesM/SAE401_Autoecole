<?php
require "../config/connexion_db.php"; // Assure-toi que tu as configuré la connexion à la base de données

header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    // Vérification des données
    if (!isset($data['nom'], $data['prenom'], $data['email'], $data['password'], $data['ville'], $data['date_naissance'], $data['date_inscription'])) {
        http_response_code(400);
        echo json_encode(["message" => "Données manquantes"]);
        exit;
    }

    // On prépare les variables pour insérer dans la base
    $nom = $data['nom'];
    $prenom = $data['prenom'];
    $email = $data['email'];
    $password = password_hash($data['password'], PASSWORD_DEFAULT); // Hachage du mot de passe
    $ville = $data['ville'];
    $date_naissance = $data['date_naissance'];
    $date_inscription = $data['date_inscription'];

    // Préparer la requête d'insertion
    $sql = "INSERT INTO eleves (Nom, Prenom, Email, password, Ville, Date_Naissance, Date_Inscription) 
            VALUES (?, ?, ?, ?, ?, ?, ?)";

    // Préparer la requête
    $stmt = $pdo->prepare($sql);

    // Exécuter la requête
    if ($stmt->execute([$nom, $prenom, $email, $password, $ville, $date_naissance, $date_inscription])) {
        echo json_encode(["message" => "Utilisateur inséré avec succès"]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Erreur lors de l'insertion de l'utilisateur"]);
    }
}
?>
