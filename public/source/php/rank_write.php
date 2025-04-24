<?php 
if (isset($_GET['name']) && isset($_GET['score'])) {
    $name = htmlspecialchars($_GET['name'], ENT_QUOTES, 'UTF-8');
    $fw = fopen("source/txt/ranking.txt", "a"); // 追記する 
    fwrite($fw, date("y/m/d H:i:s") . "," . $name . "," . $_GET['score'] . "\n");
    fclose($fw);
}
?>