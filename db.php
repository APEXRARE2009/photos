<?php
$host = "localhost";
$username = "root";
$password = "mysql";
$database = "gallery";

$sql = mysqli_connect($host, $username, $password, $database);

if (!$sql) {
    die("error: " . mysqli_connect_error());
}