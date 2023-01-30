//↓↓↓↓↓↓↓↓↓↓↓↓鼠标点击弹出烟花波纹↓↓↓↓↓↓↓↓↓↓↓↓
export function clickEffect(e) {
    let balls = [];
    let longPressed = false;
    let longPress;
    let multiplier = 0;
    let width, height;
    let origin;
    let normal;
    let ctx;
    const colours = ["#F73859", "#14FFEC", "#00E0FF", "#FF99FE", "#FAF15D"];

    const canvas = document.createElement("canvas");
    canvas.setAttribute("style", "top: 0; left: 0; z-index: 99999; pointer-events: none;");
    let element = e || window;
    if (e) {
        canvas.style.position = "absolute";
        element.appendChild(canvas);
        canvas.width = element.clientWidth;
        canvas.height = element.clientHeight;
    } else {
        canvas.style.position = "fixed";
        document.body.appendChild(canvas);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }


    if (canvas.getContext && window.addEventListener && element.addEventListener) {
        ctx = canvas.getContext("2d");
        updateSize();
        window.addEventListener('resize', updateSize, false);
        loop();
        element.addEventListener("mousedown", function(e) {
            pushBalls(randBetween(10, 20), (e.clientX - element.getBoundingClientRect().left), (e.clientY - element.getBoundingClientRect().top));
            element.classList.add("is-pressed");
            longPress = setTimeout(function(){
                element.classList.add("is-longpress");
                longPressed = true;
            }, 500);
        }, false);
        element.addEventListener("mouseup", function(e) {
            clearInterval(longPress);
            if (longPressed === true) {
                element.classList.remove("is-longpress");
                pushBalls(randBetween(50 + Math.ceil(multiplier), 100 + Math.ceil(multiplier)), (e.clientX - element.getBoundingClientRect().left), (e.clientY - element.getBoundingClientRect().top));
                longPressed = false;
            }
            element.classList.remove("is-pressed");
        }, false);
        element.addEventListener("mousemove", function(e) {
            let x = e.clientX - element.getBoundingClientRect().left;
            let y = e.clientY - element.getBoundingClientRect().top;
        }, false);
    } else {
        console.log("canvas or addEventListener is unsupported!");
    }


    function updateSize() {
        if (e) {
            canvas.width = element.clientWidth * 2;
            canvas.height = element.clientHeight * 2;
            canvas.style.width = element.clientWidth + 'px';
            canvas.style.height = element.clientHeight + 'px';
            ctx.scale(2, 2);
            width = (canvas.width = element.clientWidth);
            height = (canvas.height = element.clientHeight);

        } else {
            canvas.width = window.innerWidth * 2;
            canvas.height = window.innerHeight * 2;
            canvas.style.width = window.innerWidth + 'px';
            canvas.style.height = window.innerHeight + 'px';
            ctx.scale(2, 2);
            width = (canvas.width = window.innerWidth);
            height = (canvas.height = window.innerHeight);
        }
        origin = {
            x: width / 2,
            y: height / 2
        };
        normal = {
            x: width / 2,
            y: height / 2
        };
    }
    class Ball {
        constructor(x = origin.x, y = origin.y) {
            this.x = x;
            this.y = y;
            this.angle = Math.PI * 2 * Math.random();
            if (longPressed === true) {
                this.multiplier = randBetween(14 + multiplier, 15 + multiplier);
            } else {
                this.multiplier = randBetween(6, 12);
            }
            this.vx = (this.multiplier + Math.random() * 0.5) * Math.cos(this.angle);
            this.vy = (this.multiplier + Math.random() * 0.5) * Math.sin(this.angle);
            this.r = randBetween(8, 12) + 3 * Math.random();
            this.color = colours[Math.floor(Math.random() * colours.length)];
        }
        update() {
            this.x += this.vx - normal.x;
            this.y += this.vy - normal.y;
            normal.x = -2 / window.innerWidth * Math.sin(this.angle);
            normal.y = -2 / window.innerHeight * Math.cos(this.angle);
            this.r -= 0.3;
            this.vx *= 0.9;
            this.vy *= 0.9;
        }
    }

    function pushBalls(count = 1, x = origin.x, y = origin.y) {
        for (let i = 0; i < count; i++) {
            balls.push(new Ball(x, y));
        }
    }

    function randBetween(min, max) {
        return Math.floor(Math.random() * max) + min;
    }

    function loop() {
        ctx.fillStyle = "rgba(255, 255, 255, 0)";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < balls.length; i++) {
            let b = balls[i];
            if (b.r < 0) continue;
            ctx.fillStyle = b.color;
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2, false);
            ctx.fill();
            b.update();
        }
        if (longPressed === true) {
            multiplier += 0.2;
        } else if (!longPressed && multiplier >= 0) {
            multiplier -= 0.4;
        }
        removeBall();
        requestAnimationFrame(loop);
    }

    function removeBall() {
        for (let i = 0; i < balls.length; i++) {
            let b = balls[i];
            if (b.x + b.r < 0 || b.x - b.r > width || b.y + b.r < 0 || b.y - b.r > height || b.r < 0) {
                balls.splice(i, 1);
            }
        }
    }
}
//↑↑↑↑↑↑↑↑↑↑↑↑鼠标点击弹出烟花波纹↑↑↑↑↑↑↑↑↑↑↑↑