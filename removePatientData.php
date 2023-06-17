<?php

require_once "db/db2.php";

$id = $_GET["id"];

try {
    $db = new Db2();
    $db = $db->connect();

    // Delete the results associated with the patient
    $queryDeleteResults = "DELETE FROM `result` WHERE `patient_id` = :id";
    $stmtDeleteResults = $db->prepare($queryDeleteResults);
    $stmtDeleteResults->bindParam(':id', $id);
    $stmtDeleteResults->execute();

    // Delete the patient
    $queryDeletePatient = "DELETE FROM `patient` WHERE `patient_id` = :id";
    $stmtDeletePatient = $db->prepare($queryDeletePatient);
    $stmtDeletePatient->bindParam(':id', $id);
    $stmtDeletePatient->execute();

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
