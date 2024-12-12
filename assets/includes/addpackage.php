<?php
ob_start();
require_once "../data/database.php";

header('Content-Type: application/json');

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $packageName = $_POST['packageName'] ?? '';
        $packageDescription = $_POST['packageDescription'] ?? '';
        $authorId = $_POST['authorId'] ?? '';

        if (empty($packageName) || empty($packageDescription) || empty($authorId)) {
            throw new Exception("Package name, description, and author are required");
        }

        $db->beginTransaction();

        try {
            $stmt = $db->prepare("INSERT INTO packages (name, description) VALUES (?, ?)");
            $stmt->execute([$packageName, $packageDescription]);
            $packageId = $db->lastInsertId();

            $stmt = $db->prepare("INSERT INTO package_authors (package_id, author_id) VALUES (?, ?)");
            $stmt->execute([$packageId, $authorId]);

            $db->commit();
            ob_clean();
            echo json_encode([
                'success' => true,
                'message' => 'Package added successfully',
                'packageId' => $packageId
            ]);
            exit;
        } catch (Exception $e) {
            $db->rollBack();
            throw $e;
        }
    } else {
        throw new Exception("Unsupported request method");
    }
} catch (Exception $e) {
    ob_clean();
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
    exit;
}