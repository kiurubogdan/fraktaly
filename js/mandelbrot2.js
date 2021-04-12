var canvas = document.getElementById('canvas');
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var ctx = canvas.getContext('2d');
var imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);

var xcorner = -2;
var ycorner = -1.5;
var zoom = 3;
var r = 127;
var g = 255;
var b = 212;

var data = imageData.data;

var plot = function (x, y, count) {
    var index = (y * canvasWidth + x) * 4;
    data[index] = count * 12 * -1 + r; // красный
    data[++index] = count * 12 * -1 + g; // зеленый
    data[++index] = count * 12 * -1 + b; // синий
    data[++index] = 255; // alpha        
};

function init() {
    ctx.clearRect(0, 0, 1000, 1000);
    r = parseInt(document.getElementById("r").value);
    g = parseInt(document.getElementById("g").value);
    b = parseInt(document.getElementById("b").value);
    draw()
}

// Цикл для отрисовки
function draw() {
    for (var x = 1; x < canvasWidth; x++) {
        for (var y = 1; y < canvasHeight; y++) {
            var count = 0;
            var size = 0;
            var cx = xcorner + ((x * zoom) / canvasWidth);
            var cy = ycorner + ((y * zoom) / canvasHeight);

            var zx = 0;
            var zy = 0;

            while (count < 50 && size <= 4) {
                count += 1;
                temp = (zx * zx) - (zy * zy);
                zy = (2 * zx * zy) + cy;
                zx = temp + cx;
                size = (zx * zx) + (zy * zy);
            }

            plot(x, y, count); // count - для колоризации
        }
        ctx.putImageData(imageData, 0, 0);
    }
}

draw();