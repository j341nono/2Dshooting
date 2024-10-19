<?php 
$file = file("./../txt/ranking.txt");
$type = key($_GET);
foreach ($file as $f) {
    list($date, $name, $score) = explode(',', rtrim($f));
    $name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');  // エスケープ処理
    
    // 名前を12文字でカットする処理
    if (strlen($name) > 12) {
        $name = substr($name, 0, 12) . '...';  // 12文字でカットし、末尾に「...」を追加
    }

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
    } else {
        echo "$key,$val\n";
    }
}
?>