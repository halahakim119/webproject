<?php

require_once "../db/db2.php";

try {
    $query = "SELECT * FROM `staff`";

    $db = new Db2();
    $db = $db->connect();

    $stmt = $db->prepare($query);
    $stmt->execute();

    $row = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $db = null;

    echo json_encode($row);
} catch(PDOException $e) {
    $data = array(
        "status" => "failed"
    );
    echo json_encode($data);
}

?>
