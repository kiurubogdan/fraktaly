var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var r = Math.floor(Math.random() * Math.floor(255));
var g = Math.floor(Math.random() * Math.floor(255));
var b = Math.floor(Math.random() * Math.floor(255));
var color = "rgb(" + r + "," + g + "," + b + ")";
ctx.translate(0.5, 0.5);

var iter = 7; // Количество итераций

// Инициализация при смене входных данных
function init() {
    ctx.clearRect(0, 0, 1000, 1000);
    iter = parseInt(document.getElementById("range").value);
    drawFract({
        x: 120,
        y: 500
    }, {
        x: 370,
        y: 0
    }, {
        x: 620,
        y: 500
    }, iter);
}

//Построение линий
function drawLine(p0, p1, color) {
    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    ctx.lineTo(p1.x, p1.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.stroke();
}

//Построение треугольника
function drawTriangle(p0, p1, p2) {
    drawLine(p0, p1, color)
    drawLine(p1, p2, color)
    drawLine(p2, p0, color)
}

//Построение фрактала рекурсивным методом
function drawFract(p0, p1, p2, iter) {
    if (iter > 0) {
        const pA = {
                x: p0.x + (p1.x - p0.x) / 2,
                y: p0.y - (p0.y - p1.y) / 2
            },
            pB = {
                x: p1.x + (p2.x - p1.x) / 2,
                y: p1.y - (p1.y - p2.y) / 2
            },
            pC = {
                x: p0.x + (p2.x - p0.x) / 2,
                y: p0.y
            };

        drawFract(p0, pA, pC, iter - 1);
        drawFract(pA, p1, pB, iter - 1);
        drawFract(pC, pB, p2, iter - 1);
    } else {
        drawTriangle(p0, p1, p2);
    }
}

//Вызов фрактала
drawFract({
    x: 120,
    y: 500
}, {
    x: 370,
    y: 0
}, {
    x: 620,
    y: 500
}, iter);

// Смена цвета фрактала произвольным образом

function btndraw() {
    drawFract({
        x: 120,
        y: 500
    }, {
        x: 370,
        y: 0
    }, {
        x: 620,
        y: 500
    }, iter);
    r = Math.floor(Math.random() * Math.floor(255));
    g = Math.floor(Math.random() * Math.floor(255));
    b = Math.floor(Math.random() * Math.floor(255));
    color = "rgb(" + r + "," + g + "," + b + ")";;
}
