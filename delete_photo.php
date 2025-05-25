<?php
require_once "db.php";

if (isset($_GET["id"])) {
    $id = mysqli_real_escape_string($sql, $_GET["id"]);
    $query = "delete from photos where id = \"$id\"";
    $result = mysqli_query($sql, $query);
}

mysqli_close($sql);