<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit(); }

require_once '../config/db.php';
$conn = getConnection();

$body = json_decode(file_get_contents('php://input'), true);
$action = $_GET['action'] ?? 'login';

if ($action === 'register') {
    $name = $body['name'] ?? '';
    $email = $body['email'] ?? '';
    $password = $body['password'] ?? '';

    if (!$name || !$email || !$password) {
        http_response_code(400);
        echo json_encode(['error' => 'Name, email, and password are required.']);
        exit();
    }

    $check = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $check->bind_param("s", $email);
    $check->execute();
    if ($check->get_result()->num_rows > 0) {
        http_response_code(400);
        echo json_encode(['error' => 'Email already registered.']);
        exit();
    }

    $hashed = password_hash($password, PASSWORD_BCRYPT);
    $stmt = $conn->prepare("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'USER')");
    $stmt->bind_param("sss", $name, $email, $hashed);
    $stmt->execute();
    echo json_encode(['status' => 'registered', 'id' => $conn->insert_id]);

} elseif ($action === 'login') {
    $email = $body['email'] ?? '';
    $password = $body['password'] ?? '';

    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $user = $stmt->get_result()->fetch_assoc();

    if (!$user || !password_verify($password, $user['password'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid email or password.']);
        exit();
    }

    // In production: generate a real JWT token here
    echo json_encode([
        'status' => 'success',
        'token' => 'demo_token_' . base64_encode($user['email']),
        'user' => ['id' => $user['id'], 'name' => $user['name'], 'email' => $user['email'], 'role' => $user['role']]
    ]);
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid action.']);
}

$conn->close();
