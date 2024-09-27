//
// rand()  drawSprite();
//


//整数のランダムを作る
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//スプライトを描画する、引数：x.yは表示する座標
function drawSprite(snum, x, y) {
    let sx = sprite[snum].x;
    let sy = sprite[snum].y;
    let sw = sprite[snum].w;
    let sh = sprite[snum].h;

    let px = (x >> 8) - sw / 2;
    let py = (y >> 8) - sh / 2;

    if (px + sw < camera_x || px >= camera_x + SCREEN_W || py + sh < camera_y || py >= camera_y + SCREEN_H) {
        return;
    }

    vcon.drawImage(spriteImage, sx, sy, sw, sh, px, py, sw, sh);
}
