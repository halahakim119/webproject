
<?php

require_once "../db/db2.php";

$id = $_POST["id"];
$name = $_POST["name"];
$designation = $_POST["designation"];
$department = $_POST["department"];
$contact_number = $_POST["contact_number"];
$username = $_POST["username"];
$password = $_POST["password"];

try {
    $query = "UPDATE staff SET `name`='$name', `designation`='$designation', `department`='$department', `contact_number`='$contact_number', `username`='$username', `password`='$password' WHERE staff_id = '$id' ";
    
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
