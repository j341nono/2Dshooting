//
// CharaBaseクラス　Explクラス　爆発処理の関数等
//


//キャラクターのベースクラス
class CharaBase {
    constructor(snum, x, y, vx, vy) {
        this.sn = snum;//これは画像番号、sprite number
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.kill = false;

        //以下は、キャラが生成させれから、何フレーム経ったかのカウンター
        //キャラの生存時間、非常に役立つ
        this.count = 0;
    }

    update() {
        this.count++;
        this.x += this.vx;
        this.y += this.vy;
        //画面外100ピクセル以上外側は死亡判定
        if (this.x + (100 << 8) < 0 || this.x - (100 << 8) > FIELD_W << 8
            || this.y + (100 << 8) < 0 || this.y - (100 << 8) > FIELD_H << 8) {
            this.kill = true;
        }
    }

    draw() {
        drawSprite(this.sn, this.x, this.y);
    }
}

//爆発のクラス
class Expl extends CharaBase {

    constructor(c, x, y, vx, vy) {
        super(0, x, y, vx, vy);
        this.timer = c;//爆発のアニメーションの時間をずらすため

    }

    update() {
        if (this.timer) {
            this.timer--;
            return;
        }
        //timerが0のとき
        super.update();
    }

    draw() {
        if (this.timer) {
            return;
        }
        this.sn = 16 + (this.count >> 2);//爆発の画像を変更
        //画像番号が16から始まり27になったらやめる→キルフラグ
        if (this.sn == 27) {
            this.kill = true;
            return;
        }
        super.draw();
    }

}

//もっと派手な爆発
function explosion(x, y, vx, vy) {
    for (let i = 0; i < 10; i++) {
        //真ん中に爆発が確実に生成されるように
        expl.push(new Expl(0, x, y, vx, vy));

        //以下は爆発が広がるようにevx,evyを乱数で生成
        let evx = vx + (rand(-10, 10) << 5);
        let evy = vy + (rand(-10, 10) << 5);
        //爆発のアニメーション explクラス,iは爆発のタイミングをずらすため
        expl.push(new Expl(i, x, y, evx, evy));
    }
}