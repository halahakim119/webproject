<?php

require_once "db/db2.php";

$id = $_GET["patient_id"];

try {
    $query = "SELECT * FROM `patient` WHERE `patient_id`='$id'";

    $db = new Db2();
    $db = $db->connect();

    $stmt = $db->prepare($query);
    $stmt->execute();

    $db = null;

    $row = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($row);
}catch(PDOException $e){
    $data = array(
        "status" => "failed"
    );

    echo json_encode($data);
}

?>
