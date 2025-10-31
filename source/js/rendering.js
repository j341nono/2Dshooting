//
//　drawObj() drawAll() putInfo() putDebug()
//



//キャンバス
let can = document.getElementById("can");
let con = can.getContext("2d");
can.width = CANVAS_W;
can.height = CANVAS_H;

con.mozimageSmoothingEnagbled = SMOOTHING;
con.webkitimageSmoothingEnabled = SMOOTHING;
con.msimageSmoothingEnabled = SMOOTHING;
con.imageSmoothingEnabled = SMOOTHING;

con.font = "25px 'Impact'";

//フィールド（仮想画面）
let vcan = document.createElement("canvas");
let vcon = vcan.getContext("2d");
vcan.width = CANVAS_W;
vcan.height = CANVAS_H;

//ファイル読み込み（画像）
let spriteImage = new Image();
spriteImage.src = './assets/image/sprite.png';

//背景の画像の読み込み
let backgroundImage1 = new Image();
backgroundImage1.src = './assets/image/background.png';
let backgroundImage2 = new Image();
backgroundImage2.src = './assets/image/background2.png';
let backgroundImage3 = new Image();
backgroundImage3.src = './assets/image/background3.png';
let backgroundImage4 = new Image();
backgroundImage4.src = './assets/image/background4.png';
let backgroundImage5 = new Image();
backgroundImage5.src = './assets/image/background5.png';



//オブジェクトを描画
function drawObj(obj) {
    for (let i = 0; i < obj.length; i++) {
        obj[i].draw();
    }
}


//描画の処理 通常ゲーム
function drawAll() {

    //背景に関して、jiki.damage（クラス参照）があれば赤、それ以外は黒
    //vcon.fillStyle = (jiki.damage) ? "red" : "black";
    if (jiki.damage) {
        vcon.fillStyle = "red";
        vcon.fillRect(camera_x, camera_y, SCREEN_W, SCREEN_H); // 赤色で塗りつぶし
    } else if (back) {
        vcon.fillStyle = "purple";
        vcon.fillRect(camera_x, camera_y, SCREEN_W, SCREEN_H); // 紫色で塗りつぶし
    } else {

        // 背景画像を描画
        // vcon.drawImage(backgroundImage, 0, 0, FIELD_W, FIELD_H);

        vcon.fillStyle = "black";
        vcon.fillRect(camera_x, camera_y, SCREEN_W, SCREEN_H);
    }


    drawObj(star);
    drawObj(tama);
    //gameOverの時は自機を表示しない
    if (!gameOver) {
        jiki.draw();
    }
    drawObj(teki);
    drawObj(expl);
    drawObj(teta);//ここにもgameOverの時の表示をどうするかの処理を変更する

    //自機の範囲 0 ~ FIELD_W
    //カメラの範囲 0 ~ (FIELD_W - SCREEN_W)
    camera_x = (jiki.x >> 8) / FIELD_W * (FIELD_W - SCREEN_W);
    camera_y = (jiki.y >> 8) / FIELD_H * (FIELD_H - SCREEN_H);

    //ボスのHPを表示する 弾が1発当たらないと表示が始まらない
    if (bossHP > 0 && bossMHP > 0) {
        let sz = (SCREEN_W - 20) * bossHP / bossMHP;
        let sz2 = (SCREEN_W - 20);
        vcon.fillStyle = "rgba(255,0,0,0.5)";
        vcon.fillRect(camera_x + 10, camera_y + 10, sz, 10);
        vcon.strokeStyle = "rgba(255,0,0,0.9)";
        vcon.strokeRect(camera_x + 10, camera_y + 10, sz2, 10);
    }

    //自機のHPを表示する
    if (jiki.hp > 0) {
        let sz = (SCREEN_W - 20) * jiki.hp / jiki.mhp;
        let sz2 = (SCREEN_W - 20);
        vcon.fillStyle = "rgba(0,0,255,0.5)";
        vcon.fillRect(camera_x + 10, camera_y + SCREEN_H - 14, sz, 10);
        vcon.strokeStyle = "rgba(0,0,255,0.9)";
        vcon.strokeRect(camera_x + 10, camera_y + SCREEN_H - 14, sz2, 10);
    }

    //仮想画面から実際のキャンバスにコピー
    con.drawImage(vcan, camera_x, camera_y, SCREEN_W, SCREEN_H, 0, 0, CANVAS_W, CANVAS_H);

}

//ボスラッシュ用
function drawAll2(num) {

    //背景に関して、jiki.damage（クラス参照）があれば赤、それ以外は黒
    //vcon.fillStyle = (jiki.damage) ? "red" : "black";
    if (jiki.damage) {
        vcon.fillStyle = "red";
        vcon.fillRect(camera_x, camera_y, SCREEN_W, SCREEN_H); // 赤色で塗りつぶし
    } else if (back) {
        vcon.fillStyle = "purple";
        vcon.fillRect(camera_x, camera_y, SCREEN_W, SCREEN_H); // 紫色で塗りつぶし
    } else {
        if (num == 1) {
            // 背景画像を描画
            vcon.drawImage(backgroundImage2, 0, 0, FIELD_W, FIELD_H);
        }
        else if (num == 2) {
            vcon.drawImage(backgroundImage1, 0, 0, FIELD_W, FIELD_H);
        }
        else if (num == 3) {
            vcon.drawImage(backgroundImage3, 0, 0, FIELD_W, FIELD_H);
        }


        //vcon.fillStyle = "black";
        //vcon.fillRect(camera_x, camera_y, SCREEN_W, SCREEN_H); // 赤色で塗りつぶし
    }


    drawObj(star);
    drawObj(tama);
    //gameOverの時は自機を表示しない
    if (!gameOver) {
        jiki.draw();
    }
    drawObj(teki);
    drawObj(expl);
    drawObj(teta);//ここにもgameOverの時の表示をどうするかの処理を変更する

    //自機の範囲 0 ~ FIELD_W
    //カメラの範囲 0 ~ (FIELD_W - SCREEN_W)
    camera_x = (jiki.x >> 8) / FIELD_W * (FIELD_W - SCREEN_W);
    camera_y = (jiki.y >> 8) / FIELD_H * (FIELD_H - SCREEN_H);

    //ボスのHPを表示する 弾が1発当たらないと表示が始まらない
    if (bossHP > 0 && bossMHP > 0) {
        let sz = (SCREEN_W - 20) * bossHP / bossMHP;
        let sz2 = (SCREEN_W - 20);
        vcon.fillStyle = "rgba(255,0,0,0.5)";
        vcon.fillRect(camera_x + 10, camera_y + 10, sz, 10);
        vcon.strokeStyle = "rgba(255,0,0,0.9)";
        vcon.strokeRect(camera_x + 10, camera_y + 10, sz2, 10);
    }

    //自機のHPを表示する
    if (jiki.hp > 0) {
        let sz = (SCREEN_W - 20) * jiki.hp / jiki.mhp;
        let sz2 = (SCREEN_W - 20);
        vcon.fillStyle = "rgba(0,0,255,0.5)";
        vcon.fillRect(camera_x + 10, camera_y + SCREEN_H - 14, sz, 10);
        vcon.strokeStyle = "rgba(0,0,255,0.9)";
        vcon.strokeRect(camera_x + 10, camera_y + SCREEN_H - 14, sz2, 10);
    }

    //仮想画面から実際のキャンバスにコピー
    con.drawImage(vcan, camera_x, camera_y, SCREEN_W, SCREEN_H, 0, 0, CANVAS_W, CANVAS_H);

}

//最強ボス用
function drawAll3() {

    //背景に関して、jiki.damage（クラス参照）があれば赤、それ以外は黒
    //vcon.fillStyle = (jiki.damage) ? "red" : "black";
    if (jiki.damage) {
        vcon.fillStyle = "red";
        vcon.fillRect(camera_x, camera_y, SCREEN_W, SCREEN_H);
    } else if (world) {
        // 時間停止エフェクトの描画
        //vcon.fillStyle = "blue";
        //vcon.fillRect(camera_x, camera_y, SCREEN_W, SCREEN_H);
        timeStopEffect.draw(vcon);
    } else {
        //vcon.fillStyle = "black";
        //vcon.fillRect(camera_x, camera_y, SCREEN_W, SCREEN_H);
        vcon.drawImage(backgroundImage1, 0, 0, FIELD_W, FIELD_H);
    }


    drawObj(star);
    drawObj(tama);
    //gameOverの時は自機を表示しない
    if (!gameOver) {
        jiki.draw();
    }
    drawObj(teki);
    drawObj(expl);
    drawObj(teta);//ここにもgameOverの時の表示をどうするかの処理を変更する

    //自機の範囲 0 ~ FIELD_W
    //カメラの範囲 0 ~ (FIELD_W - SCREEN_W)
    camera_x = (jiki.x >> 8) / FIELD_W * (FIELD_W - SCREEN_W);
    camera_y = (jiki.y >> 8) / FIELD_H * (FIELD_H - SCREEN_H);

    //ボスのHPを表示する 弾が1発当たらないと表示が始まらない
    if (bossHP > 0 && bossMHP > 0) {
        let sz = (SCREEN_W - 20) * bossHP / bossMHP;
        let sz2 = (SCREEN_W - 20);
        vcon.fillStyle = "rgba(255,0,0,0.5)";
        vcon.fillRect(camera_x + 10, camera_y + 10, sz, 10);
        vcon.strokeStyle = "rgba(255,0,0,0.9)";
        vcon.strokeRect(camera_x + 10, camera_y + 10, sz2, 10);
    }

    //自機のHPを表示する
    if (jiki.hp > 0) {
        let sz = (SCREEN_W - 20) * jiki.hp / jiki.mhp;
        let sz2 = (SCREEN_W - 20);
        vcon.fillStyle = "rgba(0,0,255,0.5)";
        vcon.fillRect(camera_x + 10, camera_y + SCREEN_H - 14, sz, 10);
        vcon.strokeStyle = "rgba(0,0,255,0.9)";
        vcon.strokeRect(camera_x + 10, camera_y + SCREEN_H - 14, sz2, 10);
    }

    //仮想画面から実際のキャンバスにコピー
    con.drawImage(vcan, camera_x, camera_y, SCREEN_W, SCREEN_H, 0, 0, CANVAS_W, CANVAS_H);

}

// drawAll3() で用いる 時間静止アニメーション
let timeStopEffect = {
    active: false,
    timer: 0,
    purpleRadius: 0,
    blackRadius: 0,
    maxRadius: Math.sqrt(SCREEN_W * SCREEN_W + SCREEN_H * SCREEN_H) / 2,

    start() {
        this.active = true;
        this.timer = 0;
        this.purpleRadius = 0;
        this.blackRadius = 0;
    },

    update() {
        if (!this.active) return;

        this.timer++;
        this.purpleRadius = Math.min(this.timer * 15, this.maxRadius);
        this.blackRadius = Math.max(0, (this.timer - 10) * 15);

        if (this.blackRadius >= this.maxRadius) {
            this.active = false;
        }
    },

    draw(ctx) {
        if (!this.active) return;

        ctx.save();
        ctx.translate(SCREEN_W / 2 - camera_x, SCREEN_H / 2 - camera_y);

        // 紫色の円
        ctx.beginPath();
        ctx.arc(0, 0, this.purpleRadius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(128, 0, 128, 0.5)';
        ctx.fill();

        // 黒色の円
        ctx.beginPath();
        ctx.arc(0, 0, this.blackRadius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fill();

        ctx.restore();
    }
};



//情報の表示
function putInfo() {

    con.fillStyle = "white";

    //gameOverフラグがあるときのみ表示
    if (gameOver) {
        if (gameClear) {
            return;
        }

        con.font = "40px 'Impact'";
        let s = "GAME OVER";
        let w = con.measureText(s).width;
        let x = CANVAS_W / 2 - w / 2;
        let y = CANVAS_H / 2 - 80;
        con.fillText(s, x, y);

        con.font = "25px 'Impact'";
        s = "YOUR SCORE : " + score;
        w = con.measureText(s).width;
        x = CANVAS_W / 2 - w / 2;
        y = CANVAS_H / 2 - 80 + 40;
        con.fillText(s, x, y);

        s = "PRESS 'R' to restart !";
        w = con.measureText(s).width;
        x = CANVAS_W / 2 - w / 2;
        y = CANVAS_H / 2 - 80 + 80;
        con.fillText(s, x, y);

        s = "PRESS 'T' to back TITLE";
        w = con.measureText(s).width;
        x = CANVAS_W / 2 - w / 2;
        y = CANVAS_H / 2 - 80 + 120;
        con.fillText(s, x, y);

        s = "PRESS 'E' to view RANKINGS";
        w = con.measureText(s).width;
        x = CANVAS_W / 2 - w / 2;
        y = CANVAS_H / 2 - 80 + 160;
        con.fillText(s, x, y);
    }

    if (levelup) {
        let s = "LEVEL UP";
        let w = con.measureText(s).width;
        let x = CANVAS_W / 2 - w / 2;
        let y = CANVAS_H / 2 - 40;
        con.fillText(s, x, y);

        s = "Weapon Power Up!";
        w = con.measureText(s).width;
        x = CANVAS_W / 2 - w / 2;
        y = CANVAS_H / 2 - 40 + 40;
        con.fillText(s, x, y);

        s = "HP Fully Restored!";
        w = con.measureText(s).width;
        x = CANVAS_W / 2 - w / 2;
        y = CANVAS_H / 2 - 40 + 80;
        con.fillText(s, x, y);
    }

    if (levelup2) {
        let s = "LEVEL UP";
        let w = con.measureText(s).width;
        let x = CANVAS_W / 2 - w / 2;
        let y = CANVAS_H / 2 - 40;
        con.fillText(s, x, y);

        s = "Weapon Power Up!";
        w = con.measureText(s).width;
        x = CANVAS_W / 2 - w / 2;
        y = CANVAS_H / 2 - 40 + 40;
        con.fillText(s, x, y);

        s = "HP Fully Restored!";
        w = con.measureText(s).width;
        x = CANVAS_W / 2 - w / 2;
        y = CANVAS_H / 2 - 40 + 80;
        con.fillText(s, x, y);
    }

    if (gameClear) {
        con.font = "40px 'Impact'";
        let s = "GAME CLEAR";
        let w = con.measureText(s).width;
        let x = CANVAS_W / 2 - w / 2;
        let y = CANVAS_H / 2 - 80;
        con.fillText(s, x, y);

        con.font = "25px 'Impact'";
        s = "YOUR SCORE : " + score;
        w = con.measureText(s).width;
        x = CANVAS_W / 2 - w / 2;
        y = CANVAS_H / 2 - 80 + 40;
        con.fillText(s, x, y);

        s = "PRESS 'R' to restart !";
        w = con.measureText(s).width;
        x = CANVAS_W / 2 - w / 2;
        y = CANVAS_H / 2 - 80 + 80;
        con.fillText(s, x, y);

        s = "PRESS 'T' to back TITLE";
        w = con.measureText(s).width;
        x = CANVAS_W / 2 - w / 2;
        y = CANVAS_H / 2 - 80 + 120;
        con.fillText(s, x, y);

        s = "PRESS 'E' to view LANKINGS";
        w = con.measureText(s).width;
        x = CANVAS_W / 2 - w / 2;
        y = CANVAS_H / 2 - 80 + 160;
        con.fillText(s, x, y);
    }

    if (title) {
        con.font = "40px 'Impact'";
        let s = "TITLE";
        let w = con.measureText(s).width;
        let x = CANVAS_W / 2 - w / 2;
        let y = CANVAS_H / 2 - 80 - 120;
        con.fillText(s, x, y);

        con.font = "25px 'Impact'";
        s = "PRESS ' S ' to start the GAME !";
        w = con.measureText(s).width;
        x = CANVAS_W / 2 - w / 2;
        y = CANVAS_H / 2 - 80 + 40;
        con.fillText(s, x, y);

        s = "PRESS ' W ' to view RULES";
        w = con.measureText(s).width;
        x = CANVAS_W / 2 - w / 2;
        y = CANVAS_H / 2 - 80 + 80;
        con.fillText(s, x, y);

        s = "PRESS ' E ' to watch RANKINGS";
        w = con.measureText(s).width;
        x = CANVAS_W / 2 - w / 2;
        y = CANVAS_H / 2 - 80 + 120;
        con.fillText(s, x, y);

        s = "PRESS ' N ' to rigister YOUR NAME";
        w = con.measureText(s).width;
        x = CANVAS_W / 2 - w / 2;
        y = CANVAS_H / 2 - 80 + 200;
        con.fillText(s, x, y);
    }

    if (rule) {
        con.font = "40px 'Impact'";
        let s = "RULES";
        let w = con.measureText(s).width;
        let x = CANVAS_W / 2 - w / 2;
        let y = CANVAS_H / 2 - 80 - 120;
        con.fillText(s, x, y);

        con.font = "25px 'Impact'";
        s = "PRESS ' SPACE ' to SHOOT";
        w = con.measureText(s).width;
        x = CANVAS_W / 2 - w / 2;
        y = CANVAS_H / 2 - 80 - 40;
        con.fillText(s, x, y);

        s = "PRESS ' ARROW ' to MOVE";
        w = con.measureText(s).width;
        x = CANVAS_W / 2 - w / 2;
        y = CANVAS_H / 2 - 80;
        con.fillText(s, x, y);

        s = "DEFEAT ENEMIES to SCORE HIGH POINTS !";
        w = con.measureText(s).width;
        x = CANVAS_W / 2 - w / 2;
        y = CANVAS_H / 2 - 80 + 40;
        con.fillText(s, x, y);

        s = "PRESS ' ESC ' to back TITLE";
        w = con.measureText(s).width;
        x = CANVAS_W / 2 - w / 2;
        y = CANVAS_H / 2 - 80 + 120;
        con.fillText(s, x, y);
    }

    if (ranking) {
        let s = "PRESS ' ESC ' to back TITLE";
        let w = con.measureText(s).width;
        let x = CANVAS_W / 2 - w / 2;
        let y = CANVAS_H - 50;
        con.fillText(s, x, y);
    }

    if (pause) {
        con.font = "40px 'Impact'";
        let s = "PAUSE NOW";
        let w = con.measureText(s).width;
        let x = CANVAS_W / 2 - w / 2;
        let y = CANVAS_H / 2 - 80 - 40;
        con.fillText(s, x, y);

        con.font = "25px 'Impact'";
        s = "PRESS ' ESC ' to resume";
        w = con.measureText(s).width;
        x = CANVAS_W / 2 - w / 2;
        y = CANVAS_H / 2 - 80 + 80;
        con.fillText(s, x, y);

        s = "PRESS ' R' to restart";
        w = con.measureText(s).width;
        x = CANVAS_W / 2 - w / 2;
        y = CANVAS_H / 2 - 80 + 120;
        con.fillText(s, x, y);

        s = "PRESS ' T ' key to back TITLE";
        w = con.measureText(s).width;
        x = CANVAS_W / 2 - w / 2;
        y = CANVAS_H / 2 - 80 + 160;
        con.fillText(s, x, y);
    }

    if (nameInput) {
        con.font = "30px 'Impact'";
        let s = "Enter YOUR NAME";
        let w = con.measureText(s).width;
        let x = CANVAS_W / 2 - w / 2;
        let y = CANVAS_H / 2 - 80 - 120;
        con.fillText(s, x, y);

        con.font = "25px 'Impact'";

        s = "PRESS ' ENTER ' or 'ESC' to back TITLE";
        w = con.measureText(s).width;
        x = CANVAS_W / 2 - w / 2;
        y = CANVAS_H / 2 - 80;
        con.fillText(s, x, y);
    }

    if (game2) {
        con.font = "40px 'Impact'";
        let s = "BOSS RUSH";
        let w = con.measureText(s).width;
        let x = CANVAS_W / 2 - w / 2;
        let y = CANVAS_H / 2 - 60;
        con.fillText(s, x, y);

        s = "WARNING!";
        w = con.measureText(s).width;
        x = CANVAS_W / 2 - w / 2;
        y = CANVAS_H / 2 - 40 + 60;
        con.fillText(s, x, y);
        con.font = "25px 'Impact'";
    }

    if (game3) {
        con.font = "60px 'Impact'";
        let s = "INSANITY";
        let w = con.measureText(s).width;
        let x = CANVAS_W / 2 - w / 2;
        let y = CANVAS_H / 2 - 60;
        con.fillText(s, x, y);

        con.font = "60px 'Impact'";
        s = "WARNING!";
        w = con.measureText(s).width;
        x = CANVAS_W / 2 - w / 2;
        y = CANVAS_H / 2 - 40 + 60;
        con.fillText(s, x, y);
        con.font = "25px 'Impact'";
    }

}


function putDebug() {
    if (DEBUG) {
        drawCount++;
        if (lastTime + 1000 <= Date.now()) {
            fps = drawCount;
            drawCount = 0;
            lastTime = Date.now();
        }

        //con.fillText("FPS:" + fps, 20, 20);
        //con.fillText("Tama:" + tama.length, 20, 40);
        //con.fillText("Teki:" + teki.length, 20, 60);
        //con.fillText("Teta:" + teta.length, 20, 80);
        //con.fillText("Expl:" + expl.length, 20, 100);
        //con.fillText("X:" + (jiki.x >> 8), 20, 120);
        //con.fillText("Y:" + (jiki.y >> 8), 20, 140);
        con.fillText("HP:" + jiki.hp, 20, 40);
        con.fillText("SCORE:" + score, 20, 70);
        con.fillText("COUNT:" + gameCount, 20, 100);
        con.fillText("WAVE:" + gameWave, 20, 130);
    }
}
