




let bgm, bossBgm, gameOverBgm, gameClearBgm, shootSound, hitSound, playerHitSound,bossHitSound,putButton;
let isBgmEnabled = true;
let isSeEnabled = true;
let bgmVolume = 0.2; // 0.0 から 1.0 の範囲
let seVolume = 0.2; // 0.0 から 1.0 の範囲

function setBgmVolume(volume) {
    bgmVolume = Math.max(0, Math.min(1, volume));
    [bgm, bossBgm, gameOverBgm, gameClearBgm].forEach(audio => {
        audio.volume = bgmVolume;
    });
}

function setSeVolume(volume) {
    seVolume = Math.max(0, Math.min(1, volume));
    [shootSound, hitSound, playerHitSound,putButton].forEach(audio => {
        audio.volume = seVolume;
    });
}

function applyBgmVolume() {
    [bgm, bossBgm, gameOverBgm, gameClearBgm].forEach(audio => {
        if (audio) audio.volume = bgmVolume;
    });
}

function applySeVolume() {
    [shootSound, hitSound, playerHitSound, putButton].forEach(audio => {
        if (audio) audio.volume = seVolume;
    });
}


function initAudio() {
    bgm = document.getElementById('bgm');//
    bossBgm = document.getElementById('bossBgm');//
    gameOverBgm = document.getElementById('gameOverBgm');//
    gameClearBgm = document.getElementById('gameClearBgm');//
    shootSound = document.getElementById('shootSound');//
    hitSound = document.getElementById('hitSound');//
    playerHitSound = document.getElementById('playerHitSound');//
    putButton = document.getElementById('putButton');//
    bossHitSound = document.getElementById('BossHitSound');//

    applyBgmVolume();
    applySeVolume();
}

function playBgm(audio) {
    
    if (isBgmEnabled) {
        audio.seVolume = bgmVolume;
        if (audio === gameOverBgm) {
            audio.loop = false; // ゲームオーバーBGMはループしない
        } else {
            audio.loop = true; // その他のBGMはループする
        }
        audio.play().catch(e => console.log("BGM play failed:", e));
    }
}

function playSe(audio) {
    if (isSeEnabled) {
        audio.volume = seVolume;
        audio.currentTime = 0;
        audio.play().catch(e => console.log("SE play failed:", e));
    }
}

function stopAllBgm() {
    [bgm, bossBgm, gameOverBgm, gameClearBgm].forEach(audio => {
        if (!audio.paused) {
            audio.pause();
            audio.currentTime = 0;
        }
    });
}

// 安全に音を再生する関数
function playSoundSafely(sound) {
    if (isSeEnabled && sound && sound.paused) {
        sound.currentTime = 0;
        sound.play().catch(e => console.log("Audio play failed:", e));
    }
}