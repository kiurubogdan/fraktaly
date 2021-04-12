"use strict";
var ctx = document.querySelector("#canvas").getContext("2d");
var angle = 0.75; // Угол разворота ветвей
var r = Math.floor(Math.random() * Math.floor(255));
var g = Math.floor(Math.random() * Math.floor(255));
var b = Math.floor(Math.random() * Math.floor(255));

function tree(length, angle, scale) {
    ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
    ctx.fillRect(0, 0, 1, length); // Рисуем "ствол-корень" дерева

    var min_length = 8;

    // Обрываем рекурсию, когда линии становятся слишком короткими 
    if (length < min_length) {
        return;
    }

    ctx.save(); // Сохраняем текущее состояние системы координат
    ctx.translate(0, length); // Сдвигаем "курсор" в конец "ствола-корня"
    ctx.rotate(angle); // Поворачиваем систему координат на какой-то угол влево
    tree(length * scale, -angle, scale); // Рекурсивно рисуем левую ветвь
    ctx.rotate(2 * -angle); // Поворачиваем систему координат на симметричный угол вправо
    tree(length * scale, angle, scale); // Рекурсивно рисуем правую ветвь

    ctx.restore(); // Восстанавливаем начальное состояние системы координат
}

ctx.translate(document.querySelector("#canvas").clientWidth / 2, 0); // Начальный сдвиг системы координат, чтобы центрировать дерево
tree(90, angle, 0.75);

function drawFract() {
    tree(90, angle, 0.75);
    r = Math.floor(Math.random() * Math.floor(255));
    g = Math.floor(Math.random() * Math.floor(255));
    b = Math.floor(Math.random() * Math.floor(255));
    color = "rgb(" + r + "," + g + "," + b + ")";;
}
