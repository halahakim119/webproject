<?php

session_start();

// Check if user is already logged in
if (isset($_SESSION['uname'])) {
  header('Location: index.php');
  exit();
}
?>

<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <title>Login</title>
  <style>
    body {
  
      background: linear-gradient(#002b36, #021e26,#ffe9,#002b36);;

   
    }


    #head1 {
      padding: 0;
     
      margin-left: 35%;
      width: 30%;
      height: auto;
      display: block;
      margin-right: auto;
      margin-bottom: 0;
    }

    /* Container */
    .container {
      margin-top: 0;
      
      margin-left: 35%;
    }

    /* Login */
    #div_login {
      border: 3px solid #021e26;
      border-radius: 5px;
      width: 470px;
      height: 250px;
      background-color: white;
      margin-top: -5%;
    }

    #div_login h1 {
      margin-top: 0px;
      font-weight: normal;
      padding: 10px;
      background-color: #021e26;
      color: white;
      font-family: sans-serif;
    }

    #div_login div {
      margin-top: 10px;
      padding: 5px;
    }

    #div_login .textbox {
      width: 96%;
      padding: 7px;
      background-color: #fff;
      border: 2px dotted darkseagreen;
      border-radius: 2%;
    }

    ::placeholder {
      color: darkseagreen;
      opacity: 5;
      /* Firefox */
    }

    #div_login input[type=submit] {
      padding: 8px;
      width: 100px;
      background-color: darkseagreen;
      border: 0px;
      color: white;
      margin-left: 38%;
      align-content: center;
      font-size: 18px;
      border-radius: 8%;
    }
  </style>
  <script>
    $(document).ready(function () {
      $('#loginForm').on('submit', function (e) {
        e.preventDefault();
        var username = $('#txt_uname').val();
        var password = $('#pwd').val();

        if (username != "" && password != "") {
          $.ajax({
            url: 'login_check.php',
            type: 'post',
            dataType: 'json',  // Expect JSON
            data: { txt_uname: username, txt_pwd: password },
            success: function (response) {
              if (response.status === 'success') {
                window.location.href = 'index.php';
              } else {
                alert(response.message);
              }
            }
          });

        } else {
          alert("Both fields are required.");
        }
      });
    });

    function myFunction() {
      var x = document.getElementById("pwd");
      if (x.type === "password") {
        x.type = "text";
      } else {
        x.type = "password";
      }
    }
  </script>
</head>

<body>
  <img src="images/pic2.png" alt="login png" id="head1">
  <div class="container">
    <form method="post" id="loginForm">
      <div id="div_login">
        <h1>Login</h1>
        <div>
          <input type="text" class="textbox" id="txt_uname" name="txt_uname" placeholder="Username" />
        </div>
        <div>
          <input type="password" class="textbox" id="pwd" name="txt_pwd" placeholder="Password" />
        </div>
        <input type="checkbox" onclick="myFunction()">Show Password
        <div>
          <input type="submit" value="Submit" name="but_submit" id="but_submit" />
        </div>
      </div>
    </form>
  </div>
</body>

</html>