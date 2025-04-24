//
// 各画面
//
// showTitle() showLoop()
// showRule() ruleLoop()
// showRanking() rankingLoop()  displayRankingScr() changeRanking()
//
// nameInputLoop()
// 
//
// Cookie系
//
// nameField() removeElement() setCookie() getCookie()
//
//
// window.onload
//



function showTitle() {

    stopAllBgm();
    showVolumeControls();//音量調節ツマミの表示

    resetStarSpeed();

    if (titleLoopInterval) {
        clearInterval(titleLoopInterval);
    }
    if (gameLoopInterval) {
        clearInterval(gameLoopInterval);
    }
    if (ruleLoopInterval) {
        clearInterval(ruleLoopInterval);
    }
    if (rankingLoopInterval) {
        clearInterval(rankingLoopInterval);
    }
    if (nameInputLoopInterval) {
        clearInterval(nameInputLoopInterval);
    }

    // 名前入力フィールドから名前を取得して保存
    let nameInputField = document.getElementById('playerNameInput');
    if (nameInputField) {
        nameInputField.parentNode.removeChild(nameInputField);
    }

    titleLoopInterval = setInterval(titleLoop, GAME_SPEED);

    // 星が存在しない場合のみ初期化
    if (!star || star.length === 0) {
        star = [];
        for (let i = 0; i < STAR_MAX; i++) {
            star[i] = new Star();
        }
    }

    // カメラ位置をリセット
    camera_x = 0;
    camera_y = 0;

    title = true;
    gameOver = false;
    gameClear = false;
    rule = false;
    ranking = false;
    pause = false;
    nameInput = false;
    back = false;
    world = false;
    gameN = 0;//game numberを0にリセット

    // ランキング表示を非表示にする
    document.getElementById("ranking").style.display = "none";

    // 自機を削除
    jiki = null;
}

function titleLoop() {
    vcon.fillStyle = "black";
    vcon.fillRect(0, 0, FIELD_W, FIELD_H);

    for (let i = 0; i < STAR_MAX; i++) {
        star[i].draw();
        star[i].update();
    }
    con.drawImage(vcan, camera_x, camera_y, SCREEN_W, SCREEN_H, 0, 0, CANVAS_W, CANVAS_H);

    if (starSpeedReq > starSpeed) {
        starSpeed++;
    }
    if (starSpeedReq < starSpeed) {
        starSpeed--;
    }

    putInfo();

}


// Rule画面を表示する関数
function showRule() {
    // タイトルループを停止
    if (titleLoopInterval) {
        clearInterval(titleLoopInterval);
    }
    if (gameLoopInterval) {
        clearInterval(gameLoopInterval);
    }
    if (ruleLoopInterval) {
        clearInterval(ruleLoopInterval);
    }//これはいるか吟味
    if (rankingLoopInterval) {
        clearInterval(rankingLoopInterval);
    }
    if (nameInputLoopInterval) {
        clearInterval(nameInputLoopInterval);
    }


    // Ruleループを開始
    ruleLoopInterval = setInterval(ruleLoop, GAME_SPEED);

    // カメラ位置をリセット
    camera_x = 0;
    camera_y = 0;

    title = false;
    rule = true;
    ranking = false;
    gameOver = false;
    gameClear = false;
    nameInput = false;
    gameN = 0;//game numberを0にリセット

    // 自機を初期化
    jikiMini = new JikiMini();
    tama = []; // 弾の配列を初期化
    jikiMini.x = (CANVAS_W / 4) << 8;
    jikiMini.y = (CANVAS_H - 400) << 8;
}

// Ruleループ関数
function ruleLoop() {
    // 背景を描画
    vcon.fillStyle = "black";
    vcon.fillRect(0, 0, FIELD_W, FIELD_H);

    for (let i = 0; i < STAR_MAX; i++) {
        star[i].draw();
        star[i].update();
    }

    updateObj(tama);
    drawObj(tama);

    // 自機を更新・描画
    jikiMini.draw();
    jikiMini.update();

    con.drawImage(vcan, camera_x, camera_y, SCREEN_W, SCREEN_H, 0, 0, CANVAS_W, CANVAS_H);

    putInfo();
}


function showRanking() {

    stopAllBgm();

    resetStarSpeed();

    // すべてのループを停止
    if (titleLoopInterval) {
        clearInterval(titleLoopInterval);
    }
    if (gameLoopInterval) {
        clearInterval(gameLoopInterval);
    }
    if (ruleLoopInterval) {
        clearInterval(ruleLoopInterval);
    }
    if (rankingLoopInterval) {
        clearInterval(rankingLoopInterval);
    }
    if (nameInputLoopInterval) {
        clearInterval(nameInputLoopInterval);
    }


    rankingLoopInterval = setInterval(rankingLoop, GAME_SPEED);

    // カメラ位置をリセット
    camera_x = 0;
    camera_y = 0;

    ranking = true;
    title = false;
    gameOver = false;
    gameClear = false;
    rule = false;
    nameInput = false;
    gameN = 0;//game numberを0にリセット

    // ランキング表示を初期化して表示
    document.getElementById("ranking").style.display = "block";
    displayRankingScr(0);
}

function rankingLoop() {
    vcon.fillStyle = "black";
    vcon.fillRect(0, 0, FIELD_W, FIELD_H);

    for (let i = 0; i < STAR_MAX; i++) {
        star[i].draw();
        star[i].update();
    }

    con.drawImage(vcan, 0, 0, SCREEN_W, SCREEN_H, 0, 0, CANVAS_W, CANVAS_H);

    if (starSpeedReq > starSpeed) {
        starSpeed++;
    }
    if (starSpeedReq < starSpeed) {
        starSpeed--;
    }

    putInfo();


    // ここにランキングデータの表示ロジックを追加
    // displayRankingScr(0);

    // BGM再生
    //BGM[BGM_cnt].pause();
    //BGM[BGM_cnt].currentTime = 0;
    //BGM[BGM_cnt = (BGM_cnt + 1) % 3].play();
}

function displayRankingScr(i) {
    nameR = getCurrentPlayerName();
    // ランキングの選択
    var table = "<h1><div class='change-button'>";
    table += "<button class='left-btn' onclick='changeRanking(" + (i + 2) % 3 + ")'></button>";
    table += whichranking[i][1];
    table += "<button class='right-btn' onclick='changeRanking(" + (i + 1) % 3 + ")'></button>";
    table += "</div></h1>";

    _d = new Date().getTime(); //キャッシュ回避のため日時を利用する
    $.get("./source/php/rank_print.php?" + whichranking[i][0] + "=" + _d, function (data) {
        var a = data.split("\n"); //改行で区切る
        table += "<div class='table1'><table align='center' cellspacing=0 cellpadding=0>";
        table += "<tr align='center'><td>&nbsp;&nbsp;&nbsp;[順位]&nbsp;&nbsp;&nbsp;</td><td>&nbsp;&nbsp;&nbsp;[プレイヤー名]&nbsp;&nbsp;&nbsp;</td><td>&nbsp;&nbsp;&nbsp;[スコア]&nbsp;&nbsp;&nbsp;</td></tr>";
        var rankmax = 20;
        if (a.length <= 20) {
            rankmax = a.length - 1;
        }
        for (j = 0; j < rankmax; j++) {
            var b = a[j].split(","); //カンマで区切る
            table += "<tr align='left'><td>&nbsp;&nbsp;&nbsp;" + (j + 1) + ".</td><td>&nbsp;&nbsp;&nbsp;" + b[1] + "</td><td>&nbsp;&nbsp;&nbsp;"
                + b[2] + "</td></tr>";
        }
        for (j = rankmax; j < 20; j++) {
            table += "<tr align='left'><td>&nbsp;&nbsp;&nbsp;" + (j + 1) + ".</td><td>　　</td><td>　　</td></tr>";
        }
        table += "</table></div><br>";


        let playerFound = false;
        let playerRank = -1;
        let playerScore = "";

        for (let k = 0; k < a.length; k++) {
            let myRank = a[k].split(",");
            if (nameR === myRank[1]) {
                playerFound = true;
                playerRank = k + 1;
                playerScore = myRank[2];
                break;
            }
        }

        if (playerFound) {
            table += `<div style='text-align:center;'>&nbsp;&nbsp;&nbsp;現在の順位:${playerRank}&nbsp;&nbsp;&nbsp;${nameR}&nbsp;&nbsp;&nbsp;スコア:${playerScore}&nbsp;&nbsp;&nbsp;</div>`;
        } else {
            if (nameR) {
                table += "<div style='text-align:center;'>まだゲームをプレイしていないようです...</div>";
            } else {
                table += "<div style='text-align:center;'>プレイヤー名が設定されていません。</div>";
            }
        }

        document.getElementById("ranking").innerHTML = table;
    });
}

function changeRanking(index) {
    playSe(putButton);
    displayRankingScr(index);
}


function showNameInputScreen() {

    if (titleLoopInterval) {
        clearInterval(titleLoopInterval);
    }
    if (gameLoopInterval) {
        clearInterval(gameLoopInterval);
    }
    if (ruleLoopInterval) {
        clearInterval(ruleLoopInterval);
    }
    if (rankingLoopInterval) {
        clearInterval(rankingLoopInterval);
    }
    if (nameInputLoopInterval) {
        clearInterval(nameInputLoopInterval);
    }

    nameInputLoopInterval = setInterval(nameInputLoop, GAME_SPEED);

    // カメラ位置をリセット
    camera_x = 0;
    camera_y = 0;

    title = false;
    rule = false;
    ranking = false;
    gameOver = false;
    gameClear = false;
    nameInput = true;

    nameField();
}

// 名前入力画面のループ関数を追加
function nameInputLoop() {
    vcon.fillStyle = "black";
    vcon.fillRect(0, 0, FIELD_W, FIELD_H);

    for (let i = 0; i < STAR_MAX; i++) {
        star[i].draw();
        star[i].update();
    }

    con.drawImage(vcan, camera_x, camera_y, SCREEN_W, SCREEN_H, 0, 0, CANVAS_W, CANVAS_H);

    if (starSpeedReq > starSpeed) {
        starSpeed++;
    }
    if (starSpeedReq < starSpeed) {
        starSpeed--;
    }

    putInfo();
}



//名前入力画面の名前フィールド
function nameField() {

    const nameInputId = "playerNameInput";
    const instructionTextId = "nameInputInstruction";

    if (nameInput) {

        // クッキーから名前を取得
        let savedName = getCookie("playerName");

        // 名前入力フィールドを作成
        let nameInputF = document.createElement("input");
        nameInputF.type = "text";
        nameInputF.id = "playerNameInput";
        nameInputF.style.position = "absolute";
        nameInputF.style.left = "50%";
        nameInputF.style.top = "50%";
        nameInputF.style.transform = "translate(-50%, -50%)";
        nameInputF.style.width = "150px"; // 幅を指定
        nameInputF.style.height = "40px"; // 高さを指定
        nameInputF.style.boxSizing = "border-box"; // サイズを固定
        nameInputF.value = savedName || ""; // 保存された名前があれば表示
        document.body.appendChild(nameInputF);

    }
    else {
        // 名前入力フィールドと説明テキストを削除する
        removeElement(nameInputId);
        removeElement(instructionTextId);
    }
}


// 音量調節ツマミ
function showVolumeControls() {
    // 既存の要素を削除（存在する場合）
    removeElement('volumeControls');

    // 現在の音量を取得（0-1の範囲）
    const currentBgmVolume = bgmVolume;
    const currentSeVolume = seVolume;

    // 現在の音量を0-100の範囲に変換
    let bgmValue = Math.round(currentBgmVolume * 100);
    let seValue = Math.round(currentSeVolume * 100);


    // 新しい要素を作成
    const controls = document.createElement('div');
    controls.id = 'volumeControls';
    controls.style.position = 'absolute';

    // (CANVAS_W / 2) - (sliderWidth / 2) + 400
    controls.style.left = `${CANVAS_W - 90}px`;  // 固定された X 座標
    controls.style.top = '140px';   // 固定された Y 座標
    //ツマミを縦に2つ並べる valueで現在の音量を反映させる
    controls.innerHTML = `
    <div style="color: white; margin-bottom: 10px;">
        BGM Volume: <input type="range" id="bgmVolumeSlider" min="0" max="100" value="${bgmValue}" style="width:${sliderWidth}px; display:block;">
    </div>
    <div style="color: white;">
        SE Volume: <input type="range" id="seVolumeSlider" min="0" max="100" value="${seValue}" style="width:${sliderWidth}px; display:block;">
    </div>
    `;

    // ボディに追加
    document.body.appendChild(controls);

    // イベントリスナーを追加
    document.getElementById('bgmVolumeSlider').addEventListener('input', function () {
        setBgmVolume(this.value / 100);
    });
    document.getElementById('seVolumeSlider').addEventListener('input', function () {
        setSeVolume(this.value / 100);
    });
}


// 要素を完全に削除する関数 名前入力フィールドや音量調節フィールドを消せる
function removeElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.parentNode.removeChild(element);
    }
}

// クッキーを設定する関数
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// クッキーを取得する関数
function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
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


//オンロードでタイトル画面
window.onload = function () {

    initAudio();

    showTitle();

    //teki.push(new Teki(7, (FIELD_W / 2) << 8, 0, 0, 200));

}