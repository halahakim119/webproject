<?php

class Db2
{
    private $host = "localhost";
    private $user = "root";
    private $password = "";
    private $dbname = "webproject";

    public function connect()
    {
        $mysql_connect = "mysql:host=$this->host;port=3306;dbname=$this->dbname";
        $dbConnection = new PDO($mysql_connect, $this->user, $this->password);
        $dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        return $dbConnection;
    }
}

?>
