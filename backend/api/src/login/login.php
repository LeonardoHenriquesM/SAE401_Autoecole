<?php
// Aucune ligne ni espace avant <?php

// Active l'affichage des erreurs (à désactiver en production)
ini_set('display_errors', 1);
error_reporting(E_ALL);

// On capture toute sortie pour éviter du texte avant le JSON
ob_start();

// Headers CORS et JSON
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=utf-8");

// Gérer la requête OPTIONS (préflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Inclusion de la BDD (assure-toi qu'il n'y a pas d'espace avant <?php dedans)
require_once __DIR__ . "/../../config/connexion_db.php";

// Vérifier la méthode
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    // Nettoyer toute sortie potentielle avant d'envoyer le JSON
    ob_clean();
    echo json_encode(["message" => "Méthode non autorisée"]);
    exit();
}

// Récupérer les données JSON
$data = json_decode(file_get_contents('php://input'), true);

// Vérifier les champs requis
if (!isset($data['id_user'], $data['password'])) {
    http_response_code(400);
    ob_clean();
    echo json_encode(["message" => "Champs requis manquants"]);
    exit();
}

$id_user = $data['id_user'];
$password = $data['password'];

try {
    // Vérifier l'admin
    $stmt = $pdo->prepare("SELECT * FROM administrateur WHERE id_user = ?");
    $stmt->execute([$id_user]);
    $admin = $stmt->fetch(PDO::FETCH_ASSOC);

    // Vérifier l'élève
    $stmt = $pdo->prepare("SELECT * FROM eleves WHERE id_user = ?");
    $stmt->execute([$id_user]);
    $eleve = $stmt->fetch(PDO::FETCH_ASSOC);

    // Avant d'envoyer la réponse JSON, on vide le tampon
    ob_clean();

    if ($admin && $password === $admin['password']) {
        echo json_encode([
            "message" => "Connexion réussie",
            "type"    => "admin",
            "id_user" => $admin['id_user'],
            "nom"     => $admin['Nom'],
            "prenom"  => $admin['Prenom']
        ]);
    } elseif ($eleve && $password === $eleve['password']) {
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