var elem = document.getElementById('canvas');
var ctx = elem.getContext('2d');
var DegreesToRadians = Math.PI / 180.0; //Перевод градусов в радианы
var iterations = 9; //Количество итераций
var r = Math.floor(Math.random() * Math.floor(255));
var g = Math.floor(Math.random() * Math.floor(255));
var b = Math.floor(Math.random() * Math.floor(255));
ctx.lineWidth = 3; //Толщина линий
var step = 4.3; //Коэффициент масштабирования
var start_angle = -90; //Начальный угол; -90deg = прямо вверх
var slope_angle = 30; //Угол разворота ветвей; 0deg = прямо вверх, дерево выродится в прямую

//Функция инициализации (при изменении входных данных)
function initialize() {
    ctx.clearRect(0, 0, 1000, 1000);
    iterations = parseInt(document.getElementById("range").value);
    slope_angle = parseInt(document.getElementById("angle").value);;
    ctx.beginPath();
    drawTree(400, 430, start_angle, iterations);
    ctx.closePath();
    ctx.stroke();
}

//Функция построения линии
function drawLine(x1, y1, x2, y2) {
    ctx.strokeStyle = 'rgb(' + r + ',' + g + ',' + b + ')'; //Стиль рисования (цвет)
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
}

//Функция рекурсивного построения дерева
function drawTree(x1, y1, angle, iterations) {
    if (iterations) {
        var x2 = x1 + (Math.cos(angle * DegreesToRadians) * iterations * step);
        var y2 = y1 + (Math.sin(angle * DegreesToRadians) * iterations * step);
        drawLine(x1, y1, x2, y2);
        drawTree(x2, y2, angle - slope_angle, iterations - 1);
        drawTree(x2, y2, angle + slope_angle, iterations - 1);
    }
}
ctx.beginPath();
drawTree(400, 430, start_angle, iterations);
ctx.closePath();
ctx.stroke();
