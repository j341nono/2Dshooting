//
// 敵弾クラス　Tekiクラス　敵の行動　TekiFunc
//


//星の実態、配列
let star = [];

//オブジェクトたちの初期化
let teki = [];
let teta = [];
let tama = [];
let expl = [];
let jiki = new Jiki();
// teki[0] = new Teki(75, 200 << 8, 200 << 8, 0, 0);



//敵弾クラス
class Teta extends CharaBase {
    constructor(sn, x, y, vx, vy, t) {
        super(sn, x, y, vx, vy);//snは敵の弾
        this.r = 3;//弾の半径 本来はキャラクターベースに入れた方が良かったかも
        //もしtが入れられなかったら0
        if (t == undefined) {
            this.timer = 0;
        }
        else {
            this.timer = t;
        }
    }
    update() {
        //timerがあれば、引く
        if (this.timer) {
            this.timer--;
            return;
        }
        super.update();
        if (!gameOver && !jiki.muteki && checkHit(this.x, this.y, this.r, jiki.x, jiki.y, jiki.r)) {
            this.kill = true;//自身のキルフラグ

            playSe(playerHitSound);

            //主人公が死亡
            if ((jiki.hp -= 30) <= 0) {//HPを減らす

                if (gameClear) {
                    return;
                }

                stopAllBgm();//BGMを止める
                playBgm(gameOverBgm);

                gameOver = true;
                back = false;//以下2つは確実にfalseになるようにする
                world = false;
            }
            else {
                jiki.damage = 10;//10フレーム分ダメージ
                jiki.muteki = 60;//60フレーム無敵
            }
        }

        //敵の弾をアニメーション 14+1 or 14+0 で14と15を入れ替え
        this.sn = 14 + ((this.count >> 3) & 1);
    }
}


//敵クラス
class Teki extends CharaBase {
    constructor(t, x, y, vx, vy) {
        super(0, x, y, vx, vy);//0のところは使わないから
        //TekiMasterクラスから参照する

        this.tnum = tekiMaster[t].tnum;
        this.r = tekiMaster[t].r;
        this.mhp = tekiMaster[t].hp;
        this.hp = this.mhp;
        this.score = tekiMaster[t].score;
        this.flag = false;//気が付いたら逃げるための判定フラグ

        this.dr = 90;//弾の発射の方向 boss
        this.relo = 0;

        this.phase = 0;
        this.angle = 0;
        this.centerX = 0;
        this.centerY = 0;
        this.count = 0;
        this.zigzagTimer = 0;
        this.dashTimer = 0;
        this.phaseFlag = false;
    }

    update() {

        //共通のアップデート処理
        if (this.relo) {
            this.relo--;
        }
        this.count++;
        super.update();

        //個別のアップデート
        //tekiFuncでtekiMoveを格納した配列
        tekiFunc[this.tnum](this);//thisはこのオブジェクト自体


        //敵と自分が当たった時 弾が当たり判定
        if (!gameOver && !jiki.muteki && checkHit(this.x, this.y, this.r, jiki.x, jiki.y, jiki.r)) {
            if (this.mhp < 500) {
                this.kill = true;//自身のキルフラグ
            }
            if ((jiki.hp -= 30) <= 0) {//HPを減らす
                gameOver = true;
                back = false;//以下2つは確実にfalseになるようにする
                world = false;
            }
            else {
                jiki.damage = 10;//10フレーム分ダメージ
                jiki.muteki = 60;//60フレーム無敵
            }
        }

    }

}


//敵の弾を自機に向けて発射する関数
function tekiShot(obj, speed) {
    //自機に向かって弾を打つための角度を計算し、その角度で弾を発射する
    if (gameOver) {
        return;
    }

    let px = (obj.x >> 8);
    let py = (obj.y >> 8);

    if (px - 40 < camera_x || px + 40 >= camera_x + SCREEN_W || py - 40 < camera_y || py + 40 >= camera_y + SCREEN_H) {
        return;
    }

    let an, dx, dy;
    an = Math.atan2(jiki.y - obj.y, jiki.x - obj.x);
    dx = Math.cos(an) * speed;//角度からベクトルを求める
    dy = Math.sin(an) * speed;

    //敵が弾を発射
    teta.push(new Teta(15, obj.x, obj.y, dx, dy));//クラスのコンストラクタを確認
}

function tekiShot2(obj, speed) {
    //自機に向かって弾を打つための角度を計算し、その角度で弾を発射する
    if (gameOver) {
        return;
    }

    // 360度を90度ずつ分割して発射
    for (let angle = 0; angle < 360; angle += 90) {
        let an = angle * Math.PI / 180;
        let dx = Math.cos(an) * speed;
        let dy = Math.sin(an) * speed;

        teta.push(new Teta(15, obj.x, obj.y, dx, dy));
    }
}

function tekiShot3(obj, speed) {
    //自機に向かって弾を打つための角度を計算し、その角度で弾を発射する
    if (gameOver) {
        return;
    }

    // 360度を36度ずつ分割して発射
    for (let angle = 0; angle < 360; angle += 36) {
        let an = angle * Math.PI / 180;
        let dx = Math.cos(an) * speed;
        let dy = Math.sin(an) * speed;

        teta.push(new Teta(15, obj.x, obj.y, dx, dy));
    }
}



//ピンクのひよこの移動パターン
function tekiMove01(obj) {

    if (!obj.flag) {
        //主人公に近づいてくる 以下のjikiとは敵自身のこと
        if (jiki.x > obj.x && obj.vx < 120) {
            obj.vx += 4;
        }
        else if (jiki.x < obj.x && obj.vx > -120) {
            obj.vx -= 4;
        }
    }
    else {
        if (jiki.x < obj.x && obj.vx < 400) {
            obj.vx += 30;
        }
        else if (jiki.x > obj.x && obj.vx > -400) {
            obj.vx -= 30;
        }
    }

    //近づいてきたら逃げる, 逃げるフラグで弾を1発発射
    if (Math.abs(jiki.y - obj.y) < (100 << 8) && !obj.flag) {
        obj.flag = true;

        //敵の攻撃の関数(obj名,speed)
        tekiShot(obj, 600);

    }
    if (obj.flag && obj.vy > -800) {
        obj.vy -= 30;
    }

    //スプライトのアニメーション
    const ptn = [39, 40, 39, 41];
    //>>3(/8)でゆっくり &3で=0(mod3)のとき
    obj.sn = ptn[(obj.count >> 3) & 3];
}

//黄色のひよこの移動パターン
function tekiMove02(obj) {

    //ピンク(tekiMove01)に比べて横移動を早く
    if (!obj.flag) {
        //主人公に近づいてくる 以下のjikiとは敵自身のこと
        if (jiki.x > obj.x && obj.vx < 600) {
            obj.vx += 30;
        }
        else if (jiki.x < obj.x && obj.vx > -600) {
            obj.vx -= 30;
        }
    }
    else {
        if (jiki.x < obj.x && obj.vx < 600) {
            obj.vx += 30;
        }
        else if (jiki.x > obj.x && obj.vx > -600) {
            obj.vx -= 30;
        }
    }

    //近づいてきたら逃げる, 逃げるフラグで弾を1発発射
    if (Math.abs(jiki.y - obj.y) < (100 << 8) && !obj.flag) {
        obj.flag = true;
        tekiShot(obj, 600);

    }

    //スプライトのアニメーション
    const ptn = [33, 34, 33, 35];
    //>>3(/8)でゆっくり &3で=0(mod3)のとき
    obj.sn = ptn[(obj.count >> 3) & 3];
}

//ボスひよこ（黄色）の移動パターン
function tekiMove03(obj) {

    //フラグが無い状態で、60より大きくなったら、flag=1（次の行動パターン）に変更
    if (!obj.flag && (obj.y >> 8) >= 60) {
        obj.flag = 1;
    }

    //flag=1になったらvyを減少させてブレーキ、vyが0になったら止まる
    if (obj.flag == 1) {
        if ((obj.vy -= 2) <= 0) {
            if (rand(0, 1) == 0) {
                obj.flag = 2;
            }
            else {
                obj.flag = 3;
            }
            obj.vy = 0;
        }
    }
    else if (obj.flag == 2) {
        if (obj.vx < 300) {
            obj.vx += 10;
        }
        if ((obj.x >> 8) > (FIELD_W - 100)) {
            obj.flag = 3;
        }
    }
    else if (obj.flag == 3) {
        if (obj.vx > -300) {
            obj.vx -= 10;
        }
        if ((obj.x >> 8) < 100) {
            obj.flag = 2;
        }
    }

    //弾の発射 objが降りてくるときは発射しない
    if (obj.flag > 1 && !((obj.x >> 8) > (FIELD_W - 150)) && !((obj.x >> 8) < 150)) {
        let an, dx, dy;
        an = obj.dr * Math.PI / 180;//角度をラジアンに変更、drの方向に発射
        dx = Math.cos(an) * 300;//角度からベクトルを求める 300はスピード
        dy = Math.sin(an) * 300;
        let x2 = (Math.cos(an) * 70) << 8;//原点から半径70の円周上のx座標
        let y2 = (Math.sin(an) * 70) << 8;//原点から半径70の円周上のy座標
        //x2とy2を発射位置の座標に加算することで、より敵の中心に近いところから発射するように見える
        //60は敵の弾を1秒間静止させるためのタイマ
        teta.push(new Teta(15, obj.x + x2, obj.y + y2, dx, dy, 60));//クラスのコンストラクタを確認
        //obj.dr += 4で毎回4度ずつ角度を増加
        if ((obj.dr += 18) >= 360) {
            obj.dr = 0;
        }
    }

    if (obj.hp < obj.mhp / 2) {
        let c = obj.count % (60 * 5);//60*5（5秒）のあまり、0～299の値
        //cが10で割れるとき∧cの値が0～39のとき発射、0,10,20,30のタイミングで発射
        if (c / 10 < 4 && c % 10 == 0) {
            let an, dx, dy;
            //弾を発射する角度、90+45が初期角度で、c/10)*30で変化
            an = (90 + 45 - (c / 10) * 30) * Math.PI / 180;
            dx = Math.cos(an) * 300;
            dy = Math.sin(an) * 300;
            let x2 = (Math.cos(an) * 70) << 8;
            let y2 = (Math.sin(an) * 70) << 8;
            //tama.pushからteki.pushに変更,3はボスの子供
            teki.push(new Teki(3, obj.x + x2, obj.y + y2, dx, dy));//クラスのコンストラクタを確認
        }
        // cが0から30の間は背景色を変更
        if (c <= 30) {
            back = true; // 背景色
        } else {
            back = false;
        }
    }

    //スプライトの変更
    obj.sn = 75;
}

//ボスひよこの子供
function tekiMove04(obj) {
    //カウントが10で止まる
    if (obj.count == 10) {
        obj.vx = obj.vy = 0;
    }

    if (obj.count == 60) {
        if (obj.x > jiki.x) {
            obj.vx = -30;
        }
        else {
            obj.vx = 30
        }
        obj.vy = 100;

    }

    //1/100で弾を発射、発射後はリロードして連射を防止
    if (obj.count > 100 && !obj.relo) {
        if (rand(0, 100)) {
            tekiShot(obj, 300);
            obj.relo = 200;
        }
    }

    //スプライトのアニメーション
    const ptn = [33, 34, 33, 35];
    obj.sn = ptn[(obj.count >> 3) & 3];
}

//にわとり
function tekiMove05(obj) {

    if (!obj.flag) {

        if (jiki.x > obj.x && obj.vx < 400) {
            obj.vx += 4;
        }
        else if (jiki.x < obj.x && obj.vx > -400) {
            obj.vx -= 4;
        }
    }
    else {
        if (jiki.x < obj.x && obj.vx < 400) {
            obj.vx += 10;
        }
        else if (jiki.x > obj.x && obj.vx > -400) {
            obj.vx -= 10;
        }
    }

    //近づいてきたら逃げる, 逃げるフラグで弾を1発発射
    if (Math.abs(jiki.y - obj.y) < (100 << 8) && !obj.flag) {
        obj.flag = true;

        //敵の攻撃の関数(obj名,speed)
        tekiShot2(obj, 300);

    }



    //スプライトのアニメーション
    const ptn = [56, 57, 56, 58];
    obj.sn = ptn[(obj.count >> 3) & 3];
}

//ボスひよこ青グラサンの移動パターン
function tekiMove06(obj) {

    if (obj.hp > obj.mhp / 2) {
        //フラグが無い状態で、60より大きくなったら、flag=1（次の行動パターン）に変更
        if (!obj.flag && (obj.y >> 8) >= 60) {
            obj.flag = 1;
        }

        //flag=1になったらvyを減少させてブレーキ、vyが0になったら止まる
        if (obj.flag == 1) {
            if ((obj.vy -= 2) <= 0) {
                if (rand(0, 1) == 0) {
                    obj.flag = 2;
                }
                else {
                    obj.flag = 3;
                }
                obj.vy = 0;
            }
        }
        else if (obj.flag == 2) {
            if (obj.vx < 300) {
                obj.vx += 1;
            }
            if ((obj.x >> 8) > (FIELD_W - 180)) {
                obj.flag = 3;
            }
        }
        else if (obj.flag == 3) {
            if (obj.vx > -300) {
                obj.vx -= 1;
            }
            if ((obj.x >> 8) < 180) {
                obj.flag = 2;
            }
        }

        //弾の発射 objが降りてくるときは発射しない
        if (obj.flag > 1)/* && !((obj.x >> 8) > (FIELD_W - 150))
            && !((obj.x >> 8) < 150))*/ {
            let an, dx, dy;
            an = obj.dr * Math.PI / 180;//角度をラジアンに変更、drの方向に発射
            dx = Math.cos(an) * 150;//角度からベクトルを求める 150はスピード
            dy = Math.sin(an) * 150;
            let x2 = (Math.cos(an) * 70) << 8;//原点から半径70の円周上のx座標
            let y2 = (Math.sin(an) * 70) << 8;//原点から半径70の円周上のy座標

            teta.push(new Teta(15, obj.x + x2, obj.y + y2, dx, dy, 60));//クラスのコンストラクタを確認
            //obj.dr += 4で毎回4度ずつ角度を増加
            if ((obj.dr += 36) >= 360) {
                obj.dr = 0;
            }
        }
    }
    else {

        // 方向変更のタイミングをカウント
        if (!obj.moveCounter) obj.moveCounter = 0;
        obj.moveCounter++;

        // 一定間隔で移動方向を変更
        if (obj.moveCounter >= DIRECTION_CHANGE_INTERVAL) {
            // 新しい移動方向をランダムに決定
            obj.vx = rand(-MAX_SPEED, MAX_SPEED);
            obj.vy = rand(-MAX_SPEED, MAX_SPEED);
            obj.moveCounter = 0;
        }

        // 位置の更新
        obj.x += obj.vx;
        obj.y += obj.vy;

        // 範囲外に出そうになったら方向転換
        if (obj.x <= MIN_X || obj.x >= MAX_X) {
            obj.vx = -obj.vx;
            obj.x = Math.max(MIN_X, Math.min(obj.x, MAX_X));
        }
        if (obj.y <= MIN_Y || obj.y >= MAX_Y) {
            obj.vy = -obj.vy;
            obj.y = Math.max(MIN_Y, Math.min(obj.y, MAX_Y));
        }

        tekiShot(obj, 600);

    }

    //スプライトの変更
    obj.sn = 77;
}

//ロボひよこ
function tekiMove07(obj) {
    //obj.flagが気が付いたら逃げるためのフラグ
    if (!obj.flag) {
        //主人公に近づいてくる 以下のjikiとは敵自身のこと
        if (jiki.x > obj.x && obj.vx < 200) {
            obj.vx += 6;
        }
        else if (jiki.x < obj.x && obj.vx > -200) {
            obj.vx -= 6;
        }
    }
    else {
        if (jiki.x < obj.x && obj.vx < 500) {
            obj.vx += 50;
        }
        else if (jiki.x > obj.x && obj.vx > -500) {
            obj.vx -= 50;
        }
    }

    //近づいてきたら逃げる, 逃げるフラグで弾を1発発射
    if (Math.abs(jiki.y - obj.y) < (100 << 8) && !obj.flag) {
        obj.flag = true;

        //敵の攻撃の関数(obj名,speed)

        tekiShot3(obj, 400);

    }
    if (obj.flag && obj.vy > -800) {
        obj.vy -= 40;
    }

    //スプライトのアニメーション
    const ptn = [50, 51, 50, 52];
    //>>3(/8)でゆっくり &3で=0(mod3)のとき
    obj.sn = ptn[(obj.count >> 3) & 3];
}

//帽子ひよこ
function tekiMove08(obj) {

    //フラグが無い状態で、60より大きくなったら、flag=1（次の行動パターン）に変更
    if (!obj.flag && (obj.y >> 8) >= 20) {
        obj.flag = 1;
    }

    //flag=1になったらvyを減少させてブレーキ、vyが0になったら止まる
    if (obj.flag == 1) {
        if ((obj.vy -= 5) <= 0) {
            if (rand(0, 1) == 0) {
                obj.flag = 2;
            }
            else {
                obj.flag = 3;
            }
            obj.vy = 0;
        }
    }
    else if (obj.flag == 2) {
        if (rand(0, 100) == 0) {
            tekiShot(obj, 600);
        }
        if (obj.vx < 300) {
            obj.vx += 1;
        }
        if ((obj.x >> 8) > (FIELD_W - 180)) {
            obj.flag = 3;
        }
    }
    else if (obj.flag == 3) {
        if (rand(0, 100) == 0) {
            tekiShot(obj, 600);
        }
        if (obj.vx > -300) {
            obj.vx -= 1;
        }
        if ((obj.x >> 8) < 180) {
            obj.flag = 2;
        }

    }

    if (obj.count > 420) {
        obj.vy = -400;
    }


    //スプライトのアニメーション
    const ptn = [67, 68, 67, 69];
    //>>3(/8)でゆっくり &3で=0(mod3)のとき
    obj.sn = ptn[(obj.count >> 3) & 3];
}

//ボスひよこピンクの移動パターン
function tekiMove09(obj) {


    // フラグが無い状態で、60より大きくなったら、flag=1（次の行動パターン）に変更
    if (!obj.flag && (obj.y >> 8) >= 60) {
        obj.flag = 1;
    }

    // flag=1になったらvyを減少させてブレーキ、vyが0になったら止まる
    if (obj.flag == 1) {
        if ((obj.vy -= 2) <= 0) {
            obj.flag = 2;
            obj.vy = 0;
        }
    }

    if (obj.flag == 2) {
        // フェーズの決定
        if (obj.hp > obj.mhp * 2 / 3) {
            obj.phase = 1;
        } else if (obj.hp > obj.mhp / 3) {
            obj.phase = 2;
        } else {
            obj.phase = 3;
        }

        // フェーズ1: 円運動と集中攻撃
        if (obj.phase == 1) {
            if (!obj.phaseFlag) {
                obj.phaseFlag = 1;
                obj.angle = 0;
                obj.centerX = (FIELD_W / 2) << 8;
                obj.centerY = (FIELD_H / 3) << 8;
            }

            obj.angle += 0.02;
            obj.vx = Math.cos(obj.angle) * 150;
            obj.vy = Math.sin(obj.angle) * 100;

            if (obj.count % 60 == 0) {
                for (let i = 0; i < 8; i++) {
                    let an = Math.PI * 2 / 8 * i + obj.angle;
                    let dx = Math.cos(an) * 300;
                    let dy = Math.sin(an) * 300;
                    teta.push(new Teta(15, obj.x, obj.y, dx, dy));
                }
            }
        }
        // フェーズ2: ジグザグ移動と広範囲攻撃
        else if (obj.phase == 2) {
            if (!obj.zigzagTimer) {
                obj.zigzagTimer = 0;
            }
            obj.zigzagTimer++;

            // 横方向の移動
            obj.vx = Math.sin(obj.zigzagTimer * 0.2) * 400;  // 速度を調整

            // 縦方向の移動
            if (obj.zigzagTimer < 40) {
                obj.vy = 400;  // 下に移動
            } else if (obj.zigzagTimer < 80) {
                obj.vy = -400;  // 上に移動
            } else {
                obj.zigzagTimer = 0; // Reset timer correctly
            }

            // 境界チェック
            obj.x = Math.max(40 << 8, Math.min(obj.x, (FIELD_W - 40) << 8));
            obj.y = Math.max(40 << 8, Math.min(obj.y, (FIELD_H - 200) << 8));

            // 攻撃パターンは変更なし
            if (obj.count % 30 == 0) {
                for (let i = 0; i < 12; i++) {
                    let an = Math.PI * 2 / 12 * i;
                    let dx = Math.cos(an) * 200;
                    let dy = Math.sin(an) * 200;
                    teta.push(new Teta(15, obj.x, obj.y, dx, dy, 30));
                }
            }
        }
        // フェーズ3: 高速移動と集中砲火
        else {
            if (!obj.dashTimer) {
                obj.dashTimer = 0;
            }
            obj.dashTimer++;

            if (obj.dashTimer < 30) {
                let an = Math.atan2(jiki.y - obj.y, jiki.x - obj.x);
                obj.vx = Math.cos(an) * 1000;
                obj.vy = Math.sin(an) * 1000;
            } else if (obj.dashTimer < 90) {
                obj.vx *= 0.95;
                obj.vy *= 0.95;
            } else {
                obj.dashTimer = 0; // Reset timer correctly
            }

            if (obj.count % 30 == 0) {
                let an = Math.atan2(jiki.y - obj.y, jiki.x - obj.x);
                let dx = Math.cos(an) * 500;
                let dy = Math.sin(an) * 500;
                teta.push(new Teta(15, obj.x, obj.y, dx, dy));
            }
        }

        // 共通の境界チェックと移動範囲の制限
        obj.x = Math.max(40 << 8, Math.min(obj.x, (FIELD_W - 40) << 8));
        obj.y = Math.max(40 << 8, Math.min(obj.y, (FIELD_H - 200) << 8));

        // 特殊攻撃：一定間隔で全方向に弾を発射
        if (obj.count % 180 == 0) {
            for (let i = 0; i < 36; i++) {
                let an = Math.PI * 2 / 36 * i;
                let dx = Math.cos(an) * 400;
                let dy = Math.sin(an) * 400;
                teta.push(new Teta(15, obj.x, obj.y, dx, dy, 90));
            }
        }
    }

    //スプライトの変更
    obj.sn = 76;
}


function tekiMove10(obj) {

    // フラグが無い状態で、60より大きくなったら、flag=1（次の行動パターン）に変更
    if (!obj.flag && (obj.y >> 8) >= 60) {
        obj.flag = 1;
    }

    // flag=1になったらvyを減少させてブレーキ、vyが0になったら止まる
    if (obj.flag == 1) {
        if ((obj.vy -= 2) <= 0) {
            obj.flag = 2;
            obj.vy = 0;
        }
    }

    if (obj.flag == 2) {
        // フェーズの決定
        if (obj.hp > (obj.mhp * 3 / 4)) {
            obj.phase = 1;
        }
        else if (obj.hp > (obj.mhp / 2)) {
            obj.phase = 2;
        }
        else if (obj.hp > (obj.mhp / 4)) {
            obj.phase = 3;
        }
        else {
            obj.phase = 4;
        }

        // フェーズ1
        if (obj.phase == 1) {
            obj.rotation = (obj.rotation || 0) + 0.1;
            obj.radius = (obj.radius || 200) + Math.sin(obj.count * 0.05) * 100;

            obj.x = (FIELD_W / 2 << 8) + Math.cos(obj.rotation) * obj.radius;
            obj.y = (FIELD_H / 2 << 8) + Math.sin(obj.rotation) * obj.radius;

            if (obj.count % 15 == 0) {
                for (let i = 0; i < 7; i++) {
                    let an = obj.rotation + Math.PI * 2 / 7 * i;
                    let dx = Math.cos(an) * 300;
                    let dy = Math.sin(an) * 300;
                    teta.push(new Teta(15, obj.x, obj.y, dx, dy, 60));
                }
            }
            if (obj.count % 300 == 0) {
                tekiShot(obj, 300);
            }

        }
        // フェーズ2
        else if (obj.phase == 2) {
            if (obj.count % 60 == 0) {
                obj.x = (Math.random() * (FIELD_W - 80) + 40) << 8;
                obj.y = (Math.random() * (FIELD_H - 240) + 40) << 8;

                for (let i = 0; i < 4; i++) {
                    let an = Math.PI / 2 * i;
                    for (let j = 0; j < 5; j++) {
                        let speed = 200 + j * 100;
                        let dx = Math.cos(an) * speed;
                        let dy = Math.sin(an) * speed;
                        teta.push(new Teta(15, obj.x, obj.y, dx, dy, 90));
                    }
                }
            }
            if (obj.count % 300 == 0) {
                tekiShot(obj, 300);
            }
        }
        // フェーズ3
        else if (obj.phase == 3) {
            if (!obj.blackHoleTimer) {
                obj.blackHoleTimer = 0;
            }
            obj.blackHoleTimer++;

            if (obj.blackHoleTimer < 120) {
                // ブラックホール引力
                let an = Math.atan2(obj.y - jiki.y, obj.x - jiki.x);
                jiki.x += Math.cos(an) * 100;
                jiki.y += Math.sin(an) * 100;
            } else if (obj.blackHoleTimer == 120) {
                // ノヴァバースト
                for (let i = 0; i < 36; i++) {
                    let an = Math.PI * 2 / 36 * i;
                    for (let j = 0; j < 3; j++) {
                        let speed = 200 + j * 200;
                        let dx = Math.cos(an) * speed;
                        let dy = Math.sin(an) * speed;
                        teta.push(new Teta(15, obj.x, obj.y, dx, dy, 120));
                    }
                }
            } else {
                obj.blackHoleTimer = 0;
            }
        }
        // フェーズ4の処理
        if (obj.phase == 4) {
            if (!obj.timeStopTimer) {
                obj.timeStopTimer = 0;
            }
            obj.timeStopTimer++;

            // 通常時の攻撃
            if (obj.timeStopTimer < 540) { // 9秒間の通常攻撃
                // 基本の円形弾幕（頻度を下げる）
                if (obj.count % 30 === 0) {
                    for (let i = 0; i < 8; i++) {
                        let angle = Math.PI * 2 / 8 * i + obj.timeStopTimer * 0.1;
                        let speed = 150 + Math.random() * 100; // 速度にランダム性を追加
                        let dx = Math.cos(angle) * speed;
                        let dy = Math.sin(angle) * speed;
                        teta.push(new Teta(15, obj.x, obj.y, dx, dy, 150));
                    }
                }

                // スパイラル弾幕（時々発生）
                if (obj.count % 120 === 0) {
                    let spiralAngle = obj.timeStopTimer * 0.1;
                    for (let i = 0; i < 20; i++) {
                        let angle = spiralAngle + Math.PI * 2 / 20 * i;
                        let speed = 100 + i * 10; // 外側に行くほど速くなる
                        let dx = Math.cos(angle) * speed;
                        let dy = Math.sin(angle) * speed;
                        teta.push(new Teta(20, obj.x, obj.y, dx, dy, 180));
                    }
                }

                // ランダムな方向に散弾（頻繁に発生）
                if (obj.count % 40 === 0) {
                    for (let i = 0; i < 5; i++) {
                        let angle = Math.random() * Math.PI * 2;
                        let speed = 100 + Math.random() * 200;
                        let dx = Math.cos(angle) * speed;
                        let dy = Math.sin(angle) * speed;
                        teta.push(new Teta(10, obj.x, obj.y, dx, dy, 120));
                    }
                }

                // 波状の弾幕（時々発生）
                if (obj.count % 90 === 0) {
                    let waveAngle = obj.timeStopTimer * 0.05;
                    for (let i = 0; i < 15; i++) {
                        let angle = waveAngle + Math.PI / 15 * i;
                        let speed = 200 + Math.sin(angle * 2) * 100; // 波状の速度変化
                        let dx = Math.cos(angle) * speed;
                        let dy = Math.sin(angle) * speed;
                        teta.push(new Teta(18, obj.x, obj.y, dx, dy, 200));
                    }
                }
            }
            // 時間静止の準備（2秒前から）
            else if (obj.timeStopTimer < 660) {
                let slowdownFactor = (660 - obj.timeStopTimer) / 120;
                obj.vx *= slowdownFactor;
                obj.vy *= slowdownFactor;
            }
            // 時間静止中
            else if (obj.timeStopTimer < 780) {
                world = true;
                // じたばた動作
                let wiggleX = Math.sin(obj.timeStopTimer * 0.5) * 20;
                let wiggleY = Math.cos(obj.timeStopTimer * 0.5) * 20;
                obj.x += wiggleX << 8;
                obj.y += wiggleY << 8;

                // 時間静止中の弾幕
                if (obj.timeStopTimer % 5 == 0) {
                    for (let i = 0; i < 8; i++) {
                        let angle = Math.PI * 2 / 8 * i + obj.timeStopTimer * 0.1;
                        let speed = 200;
                        let dx = Math.cos(angle) * speed;
                        let dy = Math.sin(angle) * speed;
                        teta.push(new Teta(15, obj.x, obj.y, dx, dy, 150));
                    }
                }
            }
            // 時間静止解除
            else {
                world = false;
                obj.timeStopTimer = 0;
            }

            // 境界チェック
            obj.x = Math.max(40 << 8, Math.min(obj.x, (FIELD_W - 40) << 8));
            obj.y = Math.max(40 << 8, Math.min(obj.y, (FIELD_H - 200) << 8));
        }

        // 共通の境界チェックと移動範囲の制限
        obj.x = Math.max(40 << 8, Math.min(obj.x, (FIELD_W - 40) << 8));
        obj.y = Math.max(40 << 8, Math.min(obj.y, (FIELD_H - 200) << 8));
    }

    //スプライトの変更
    if (obj.phase == 3 || obj.phase == 4) {
        obj.sn = 76;
    }
    else {
        obj.sn = 75;
    }
}



let tekiFunc = [
    tekiMove01,
    tekiMove02,
    tekiMove03,
    tekiMove04,
    tekiMove05,
    tekiMove06,
    tekiMove07,
    tekiMove08,
    tekiMove09,
    tekiMove10,
];

