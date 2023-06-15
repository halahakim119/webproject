<?php
include "db/db.php";
// Check if the user is logged in or not
if (!isset($_SESSION['uname'])) {
  header('Location: login.php');
}

if (isset($_POST['but_logout'])) {
  // Send an AJAX request to log out the user
  echo json_encode(logoutUser());
  exit;
}

function logoutUser()
{
  session_destroy();
  return ['redirect' => 'login.php'];
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <title>HOME</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>

  <style>
   .navbar-inverse {
      background-color: transparent;
      border-color: transparent;
    }
    body {
      background-image: url("https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2NpZW5jZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80");
      background-size: cover;
      background-repeat: no-repeat;
    }
    .navbar-right .logout-btn {
      background-color: transparent;
      border: none;
      outline: none;
      font-size: 14px;
      font-weight: 700;
      color: #fff;
      padding: 15px 25px;
      margin-right: 15px;
      text-transform: uppercase;
      transition: background-color 0.3s ease;
    }
    .navbar-right .logout-btn:hover,
    .navbar-right .logout-btn:focus {
      background-color: rgba(255, 255, 255, 0.2);
    }
    .navbar-right .logout-btn .glyphicon {
      margin-right: 5px;
    }
  </style>
</head>

<body>


<nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="#">LABORATORY</a>
    </div>
    <ul class="nav navbar-nav">
      <li><a href="index.php">Home</a></li>
      <li class="dropdown">
        <a class="dropdown-toggle" data-toggle="dropdown" href="#">Patients<span class="caret"></span></a>
        <ul class="dropdown-menu">
          <li><a href="patients.html">View Patients</a></li>
          <li><a href="new_patient_form.html">Add New Patient</a></li>
        </ul>
      </li>
      <li class="dropdown">
        <a class="dropdown-toggle" data-toggle="dropdown" href="#">Users<span class="caret"></span></a>
        <ul class="dropdown-menu">
          <li><a href="view_users.html">View Users</a></li>
          <li><a href="add_user.html">Add New User</a></li>
        </ul>
      </li>
      <li class="dropdown">
        <a class="dropdown-toggle" data-toggle="dropdown" href="#">Tests<span class="caret"></span></a>
        <ul class="dropdown-menu">
          <li><a href="view_tests.html">View Tests</a></li>
          <li><a href="add_test.html">Add New Test</a></li>
        </ul>
      </li>
    </ul>
    <ul class="nav navbar-nav navbar-right">
      <li><button class="btn btn-default navbar-btn logout-btn"  id="logoutButton"><span class="glyphicon glyphicon-home"></span> Logout</button></li>
    </ul>
  </div>
</nav>



  <script>
    $(document).ready(function () {
      // Handle logout button click
      $('#logoutButton').click(function () {
        $.ajax({
          type: 'POST',
          url: '',
          data: { but_logout: true },
          dataType: 'json',
          success: function (response) {
            // Redirect to the login page
            window.location.href = response.redirect;
          },
          error: function (xhr, status, error) {
            // Handle error (if needed)
          }
        });
      });
    });


    $(document).ready(function () {
      // Check user login status on page load
      checkLoginStatus();

      // Function to check if the user is logged in
      function checkLoginStatus() {
        $.ajax({
          url: 'check_login.php',
          type: 'POST',
          dataType: 'json',
          success: function (response) {
            if (response.isLoggedIn) {
              // User is logged in
              // Continue with the page functionality
            } else {
              // User is not logged in
              // Redirect to the login page
              window.location.href = 'login.php';
            }
          },
          error: function (xhr, status, error) {
            // Handle error (if needed)
          }
        });
      }
    });
  </script>
</body>

</html>