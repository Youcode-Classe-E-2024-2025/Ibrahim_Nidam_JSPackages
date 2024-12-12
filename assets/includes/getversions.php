<?php
ob_start();
require_once "../data/database.php";
header('Content-Type: application/json');

try {
    $stmt = $db->prepare("
        SELECT 
            v.version_id, 
            v.package_id, 
            p.name AS package_name, 
            v.version_number, 
            v.release_date, 
            v.changelog
        FROM 
            versions v
        JOIN 
            packages p ON v.package_id = p.package_id
        ORDER BY 
            p.package_id, v.release_date DESC
    ");

    $stmt->execute();
    $versions = $stmt->fetchAll(PDO::FETCH_ASSOC);

    ob_clean();
    echo json_encode($versions);
    exit;
} catch (Exception $e) {
    ob_clean();
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
    exit;
}