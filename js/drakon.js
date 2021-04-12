var c = document.getElementById('canvas');
var ctx = c.getContext('2d');

var ldep = 6;

// Построение фрактала
function draw(x1, y1, x2, y2, dep) {
    if (dep == 0) {
        randomColor(); //Изменение цвета
        ctx.fillRect(x1, y1, 1, 1);
        ctx.fillRect(x2, y2, 1, 1);
        return;
    }

    var dx = (x2 - x1) / 2;
    var dy = (y2 - y1) / 2;

    //Смещение по х и у
    var x_tmp = x1 + dx - dy;
    var y_tmp = y1 + dy + dx;

    // Рекурсия
    draw(x1, y1, x_tmp, y_tmp, dep - 1);
    draw(x2, y2, x_tmp, y_tmp, dep - 1);
}

//Генерация случайного цвета
function randomColor() {
    var r, g, b;
    r = decToHex(randomNumber(256));
    g = decToHex(randomNumber(256));
    b = decToHex(randomNumber(256));
    ctx.fillStyle = "#" + r + g + b;
}

//Генерация случайного числа
function randomNumber(max) {
    return Math.floor(Math.random() * (max + 1));
}

//Перевод десятичного числа в шестнадцатеричное
function decToHex(n) {
    return Number(n).toString(16);
}

/* 
    Построение фрактала по нажатию кнопки пользователем
*/

function btndraw() {
    ldep++;
    draw(400 - 120, 100, 500 + 120, 200, ldep);
    document.getElementById("fract_plus").innerHTML = "Прорисовать лучше";
    if (ldep >= 16) {
        document.getElementById("fract_plus").style.display = "none";
    }
}
