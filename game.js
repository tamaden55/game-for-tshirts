// ゲーム要素
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// ゲーム状態
let gameState = {
    isRunning: true,
    score: 0,
    fishCount: 0,
    startTime: Date.now(),
    keys: {}
};

// プレイヤー（猫）
const cat = {
    x: 100,
    y: 300,
    width: 40,
    height: 30,
    speed: 5,
    color: '#FF8C00'
};

// 追跡者（サザエさん）
const chaser = {
    x: 700,
    y: 300,
    width: 35,
    height: 40,
    speed: 2.5,
    color: '#FF69B4'
};

// お魚の配列
let fishes = [];

// お魚を生成する関数
function createFish() {
    return {
        x: Math.random() * (canvas.width - 20),
        y: Math.random() * (canvas.height - 20),
        width: 25,
        height: 15,
        collected: false,
        color: '#4169E1'
    };
}

// 初期のお魚を配置
function initializeFishes() {
    fishes = [];
    for (let i = 0; i < 8; i++) {
        fishes.push(createFish());
    }
}

// キーボード入力の処理
document.addEventListener('keydown', (e) => {
    gameState.keys[e.key.toLowerCase()] = true;
});

document.addEventListener('keyup', (e) => {
    gameState.keys[e.key.toLowerCase()] = false;
});

// プレイヤーの移動
function updateCat() {
    if (gameState.keys['arrowup'] || gameState.keys['w']) {
        cat.y = Math.max(0, cat.y - cat.speed);
    }
    if (gameState.keys['arrowdown'] || gameState.keys['s']) {
        cat.y = Math.min(canvas.height - cat.height, cat.y + cat.speed);
    }
    if (gameState.keys['arrowleft'] || gameState.keys['a']) {
        cat.x = Math.max(0, cat.x - cat.speed);
    }
    if (gameState.keys['arrowright'] || gameState.keys['d']) {
        cat.x = Math.min(canvas.width - cat.width, cat.x + cat.speed);
    }
}

// 追跡者の移動（猫を追いかける）
function updateChaser() {
    const dx = cat.x - chaser.x;
    const dy = cat.y - chaser.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // 時間経過とともに速度を上げる
    const elapsedTime = (Date.now() - gameState.startTime) / 1000;
    const speedMultiplier = 1 + (elapsedTime / 30); // 30秒ごとに速度が倍になる
    const currentSpeed = Math.min(chaser.speed * speedMultiplier, 6); // 最大速度制限
    
    if (distance > 0) {
        chaser.x += (dx / distance) * currentSpeed;
        chaser.y += (dy / distance) * currentSpeed;
    }
}

// 衝突判定
function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

// お魚の収集チェック
function checkFishCollection() {
    fishes.forEach(fish => {
        if (!fish.collected && checkCollision(cat, fish)) {
            fish.collected = true;
            gameState.score += 100;
            gameState.fishCount++;
            
            // エフェクトを追加
            createParticles(fish.x + fish.width/2, fish.y + fish.height/2, '#FFD700', 12);
            soundEffect.playFishCollect();
            
            // 新しいお魚を追加
            setTimeout(() => {
                fishes.push(createFish());
            }, 2000);
        }
    });
}

// ゲームオーバーチェック
function checkGameOver() {
    if (checkCollision(cat, chaser)) {
        gameState.isRunning = false;
        
        // ゲームオーバーエフェクト
        createParticles(cat.x + cat.width/2, cat.y + cat.height/2, '#FF0000', 20);
        soundEffect.playGameOver();
        
        document.getElementById('gameOver').style.display = 'block';
        document.getElementById('finalScore').textContent = gameState.score;
    }
}

// 猫を描画
function drawCat() {
    ctx.fillStyle = cat.color;
    ctx.fillRect(cat.x, cat.y, cat.width, cat.height);
    
    // 猫の顔
    ctx.fillStyle = '#000';
    ctx.fillRect(cat.x + 5, cat.y + 5, 3, 3); // 左目
    ctx.fillRect(cat.x + 15, cat.y + 5, 3, 3); // 右目
    ctx.fillRect(cat.x + 10, cat.y + 10, 2, 2); // 鼻
    
    // 耳
    ctx.fillStyle = cat.color;
    ctx.fillRect(cat.x + 2, cat.y - 5, 8, 8);
    ctx.fillRect(cat.x + 15, cat.y - 5, 8, 8);
    
    // しっぽ
    ctx.fillRect(cat.x - 10, cat.y + 10, 15, 5);
}

// 追跡者を描画
function drawChaser() {
    ctx.fillStyle = chaser.color;
    ctx.fillRect(chaser.x, chaser.y, chaser.width, chaser.height);
    
    // 顔
    ctx.fillStyle = '#FFDBAC';
    ctx.fillRect(chaser.x + 5, chaser.y + 5, 25, 20);
    
    // 目
    ctx.fillStyle = '#000';
    ctx.fillRect(chaser.x + 8, chaser.y + 8, 3, 3);
    ctx.fillRect(chaser.x + 18, chaser.y + 8, 3, 3);
    
    // 髪
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(chaser.x + 3, chaser.y, 29, 8);
}

// お魚を描画
function drawFishes() {
    fishes.forEach(fish => {
        if (!fish.collected) {
            ctx.fillStyle = fish.color;
            ctx.fillRect(fish.x, fish.y, fish.width, fish.height);
            
            // お魚の詳細
            ctx.fillStyle = '#000';
            ctx.fillRect(fish.x + 18, fish.y + 3, 3, 2); // 目
            
            // しっぽ
            ctx.fillStyle = fish.color;
            ctx.fillRect(fish.x - 5, fish.y + 2, 8, 11);
        }
    });
}

// UIを更新
function updateUI() {
    document.getElementById('score').textContent = gameState.score;
    document.getElementById('fishCount').textContent = gameState.fishCount;
    
    const elapsedTime = Math.floor((Date.now() - gameState.startTime) / 1000);
    document.getElementById('timer').textContent = elapsedTime;
}

// ゲームループ
function gameLoop() {
    if (!gameState.isRunning) return;
    
    // 画面をクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // ゲーム要素を更新
    updateCat();
    updateChaser();
    checkFishCollection();
    checkGameOver();
    
    // 描画
    drawCat();
    drawChaser();
    drawFishes();
    
    // パーティクルエフェクトを更新・描画
    updateParticles(ctx);
    
    // UI更新
    updateUI();
    
    // 次のフレーム
    requestAnimationFrame(gameLoop);
}

// ゲームを再開
function restartGame() {
    gameState = {
        isRunning: true,
        score: 0,
        fishCount: 0,
        startTime: Date.now(),
        keys: {}
    };
    
    cat.x = 100;
    cat.y = 300;
    chaser.x = 700;
    chaser.y = 300;
    
    initializeFishes();
    document.getElementById('gameOver').style.display = 'none';
    gameLoop();
}

// ゲーム開始
initializeFishes();
gameLoop();
