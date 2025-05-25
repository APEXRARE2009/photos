<?php
require_once "db.php";

if (isset($_FILES["photo"]) && isset($_POST["comment"])) {
    $comment = $_POST["comment"];
    $photo_name = $_FILES["photo"]["name"];
    $photo_tmp = $_FILES["photo"]["tmp_name"];
    move_uploaded_file($photo_tmp, "./uploads/" . $photo_name);

    $query = "insert into photos (link, comment) values (?, ?)";

    $stmt = mysqli_prepare($sql, $query);
    
    mysqli_stmt_bind_param($stmt, "ss", $photo_name, $comment);
    
    $result = mysqli_stmt_execute($stmt);

    if ($result) {
        header("location: index.html");
    } else {
        echo "error";
    }

    mysqli_stmt_close($stmt);
}

mysqli_close($sql);