<?php
require_once "db/db2.php";
error_reporting(E_ALL);
ini_set('display_errors', 1);

try {
    $db = new Db2();
    $dbConnection = $db->connect();

    $query = "SELECT * FROM `test_types` ORDER BY `test_id`";

    $stmt = $dbConnection->prepare($query);
    $stmt->execute();

    $row = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $dbConnection = null;

    echo json_encode($row);
} catch (PDOException $e) {
    $data = array(
        "status" => "failed",
        "error" => $e->getMessage()
    );
    echo json_encode($data);
}
?>
