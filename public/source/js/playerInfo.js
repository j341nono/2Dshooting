//
// getCurrentPlayerName()  writeScoreToFile(score)
//


//ランキング用
let playerName = "";


function getCurrentPlayerName() {
    // クッキーから現在のプレイヤー名を取得
    let currentPlayerName = getCookie("playerName");

    // 名前が無い（nullまたはundefined）場合は空文字列を返す
    return currentPlayerName || "";
}


//ファイルに書き込み
function writeScoreToFile(score) {
    if (!playerName) {
        playerName = "anonymous";
    }

    // XMLHttpRequestを使用してPHPスクリプトにデータを送信
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `./source/php/rank_write.php?name=${encodeURIComponent(playerName)}&score=${score}`, true);
    xhr.send();
}

