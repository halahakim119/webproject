<?php
require_once "../db/db2.php";

$search = $_GET["search"];

try {
    $db = new Db2();
    $db = $db->connect();

    $query = "SELECT * FROM `staff` WHERE `name` LIKE :search";

    $stmt = $db->prepare($query);
    $stmt->bindValue(':search', '%' . $search . '%');
    $stmt->execute();

    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $db = null;

    echo json_encode($rows);
} catch (PDOException $e) {
    $data = array(
        "status" => "failed",
        "error" => $e->getMessage()
    );
    echo json_encode($data);
}
?>
