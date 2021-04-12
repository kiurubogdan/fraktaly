var r = Math.floor(Math.random() * Math.floor(255)); // Красный
var g = Math.floor(Math.random() * Math.floor(255)); // Зеленый
var b = Math.floor(Math.random() * Math.floor(255)); // Синий

// Главная функция (Вызов построения)
function drawKox(id) {
    // Показать края фрактала и холста
    this.showBorders = function () {
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(1, 1);
        ctx.lineTo(1, canvas.height - ctx.lineWidth);
        ctx.lineTo(canvas.width - ctx.lineWidth, canvas.height - ctx.lineWidth);
        ctx.lineTo(canvas.width - ctx.lineWidth, 1);
        ctx.lineTo(1, 1);
        ctx.strokeStyle = "rgb(" + r + "," + g + "," + b + ")";
        ctx.stroke();
    };

    // Отчистить холст
    this.clearField = function () {
        ctx.fillStyle = "transparent";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Для многократного построения
    this.repetKox = function () {
        this.clearField();
        this.showBorders();
        // Вызов нового построения фрактала
        var field = new kox();
        field.setParams(400, 200, 375, 100, 200);
        field.draw(ctx);
    }
    var canvas = document.getElementById(id);
    // Параметтры холста
    canvas.width = 8 * 100;
    canvas.height = 5.5 * 100;

    var ctx = canvas.getContext("2d");

    // Задать таймер
    setInterval(this.repetKox, 9000);
    this.repetKox();
}

// Построение фрактала
function kox() {
    var ctx = null;
    var width;
    var height;
    var startWidth;
    var limWidth = 1;
    var xBeg;
    var yBeg;

    //Задание параметров
    this.setParams = function (w, h, x, y, Width) {
        width = w;
        height = h;
        startWidth = Width;
        xBeg = x;
        yBeg = y;
    };

    // Таймер построения
    this.PaintTimer = function (x1, y1, x2, y2) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
    // Интервал
    var delay = 0;
    this.LineTo = function (x1, y1, x2, y2) {
        delay += 10;
        setTimeout(this.PaintTimer, delay, x1, y1, x2, y2);
    }
    // Построение стороны
    this.drawSide = function (x1, y1, x2, y2) {
        var sideWidth = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
        if (sideWidth / 3 < limWidth) {
            this.LineTo(x1, y1, x2, y2);
        } else {
            var x2t1 = x1 + (sideWidth / 3) * (x2 - x1) / sideWidth;
            var y2t1 = y1 + (sideWidth / 3) * (y2 - y1) / sideWidth;
            var temp1 = x2t1;
            var temp2 = y2t1;

            this.drawSide(x1, y1, x2t1, y2t1);

            var x1t2 = temp1;
            var y1t2 = temp2;

            var x2t2 = x1 + (2 * sideWidth / 3) * (x2 - x1) / sideWidth;
            var y2t2 = y1 + (2 * sideWidth / 3) * (y2 - y1) / sideWidth;

            var temp3 = x1t2 + (x2t2 - x1t2) * Math.cos(Math.PI / 3) + (y1t2 - y2t2) * Math.sin(Math.PI / 3);
            var temp4 = y1t2 + (x2t2 - x1t2) * Math.sin(Math.PI / 3) + (y2t2 - y1t2) * Math.cos(Math.PI / 3);
            var x2t2 = temp3;
            var y2t2 = temp4;

            this.drawSide(x1t2, y1t2, x2t2, y2t2);
            var x1t3 = x2t2;
            var y1t3 = y2t2;
            var x2t3 = x1 + (2 * sideWidth / 3) * (x2 - x1) / sideWidth;
            var y2t3 = y1 + (2 * sideWidth / 3) * (y2 - y1) / sideWidth;
            this.drawSide(x1t3, y1t3, x2t3, y2t3);
            var x1t4 = x1 + (2 * sideWidth / 3) * (x2 - x1) / sideWidth;
            var y1t4 = y1 + (2 * sideWidth / 3) * (y2 - y1) / sideWidth;
            this.drawSide(x1t4, y1t4, x2, y2);
        }
    }

    //Построение фрактала
    this.drawKox = function () {
        ctx.lineWidth = 1;
        var x1 = xBeg;
        var y1 = yBeg;
        var x2 = x1;
        var y2 = y1 + startWidth;

        var x2t1 = x1 + (x2 - x1) * Math.cos(Math.PI / 6) + (y1 - y2) * Math.sin(Math.PI / 6);
        var y2t1 = y1 + (x2 - x1) * Math.sin(Math.PI / 6) + (y2 - y1) * Math.cos(Math.PI / 6);
        this.drawSide(x1, y1, x2t1, y2t1);
        this.drawSide(x2t1, y2t1, x1 + startWidth / 2, y2t1);
        this.drawSide(x1 + startWidth / 2, y2t1, x1, y1);
    }

    this.draw = function (cont) {
        ctx = cont;
        this.drawKox();
    }
}

// Вызов фраткала
drawKox('canvas');
