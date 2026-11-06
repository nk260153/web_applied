const canvas = document.getElementById("stage");
const ctx = canvas.getContext("2d");
const info = document.getElementById("info");   // 5_stage.html の <p id="info">

let x = 40;          // 横の位置（状態）
let y = 40;
let last = performance.now();   // 前に loop が呼ばれた時刻（ページを開いてからのミリ秒）

// 状態を少し変える
function update() {
  x = x + 2;         // 1回に2px右へ
  y = y + 1;
}

// 全部消して、今の状態で描き直す
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);   // canvas 全体を消す
  ctx.fillStyle = "#7aa2ff";
  ctx.fillRect(x, y, 40, 40);
}

// ゲームループ：update → draw → 次の書き換えのときに、もう一度 loop を呼んでもらう
// now：今回呼ばれた時刻（ミリ秒）。requestAnimationFrame が引数で渡してくれる
function loop(now) {
  const dt = (now - last) / 1000;   // 前回からの時間（秒）
  last = now;                       // 今回の時刻を、次の「前回」として覚えておく

  info.textContent = "dt：" + dt.toFixed(4) + " 秒　／　1秒に約 " + (1 / dt).toFixed(0) + " 回";
  
  update();
  draw();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);   // 最初の1回を頼む