<?php
ob_start();
require_once "../data/database.php";
header('Content-Type: application/json');

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $packageId = $_POST['packageId'] ?? '';
        $versionNumber = $_POST['versionNumber'] ?? '';
        $versionChangelog = $_POST['versionChangelog'] ?? '';

        if (empty($packageId) || empty($versionNumber) || empty($versionChangelog)) {
            throw new Exception("Package, version number, and changelog are required");
        }

        $stmt = $db->prepare("INSERT INTO versions (package_id, version_number, release_date, changelog) VALUES (?, ?, CURRENT_DATE, ?)");
        $stmt->execute([$packageId, $versionNumber, $versionChangelog]);

        ob_clean();
        echo json_encode([
            'success' => true,
            'message' => 'Version added successfully',
            'versionId' => $db->lastInsertId()
        ]);
    } else {
        throw new Exception("Unsupported request method");
    }
} catch (Exception $e) {
    ob_clean();
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>
