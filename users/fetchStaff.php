<?php
require_once "../db/db2.php";

try {
    $db = new Db2();
    $dbConnection = $db->connect();

    $query = "SELECT * FROM `staff`";

    $stmt = $dbConnection->prepare($query);
    $stmt->execute();

    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $dbConnection = null;

    echo json_encode($rows);
} catch (PDOException $e) {
    $data = array(
        "status" => "failed",
        "error" => $e->getMessage()
    );
    echo json_encode($data);
}
?>
