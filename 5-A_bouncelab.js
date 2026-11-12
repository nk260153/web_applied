const canvas = document.getElementById("stage");
const ctx = canvas.getContext("2d");
const info = document.getElementById("info");   // 5_stage.html の <p id="info">

let x = 100;          // 丸の中心の位置
let y = 80;
let vx = 180;         // 横の速さ（1秒に180px）
let vy = 140;         // 縦の速さ（1秒に140px。＋ は下へ）
let r = 14;         // 半径
let ballColor = "#ffd166";
let last = performance.now();   // 前に loop が呼ばれた時刻（ページを開いてからのミリ秒）

document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowUp") {
    vx = vx * 1.2;   // 速さを1.2倍（向きはそのまま）
    vy = vy * 1.2;
  }

  // ここに、ほかのキーを足す
  if (e.code === "ArrowDown") {
    vx = vx * 0.8;
    vy = vy * 0.8;
  }

  if (e.code === "ArrowLeft") {
    r = Math.max(5, r - 2);
  }

  if (e.code === "ArrowRight") {
    r = Math.min(40, r + 2);
  }

  if (e.code === "KeyC") {
    if (ballColor === "#ffd166") {
      ballColor = "#06d6a0";
    } else {
      ballColor = "#ffd166";
    }
  }
});

// 状態を少し変える
function update(dt) {
  x = x + vx * dt;              // 距離 ＝ 速さ × 時間
  y = y + vy * dt;

  // 左右の壁（丸は x が中心なので、半径 r を足し引きする）
  if (x + r > canvas.width) {
    x = canvas.width - r;
    vx = -vx;
  }
  if (x - r < 0) {
    x = r;
    vx = -vx;
  }
  // 上下の壁
  if (y + r > canvas.height) {
    y = canvas.height - r;
    vy = -vy;
  }
  if (y - r < 0) {
    y = r;
    vy = -vy;
  }
}

// 全部消して、今の状態で描き直す
function draw() {
  ctx.fillStyle = "rgba(17, 26, 51, 0.18)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = ballColor;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

// ゲームループ：update → draw → 次の書き換えのときに、もう一度 loop を呼んでもらう
// now：今回呼ばれた時刻（ミリ秒）。requestAnimationFrame が引数で渡してくれる
function loop(now) {
  const dt = (now - last) / 1000;   // 前回からの時間（秒）
  last = now;                       // 今回の時刻を、次の「前回」として覚えておく

  info.textContent = "dt：" + dt.toFixed(4) + " 秒　／　1秒に約 " + (1 / dt).toFixed(0) + " 回";
  
  update(dt);
  draw();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);   // 最初の1回を頼む