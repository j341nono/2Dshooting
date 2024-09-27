//
// Starクラス　Tamaクラス　Jikiクラス
//


//星クラス
class Star {
    constructor() {
        this.x = rand(0, FIELD_W) << 8;
        this.y = rand(0, FIELD_H) << 8;
        this.vx = 0;
        this.vy = rand(100, 300);
        this.sz = rand(1, 2);
    }

    draw() {
        let x = this.x >> 8;
        let y = this.y >> 8;

        if (x < camera_x || x >= camera_x + SCREEN_W ||
            y < camera_y || y >= camera_y + SCREEN_H) {
            return;
        }

        vcon.fillStyle = rand(0, 2) != 0 ? "#66f" : "#aef";
        vcon.fillRect(this.x >> 8, this.y >> 8, this.sz, this.sz);
    }

    update() {
        this.x += this.vx * starSpeed / 100;
        this.y += this.vy * starSpeed / 100;
        if (this.y > FIELD_H << 8) {
            this.y = 0;
            this.x = rand(0, FIELD_W) << 8;
        }
    }

}

//弾クラス
class Tama extends CharaBase {
    constructor(x, y, vx, vy) {
        super(6, x, y, vx, vy);//snumは指定、引数にsnumを書かな
        this.r = 4;//弾の半径
    }

    update() {
        super.update();
        for (let i = 0; i < teki.length; i++) {
            //敵のキルフラグがfalseのとき
            if (!teki[i].kill) {
                //もし当たり判定があれば、敵を消して、爆発させる
                if (checkHit(
                    this.x, this.y, this.r,
                    teki[i].x, teki[i].y, teki[i].r
                )) {
                    this.kill = true;//自身(弾)のキルフラグ

                    //ボスのヒット音の処理
                    if (teki[i].mhp >= 500) {
                        const currentTime = Date.now();// 現在の時刻を取得
                        // 最後のヒット音から一定時間経過していれば音を鳴らす
                        if (currentTime - lastHitTime >= BOSS_HIT_INTERVAL) {
                            
                            //ボスのヒット音は要検討 hitSound
                            playSe(hitSound);
                            
                            lastHitTime = currentTime; // 最後にヒット音を鳴らした時刻を更新
                        }
                    }

                    if ((teki[i].hp -= 10) <= 0) {
                        teki[i].kill = true;//敵のキルフラグ
                        playSe(hitSound);
                        back = false;//背景フラグを確実にfalseにする

                        //爆発のアニメーション explクラス
                        explosion(teki[i].x, teki[i].y, teki[i].vx >> 3, teki[i].vy >> 3);
                        score += teki[i].score;

                    }
                    else {
                        //敵が倒れないがダメージを与えた、tihs.〇は弾の座標
                        expl.push(new Expl(0, this.x, this.y, 0, 0));
                    }

                    //自機の弾が当たった時、HPが1000以上の敵==ボスのHPバー
                    if (teki[i].mhp >= 1000) {
                        bossHP = teki[i].hp;
                        bossMHP = teki[i].mhp;
                    }

                    break;
                }
            }
        }
    }

    draw() {
        super.draw();
    }
}


// 自機の基底クラス
class JikiBase {
    constructor(startX, startY) {
        this.x = startX;
        this.y = startY;
        this.speed = 512;
        this.anime = 0;
        this.reload = 0;
        this.relo2 = 0;
        this.r = 8;
        this.damage = 0;
        this.muteki = 0;
        this.count = 0;
        this.jikiPower = 0;
    }

    update() {
        this.count++;
        if (this.damage) {
            this.damage--;
        }
        if (this.muteki) {
            this.muteki--;
        }

        if (key[32] && this.reload == 0) {
            this.fire();
        }
        if (!key[32]) {
            this.reload = this.relo2 = 0;
        }
        if (this.reload > 0) {
            this.reload--;
        }

        this.move();
    }

    fire() {
        // サブクラスで実装
    }

    move() {
        if (key[37] && this.x > this.speed) {
            this.x -= this.speed;
            if (this.anime > -8) {
                this.anime--;
            }
        }
        else if (key[39] && this.x <= (FIELD_W << 8) - this.speed) {
            this.x += this.speed;
            if (this.anime < 8) {
                this.anime++;
            }
        }
        else {
            if (this.anime > 0) {
                this.anime--;
            }
            if (this.anime < 0) {
                this.anime++;
            }
        }

        if (key[38] && this.y > this.speed) {
            this.y -= this.speed;
        }
        if (key[40] && this.y <= (FIELD_H << 8) - this.speed) {
            this.y += this.speed;
        }
    }

    draw() {
        if (this.muteki && (this.count & 3)) {
            return;
        }
        drawSprite(2 + (this.anime >> 2), this.x, this.y);

        if (this.count & 1) {
            return;
        }
        drawSprite(9 + (this.anime >> 2), this.x, this.y + (24 << 8));
    }
}

// Jikiクラス
class Jiki extends JikiBase {
    constructor() {
        super((FIELD_W / 2) << 8, (FIELD_H - 50) << 8);
        this.mhp = 100;
        this.hp = this.mhp;
    }

    update() {
        if (gameOver) {
            return;
        }
        if (world) {
            return;
        }
        super.update();
    }

    fire() {
        //playSoundSafely(shootSound);

        if (this.jikiPower == 0) {
            tama.push(new Tama(this.x + (6 << 8), this.y - (10 << 8), 0, -2000));
            tama.push(new Tama(this.x - (6 << 8), this.y - (10 << 8), 0, -2000));
            tama.push(new Tama(this.x + (8 << 8), this.y - (5 << 8), 200, -2000));
            tama.push(new Tama(this.x - (8 << 8), this.y - (5 << 8), -200, -2000));

            playSe(shootSound);

            this.reload = 4;
            if (++this.relo2 == 4) {
                //playSoundSafely(shootSound);
                this.reload = 20;
                this.relo2 = 0;
            }


        }
        else if (this.jikiPower == 1) {
            tama.push(new Tama(this.x + (6 << 8), this.y - (10 << 8), 0, -2000));
            tama.push(new Tama(this.x - (6 << 8), this.y - (10 << 8), 0, -2000));
            tama.push(new Tama(this.x + (8 << 8), this.y - (5 << 8), 200, -2000));
            tama.push(new Tama(this.x - (8 << 8), this.y - (5 << 8), -200, -2000));
            tama.push(new Tama(this.x + (10 << 8), this.y - (5 << 8), 400, -2000));
            tama.push(new Tama(this.x - (10 << 8), this.y - (5 << 8), -400, -2000));

            playSe(shootSound);

            this.reload = 4;//弾の発射の間隔
            if (++this.relo2 == 6) {
                this.reload = 20;
                this.relo2 = 0;
            }
        }
        else if (this.jikiPower == 2) {
            tama.push(new Tama(this.x + (6 << 8), this.y - (10 << 8), 0, -2000));
            tama.push(new Tama(this.x - (6 << 8), this.y - (10 << 8), 0, -2000));
            tama.push(new Tama(this.x + (8 << 8), this.y - (5 << 8), 200, -2000));
            tama.push(new Tama(this.x - (8 << 8), this.y - (5 << 8), -200, -2000));
            tama.push(new Tama(this.x + (10 << 8), this.y - (5 << 8), 500, -2000));
            tama.push(new Tama(this.x - (10 << 8), this.y - (5 << 8), -500, -2000));
            tama.push(new Tama(this.x + (12 << 8), this.y - (5 << 8), 800, -2000));
            tama.push(new Tama(this.x - (12 << 8), this.y - (5 << 8), -800, -2000));
            tama.push(new Tama(this.x + (14 << 8), this.y - (5 << 8), 1100, -2000));
            tama.push(new Tama(this.x - (14 << 8), this.y - (5 << 8), -1100, -2000));

            playSe(shootSound);

            this.reload = 4;//弾の発射の間隔
            if (++this.relo2 == 10) {
                this.reload = 20;
                this.relo2 = 0;
            }
        }
        else if (this.jikiPower == 3) {
            tama.push(new Tama(this.x + (6 << 8), this.y - (10 << 8), 0, -2000));
            tama.push(new Tama(this.x - (6 << 8), this.y - (10 << 8), 0, -2000));
            tama.push(new Tama(this.x + (8 << 8), this.y - (5 << 8), 200, -2000));
            tama.push(new Tama(this.x - (8 << 8), this.y - (5 << 8), -200, -2000));
            tama.push(new Tama(this.x + (10 << 8), this.y - (5 << 8), 300, -2000));
            tama.push(new Tama(this.x - (10 << 8), this.y - (5 << 8), -300, -2000));
            tama.push(new Tama(this.x + (12 << 8), this.y - (5 << 8), 400, -2000));
            tama.push(new Tama(this.x - (12 << 8), this.y - (5 << 8), -400, -2000));
            tama.push(new Tama(this.x + (14 << 8), this.y - (5 << 8), 600, -2000));
            tama.push(new Tama(this.x - (14 << 8), this.y - (5 << 8), -600, -2000));
            tama.push(new Tama(this.x + (16 << 8), this.y - (5 << 8), 800, -2000));
            tama.push(new Tama(this.x - (16 << 8), this.y - (5 << 8), -800, -2000));
            tama.push(new Tama(this.x + (18 << 8), this.y - (5 << 8), 1000, -2000));
            tama.push(new Tama(this.x - (18 << 8), this.y - (5 << 8), -1000, -2000));

            playSe(shootSound);

            this.reload = 3;//弾の発射の間隔
            if (++this.relo2 == 20) {
                this.reload = 20;
                this.relo2 = 0;
            }
        }
    }
}

// JikiMiniクラス ルール説明画面で使用
class JikiMini extends JikiBase {
    constructor() {
        super((CANVAS_W / 2) << 8, (CANVAS_H - 400) << 8);
    }

    fire() {
        playSe(shootSound);

        tama.push(new Tama(this.x + (6 << 8), this.y - (10 << 8), 0, -2000));
        tama.push(new Tama(this.x - (6 << 8), this.y - (10 << 8), 0, -2000));
        tama.push(new Tama(this.x + (8 << 8), this.y - (5 << 8), 200, -2000));
        tama.push(new Tama(this.x - (8 << 8), this.y - (5 << 8), -200, -2000));

        this.reload = 4;
        if (++this.relo2 == 4) {
            this.reload = 20;
            this.relo2 = 0;
        }
    }
}