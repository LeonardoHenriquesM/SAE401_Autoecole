<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Récupération requête
$request = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];

// Nettoyage URL
$basePath = "/backend/api";
$route = str_replace($basePath, "", parse_url($request, PHP_URL_PATH));

switch ($route) {
    case '/login':
        require 'src/login/login.php';
        break;
    case '/inscription':
        require 'src/inscription/inscription.php';
        break;
    case '/stats':
        require 'src/stats.php';
        break;
        case '/tests':
            require 'src/stats.php';
            break;
    default:
        http_response_code(404);
        echo json_encode(["error" => "Route non trouvée"]);
        break;
}
?>