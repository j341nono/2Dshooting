//
// すべての定数
//


//デバッグのフラグ
const DEBUG = true;

let drawCount = 0;
let fps = 0;
let lastTime = Date.now();

//スムージング
const SMOOTHING = false;

//ゲームスピード
const GAME_SPEED = 17;//1000/60s

//画面のサイズ
const SCREEN_W = 320;
const SCREEN_H = 320;

//キャンバスのサイズ
const CANVAS_W = SCREEN_W * 2;
const CANVAS_H = SCREEN_H * 2;

//フィールドサイズ
const FIELD_W = SCREEN_W + 120;
const FIELD_H = SCREEN_H + 40;

//星の数
const STAR_MAX = 300;

// 移動方向を変更する間隔（フレーム数）
const DIRECTION_CHANGE_INTERVAL = 120;

// 移動速度や移動範囲の最大値
const MAX_SPEED = 200;
const MIN_X = 40 << 8;
const MAX_X = (FIELD_W - 40) << 8;
const MIN_Y = 40 << 8;
const MAX_Y = (FIELD_H - 40) << 8;

// スライダーの幅を固定値として設定
const sliderWidth = 120;

//ボス敵のヒット音のインターバル
const BOSS_HIT_INTERVAL = 300;


//ランキング関連
var BGM = new Array(4);
BGM.volume = 0.1;
var BGM_cnt = 0;
let nameR;
const whichranking = [["_d", "All-Time Ranking"], ["m", "Monthly Ranking"], ["d", "Today's Ranking"]];
let k = -1;
let myRank;
/*
for (var j = 0; j < 4; j++) {
    BGM[j] = new Audio("ランキングBGM.mp3");
}
*/

