<?php
require_once "../db/db2.php";

$name = $_POST["name"];
$designation = $_POST["designation"];
$department = $_POST["department"];
$contact_number = $_POST["contact_number"];
$username = $_POST["username"];
$password = $_POST["password"];

try {
    $query = "INSERT INTO `staff` (`name`, `designation`, `department`, `contact_number`, `username`, `password`) VALUES (:name, :designation, :department, :contact_number, :username, :password)";

    $db = new Db2();
    $db = $db->connect();

    $stmt = $db->prepare($query);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':designation', $designation);
    $stmt->bindParam(':department', $department);
    $stmt->bindParam(':contact_number', $contact_number);
    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':password', $password);
    $stmt->execute();

    $db = null;

    $data = array(
        "status" => "added"
    );

    echo json_encode($data);
} catch (PDOException $e) {
    $data = array(
        "status" => "failed"
    );

    echo json_encode($data);
}
?>
