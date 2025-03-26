<?php
require "../config/config_cors.php";
require "../config/connexion_db.php";

// Vérifier l'action demandée
$action = isset($_GET['action']) ? $_GET['action'] : '';

// Fonction pour récupérer tous les candidats
function getCandidats($pdo) {
    try {
        $stmt = $pdo->query("SELECT * FROM eleves");
        $candidats = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($candidats);
    } catch (PDOException $e) {
        echo json_encode(["error" => "Erreur SQL : " . $e->getMessage()]);
    }
}

// Fonction pour ajouter un candidat
function ajouterCandidat($pdo) {
    // Récupérer les données envoyées
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (!$data) {
        echo json_encode(["error" => "Données invalides"]);
        return;
    }

    try {
        $stmt = $pdo->prepare("INSERT INTO eleves (Nom, Prenom, Date_Naissance, Ville, Date_Inscription, NEPH, Email, password) 
                               VALUES (:nom, :prenom, :dateNaissance, :ville, :dateInscription, :neph, :email, :password)");

        $stmt->execute([
            ':nom' => $data['nom'],
            ':prenom' => $data['prenom'],
            ':dateNaissance' => $data['dateNaissance'],
            ':ville' => $data['ville'],
            ':dateInscription' => $data['dateInscription'],
            ':neph' => $data['neph'],
            ':email' => $data['email'],
            ':password' => $data['password']
        ]);

        echo json_encode(["success" => "Eleve ajoute avec succes"]);
    } catch (PDOException $e) {
        echo json_encode(["error" => "Erreur SQL : " . $e->getMessage()]);
    }
}

// Gestion des actions
switch ($action) {
    case 'getCandidats':
        getCandidats($pdo);
        break;
    case 'ajouterCandidat':
        ajouterCandidat($pdo);
        break;
    default:
        echo json_encode(["error" => "Action invalide"]);
        break;
}
?>