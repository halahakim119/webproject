<?php

require_once "db/db2.php";

$searchTerm = $_GET["searchTerm"];

try {
    $query = "SELECT * FROM `patient` WHERE `name` LIKE '%$searchTerm%' OR `contact_number` LIKE '%$searchTerm%'";

    $db = new Db2();
    $db = $db->connect();

    $stmt = $db->prepare($query);
    $stmt->execute();

    $db = null;

    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($rows);
} catch (PDOException $e) {
    $data = array(
        "status" => "failed"
    );

    echo json_encode($data);
}

?>
