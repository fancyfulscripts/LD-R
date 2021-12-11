
window.addEventListener('load', initApp);

function initApp(event) {

    const anim = new LDRMachine();
}

function LDRMachine() {
    this.columns = document.getElementsByClassName('column');


    let i = 2;

    let time = setInterval(() => {
        if (i < 0) {
            clearInterval(time);
        } else {
            this.start(i, { value: 0, max: 7 + Math.floor(Math.random() * 7) });
        }
        i--;
    }, 750);

}


LDRMachine.prototype.start = function (id, count) {
    const column = this.columns[id];
    const digits = column.getElementsByClassName('digit');

    for (let i = 0; i < digits.length; i++) {

        this.tweenAnimation(digits[i], 250, this.linearTween, (target) => {
            if (i == 1) {
                let digit = this.getDigit();
                digits.item(1).remove();
                column.insertBefore(digit, digits.item(0));
                this.setClassStyle(column, "top", "-100px");
                count.value += 1;
                // Finals Icons  !
                if (count.value == count.max - 1) {
                    // fake result == LDR  
                    let final;
                    switch (id) {
                        case 0:
                            final = '&#xe81f'; // LOVE
                            break;
                        case 1:
                            final = '&#xe812';//DEATH
                            break;
                        case 2:
                            final = '&#xe80b';//ROBOTS
                            break;
                    }
                    // digit.innerHTML = this.getRandIcon();
                    digit.innerHTML = final;
                }
                if (count.value < count.max) this.start(id, count);
            }
        });

    }
}
/**
 * tweenHandler
 */
LDRMachine.prototype.tweenAnimation = function (target, d, easingFunct, onCompleteHandler) {
    const pattern = /[0-9\.-]+/g;
    let b, c, startTime = new Date();
    const CSCSS = window.getComputedStyle(target);
    b = parseInt(pattern.exec(CSCSS['top']));
    c = 0 - b;// -100... ! ?? !  :s 
    this.run(target, startTime, b, c, d, easingFunct, onCompleteHandler);
}
/**
 * requestAnimationFrame handler
 */
LDRMachine.prototype.run = function (target, startTime, b, c, d, easingFunct, onCompleteHandler) {
    let t = new Date() - startTime;
    let value;
    if (t < d) {
        value = easingFunct(t, b, c, d);
        target.style['top'] = `${value}px`;

        requestAnimationFrame(this.run.bind(this, target, startTime, b, c, d, easingFunct, onCompleteHandler));
    } else {
        t = d;
        target.style['top'] = '-100px';
        onCompleteHandler(target);
    }
}



LDRMachine.prototype.icons = [
    '&#x2b', '&#x58', '&#x78', '&#xe800',
    '&#xe801', '&#xe802', '&#xe803', '&#xe804',
    '&#xe806', '&#xe808', '&#xe809', '&#xe80a',
    '&#xe80b', '&#xe80c', '&#xe80d', '&#xe80f',
    '&#xe810', '&#xe811', '&#xe812', '&#xe813',
    '&#xe814', '&#xe815', '&#xe816', '&#xe817',
    '&#xe818', '&#xe819', '&#xe81a', '&#xe81b',
    '&#xe81c', '&#xe81e', '&#xe81f', '&#xe820',
    '&#xe824'];

LDRMachine.prototype.getDigit = function () {
    const elt = document.createElement('span');
    elt.classList.add("digit");
    elt.innerHTML = this.getRandIcon();
    return elt;
}

LDRMachine.prototype.getRandIcon = function () {
    return this.icons[Math.floor(Math.random() * this.icons.length)];
}

LDRMachine.prototype.linearTween = function (t, b, c, d) {
    return c * t / d + b;
}

LDRMachine.prototype.setClassStyle = function (elts, prop, value) {
    for (let i = 0; i < elts.length; i++)elts[i].style[prop] = value;
}
