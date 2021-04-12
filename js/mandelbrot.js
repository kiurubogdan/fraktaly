/*
    oft - offset
*/

var canvas = document.getElementById("viewport");
var ctx = canvas.getContext("2d");

// Высота и ширина изображения
var imgw = canvas.width;
var imgh = canvas.height;

var imgdata = ctx.createImageData(imgw, imgh);

var oftx = -imgw / 2;
var ofty = -imgh / 2;
var panx = -100;
var pany = 0;
var zoom = 200;

// Массив цветов
var palette = [];

// Максимальное кол-во итераций на px
var maxiterations = parseInt(document.getElementById("range").value);

function initialize() {
    // Добавить Event для мыши
    canvas.addEventListener("mousedown", onMouseDown);

    genPalette();

    genImage();

    main(0);
}

function main(tframe) {
    window.requestAnimationFrame(main);

    // Нарисовать изображение
    ctx.putImageData(imgdata, 0, 0);
}

function genPalette() {
    // Высчитать градиент
    var roft = 24;
    var goft = 16;
    var boft = 0;
    for (var i = 0; i < 256; i++) {
        palette[i] = {
            r: roft,
            g: goft,
            b: boft
        };

        if (i < 64) {
            roft += 3;
        } else if (i < 128) {
            goft += 3;
        } else if (i < 192) {
            boft += 3;
        }
    }
}

// Сгенерировать изобржение
function genImage() {
    var maxiterations = parseInt(document.getElementById("range").value);
    for (var y = 0; y < imgh; y++) {
        for (var x = 0; x < imgw; x++) {
            iterate(x, y, maxiterations);
        }
    }
}

function iterate(x, y, maxiterations) {
    var x0 = (x + oftx + panx) / zoom;
    var y0 = (y + ofty + pany) / zoom;

    // Переменные итерации
    var a = 0;
    var b = 0;
    var rx = 0;
    var ry = 0;

    // Итерация
    var iterations = 0;
    while (iterations < maxiterations && (rx * rx + ry * ry <= 4)) {
        rx = a * a - b * b + x0;
        ry = 2 * a * b + y0;

        // Следующая итерация
        a = rx;
        b = ry;
        iterations++;
    }

    // Создать палитру основанную на № итерации
    var color;
    if (iterations == maxiterations) {
        color = {
            // Чёрный
            r: 0,
            g: 0,
            b: 0
        };
    } else {
        var index = Math.floor((iterations / (maxiterations - 1)) * 255);
        color = palette[index];
    }

    // Нарисовать
    var pixelindex = (y * imgw + x) * 4;
    imgdata.data[pixelindex] = color.r;
    imgdata.data[pixelindex + 1] = color.g;
    imgdata.data[pixelindex + 2] = color.b;
    imgdata.data[pixelindex + 3] = 255;
}

// Масштабирование
function zoomFractal(x, y, factor, zoomin) {
    if (zoomin) {
        // Приближение
        zoom *= factor;
        panx = factor * (x + oftx + panx);
        pany = factor * (y + ofty + pany);
    } else {
        // Отдаление
        zoom /= factor;
        panx = (x + oftx + panx) / factor;
        pany = (y + ofty + pany) / factor;
    }
}

// Event Мыши
function onMouseDown(e) {
    var pos = getMousePos(canvas, e);

    // Отдаление с [Ctrl]
    var zoomin = true;
    if (e.ctrlKey) {
        zoomin = false;
    }

    // Панорама (Передвижение) с [Shift]
    var zoomfactor = 2;
    if (e.shiftKey) {
        zoomfactor = 1;
    }

    // Приближение фрактала в позиции курсора
    zoomFractal(pos.x, pos.y, zoomfactor, zoomin);

    // Генерировать новое изображение
    genImage();
}

// Получить позицию курсора
function getMousePos(canvas, e) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: Math.round((e.clientX - rect.left) / (rect.right - rect.left) * canvas.width),
        y: Math.round((e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height)
    };
}

// Вызвать инициализацию для запуска
initialize();