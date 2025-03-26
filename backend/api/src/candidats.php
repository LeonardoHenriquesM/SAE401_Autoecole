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

// Fonction pour modifier un candidat
function modifierCandidat($pdo) {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!$data || !isset($data['id'])) {
        echo json_encode(["error" => "Données invalides"]);
        return;
    }

    try {
        $stmt = $pdo->prepare("UPDATE eleves SET Nom = :nom, Prenom = :prenom, Date_Naissance = :dateNaissance, 
                               Ville = :ville, Date_Inscription = :dateInscription, NEPH = :neph, Email = :email 
                               WHERE id_user = :id");

        $stmt->execute([
            ':id' => $data['id'],
            ':nom' => $data['nom'],
            ':prenom' => $data['prenom'],
            ':dateNaissance' => $data['dateNaissance'],
            ':ville' => $data['ville'],
            ':dateInscription' => $data['dateInscription'],
            ':neph' => $data['neph'],
            ':email' => $data['email']
        ]);

        echo json_encode(["success" => "Candidat modifié avec succès"]);
    } catch (PDOException $e) {
        echo json_encode(["error" => "Erreur SQL : " . $e->getMessage()]);
    }
}

// Fonction pour supprimer un candidat
function supprimerCandidat($pdo) {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!$data || !isset($data['id_user'])) { // Changer 'id' en 'id_user'
        echo json_encode(["error" => "Données invalides"]);
        return;
    }

    try {
        $stmt = $pdo->prepare("DELETE FROM eleves WHERE id_user = :id_user");
        $stmt->execute([':id_user' => $data['id_user']]);
    
        echo json_encode(["success" => "Candidat supprimé avec succès"]);
    } catch (Exception $e) {
        echo json_encode(["error" => "Erreur lors de la suppression: " . $e->getMessage()]);
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
    case 'supprimerCandidat':
        supprimerCandidat($pdo);
        break;
    default:
        echo json_encode(["error" => "Action invalide"]);
        break;
}
?>