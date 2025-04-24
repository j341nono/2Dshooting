//
// gameInit() gameInit2() gameInit3() 
// gameLoop() gameLoop2() gameLoop3()
//


//インターバル
let enemyDefeatTime = -1;//ボス戦後のインターバル
let gameLoopInterval;
let titleLoopInterval;
let ruleLoopInterval;
let rankingLoopInterval;
let nameInputLoopInterval;


//ゲーム初期化
function gameInit() {

    //initAudio();//BGM
    gameCount = 0;
    gameWave = 0;
    score = 0;
    enemyDefeatTime = -1;
    title = false;
    gameOver = false;
    gameClear = false;
    rule = false;
    ranking = false;
    pause = false;
    nameInput = false;
    isScoreRecorded = false;
    back = false;
    world = false;

    bossHP = 0;//ボスのHPを初期化
    bossMHP = 0;
    gameN = 1;//game numberを1



    // 星の速さをリセット
    resetStarSpeed();

    // 星の初期化
    star = [];
    for (let i = 0; i < STAR_MAX; i++) {
        star[i] = new Star();
    }

    // オブジェクトの配列をクリア
    teki = [];
    teta = [];
    tama = [];
    expl = [];

    // 自機の初期化
    jiki = new Jiki();

    // タイトルループを停止
    if (titleLoopInterval) {
        clearInterval(titleLoopInterval);
    }
    // Ruleループを停止
    if (ruleLoopInterval) {
        clearInterval(ruleLoopInterval);
    }
    // Rankingループを停止
    if (rankingLoopInterval) {
        clearInterval(rankingLoopInterval);
    }
    if (nameInputLoopInterval) {
        clearInterval(nameInputLoopInterval);
    }


    // 既存のインターバルをクリアし、新しく設定
    if (gameLoopInterval) {
        clearInterval(gameLoopInterval);
    }
    gameLoopInterval = setInterval(gameLoop, GAME_SPEED);

    //playBgm(bgm);//bgm
}

//ボスラッシュ用初期化
function gameInit2() {

    gameCount = 0;
    gameWave = 0;
    score = 0;
    enemyDefeatTime = -1;
    title = false;
    gameOver = false;
    gameClear = false;
    rule = false;
    ranking = false;
    pause = false;
    nameInput = false;
    isScoreRecorded = false;

    bossHP = 0;//ボスのHPを初期化
    bossMHP = 0;

    gameN = 2;//game number=2

    // 星の速さをリセット
    resetStarSpeed();

    // 星の初期化
    star = [];
    for (let i = 0; i < STAR_MAX; i++) {
        star[i] = new Star();
    }

    // オブジェクトの配列をクリア
    teki = [];
    teta = [];
    tama = [];
    expl = [];

    // 自機の初期化
    jiki = new Jiki();

    // タイトルループを停止
    if (titleLoopInterval) {
        clearInterval(titleLoopInterval);
    }
    // Ruleループを停止
    if (ruleLoopInterval) {
        clearInterval(ruleLoopInterval);
    }
    // Rankingループを停止
    if (rankingLoopInterval) {
        clearInterval(rankingLoopInterval);
    }
    if (nameInputLoopInterval) {
        clearInterval(nameInputLoopInterval);
    }


    // 既存のインターバルをクリアし、新しく設定
    if (gameLoopInterval) {
        clearInterval(gameLoopInterval);
    }
    gameLoopInterval = setInterval(gameLoop2, GAME_SPEED);
}

//最強ボス初期化
function gameInit3() {

    gameCount = 0;
    gameWave = 0;
    score = 0;
    enemyDefeatTime = -1;
    title = false;
    gameOver = false;
    gameClear = false;
    rule = false;
    ranking = false;
    pause = false;
    nameInput = false;
    isScoreRecorded = false;

    bossHP = 0;//ボスのHPを初期化
    bossMHP = 0;
    gameN = 3;//game number=3

    // 星の速さをリセット
    resetStarSpeed();

    // 星の初期化
    star = [];
    for (let i = 0; i < STAR_MAX; i++) {
        star[i] = new Star();
    }

    // オブジェクトの配列をクリア
    teki = [];
    teta = [];
    tama = [];
    expl = [];

    // 自機の初期化
    jiki = new Jiki();

    // タイトルループを停止
    if (titleLoopInterval) {
        clearInterval(titleLoopInterval);
    }
    // Ruleループを停止
    if (ruleLoopInterval) {
        clearInterval(ruleLoopInterval);
    }
    // Rankingループを停止
    if (rankingLoopInterval) {
        clearInterval(rankingLoopInterval);
    }
    if (nameInputLoopInterval) {
        clearInterval(nameInputLoopInterval);
    }


    // 既存のインターバルをクリアし、新しく設定
    if (gameLoopInterval) {
        clearInterval(gameLoopInterval);
    }
    gameLoopInterval = setInterval(gameLoop3, GAME_SPEED);
}


//ゲームループ　1コマでやること
function gameLoop() {

    if (!gameOver) {
        gameCount++;

        //ウェーブが進むについて、背景の星のスピードを速くする
        if (starSpeedReq > starSpeed) {
            starSpeed++;
        }
        if (starSpeedReq < starSpeed) {
            starSpeed--;
        }

        if (gameWave == 0) {

            Bbuf = 1;//通常ステージであることを判定する変数
            playBgm(bgm);//bgm

            if (rand(0, 60) == 1) {
                //Teki()の最初の引数に敵の種類
                teki.push(new Teki(0, rand(0, FIELD_W) << 8, 0, 0, rand(300, 1200)));
            }
            //20s後
            if (gameCount > 60 * 20) {
                gameWave++;
                gameCount = 0;
                starSpeedReq = 100;//背景の星の速さを変化させる
            }
        }
        else if (gameWave == 1) {
            if (rand(0, 40) == 1) {

                teki.push(new Teki(1, rand(0, FIELD_W) << 8, 0, 0, rand(300, 1200)));
            }
            if (gameCount > 60 * 20) {
                gameWave++;
                gameCount = 0;
                starSpeedReq = 200;
            }
        }
        else if (gameWave == 2) {
            if (rand(0, 40) == 1) {
                let r = rand(0, 1);
                teki.push(new Teki(r, rand(0, FIELD_W) << 8, 0, 0, rand(300, 1200)));
            }
            if (gameCount > 60 * 20) {
                Bbuf = 2;
                stopAllBgm();//BGM
                playBgm(bossBgm);

                gameWave++;
                gameCount = 0;
                starSpeedReq = 150;

                //waveが3になった瞬間に表示するために、こっちで出現
                teki.push(new Teki(2, (FIELD_W / 2) << 8, -(70 << 8), 0, 200));
            }
        }
        else if (gameWave == 3) {

            if (teki.length == 0) {
                Bbuf = 0;
                stopAllBgm();

                //ゲームクリアやレベルアップのBGMもあり


                //レベルアップの表示
                levelup = true;
                //レベルアップの処理
                jiki.hp = 100;
                jiki.jikiPower = 1;

                // 敵が全滅した時刻を記録（まだ記録されていない場合）
                if (enemyDefeatTime == -1) {
                    enemyDefeatTime = Date.now();
                }

                // 現在の時刻を取得
                let currentTime = Date.now();

                // 敵全滅から4秒（4000ミリ秒）経過したかチェック
                if (currentTime - enemyDefeatTime >= 4000) {
                    Bbuf = 1;
                    playBgm(bgm);
                    gameWave = 4;
                    gameCount = 0;
                    starSpeedReq = 300;
                    levelup = false;

                    // 時刻をリセット（次のウェーブのために）
                    enemyDefeatTime = -1;
                }
            } else {
                // 敵が残っている場合、時刻をリセット
                enemyDefeatTime = -1;
            }
        }
        else if (gameWave == 4) {

            if (rand(0, 40) == 1) {

                teki.push(new Teki(4, rand(0, FIELD_W) << 8, 0, 0, rand(300, 1200)));
            }
            if (gameCount > 60 * 20) {
                gameWave++;
                gameCount = 0;
                starSpeedReq = 400;
            }
        }
        else if (gameWave == 5) {
            if (rand(0, 40) == 1) {

                if (rand(0, 1) == 0) {
                    teki.push(new Teki(0, rand(0, FIELD_W) << 8, 0, 0, rand(300, 1200)));
                }
                else {
                    teki.push(new Teki(4, rand(0, FIELD_W) << 8, 0, 0, rand(300, 1200)));
                }
            }
            if (gameCount > 60 * 20) {
                gameWave++;
                gameCount = 0;
                starSpeedReq = 500;
            }
        }
        else if (gameWave == 6) {
            if (rand(0, 40) == 1) {

                if (rand(0, 1) == 0) {
                    teki.push(new Teki(4, rand(0, FIELD_W) << 8, 0, 0, rand(300, 1200)));
                }
                else if (rand(0, 1) == 0) {
                    teki.push(new Teki(0, rand(0, FIELD_W) << 8, 0, 0, rand(300, 1200)));
                }
                else {
                    teki.push(new Teki(1, rand(0, FIELD_W) << 8, 0, 0, rand(300, 1200)));
                }

            }
            if (gameCount > 60 * 20) {
                stopAllBgm();
                playBgm(bossBgm);
                Bbuf = 2;

                gameWave++;
                gameCount = 0;
                starSpeedReq = 700;

                teki.push(new Teki(5, (FIELD_W / 2) << 8, -(70 << 8), 0, 200));
            }
        }
        else if (gameWave == 7) {

            if (teki.length == 0) {

                Bbuf = 0;
                stopAllBgm();

                //レベルアップの表示
                levelup2 = true;
                //レベルアップの処理
                jiki.hp = 100;
                jiki.jikiPower = 2;

                // 敵が全滅した時刻を記録（まだ記録されていない場合）
                if (enemyDefeatTime == -1) {
                    enemyDefeatTime = Date.now();
                }
                // 現在の時刻を取得
                let currentTime = Date.now();
                // 敵全滅から4秒（4000ミリ秒）経過したかチェック
                if (currentTime - enemyDefeatTime >= 4000) {
                    Bbuf = 1;
                    playBgm(bgm);
                    gameWave++;
                    gameCount = 0;
                    starSpeedReq = 400;
                    levelup2 = false;

                    // 時刻をリセット（次のウェーブのために）
                    enemyDefeatTime = -1;
                }
            } else {
                // 敵が残っている場合、時刻をリセット
                enemyDefeatTime = -1;
            }
        }
        else if (gameWave == 8) {
            if (rand(0, 30) == 1) {

                teki.push(new Teki(6, rand(0, FIELD_W) << 8, 0, 0, rand(300, 1200)));
            }
            if (gameCount > 60 * 20) {
                gameWave++;
                gameCount = 0;
                starSpeedReq = 500;
            }
        }
        else if (gameWave == 9) {
            if (rand(0, 10) == 1) {

                teki.push(new Teki(7, rand(0, FIELD_W) << 8, 0, 0, rand(300, 1200)));
            }
            if (gameCount > 60 * 20) {
                gameWave++;
                gameCount = 0;
                starSpeedReq = 600;
            }
        }
        else if (gameWave == 10) {
            if (rand(0, 20) == 1) {
                let r = rand(6, 7);
                teki.push(new Teki(r, rand(0, FIELD_W) << 8, 0, 0, rand(300, 1200)));
            }
            if (gameCount > 60 * 20) {
                gameWave++;
                gameCount = 0;
                starSpeedReq = 600;
            }
        }
        else if (gameWave == 11) {
            if (rand(0, 20) == 1) {
                if (rand(0, 3) == 0) {
                    teki.push(new Teki(6, rand(0, FIELD_W) << 8, 0, 0, rand(300, 1200)));
                }
                else if (rand(0, 2) == 0) {
                    teki.push(new Teki(6, rand(0, FIELD_W) << 8, 0, 0, rand(300, 1200)));
                }
                else if (rand(0, 1) == 0) {
                    teki.push(new Teki(4, rand(0, FIELD_W) << 8, 0, 0, rand(300, 1200)));
                }
                else {
                    teki.push(new Teki(0, rand(0, FIELD_W) << 8, 0, 0, rand(300, 1200)));
                }
            }
            if (gameCount > 60 * 20) {
                stopAllBgm();
                playBgm(bossBgm);
                Bbuf = 2;

                gameWave++;
                gameCount = 0;
                starSpeedReq = 900;

                teki.push(new Teki(8, (FIELD_W / 2) << 8, -(70 << 8), 0, 200));
            }
        }
        else if (gameWave == 12) {
            if (teki.length == 0) {
                Bbuf = 0;

                // ゲームクリア処理を一度だけ実行するためのフラグ
                if (!gameClear) {
                    stopAllBgm(); // 現在のBGMを停止
                    playBgm(gameClearBgm); // クリアBGMを再生

                    gameClear = true;
                    back = false; // バックグラウンド処理を停止
                    world = false; // ワールド処理を停止
                }

            }
        }


        //以下は実験用
        /*
        if (rand(0, 60) == 1) {
            
            teki.push(new Teki(7, rand(0, FIELD_W) << 8, 0, 0, rand(300, 1200)));
        }
        */


    }

    updateAll();

    if (gameWave == 0) {
        drawAll();
    }
    else if (gameWave == 3) {
        drawAll2(1);
    }
    else if (gameWave == 7) {
        drawAll2(3);
    }
    else if (gameWave == 12) {
        drawAll2(3);
    }
    else {
        drawAll();
    }
    putInfo();
    putDebug();


    //重複して書き込むのを防ぐための処理も加える
    if ((gameOver || gameClear) && !isScoreRecorded) {
        writeScoreToFile(score);
        isScoreRecorded = true;
    }

}

//ボスラッシュ
function gameLoop2() {

    if (!gameOver) {
        gameCount++;

        //ウェーブが進むについて、背景の星のスピードを速くする
        if (starSpeedReq > starSpeed) {
            starSpeed++;
        }
        if (starSpeedReq < starSpeed) {
            starSpeed--;
        }

        if (gameWave == 0) {

            playBgm(bossBgm);

            if (teki.length == 0) {
                //レベルアップの表示 裏ステージように修正
                Bbuf = 0;
                stopAllBgm();
                game2 = true;

                // 敵が全滅した時刻を記録（まだ記録されていない場合）
                if (enemyDefeatTime == -1) {
                    enemyDefeatTime = Date.now();
                }

                // 現在の時刻を取得
                let currentTime = Date.now();

                // 敵全滅から4秒（4000ミリ秒）経過したかチェック
                if (currentTime - enemyDefeatTime >= 4000) {
                    Bbuf = 2;
                    playBgm(bossBgm);
                    gameWave = 1;
                    gameCount = 0;
                    starSpeedReq = 300;
                    game2 = false;

                    // 時刻をリセット（次のウェーブのために）
                    enemyDefeatTime = -1;
                    teki.push(new Teki(2, (FIELD_W / 2) << 8, -(70 << 8), 0, 200));
                }
            } else {
                // 敵が残っている場合、時刻をリセット
                enemyDefeatTime = -1;
            }
        }
        else if (gameWave == 1) {

            if (teki.length == 0) {
                Bbuf = 0;
                stopAllBgm();
                //レベルアップの表示 裏ステージように修正
                levelup = true;

                //レベルアップの処理
                jiki.hp = 100;
                jiki.jikiPower = 1;

                // 敵が全滅した時刻を記録（まだ記録されていない場合）
                if (enemyDefeatTime == -1) {
                    enemyDefeatTime = Date.now();
                }

                // 現在の時刻を取得
                let currentTime = Date.now();

                // 敵全滅から4秒（4000ミリ秒）経過したかチェック
                if (currentTime - enemyDefeatTime >= 4000) {
                    Bbuf = 2;
                    playBgm(bossBgm);
                    gameWave++;
                    gameCount = 0;
                    starSpeedReq = 300;
                    levelup = false;

                    // 時刻をリセット（次のウェーブのために）
                    enemyDefeatTime = -1;
                    teki.push(new Teki(5, (FIELD_W / 2) << 8, -(70 << 8), 0, 200));
                }
            } else {
                // 敵が残っている場合、時刻をリセット
                enemyDefeatTime = -1;
            }
        }
        else if (gameWave == 2) {
            if (teki.length == 0) {
                Bbuf = 0;
                stopAllBgm();
                //レベルアップの表示 裏ステージように修正
                levelup = true;

                //レベルアップの処理
                jiki.hp = 100;
                jiki.jikiPower = 2;

                // 敵が全滅した時刻を記録（まだ記録されていない場合）
                if (enemyDefeatTime == -1) {
                    enemyDefeatTime = Date.now();
                }

                // 現在の時刻を取得
                let currentTime = Date.now();

                // 敵全滅から4秒（4000ミリ秒）経過したかチェック
                if (currentTime - enemyDefeatTime >= 4000) {
                    Bbuf = 2;
                    playBgm(bossBgm);
                    gameWave++;
                    gameCount = 0;
                    starSpeedReq = 300;
                    levelup = false;

                    // 時刻をリセット（次のウェーブのために）
                    enemyDefeatTime = -1;
                    teki.push(new Teki(8, (FIELD_W / 2) << 8, -(70 << 8), 0, 200));
                }
            } else {
                // 敵が残っている場合、時刻をリセット
                enemyDefeatTime = -1;
            }

        }
        else if (gameWave == 3) {
            if (teki.length == 0) {
                Bbuf = 0;

                // ゲームクリア処理を一度だけ実行するためのフラグ
                if (!gameClear) {
                    stopAllBgm(); // 現在のBGMを停止
                    playBgm(gameClearBgm); // クリアBGMを再生

                    gameClear = true;
                    back = false; // バックグラウンド処理を停止
                    world = false; // ワールド処理を停止
                }

            }
        }

        //以下は実験用
        /*
        if (rand(0, 60) == 1) {
            
            teki.push(new Teki(7, rand(0, FIELD_W) << 8, 0, 0, rand(300, 1200)));
        }
        */

    }
    updateAll();
    if (gameWave == 0) {
        drawAll();
    }
    else if (gameWave == 1) {
        drawAll2(1);
    }
    else if (gameWave == 2) {
        drawAll2(3);
    }
    else {
        drawAll2(2);
    }


    putInfo();
    putDebug();


    /*
    //ランキング 重複して書き込むのを防ぐための処理も加える
    if ((gameOver || gameClear) && !isScoreRecorded) {
        writeScoreToFile(score);
        isScoreRecorded = true;
    }
    */

}

//最強ボス
function gameLoop3() {

    if (!gameOver) {
        gameCount++;

        //ウェーブが進むについて、背景の星のスピードを速くする
        if (starSpeedReq > starSpeed) {
            starSpeed++;
        }
        if (starSpeedReq < starSpeed) {
            starSpeed--;
        }

        if (gameWave == 0) {
            if (teki.length == 0) {
                //レベルアップの表示 裏ステージように修正
                game3 = true;
                starSpeedReq = 500;
                jiki.jikiPower = 3;

                // 敵が全滅した時刻を記録（まだ記録されていない場合）
                if (enemyDefeatTime == -1) {
                    enemyDefeatTime = Date.now();
                }

                // 現在の時刻を取得
                let currentTime = Date.now();

                // 敵全滅から4秒（4000ミリ秒）経過したかチェック
                if (currentTime - enemyDefeatTime >= 4000) {
                    playBgm(bossBgm);
                    Bbuf = 2;
                    gameWave = 1;
                    gameCount = 0;
                    game3 = false;

                    // 時刻をリセット（次のウェーブのために）
                    enemyDefeatTime = -1;

                    teki.push(new Teki(9, (FIELD_W / 2) << 8, -(70 << 8), 0, 200));
                }
            } else {
                // 敵が残っている場合、時刻をリセット
                enemyDefeatTime = -1;
            }
        }
        else if (gameWave == 1) {
            if (teki.length == 0) {
                Bbuf = 0;

                // ゲームクリア処理を一度だけ実行するためのフラグ
                if (!gameClear) {
                    stopAllBgm(); // 現在のBGMを停止
                    playBgm(gameClearBgm); // クリアBGMを再生

                    gameClear = true;
                    back = false; // バックグラウンド処理を停止
                    world = false; // ワールド処理を停止
                }

            }
        }

    }
    updateAll();
    drawAll3();//3は時間静止の背景アニメーション
    putInfo();
    putDebug();


    /*
    //ランキング 重複して書き込むのを防ぐための処理も加える
    if ((gameOver || gameClear) && !isScoreRecorded) {
        writeScoreToFile(score);
        isScoreRecorded = true;
    }
    */

}


