<?php
require_once('db/db.php');

// Check if session is not already started
if(session_status() !== PHP_SESSION_ACTIVE) {
    session_start();
}

$response = array('status' => 'error', 'message' => 'Error in request.');

if(isset($_POST['txt_uname']) && isset($_POST['txt_pwd'])){
  $uname = mysqli_real_escape_string($con,$_POST['txt_uname']);
  $password = mysqli_real_escape_string($con,$_POST['txt_pwd']);

  if ($uname != "" && $password != ""){
    $sql_query = "select count(*) as cntUser from staff where username='".$uname."' and password='".$password."'";
    $result = mysqli_query($con,$sql_query);
    $row = mysqli_fetch_array($result);
    $count = $row['cntUser'];

    if($count > 0){
      // Store the data in the session
      $_SESSION['uname'] = $uname;
      $response = array('status' => 'success');
    }else{
      $response = array('status' => 'error', 'message' => 'Invalid username or password.');
    }
  }
}

echo json_encode($response);
?>
