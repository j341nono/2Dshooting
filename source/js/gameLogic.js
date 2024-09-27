//
// updateObj() checkHit() updateAll()
//
// resetStarSpeed()
//



let gameCount = 0;
let gameWave = 0;

let starSpeed = 100;
let starSpeedReq = 100;

//カメラの座標
let camera_x = 0;
let camera_y = 0;

//画面表示イベントのフラグ
let gameOver = false;
let levelup = false;
let levelup2 = false;
let levelup3 = false;
let gameClear = false;
let title = false;
let rule = false;
let ranking = false;
let pause = false;//一時停止用
let nameInput = false; // 名前入力画面のフラグ
let soundC = false;//音量調節ツマミの表示のフラグ
let nameInputF;

let isScoreRecorded = false;//スコア記録用
let gameN = 0;//一時停止時のgameloopの保存用

let score = 0;

let bossHP = 0;
let bossMHP = 0;

//追加ゲーム用
let game2 = false;
let game3 = false;

let back = false;//画面の色を変える
let world = false;//時間静止中の背景

let Bbuf = 0;//現在のBGMを格納する変数、通常ステージなら1、ボス戦なら2

let lastHitTime = 0;//ボス敵のヒット音のインターバル


//オブジェクトをアップデート
function updateObj(obj) {
    for (let i = obj.length - 1; i >= 0; i--) {
        obj[i].update();
        if (obj[i].kill) {//★クラス名.変数名で外部から参照できる
            obj.splice(i, 1);
        }
    }
}

//当たり判定（jikiの弾クラスから）
function checkHit(x1, y1, r1, x2, y2, r2) {

    //円同士の当たり判定
    let a = (x2 - x1) >> 8;//底辺
    let b = (y2 - y1) >> 8;//高さ
    let r = r1 + r2;
    return r * r > a * a + b * b;
}

//移動の処理
function updateAll() {
    updateObj(star);
    updateObj(tama);
    updateObj(teta);
    updateObj(teki);
    updateObj(expl);
    if (!gameOver) {
        jiki.update();
    }
}


//星の速さのリセットのための関数
function resetStarSpeed() {
    //starSpeed = 100;
    starSpeedReq = 100;
}
