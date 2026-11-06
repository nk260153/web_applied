const canvas = document.getElementById("stage");   // 紙（canvas）を取り出す
const ctx = canvas.getContext("2d");                // 描く道具（コンテキスト）を取り出す

ctx.fillStyle = "#7aa2ff";        // 塗る色
ctx.fillRect(40, 40, 40, 40);     // 四角を塗る（x, y, 幅, 高さ）4

ctx.fillStyle = "#ef476f";          // 色を変える
ctx.fillRect(160, 120, 80, 40);     // 2つ目の四角

ctx.fillStyle = "#ffd166";
ctx.beginPath();                          // これから形を描き始める
ctx.arc(400, 200, 30, 0, Math.PI * 2);    // 丸（中心の x, 中心の y, 半径, 始まりの角度, 終わりの角度）
ctx.fill();                               // 中を塗る

ctx.fillStyle = "#06d6a0";
ctx.beginPath();
ctx.moveTo(520, 60);    // ペンを置く
ctx.lineTo(600, 140);   // 線を引く
ctx.lineTo(520, 140);
ctx.fill();             // 囲んだところを塗る

ctx.fillStyle = "#ffffff";
ctx.font = "24px sans-serif";
ctx.fillText("SCORE 100", 20, 340);   // 文字, x, y（y は文字の下のあたり）