<?php
require_once "../db/db2.php";

$id = $_GET["id"];

try {
    $db = new Db2();
    $db = $db->connect();

    $query = "DELETE FROM `staff` WHERE `staff_id` = :id";
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
