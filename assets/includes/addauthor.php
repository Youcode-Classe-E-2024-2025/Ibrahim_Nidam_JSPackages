<?php
require_once "../data/database.php";

header('Content-Type: application/json');

try {
    // Handle GET request for all authors start
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $stmt = $db->prepare("SELECT * FROM authors");
        $stmt->execute();
        $authors = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($authors);
        exit;
    }
    // Handle GET request for all authors end

    // Handle POST request to add authors start
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $name = $_POST['authorName'] ?? '';
        $email = $_POST['authorEmail'] ?? '';

        if (empty($name) || empty($email)) {
            throw new Exception("Name and email are required");
        }

        $stmt = $db->prepare("SELECT COUNT(*) FROM authors WHERE email = ?");
        $stmt->execute([$email]);
        if ($stmt->fetchColumn()) {
            throw new Exception("The email address is already in use");
        }

        $stmt = $db->prepare("INSERT INTO authors (name, email) VALUES (?, ?)");
        if (!$stmt->execute([$name, $email])) {
            throw new Exception("Failed to insert author.");
        }

        echo json_encode(['success' => true, 'message' => 'Author added successfully']);
        exit;
    }
    // Handle POST request to add authors end

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    exit;
}
?>
