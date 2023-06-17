<?php

require_once "db/db2.php";
error_reporting(E_ALL);
ini_set('display_errors', 1);

if (isset($_GET['patientId']) ) {
    $patientId = $_GET['patientId'];
  

    try {
        $db = new Db2();
        $dbConnection = $db->connect();

        $query = "SELECT r.*, p.name AS patient_name FROM `result` AS r
                  INNER JOIN `patient` AS p ON r.patient_id = p.patient_id
                  WHERE r.`patient_id` = :patientId";

        $stmt = $dbConnection->prepare($query);
        $stmt->bindValue(':patientId', $patientId, PDO::PARAM_INT);
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
}
?>