<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit(); }

require_once '../config/db.php';
$conn = getConnection();
$method = $_SERVER['REQUEST_METHOD'];

// Simple JWT validation (check Authorization header)
function getAuthUser($conn) {
    $headers = getallheaders();
    $auth = $headers['Authorization'] ?? '';
    if (!$auth || !str_starts_with($auth, 'Bearer ')) return null;
    // In production: verify the JWT token here
    // For demo: we trust the token exists
    return true;
}

switch ($method) {
    case 'GET':
        $search = isset($_GET['search']) ? '%' . $_GET['search'] . '%' : '%';
        $stmt = $conn->prepare("SELECT p.*, c.name as category_name FROM products p LEFT JOIN categories c ON p.categoryId = c.id WHERE p.name LIKE ? ORDER BY p.createdAt DESC LIMIT 20");
        $stmt->bind_param("s", $search);
        $stmt->execute();
        $result = $stmt->get_result();
        $products = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode(['status' => 'success', 'data' => $products]);
        break;

    case 'POST':
        if (!getAuthUser($conn)) { http_response_code(401); echo json_encode(['error' => 'Unauthorized']); break; }
        $body = json_decode(file_get_contents('php://input'), true);
        $stmt = $conn->prepare("INSERT INTO products (name, description, price, inventory, categoryId) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("ssdii", $body['name'], $body['description'], $body['price'], $body['inventory'], $body['categoryId']);
        $stmt->execute();
        echo json_encode(['status' => 'created', 'id' => $conn->insert_id]);
        break;

    case 'DELETE':
        if (!getAuthUser($conn)) { http_response_code(401); echo json_encode(['error' => 'Unauthorized']); break; }
        $id = intval($_GET['id']);
        $conn->query("DELETE FROM products WHERE id = $id");
        echo json_encode(['status' => 'deleted']);
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}

$conn->close();
