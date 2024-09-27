<?php
$file = file("./../txt/ranking.txt");
$type = key($_GET);
foreach ($file as $f) {
    list($date, $name, $score) = explode(',', rtrim($f));
    $db[$date . ',' . $name] = $score;
}
arsort($db); //スコアが高い順にソートする
foreach ($db as $key => $val) {
    list($date, $name) = explode(',', $key);
    if ($type === "d") {
        $currentDate = date('y/m/d');
        $dateParts = explode(' ', $date);
        if ($dateParts[0] == $currentDate) {
            echo "$key,$val\n";
        }
    } else if ($type === "m") {
        $currentDate = date('y/m');
        $dateParts = explode('/', $date);
        $month = $dateParts[0] . "/" . $dateParts[1];
        if ($month == $currentDate) {
            echo "$key,$val\n";
        }
    } else
        echo "$key,$val\n";
}
?>