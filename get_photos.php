<?php
require_once "db.php";

$query = "select * from photos order by id desc";

$result = mysqli_query($sql, $query);

$photos = [];

while ($row = mysqli_fetch_assoc($result)) {
    $photos[] = $row;
}

echo json_encode($photos);

mysqli_close($sql);