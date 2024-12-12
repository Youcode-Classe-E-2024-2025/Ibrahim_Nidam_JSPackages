<?php
ob_start();
require_once "../data/database.php";

header('Content-Type: application/json');

try {
    if (!$db) {
        throw new Exception("Database connection failed");
    }

    // fetches packages along with their associated authors
    $stmt = $db->prepare("
        SELECT 
            p.package_id, 
            p.name, 
            p.description, 
            p.creation_date,
            a.name AS author_name,
            a.author_id AS author_id
        FROM packages p
        JOIN package_authors pa ON p.package_id = pa.package_id
        JOIN authors a ON pa.author_id = a.author_id
    ");
    $stmt->execute();

    $packages = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($packages);
    exit;
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
    exit;
}
