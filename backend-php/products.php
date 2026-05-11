<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Database connection logic would go here
// $pdo = new PDO('mysql:host=localhost;dbname=ecommerce', 'user', 'pass');

$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod == 'GET') {
    // Mock response for PHP Backend
    $products = [
        ['id' => 1, 'name' => 'PHP Edition Shirt', 'price' => 19.99],
        ['id' => 2, 'name' => 'Laravel Coffee Mug', 'price' => 12.99]
    ];
    echo json_encode($products);
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
