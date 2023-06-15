<?php
require_once "db/db2.php";

$name = $_POST["patientName"];
$age = $_POST["patientAge"];
$gender = $_POST["patientGender"];
$address = $_POST["patientAddress"];
$contact_number = $_POST["patientContact"];

try
{
    $query = "INSERT INTO `patient` (`name`,`age`,`gender`,`address`,`contact_number`) VALUES (:name,:age,:gender,:address,:contact_number)";

    $db = new Db2();
    $db = $db->connect();

    $stmt = $db->prepare($query);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':age', $age);
    $stmt->bindParam(':gender', $gender);
    $stmt->bindParam(':address', $address);
    $stmt->bindParam(':contact_number', $contact_number);
    $stmt->execute();
    $db = null;

    $data = array(
        "status" => "added"
    );

    echo json_encode($data);
}
catch(PDOException $e)
{
    $data = array(
        "status" => "failed"
    );

    echo json_encode($data);
}
?>
