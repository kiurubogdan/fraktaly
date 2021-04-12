var maxIterations; //количество итераций
var juliaForm = document.juliaForm;
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");; //размеры холста и контекст
var minX, maxX, minY, maxY, jsX, jsY, color_type; //коэффициенты

function getMapCoeffs(x, t1, t2, s1, s2) {
    var f = (x - t1) / (t2 - t1);
    var g = f * (s2 - s1) + s1;
    return g;
}

//Получаем цвет точки
function getColor(c) {
    var r, g, b, p = c / 24,
        l = ~~(p * 6),
        o = p * 6 - l, //~~ - это двойное побитовое "не"
        q = 1 - o;
    switch (l % 6) {
        case 0:
            r = 1;
            g = o;
            b = 0;
            break;
        case 1:
            r = q;
            g = 1;
            b = 0;
            break;
        case 2:
            r = 0;
            g = 1;
            b = o;
            break;
        case 3:
            r = 0;
            g = q;
            b = 1;
            break;
        case 4:
            r = o;
            g = 0;
            b = 1;
            break;
        case 5:
            r = 1;
            g = 0;
            b = q;
            break;
    }
    var c = "#" + ("00" + (~~(r * 255)).toString(16)).slice(-2) +
        ("00" + (~~(g * 255)).toString(16)).slice(-2) +
        ("00" + (~~(b * 255)).toString(16)).slice(-2);
    return (c);
}


//Построение фрактала засчёт циклов (Колоризация каждой точки)
function drawFractal() {
    var a, as, za, b, bs, zb, count, clr;
    for (var j = 0; j < 600; j++) {
        for (var i = 0; i < 600; i++) {
            a = getMapCoeffs(i, 0, 600, minX, maxX);
            b = getMapCoeffs(j, 0, 600, minY, maxY);
            count = 0;
            while (++count < maxIterations) {
                za = a * a;
                zb = b * b;
                if (za + zb > 4) break;
                as = za - zb;
                bs = 2 * a * b;
                a = as + jsX;
                b = bs + jsY;
            }
            if (count < maxIterations) {
                context.fillStyle = getColor(count);
            }
            context.fillRect(i, j, 1, 1); //рисуем точку
        }
    }
}

//Получаем коэффициенты для построения фрактала
function init() {
    maxIterations = parseInt(juliaForm.maxIterations.value);
    if (maxIterations === 'undefined') maxIterations = 450;
    minX = parseFloat(juliaForm.minX.value) / 1000;
    if (minX === 'undefined') minX = -500;
    maxX = parseFloat(juliaForm.maxX.value) / 1000;
    if (maxX === 'undefined') maxX = 500;
    minY = parseFloat(juliaForm.minY.value) / 1000;
    if (minY === 'undefined') minY = -500;
    maxY = parseFloat(juliaForm.maxY.value) / 1000;
    if (maxY === 'undefined') maxY = 500;
    jsX = parseFloat(juliaForm.jsX.value) / 1000;
    if (jsX === 'undefined') jsX = 285;
    jsY = parseFloat(juliaForm.jsY.value) / 1000;
    if (jsY === 'undefined') jsY = 10;
    context.fillStyle = "black";
    context.fillRect(0, 0, 600, 600);
    drawFractal();
}
init();
