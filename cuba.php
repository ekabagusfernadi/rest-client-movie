<?php

if( isset($_POST["tombol-cari"]) ) {
    $data = file_get_contents("http://www.omdbapi.com/?apikey=d8c23a72&s=" . $_POST["cari"]);
    $data = utf8_encode($data);
    $datas = json_decode($data, true)["Search"];

    $muncul = true;
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="" method="post">
        <label for="cari">Cari : </label>
        <input type="text" name="cari" id="cari">
        <button type="submit" name="tombol-cari">Cari</button>
    </form>

    <?php if( isset($muncul) ) : ?>
        <?php foreach( $datas as $data ) : ?>
            <div>
            <img src="<?= $data["Poster"]; ?>" width="200">
            <h1><?= $data["Title"]; ?></h1>
            </div>
        <?php endforeach; ?>
    <?php endif; ?>
</body>
</html>