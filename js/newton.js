class cplx {
    constructor({
        algebraic,
        trigonometric
    } = {}) {
        // Проверка конструктора
        if (algebraic) {
            this.initAlgebraic(algebraic);
        } else if (trigonometric) {
            this.initTrigonometric(trigonometric)
        } else {
            throw new Error('Неправильные аргументы');
        }
    }
    //Перевод чисел
    static fromRl(r) {
        return cplx.fromAlg(r, 0);
    }
    static fromAlg(r, i) {
        return new cplx({
            algebraic: {
                r,
                i
            }
        });
    }
    static fromTrigonometric(modulus, arg) {
        return new cplx({
            trigonometric: {
                modulus,
                arg
            }
        });
    }
    initAlgebraic({
        r,
        i
    }) {
        this.r = r;
        this.i = i;
        this.modulus = Math.sqrt(r * r + i * i);
        this.arg = Math.atan2(i, r)
    }
    initTrigonometric({
        modulus,
        arg
    }) {
        this.modulus = modulus,
            this.arg = arg;
        this.r = this.modulus * Math.cos(arg);
        this.i = this.modulus * Math.sin(arg);
    }
    //Различные упрощения математических действий
    pow(exp) {
        return cplx.fromTrigonometric(Math.pow(this.modulus, exp), exp * this.arg);
    }
    add(c) {
        return cplx.fromAlg(this.r + c.r, this.i + c.i);
    }
    conjugate() {
        return cplx.fromAlg(this.r, -this.i);
    }
    sub(c) {
        return cplx.fromAlg(this.r - c.r, this.i - c.i);
    }
    mul(c) {
        return cplx.fromAlg(this.r * c.r - this.i * c.i, this.r * c.i + this.i * c.r);
    }
    div(c) {
        var cConjugate = c.conjugate();
        var mulToConjugate = this.mul(cConjugate);
        var divider = c.mul(cConjugate).r;
        return cplx.fromAlg(mulToConjugate.r / divider, mulToConjugate.i / divider);
    }
}
//Размеры холста
let c = canvas.getContext('2d'),
    w = canvas.width,
    h = canvas.height
//Расчет по формуле
function formula(x, y, maxIter, max, min) {
    var z = cplx.fromAlg(x, y);
    var d = z;
    for (var i = 0; i < maxIter && z.modulus < max && d.modulus > min; i++) {
        var z1 = z.sub(z.pow(3).add(cplx.fromRl(-1)).div(z.pow(2).mul(cplx.fromRl(3))));
        //var z1 = z.sub(z.pow(5).add(cplx.fromRl(-1)).div(z.pow(4).mul(cplx.fromRl(5))));
        var z2 = z1.sub(z);
        d = cplx.fromAlg(Math.abs(z2.r), Math.abs(z2.i));
        z = z1;
    }
    return [i, z];
}
//Создаем Event
var input = document.getElementById('coef');
input.addEventListener('change', function () {
    draw(this.value);
});
var roots = [cplx.fromRl(1), cplx.fromAlg(-1, Math.sqrt(3) / 2), cplx.fromAlg(-1, -Math.sqrt(3) / 2)]
var maxDistance = input.max;
// Построение фрактала
function draw(distance) {
    var xc = w / 2;
    var yc = h / 2;
    var coef = 0.0015 + distance * ((0.015 - 0.0015) / maxDistance);
    var img = c.getImageData(0, 0, w, h);
    for (var y = -h / 2; y < h / 2; y++) {
        for (var x = -w / 2; x < w / 2; x++) {
            let [value, root] = formula(x * coef, y * coef, 50, 1e6, 1e-6);
            let offset = ((y + yc) * w + x + xc) * 4
            img.data[offset] = (value * roots[0].sub(root).modulus * 8) % 255;
            img.data[offset + 1] = (value * roots[1].sub(root).modulus * 6) % 255;
            img.data[offset + 2] = (value * roots[2].sub(root).modulus * 12) % 255;
            img.data[offset + 3] = 255
        }
    }
    c.putImageData(img, 0, 0);
};
draw(100);