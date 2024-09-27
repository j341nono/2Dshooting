//
// キーボードイベントハンドラ　pauseGame() resumeGame()
//



//キーボードの状態
let key = [];


//キーボードが押された時
document.onkeydown = function (e) {
    key[e.keyCode] = true;

    if (rule && e.keyCode == 27) {//ESC
        playSe(putButton);
        showTitle();
    }
    else if (ranking && e.keyCode == 27) {
        playSe(putButton);
        showTitle();
    }
    //タイトル画面からルール説明やランキング画面に遷移する際は
    //背景を同期させるために、関数は使用しない
    else if (title) {
        switch (e.keyCode) {
            case 83: // 'S' key
                playSe(putButton);
                removeElement('volumeControls');//音量調節ツマミの削除
                gameInit();
                break;
            case 87: // 'W' key
                playSe(putButton);
                removeElement('volumeControls');
                showRule();
                break;
            case 69: // 'E' key
                playSe(putButton);
                removeElement('volumeControls');
                showRanking();
                break;
            case 78: //N
                playSe(putButton);
                removeElement('volumeControls');
                showNameInputScreen();
                break;
            case 66: //B
                playSe(putButton);
                removeElement('volumeControls');
                gameInit2();
                break;
            case 71: //G
                playSe(putButton);
                removeElement('volumeControls');
                gameInit3();
                break;

        }
    }
    if (nameInput) {
        let nameInputField = document.getElementById('playerNameInput');
        // NAMEの確定
        if (e.keyCode === 13 || e.keyCode == 27) {
            playSe(putButton);
            if (nameInputField && nameInputField.value) {
                let inputName = nameInputField.value;
                setCookie("playerName", inputName, 30);
                playerName = inputName;
            }
            showTitle();
        }
    }
    //gameOver,gameClear中に、Rボタンを押したときの処理
    else if (gameOver || gameClear) {
        switch (e.keyCode) {
            case 82: // 'R' key
                stopAllBgm();
                playSe(putButton);
                gameInit();
                break;
            case 84: // 'T' key
                stopAllBgm();
                playSe(putButton);
                starSpeedReq = 100;
                showTitle();
                break;
            case 69: // 'E' key
                stopAllBgm();
                playSe(putButton);
                starSpeedReq = 100;
                showRanking();
                break;
        }
    }
    if (gameCount > 0 && !rule && !ranking && !nameInput && !title
        && !levelup && !levelup2 && !game2 && !game3 && !gameOver&& !gameClear
    ) {
        //ポーズ
        if (e.keyCode == 27 && !pause) {
            playSe(putButton);
            /*音量調節ツマミの追加は関数に入れた*/
            pauseGame();
        }
        //ポーズから再開
        else if (e.keyCode == 27 && pause) {
            playSe(putButton);
            /*音量調節ツマミの追加は関数に入れた*/
            resumeGame();
        }
        //ポーズ中からリスタート
        else if (e.keyCode == 82 && pause) {
            playSe(putButton);
            removeElement('volumeControls');//音量調節ツマミの削除
            gameInit();
        }
        //ポーズ中からタイトル
        else if (e.keyCode == 84 && pause) {
            playSe(putButton);
            starSpeedReq = 100;

            //タイトル画面で音量調節ツマミを表示しないなら、以下を使う
            //removeElement('volumeControls');

            showTitle();
        }
    }



}
//キーボードが離された時
document.onkeyup = function (e) {
    key[e.keyCode] = false;
}


let currentBgm = null; // 現在再生中のBGMを記憶する変数

//一時中止用
function pauseGame() {
    clearInterval(gameLoopInterval);

    currentBgm = getCurrentBgm();
    stopAllBgm();
    pause = true; // 一時停止フラグを設定
    putInfo();
    showVolumeControls();//音量調節ツマミの表示
}

//再開用
function resumeGame() {

    if (!(currentBgm == null)) {
        playBgm(currentBgm);
    }

    let LN;
    if (gameN == 1) {
        LN = gameLoop;
    }
    else if (gameN == 2) {
        LN = gameLoop2;
    }
    else if (gameN == 3) {
        LN = gameLoop3;
    }
    gameLoopInterval = setInterval(LN, GAME_SPEED);
    removeElement('volumeControls');//音量調節ツマミの削除
    pause = false;
}

//現在のBGMを取得する関数 通常ステージ(Bbuf==1)ならbgm,ボス戦(Bbuf==2)なら...
function getCurrentBgm() {
    if (Bbuf == 1) {
        return bgm;
    }
    else if (Bbuf == 2) {
        return bossBgm;
    }
    else {
        return null;
    }
}


