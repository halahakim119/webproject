<?php

require_once "db/db2.php";

$id = $_GET["id"];

try {
    $query = "DELETE FROM `patient` WHERE `patient_id` = :id";

    $db = new Db2();
    $db = $db->connect();

    $stmt = $db->prepare($query);
    $stmt->bindParam(':id', $id);
    $stmt->execute();

    $db = null;

    $data = array(
        "status" => "removed"
    );
    echo json_encode($data);
} catch (PDOException $e) {
    $data = array(
        "status" => "failed"
    );
    echo json_encode($data);
}

?>
