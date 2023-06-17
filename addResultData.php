<?php
require_once "db/db2.php";
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);

try {
    // Get the logged-in staff name from the session
    $staffName = $_SESSION['uname'];


    // Get the form data
    $patient_id = $_POST['patient_id'];
    $test_name = $_POST['test_name'];
    $result_value = $_POST['result_value'];
    

    // Create a new instance of the Db2 class
    $db = new Db2();
    $dbConnection = $db->connect();

    // Prepare the SQL statement
    $query = "INSERT INTO `result` (`patient_id`, `test_name`, `staff_name`, `result_value`)
              VALUES (:patient_id, :test_name, :staff_name, :result_value)";

    $stmt = $dbConnection->prepare($query);

    // Bind the parameters
    $stmt->bindParam(':patient_id', $patient_id);
    $stmt->bindParam(':test_name', $test_name);
    $stmt->bindParam(':staff_name', $staffName);
    $stmt->bindParam(':result_value', $result_value);


    // Execute the statement
    $stmt->execute();

    // Close the database connection
    $dbConnection = null;

    // Return success status
    $data = array(
        "status" => "added"
    );
    echo json_encode($data);
} catch (PDOException $e) {
    // Return error status
    $data = array(
        "status" => "failed",
        "error" => $e->getMessage()
    );
    echo json_encode($data);
}
?>
