<?php

require_once "db/db2.php";

$id = $_POST["patient_id"];
$name = $_POST["name"];
$age = $_POST["age"];
$gender = $_POST["gender"];
$address = $_POST["address"];
$contact_number = $_POST["contact_number"];

try {
    $query = "UPDATE `patient` SET `name`='$name', `age`='$age', `gender`='$gender', `address`='$address', `contact_number`='$contact_number' WHERE `patient_id`='$id' ";
    $db = new Db2();
    $db = $db->connect();
    
    $stmt = $db->prepare($query);
    $stmt->execute();
    
    $db = null;
    
    $data = array(
        "status" => "updated"
    );
    
    echo json_encode($data);
    
} catch(PDOException $e) {
    $data = array(
        "status" => "failed"
    );
    echo json_encode($data);
}
?>
